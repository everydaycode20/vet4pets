using API.Data;
using API.Logger;
using API.Middleware;
using API.Jobs;
using API.Signalr;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Quartz;
using API.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSignalR();

builder.Logging.ClearProviders();
builder.Logging.AddConsoleLogger(config =>
{
    config.LogLevelToColorMap[LogLevel.Warning] = ConsoleColor.DarkCyan;
    config.LogLevelToColorMap[LogLevel.Error] = ConsoleColor.DarkRed;
});

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddAuthorization();

builder.Services.AddAntiforgery(options =>
{
    options.Cookie.Name = "XSRF-TOKEN";
    options.HeaderName = "X-XSRF-TOKEN";
    options.Cookie.HttpOnly = false;
    options.Cookie.SameSite = SameSiteMode.Strict;
    options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
});

builder.Services.ConfigureApplicationCookie(options =>
{
    options.Cookie.HttpOnly = true;
    options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
    options.Cookie.SameSite = SameSiteMode.None;
});

//var connectionString = "Server=localhost;Database=vet4pets;User Id=sa;TrustServerCertificate=True;";

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:5173").AllowAnyHeader().AllowAnyMethod().AllowCredentials();
    });
});

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlServer(connectionString).EnableSensitiveDataLogging().LogTo(Console.WriteLine, LogLevel.Information);
});

builder.Services.AddQuartz(q =>
{
    q.SchedulerId = "Scheduler-Core";
    q.InterruptJobsOnShutdown = true;
    q.InterruptJobsOnShutdownWithWait = true;
    q.MaxBatchSize = 5;
    q.UseDefaultThreadPool(tp =>
    {
        tp.MaxConcurrency = 10;
    });

    var jobKey = new JobKey("daily-event-remainder");

    q.AddJob<DailyJob>(o => o.WithIdentity(jobKey));

    q.AddTrigger(o => o
        .ForJob(jobKey)
        .WithIdentity("every-day", "remainder")
        .WithSchedule(CronScheduleBuilder.DailyAtHourAndMinute(8, 00))
    );
});

builder.Services.AddQuartzHostedService(o =>
{
    o.WaitForJobsToComplete = true;
});

builder.Services.AddScoped<AppointmentScheduler>();

builder.Services.AddControllers().AddNewtonsoftJson();

builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlServer(connectionString);
});

builder.Services.AddIdentityApiEndpoints<IdentityUser>().AddEntityFrameworkStores<ApplicationDbContext>();

var app = builder.Build();

app.UseCors();

app.MapIdentityApi<IdentityUser>();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapHub<EventHub>("/events");

app.UseMiddleware<AntiforgeryMiddleware>();

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
