using API.Data;
using API.Models;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OwnersController : ControllerBase
    {
        private readonly ApplicationDbContext applicationDbContext;

        public OwnersController(ApplicationDbContext applicationDbContext)
        {
            this.applicationDbContext = applicationDbContext;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<string>> GetOwnerById(int id)
        {
            await using var context = applicationDbContext;

            var data = await context.Owners.Where(o => o.Id == id).
                Select(o => new OwnerDTO
                {
                    Id = o.Id,
                    Name = o.Name,
                    email = o.email,
                    Address = o.Address,
                    Telephones = o.Telephones.Select(t => new TelephoneDTO
                    {
                        Id = t.Id,
                        Number = t.Number,
                        TelephoneType = t.TelephoneType,
                    }).ToList()

                }).ToListAsync();

            if (data == null)
            {
                return NotFound(new { message = "not found" });
            }

            return Ok(data);
        }

        [HttpGet]
        public async Task<ActionResult<string>> GetAllOwners([FromQuery] int pageNumber = 1, int pageSize = 20)
        {
            await using var context = applicationDbContext;

            var query = from o in context.Owners
                        join t in context.Telephones on o.Id equals t.OwnerId into tg
                        from t in tg.DefaultIfEmpty()
                        join tT in context.TelephoneTypes on t.TelephoneTypeId equals tT.Id into ttg
                        from tT in ttg.DefaultIfEmpty()
                        select new
                        {
                            id = o.Id,
                            name = o.Name,
                            o.email,
                            address = o.Address,
                            telephoneId = t.Id,
                            telephoneNumber = t.Number,
                            telephoneTypeId = t.TelephoneType.Id,
                            telephoneType = t.TelephoneType.Type,
                            CreatedAt = o.CreatedAt ?? new DateTime()
                        };

            var result = await query.ToListAsync();

            var data = result.
                GroupBy(x => new { Id = x.id, Name = x.name, x.email, x.address, x.CreatedAt }).
                Select(o => new OwnerDTO
                {
                    Id = o.Key.Id,
                    Name = o.Key.Name,
                    email = o.Key.email,
                    Address = o.Key.address,
                    Telephones = o.GroupBy(x => x.telephoneId).Select(t => new TelephoneDTO
                    {
                        Id = t.Key,
                        Number = t.First().telephoneNumber,
                        TelephoneType = new TelephoneType { Id = t.First().telephoneTypeId, Type = t.First().telephoneType },
                    }),
                    CreatedAt = o.Key.CreatedAt
                }).Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();

            var total = await context.Owners.CountAsync();

            return Ok(new
            {
                data,
                pageNumber,
                total
            });
        }

        [HttpPost]
        public async Task<ActionResult<string>> AddOwner([FromBody] Owner owner)
        {
            await using var context = applicationDbContext;

            context.Owners.Add(owner);

            await context.SaveChangesAsync();

            return Ok(new { message = "ok" });
        }

        [HttpPatch("{id}")]
        public async Task<ActionResult<string>> UpdateOwner(int id, [FromBody] JsonPatchDocument<Owner> patchDoc)
        {
            if (patchDoc != null)
            {
                await using var context = applicationDbContext;

                var data = await context.Owners.FindAsync(id);

                if (data == null)
                {
                    return NotFound(new { message = "not found" });
                }

                patchDoc.ApplyTo(data);

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                return Ok(data);

            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<string>> DeleteOwner(int id)
        {
            await using var context = applicationDbContext;

            var data = await context.Owners.FindAsync(id);

            if (data == null)
            {
                return NotFound(new { message = "not found" });
            }

            context.Owners.Remove(data);

            await context.SaveChangesAsync();

            return Ok(new { message = "ok" });
        }

        //[HttpGet("search")]
        //public async Task<ActionResult<string>> Search([FromQuery] string search)
        //{
        //    await using var context = applicationDbContext;


        //}
    }
}
