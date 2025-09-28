using API.Data;
using API.Models;
using Azure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SettingsController : ControllerBase
    {
        private readonly ApplicationDbContext applicationDbContext;

        public SettingsController(ApplicationDbContext applicationDbContext)
        {
            this.applicationDbContext = applicationDbContext;
        }

        [HttpGet]
        public async Task<ActionResult<string>> GetSettings([FromQuery] int id)
        {
            await using var context = applicationDbContext;

            var data = await context.Settings.Where(s => s.Id == id).Select(s => new Settings
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
                }
            }).ToListAsync();

            if (data == null)
            {
                return NotFound(new { message = "not found" });
            }

            return Ok(data);
        }

        [HttpPatch("{id}")]
        public async Task<ActionResult<string>> UpdateSettings(int id, [FromBody] JsonPatchDocument<Settings> patchDoc)
        {
            if (patchDoc != null)
            {
                await using var context = applicationDbContext;

                var data = await context.Settings.FindAsync(id);

                if (data == null)
                {
                    return NotFound(new { message = "not found" });
                }

                patchDoc.ApplyTo(data);

                await context.SaveChangesAsync();

                return Ok(data);
            }
            else
            {
                return BadRequest(ModelState);
            }
        }
    }
}
