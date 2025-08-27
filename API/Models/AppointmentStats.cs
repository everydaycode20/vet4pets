namespace API.Models
{
    public class AppointmentStatsWeekly
    {
        public string? Day { get; set; }

        public int Total { get; set; }
    }

    public class AppointmentStatsMonthly
    {
        public string? Month { get; set; }

        public int Total { get; set; }
    }
    public class AppointmentStatsYearly
    {
        public string? Year { get; set; }

        public int Total { get; set; }
    }
}
