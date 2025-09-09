using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Logging.Configuration;

namespace API.Logger
{
    public static class LoggerExtensions
    {
        public static ILoggingBuilder AddConsoleLogger(this ILoggingBuilder builder) {
            builder.AddConfiguration();

            builder.Services.TryAddEnumerable(ServiceDescriptor.Singleton<ILoggerProvider, LoggerProvider>());

            LoggerProviderOptions.RegisterProviderOptions<ColorLoggerConfiguration, LoggerProvider>(builder.Services);

            return builder;
        }

        public static ILoggingBuilder AddConsoleLogger(this ILoggingBuilder builder, Action<ColorLoggerConfiguration> configure)
        {
            builder.AddConsoleLogger();

            builder.Services.Configure(configure);

            return builder;
        }
    }
}
