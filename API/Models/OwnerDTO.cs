namespace API.Models
{
    public class OwnerDTO
    {
        public int Id { get; set; }

        public required string Name { get; set; }

        public required string email { get; set; }

        public string? Address { get; set; }

        public List<Appointment> Appointments { get; set; } = [];

        public IEnumerable<TelephoneDTO>? Telephones { get; set; }

        public List<PetDTO>? Pets { get; set; }
    }

    public class TelephoneDTO
    {
        public int Id { get; set; }

        public int MyProperty { get; set; }
        public TelephoneType? TelephoneType { get; set; }

        public required string Number { get; set; }
    }
}
