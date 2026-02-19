using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public class AppointmentStatsWeekly
    {
        [StringLength(50)]
        public string? Day { get; set; }

        [Range(1, int.MaxValue)]
        public int Total { get; set; }
    }

    public class AppointmentStatsMonthly
    {
        [StringLength(50)]
        public string? Month { get; set; }

        [Range(1, int.MaxValue)]
        public int Total { get; set; }
    }
    public class AppointmentStatsYearly
    {
        [StringLength(50)]
        public string? Year { get; set; }

        [Range(1, int.MaxValue)]
        public int Total { get; set; }
    }
}
