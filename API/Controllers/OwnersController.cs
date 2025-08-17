using API.Data;
using API.Models;
using Azure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics.CodeAnalysis;

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

            var data = await context.Owners.FindAsync(id);

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

            var data = await context.Owners.OrderBy(o => o.Name).Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();

            return Ok(new
            {
                data,
                pageNumber
            });
        }

        [HttpPost]
        public async Task<ActionResult<string>> AddOwner(Owner owner)
        {
            await using var context = applicationDbContext;

            context.Owners.Add(owner);

            return Ok(new { message = "ok" });
        }

        public class EditOwnerReq
        {
            [AllowNull]
            public string? Name { get; set; }

            [AllowNull]
            public string? Email { get; set; }

            [AllowNull]
            public string? Address { get; set; }

            [AllowNull]
            public Telephone? Telephone { get; set; }
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
    }
}
