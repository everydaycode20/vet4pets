namespace API.Models
{
    public class Appointment : BaseEntity
    {
        public int Id { get; set; }

        public required DateTime Date { get; set; }

        public required DateTime EndDate { get; set; }

        public required int PetId { get; set; }
        public Pet? Pet { get; set; }

        public required int OwnerId { get; set; }
        public Owner? Owner { get; set; }

        public required int TypeId { get; set; }
        public AppointmentType? Type { get; set; }

        public Boolean? Completed { get; set; } = false;
    }

    public class AppointmentType : BaseEntity
    {
        public int Id { get; set; }

        public required string Name { get; set; }

        public int Color { get; set; }
    }
}
