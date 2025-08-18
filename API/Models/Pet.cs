namespace API.Models
{
    public class Pet : BaseEntity
    {
        public int Id { get; set; }

        public required string Name { get; set; }

        public int Age { get; set; }

        public int PetId { get; set; }
        public required PetType PetType { get; set; }

        public int OwnerId { get; set; }
        public required Owner Owner { get; set; }

        public List<Appointment> Appointments { get; set; } = new List<Appointment>();
    }

    public class PetType : BaseEntity
    {
        public int Id{ get; set; }

        public string? Description { get; set; }

        public required Breed Breed { get; set; }
    }

    public class Breed : BaseEntity
    {
        public int Id { get; set; }

        public required string Description { get; set; }
    }
}
