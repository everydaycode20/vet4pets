using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public class Pet : BaseEntity
    {
        public int Id { get; set; }

        [StringLength(255)]
        public required string Name { get; set; }

        [Range(1, int.MaxValue)]
        public required int Age { get; set; }

        public int PetTypeId { get; set; }
        public PetType? PetType { get; set; }

        public int OwnerId { get; set; }
        public Owner? Owner { get; set; }

        public List<Appointment> Appointments { get; set; } = new List<Appointment>();
    }

    public class PetType : BaseEntity
    {
        public int Id{ get; set; }

        [StringLength(500)]
        public string? Description { get; set; }

        public required BreedDTO Breed { get; set; }
    }

    public class Breed : BaseEntity
    {
        public int Id { get; set; }

        [StringLength(500)]
        public required string Description { get; set; }
    }
}
