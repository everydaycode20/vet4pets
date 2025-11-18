using API.Data;
using API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        private readonly ApplicationDbContext applicationDbContext;

        public UserController(ApplicationDbContext applicationDbContext)
        {
            this.applicationDbContext = applicationDbContext;
        }


        [Authorize]
        [HttpGet]
        public async Task<ActionResult<string>> GetUser()
        {
            await using var context = applicationDbContext;

            var data = await context.Settings.Where(s => s.Id == 2).Select(s => new Settings
            {
                Id = s.Id,
                TimeFormat = s.TimeFormat,
                DateFormat = s.DateFormat,
                Language = new Language
                {
                    Id = s.Language!.Id,
                    Name = s.Language.Name,
                    ISOCode = s.Language.ISOCode
                },
                Appearance = new Appearance
                {
                    Id = s.Appearance!.Id,
                    Name = s.Appearance.Name
                },
                WorkingHoursStart = s.WorkingHoursStart,
                WorkingHoursEnd = s.WorkingHoursEnd,
                AppointmentLength = s.AppointmentLength
            }).ToListAsync();

            return Ok(new
            {
                User.Identity!.Name,
                Claims = User.Claims.Select(c => new { c.Type, c.Value }),
                settings = data[0]
            });
        }
    }
}
