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

        public int AppointmentLength { get; set; }

        public string? WorkingHoursStart { get; set; }

        public string? WorkingHoursEnd { get; set; }
    }

    public class Language
    {
        public int Id { get; set; }

        public string? Name { get; set; }

        public string? ISOCode { get; set; }
    }

    public class Appearance
    {
        public int Id { get; set; }

        public string? Name { get; set; }
    }
}
