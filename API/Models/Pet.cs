namespace API.Models
{
    public class Pet
    {
        public int Id { get; set; }

        public required string Name { get; set; }

        public int Age { get; set; }

        public required PetType PetType { get; set; }

        public required Owner Owner { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        public List<Appointment> Appointments { get; set; } = new List<Appointment>();
    }

    public class PetType
    {
        public int Id{ get; set; }

        public string? Description { get; set; }

        public required Breed Breed { get; set; }
    }

    public class Breed
    {
        public int Id { get; set; }

        public required string Description { get; set; }
    }
}
