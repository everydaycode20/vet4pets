using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;
using Quartz;

namespace API.Models
{
    public class AppointmentJob : IJob
    {
        private readonly IHubContext _hubContext;

        public AppointmentJob(IHubContext hubContext)
        {
            this._hubContext = hubContext;
        }
        public async Task Execute(IJobExecutionContext context)
        {
            try
            {
                var appointment = context.MergedJobDataMap.GetString("appointment");

                if (!string.IsNullOrEmpty(appointment))
                {

                    await _hubContext
                        .Clients.All.SendAsync("ReceiveMessage", appointment);
                }
            }
            catch (Exception ex)
            {

                throw new JobExecutionException(ex, refireImmediately: true)
                {
                    UnscheduleFiringTrigger = true,
                };
            }
        }
    }
}
