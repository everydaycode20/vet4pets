using API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TelephoneController : ControllerBase
    {
        private readonly ApplicationDbContext applicationDbContext;

        public TelephoneController(ApplicationDbContext applicationDbContext)
        {
            this.applicationDbContext = applicationDbContext;
        }

        //[Authorize]
        [HttpGet("types")]
        public async Task<ActionResult<string>> GetTelephoneTypes()
        {
            await using var context = applicationDbContext;

            var data = await context.TelephoneTypes.ToListAsync();

            return Ok(data);
        }
    }
}
