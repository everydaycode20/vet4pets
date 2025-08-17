namespace API.Models
{
    public class Owner
    {
        public int Id { get; set; }

        public required string Name { get; set; }

        public required string email { get; set; }

        public string? Address { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        public List<Appointment> Appointments { get; set; } = [];
    }

    public class Telephone
    {
        public int Id { get; set; }

        public required Owner Owner { get; set; }

        public required TelephoneType TelephoneType { get; set; }

        public required string Number { get; set; }
    }

    public class TelephoneType
    {
        public int Id { get; set; }

        public required string Type { get; set; }
    }
}
