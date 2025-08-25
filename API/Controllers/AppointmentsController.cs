using API.Data;
using API.Models;
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

        [HttpGet]
        public async Task<ActionResult<string>> GetAppointmentsByDate([FromQuery]string date)
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

        [HttpGet("owner/{id}")]
        public async Task<ActionResult<string>> GetAppointmentsByOwner(int id)
        {
            await using var context = applicationDbContext;

            var data = await context.Appointments.Where(a => a.OwnerId == id).ToListAsync();

            return Ok(context.Appointments);
        }

        [HttpGet("pet/{id}")]
        public async Task<ActionResult<string>> GetAppointmentsByPet(int id)
        {
            await using var context = applicationDbContext;

            var data = await context.Appointments.Where(a => a.PetId == id).ToListAsync();

            return Ok(data);
        }

        [HttpPost]
        public async Task<ActionResult<string>> AddAppointment([FromBody] Appointment appointment)
        {
            await using var context = applicationDbContext;

            var app = new Appointment
            {
                Date = appointment.Date,
                OwnerId = appointment.OwnerId,
                PetId = appointment.PetId,
                TypeId = appointment.TypeId
            };

            await context.Appointments.AddAsync(app);

            await context.SaveChangesAsync();

            return Ok(new { message = "ok" });
        }

        public class EditAppointmentReq
        {
            public DateTime Date { get; set; }

            public int TypeId { get; set; }

            public int OwnerId { get; set; }

            public int PetId { get; set; }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<string>> UpdateAppointment(int id, [FromBody] EditAppointmentReq editAppointmentReq)
        {
            await using var context = applicationDbContext;

            var data = await context.Appointments.FindAsync(id);

            if (data == null)
            {
                return NotFound(new { message = "not found" });
            }

            data.Date = editAppointmentReq.Date;

            data.TypeId = editAppointmentReq.TypeId;

            data.OwnerId = editAppointmentReq.OwnerId;

            data.PetId = editAppointmentReq.PetId;

            await context.SaveChangesAsync();

            return Ok(data);
        }

        public enum TypeValues
        {
            owner,
            pet,
            appointment
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<string>> DeleteAppointmentBy(TypeValues idType, int id)
        {
            await using var context = applicationDbContext;

            var query = context.Appointments.AsQueryable();

            Appointment? res = null;

            if (idType == TypeValues.appointment)
            {
                res = await context.Appointments.FindAsync(id);
            }

            else if (idType == TypeValues.owner)
            {
                res = await context.Appointments.FirstOrDefaultAsync(o => o.OwnerId == id);
            }

            if (idType == TypeValues.pet)
            {
                res = await context.Appointments.FirstOrDefaultAsync(o => o.PetId == id);
            }

            if (res == null)
            {
                return NotFound(new { message = "not found" });
            }

            context.Appointments.Remove(res);

            context.SaveChanges();

            return Ok(new { message = "ok" });
        }

        [HttpGet("search")]
        public async Task<ActionResult<string>> SearchBy([FromQuery] DateTime? date, [FromQuery] int? ownerId, [FromQuery] int? petId, [FromQuery] int? typeId, int pageNumber = 1, int pageSize = 20)
        {
            await using var context = applicationDbContext;

            var query = context.Appointments.AsQueryable();

            if (date.HasValue)
            {
                query = query.Where(d => d.Date == date.Value.Date);
            }

            if (ownerId.HasValue)
            {
                query = query.Where(o => o.OwnerId == ownerId);
            }

            if (petId.HasValue)
            {
                query = query.Where(p => p.PetId == petId);
            }

            if (typeId.HasValue)
            {
                query = query.Where(t => t.TypeId == typeId);
            }

            var total = await query.CountAsync();

            var resuts = await query.OrderBy(d => d.Date).Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();

            return Ok(new
            {
                total,
                data = resuts,
                pageNumber
            });
        }
    }
}
