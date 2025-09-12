using API.Data;
using API.Models;
using API.Signalr;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
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
                            id = a.Pet!.Id,
                            name = a.Pet.Name,
                            age = a.Pet.Age,
                        },
                        Owner = new
                        {
                            id = a.Owner!.Id,
                            name = a.Owner.Name,
                        },
                        Type = new
                        {
                            id = a.Type!.Id,
                            name = a.Type.Name,
                            color = a.Type.Color,
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
                        .UsingJobData("appointment", JsonConvert.SerializeObject(item, new JsonSerializerSettings { ContractResolver = new CamelCasePropertyNamesContractResolver() }))
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

