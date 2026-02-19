using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public class Settings
    {
        public int Id { get; set; }

        public string? TimeFormat { get; set; }

        public string? DateFormat { get; set; }

        //public int LanguageId { get; set; }
        public Language? Language { get; set; }

        //public int AppearanceId { get; set; }
        public Appearance? Appearance { get; set; }

        public bool ReduceMotion { get; set; }

        [Range(1, int.MaxValue)]
        public int AppointmentLength { get; set; }

        [StringLength(255)]
        public string? WorkingHoursStart { get; set; }

        [StringLength(255)]
        public string? WorkingHoursEnd { get; set; }
    }

    public class Language
    {
        public int Id { get; set; }

        [StringLength(255)]
        public string? Name { get; set; }

        [StringLength(50)]
        public string? ISOCode { get; set; }
    }

    public class Appearance
    {
        public int Id { get; set; }

        [StringLength(255)]
        public string? Name { get; set; }
    }
}
