using API.Models;
using Newtonsoft.Json;
using Quartz;

namespace API.Jobs
{
    public class AppointmentScheduler
    {
        private readonly ISchedulerFactory schedulerFactory;

        public AppointmentScheduler(ISchedulerFactory schedulerFactory)
        {
            this.schedulerFactory = schedulerFactory;
        }

        public async Task ScheduleAppointment(Appointment appointment)
        {
            var scheduler = await schedulerFactory.GetScheduler();

            var jobKey = new JobKey(appointment.Id.ToString(), "appointments");

            var job = JobBuilder.Create<AppointmentJob>()
                .WithIdentity(jobKey)
                .UsingJobData("appointment", JsonConvert.SerializeObject(appointment))
                .Build();

            var trigger = TriggerBuilder.Create()
                .WithIdentity(appointment.Id.ToString(), "appointments")
                .StartAt(appointment.Date.AddMinutes(-5))
                .WithSimpleSchedule(x => x
                .WithIntervalInMinutes(5)
                .WithRepeatCount(1))
                .Build();

            await scheduler.ScheduleJob(job, trigger);
        }

        public async Task UpdateScheduledApointment(Appointment appointment)
        {
            await this.RemoveScheduledAppointment(appointment.Id);

            await this.ScheduleAppointment(appointment);
        }

        public async Task RemoveScheduledAppointment(int appointmentId)
        {
            var scheduler = await schedulerFactory.GetScheduler();

            var jobKey = new JobKey(appointmentId.ToString(), "appointments");

            await scheduler.DeleteJob(jobKey);
        }
    }
}
