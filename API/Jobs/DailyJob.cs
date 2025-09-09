using System;
using API.Data;
using API.Models;
using API.Signalr;

namespace API.Jobs
{
    public class DailyJob : IJob
    {
        private readonly ApplicationDbContext applicationDbContext;

        private readonly IHubContext<EventHub> _hubContext;

        public DailyJob(ApplicationDbContext applicationDbContext, IHubContext<EventHub> hubContext)
        {
            this.applicationDbContext = applicationDbContext;

            this._hubContext = hubContext;
        }

        public async Task Execute(IJobExecutionContext context)
        {
            try
            {
                await using var context = applicationDbContext;

                var date = DateTime.Now;

                var data = context.Appointments
                    .Where(a => a.Date.Month == date.Month && a.Date.Date == date.Date)
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

                if (data.Any())
                {
                    return Task.CompletedTask;
                }

                foreach (var item in data)
                {
                    await eventHub.SendMessageToCaller(a);
                }

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

