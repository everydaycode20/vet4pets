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
        public async Task<ActionResult<string>> GetAppointmentsByDate([FromQuery] string date)
        {
            await using var context = applicationDbContext;

            var parsedDate = DateTime.Parse(date);

            var data = context.Appointments.Where(a => a.Date.Year == parsedDate.Year && a.Date.Month == parsedDate.Month && a.Date.Day == parsedDate.Day).ToList();

            return Ok(data);
        }

        [HttpGet("date-range")]
        public async Task<ActionResult<string>> GetAppointmentsByDateRange([FromQuery] string start, [FromQuery] string end)
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

            return Ok(data);
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

        [HttpGet("dashboard")]
        public async Task<ActionResult<string>> GetTotalBy()
        {
            await using var context = applicationDbContext;

            var d = DateTime.Now;

            var startDate = new DateTime(d.Year, d.Month, 1);

            var endDate = startDate.AddMonths(1);

            var month = await context.Appointments.CountAsync(a => a.Date >= startDate && a.Date < endDate);

            var year = await context.Appointments.CountAsync(a => a.Date.Year == d.Year);

            var top = await context.Appointments.GroupBy(a => new { a.Type!.Name, a.Type.Id }).
                Select(a => new
                {
                    a.Key.Id,
                    a.Key.Name,
                    Total = a.Count()
                }).OrderBy(o => o.Total).ToListAsync();

            var dateToday = new DateTime(d.Year, d.Month, 26, 8, 0, 0);

            var dateTodayEnd = new DateTime(d.Year, d.Month, 26, 17, 30, 0);

            var appointments = await context.Appointments.
                Where(a => a.Date >= dateToday && a.Date <= dateToday.Add(dateTodayEnd - dateToday))
                .Select(a => new
                {
                    a.Id,
                    Type = new
                    {
                        a.Type!.Id,
                        a.Type!.Name
                    },
                    Owner = new
                    {
                        a.Owner!.Id,
                        a.Owner.Name
                    },
                    Pet = new
                    {
                        a.Pet!.Id,
                        a.Pet!.Name
                    },
                    a.Date
                })
                .ToListAsync();

            var statsWeekly = await context.AppointmentStatsWeekly.
                FromSqlRaw(@"select format([Date], 'dddd') as 'day', 
                    count(*) as total from appointment where YEAR([Date]) = 2025 and MONTH([Date]) = 8 
                    group by format([Date], 'dddd'), DATEPART(WEEKDAY, [Date]) order by DATEPART(WEEKDAY, [Date])").ToListAsync();

            var statsMonthly = await context.AppointmentStatsMonthly.
                FromSqlRaw(@"select format([Date], 'MMMM') as 'month', 
                    count(*) as total from appointment where YEAR([Date]) = 2025 
                    group by format([Date], 'MMMM'), MONTH([Date]) order by MONTH([Date])").ToListAsync();

            var statsYearly = await context.AppointmentStatsYearly.
                FromSqlRaw(@"select format([Date], 'yyyy') as 'year', 
                    count(*) as total from appointment 
                    group by format([Date], 'yyyy'), YEAR([Date]) order by YEAR([Date])").ToListAsync();

            return Ok(new
            {
                month,
                year,
                appointments,
                stats = new
                {
                    weekly = statsWeekly,
                    monthly = statsMonthly,
                    yearly = statsYearly,
                },
                top,
            });
        }
    }
}
