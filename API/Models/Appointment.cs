namespace API.Models
{
    public class Appointment
    {
        public int Id { get; set; }

        public DateTime Date { get; set; }

        public int PetId { get; set; }
        public required Pet Pet { get; set; }

        public int OwnerId { get; set; }
        public required Owner Owner { get; set; }

        public int TypeId { get; set; }
        public required AppointmentType Type { get; set; }
    }

    public class AppointmentType
    {
        public int Id { get; set; }

        public required string Name { get; set; }

        public int Color { get; set; }
    }
}
