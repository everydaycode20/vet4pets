using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public class OwnerDTO : BaseEntity
    {
        public int Id { get; set; }

        [StringLength(255)]
        public required string Name { get; set; }

        [StringLength(255)]
        [EmailAddress]
        public required string email { get; set; }
    
        [StringLength(500)]
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

        [StringLength(255)]
        public required string Number { get; set; }
    }
}
