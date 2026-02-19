using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public class Owner : BaseEntity
    {
        public int Id { get; set; }

        [StringLength(255)]
        public required string Name { get; set; }

        [StringLength(255)]
        [EmailAddress]
        public required string email { get; set; }

        [StringLength(500)]
        public string? Address { get; set; }

        public List<Telephone> Telephones { get; set; } = [];

        public List<Appointment>? Appointments { get; set; } = [];

        public List<Pet>? Pets { get; set; }
    }

    public class Telephone : BaseEntity
    {
        public int Id { get; set; }

        public int? OwnerId { get; set; }
        public Owner? Owner { get; set; }

        public int TelephoneTypeId { get; set; }
        public TelephoneType? TelephoneType { get; set; }

        [StringLength(255)]
        public required string Number { get; set; }
    }

    public class TelephoneType : BaseEntity
    {
        public int Id { get; set; }

        [StringLength(100)]
        public required string Type { get; set; }
    }
}
