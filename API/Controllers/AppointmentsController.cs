using API.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentsController : ControllerBase
    {
        private readonly ApplicationDbContext applicationDbContext;

        public AppointmentsController(ApplicationDbContext applicationDbContext)
        {
            this.applicationDbContext = applicationDbContext;
        }

        [HttpGet("{date}")]
        public async Task<ActionResult<string>> GetAppointmentsByDate(string date)
        {
            await using var context = applicationDbContext;

            var parsedDate = DateTime.Parse(date);

            var data = context.Appointments.Where(a => a.Date.Year == parsedDate.Year && a.Date.Month == parsedDate.Month && a.Date.Day == parsedDate.Day).ToList();

            return Ok(data);
        }

        [HttpGet("{start}-{end}")]
        public async Task<ActionResult<string>> GetAppointmentsByDateRange(string start, string end)
        {
            await using var context = applicationDbContext;

            var parseDateStart = DateTime.Parse(start);

            var parseDateEnd = DateTime.Parse(end);

            var data = context.Appointments.Where(a => a.Date >= parseDateStart && a.Date <= parseDateEnd).ToList();

            return Ok(data);
        }
        

        // POST api/<AppointmentsController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<AppointmentsController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<AppointmentsController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
