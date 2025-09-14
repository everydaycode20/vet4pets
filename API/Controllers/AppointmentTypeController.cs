using API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentTypeController : ControllerBase
    {
        private readonly ApplicationDbContext applicationDbContext;

        public AppointmentTypeController(ApplicationDbContext applicationDbContext)
        {
            this.applicationDbContext = applicationDbContext;
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<string>> GetAllAppointmentTypes()
        {
            await using var context = applicationDbContext;

            var data = await context.AppointmentType.ToListAsync();

            return Ok(data);
        }
    }
}
