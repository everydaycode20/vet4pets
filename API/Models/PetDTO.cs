using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public class PetDTO : BaseEntity
    {
        public int Id { get; set; }

        [StringLength(255)]
        public required string Name { get; set; }

        public int Age { get; set; }

        public int OwnerId { get; set; }

        public OwnerDTO? Owner { get; set; }

        public int PetTypeId { get; set; }
        public required PetTypeDTO PetType { get; set; }

        public List<Appointment> Appointments { get; set; } = new List<Appointment>();
    }

    public class PetTypeDTO : BaseEntity
    {
        public int Id { get; set; }

        [StringLength(255)]
        public string? Description { get; set; }

        public required BreedDTO Breed { get; set; }
    }

    public class BreedDTO : BaseEntity
    {
        public int Id { get; set; }

        [StringLength(255)]
        public required string Description { get; set; }
    }
}
