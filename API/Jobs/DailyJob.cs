using API.Data;
using API.Models;
using API.Signalr;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;
using Quartz;

namespace API.Jobs
{
    public class DailyJob : IJob
    {
        private readonly ApplicationDbContext applicationDbContext;

        private readonly IHubContext<EventHub> _hubContext;

        private readonly IScheduler scheduler;

        public DailyJob(ApplicationDbContext applicationDbContext, IHubContext<EventHub> hubContext, IScheduler scheduler)
        {
            this.applicationDbContext = applicationDbContext;

            this._hubContext = hubContext;

            this.scheduler = scheduler;
        }

        public async Task Execute(IJobExecutionContext context)
        {
            try
            {
                var ctx = applicationDbContext;

                var date = DateTime.Now;

                var data = ctx.Appointments
                    .Where(a => a.Date.Date == date.Date)
                    .Select(a => new AppointmentDTO
                    {
                        Id = a.Id,
                        Date = a.Date,
                        EndDate = a.EndDate,
                        Pet = new
                        {
                            a.Pet!.Id,
                            a.Pet.Name,
                            a.Pet.Age,
                        },
                        Owner = new
                        {
                            a.Owner!.Id,
                            a.Owner.Name,
                        },
                        Type = new
                        {
                            a.Type!.Id,
                            a.Type.Name,
                            a.Type.Color,
                        }
                    })
                .OrderBy(a => a.Date)
                .ToList();

                if (data.Count == 0)
                {
                    return;
                }

                foreach (var item in data)
                {
                    var jobKey = new JobKey(item.Id.ToString(), "appointments");

                    var job = JobBuilder.Create<AppointmentJob>()
                        .WithIdentity(jobKey)
                        .UsingJobData("appointment", JsonConvert.SerializeObject(item))
                        .Build();

                    var trigger = TriggerBuilder.Create()
                    .WithIdentity(item.Id.ToString(), "appointments")
                    .StartAt(item.Date.AddMinutes(-5))
                    .WithSimpleSchedule(x => x
                    .WithIntervalInMinutes(5)
                    .WithRepeatCount(1))
                    .Build();

                    await scheduler.ScheduleJob(job, trigger);
                }
            }
            catch (Exception ex)
            {
                throw new JobExecutionException(ex, refireImmediately: true)
                {
                    UnscheduleFiringTrigger = true
                };
            }
        }
    }
}

