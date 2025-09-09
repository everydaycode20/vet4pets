using Microsoft.Extensions.Options;
using System.Collections.Concurrent;
using System.Runtime.Versioning;

namespace API.Logger
{
    [UnsupportedOSPlatform("browser")]
    [ProviderAlias("LoggerConsole")]
    public class LoggerProvider:ILoggerProvider
    {
        private readonly IDisposable? _onChangeToken;

        private ColorLoggerConfiguration _currentConfig;

        private readonly ConcurrentDictionary<string, ColorLogger> _loggers =
            new(StringComparer.OrdinalIgnoreCase);

        public LoggerProvider(IOptionsMonitor<ColorLoggerConfiguration> config)
        {
            _currentConfig = config.CurrentValue;
            _onChangeToken = config.OnChange(updateConfig => _currentConfig = updateConfig);
        }

        public ILogger CreateLogger(string categoryName) =>
            _loggers.GetOrAdd(categoryName, name => new ColorLogger(name, GetCurentConfig));

        private ColorLoggerConfiguration GetCurentConfig() => _currentConfig;

        public void Dispose()
        {
            _loggers.Clear();
            _onChangeToken?.Dispose();
        }
    }
}
