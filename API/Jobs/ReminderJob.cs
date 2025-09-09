using Quartz;

namespace API.Models
{
    public class ReminderJob : IJob
    {
        public Task Execute(IJobExecutionContext context)
        {
            try
            {
                Console.WriteLine("event remainder");

                return Task.CompletedTask;

            }
            catch (Exception ex)
            {

                throw new JobExecutionException(ex, refireImmediately: true)
                {
                    UnscheduleFiringTrigger = true,
                    UnscheduleAllTriggers = true,
                };
            }
        }
    }
}
