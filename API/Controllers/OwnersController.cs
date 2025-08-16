using API.Data;
using Microsoft.AspNetCore.Http;
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
    }
}
