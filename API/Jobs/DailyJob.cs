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

        private readonly ISchedulerFactory schedulerFactory;

        public DailyJob(ApplicationDbContext applicationDbContext, IHubContext<EventHub> hubContext, ISchedulerFactory schedulerFactory)
        {
            this.applicationDbContext = applicationDbContext;

            this._hubContext = hubContext;

            this.schedulerFactory = schedulerFactory;
        }

        public async Task Execute(IJobExecutionContext context)
        {
            try
            {
                var scheduler = await schedulerFactory.GetScheduler();

                var ctx = applicationDbContext;

                var date = DateTime.Now;

                var data = ctx.Appointments
                    .Where(a => a.Date.Date == DateTime.Today)
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
                    Console.WriteLine(item.Date);

                    var jobKey = new JobKey(item.Id.ToString(), "appointments");

                    var job = JobBuilder.Create<AppointmentJob>()
                        .WithIdentity(jobKey)
                        .UsingJobData("appointment", JsonConvert.SerializeObject(item))
                        .Build();

                    var bTrigger = TriggerBuilder.Create()
                        .WithIdentity(item.Id.ToString(), "appointments")
                        .ForJob(jobKey)
                        .StartAt(item.Date.AddMinutes(-5))
                        .Build();

                    var aTrigger = TriggerBuilder.Create()
                        .WithIdentity(item.Id.ToString(), "appointments")
                        .ForJob(jobKey)
                        .StartAt(item.Date)
                        .Build();

                    if (await scheduler.CheckExists(jobKey))
                    {
                        await scheduler.DeleteJob(jobKey);
                    }

                    Console.WriteLine("schedule working");

                    await scheduler.ScheduleJob(job, [bTrigger, aTrigger], replace: false);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());

                throw new JobExecutionException(ex, refireImmediately: true)
                {
                    UnscheduleFiringTrigger = true
                };
            }
        }
    }
}

