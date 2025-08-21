namespace API.Models
{
    public class Owner : BaseEntity
    {
        public int Id { get; set; }

        public required string Name { get; set; }

        public required string email { get; set; }

        public string? Address { get; set; }

        public List<Telephone> Telephones { get; set; } = [];

        public List<Appointment> Appointments { get; set; } = [];
    }

    public class Telephone : BaseEntity
    {
        public int Id { get; set; }

        public int OwnerId { get; set; }
        public required Owner Owner { get; set; }

        public int TelephoneTypeId { get; set; }
        public required TelephoneType TelephoneType { get; set; }

        public required string Number { get; set; }
    }

    public class TelephoneType : BaseEntity
    {
        public int Id { get; set; }

        public required string Type { get; set; }
    }
}
