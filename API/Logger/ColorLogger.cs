namespace API.Logger
{
    public sealed class ColorLogger(
        string name,
        Func<ColorLoggerConfiguration> getCurentConfig) : ILogger
    {
        public IDisposable? BeginScope<TState>(TState state) where TState : notnull => default!;

        public bool IsEnabled(LogLevel logLevel) =>
            getCurentConfig().LogLevelToColorMap.ContainsKey(logLevel);

        public void Log<TState>(
            LogLevel logLevel,
            EventId eventId,
            TState state,
            Exception? exception,
            Func<TState, Exception, string> formatter
        )
        {
            if (!IsEnabled(logLevel))
            {
                return;
            }

            ColorLoggerConfiguration config = getCurentConfig();

            if (config.EventId == 0 || config.EventId == eventId.Id)
            {
                ConsoleColor originalColor = Console.ForegroundColor;

                Console.ForegroundColor = config.LogLevelToColorMap[logLevel];
                Console.WriteLine($"[{eventId.Id,2}: {logLevel, -12}]");

                Console.ForegroundColor = originalColor;
                Console.WriteLine($"  {name}  -  ");

                Console.ForegroundColor = config.LogLevelToColorMap[logLevel];
                Console.WriteLine($"{formatter(state, exception)}");

                Console.ForegroundColor = originalColor;
                Console.WriteLine();
            }
        }
    }

}
