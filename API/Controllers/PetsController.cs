using API.Data;
using API.Models;
using Azure;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NuGet.Protocol;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PetsController : ControllerBase
    {
        private readonly ApplicationDbContext applicationDbContext;

        public PetsController(ApplicationDbContext applicationDbContext)
        {
            this.applicationDbContext = applicationDbContext;
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<string>> GetPetById(int id)
        {
            await using var context = applicationDbContext;

            var data = await context.Pets.FindAsync(id);

            if (data == null)
            {
                return NotFound(new { message = "not found" });
            }

            return Ok(data);
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<string>> GetAllPets([FromQuery] int pageNumber = 1, int pageSize = 20)
        {
            await using var context = applicationDbContext;

            var data = await context.Pets.Select(p => new PetDTO
            {
                Id = p.Id,
                Name = p.Name,
                Age = p.Age,
                PetType = new PetTypeDTO
                {
                    Id = p.PetType!.Id,
                    Breed = p.PetType.Breed,
                    Description = p.PetType.Description
                },
                Owner = new OwnerDTO
                {
                    Id = p.Owner!.Id,
                    Name = p.Owner.Name,
                    email = p.Owner.email
                },
                CreatedAt = p.CreatedAt
            }).OrderBy(o => o.Name).Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();

            var total = await context.Pets.CountAsync();

            return Ok(new
            {
                data,
                pageNumber,
                total
            });
        }

        [Authorize]
        [HttpGet("owner")]
        public async Task<ActionResult<string>> GetPetByOwner([FromQuery] int ownerId)
        {
            await using var context = applicationDbContext;

            //var d = await context.Pets.Where(p => p.Owner.Id == p.)

            var data = await context.Owners.Where(o => o.Pets!.Any() && o.Id == ownerId)
                .Select(o => new
                {
                    Pets = o.Pets!.Select(p => new
                    {
                        p.Id,
                        p.Name,
                        p.Age,
                    }).OrderBy(p => p.Name).ToList()
                }).FirstOrDefaultAsync();

            if (data == null)
            {
                return NotFound(new { message = "not found" });
            }

            return Ok(data);
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<String>> AddPet([FromBody] Pet pet)
        {
            if (ModelState.IsValid)
            {
                await using var context = applicationDbContext;

                context.Pets.Add(pet);

                await context.SaveChangesAsync();

                return Ok(new { message = "ok" });

            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [Authorize]
        [HttpPatch("{id}")]
        public async Task<ActionResult<string>> UpdatePet(int id, [FromBody] JsonPatchDocument<Pet> patchDoc)
        {

            if (patchDoc != null)
            {
                await using var context = applicationDbContext;

                var data = await context.Pets.FindAsync(id);

                if (data == null)
                {
                    return NotFound(new { message = "not found" });
                }

                patchDoc.ApplyTo(data);

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                await context.SaveChangesAsync();

                return Ok(data);
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult<string>> DeletePet(int id)
        {
            await using var context = applicationDbContext;

            var data = await context.Pets.FindAsync(id);

            if (data == null)
            {
                return NotFound(new { message = "not found" });
            }

            context.Pets.Remove(data);

            await context.SaveChangesAsync();

            return Ok(new { message = "ok" });
        }

        [Authorize]
        [HttpGet("types")]
        public async Task<ActionResult<string>> GetPetTypes()
        {
            await using var context = applicationDbContext;

            var data = await context.PetTypes.Select(t => new PetType
            {
                Id = t.Id,
                Description = t.Description,
                Breed = new BreedDTO
                {
                    Id = t.Breed.Id,
                    Description = t.Breed.Description
                }
            }).OrderBy(p => p.Description).ToListAsync();


            return Ok(data);
        }
    }
}
