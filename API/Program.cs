using API.Data;
using API.Logger;
using API.Middleware;
using API.Jobs;
using API.Signalr;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Quartz;
using API.Models;
using System.Text.Json;
using System.Threading.RateLimiting;

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

builder.Services.AddRateLimiter(options =>
options.GlobalLimiter = PartitionedRateLimiter.Create<HttpContext, string>(httpcontext =>
RateLimitPartition.GetFixedWindowLimiter(
    partitionKey: httpcontext.User.Identity?.Name ?? httpcontext.Request.Headers.Host.ToString(),
    factory: partition => new FixedWindowRateLimiterOptions
    {
        AutoReplenishment = true,
        PermitLimit = 10,
        QueueLimit = 0,
        Window = TimeSpan.FromMinutes(1)
    })));

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

var corsOrigins = builder.Configuration.GetSection("Cors:Origins").Get<string[]>();

var corsMethods = builder.Configuration.GetSection("Cors:Methods").Get<string[]>();

var corsHeaders = builder.Configuration.GetSection("Cors:Headers").Get<string[]>();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins(corsOrigins!).AllowCredentials();

        if (corsMethods != null)
        {
            policy.WithMethods(corsMethods);
        }
        else
        {
            policy.AllowAnyMethod();
        }

        if (corsHeaders != null)
        {
            policy.WithHeaders(corsHeaders);
        }
        else
        {
            policy.AllowAnyHeader();
        }
    });
});

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlServer(connectionString);

    if (builder.Environment.IsDevelopment())
    {
        options.UseSqlServer(connectionString).EnableSensitiveDataLogging().LogTo(Console.WriteLine, LogLevel.Information);

        options.EnableSensitiveDataLogging().LogTo(Console.WriteLine, LogLevel.Information);
    }
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
        .WithSchedule(CronScheduleBuilder.DailyAtHourAndMinute(9, 0))
    );
});

builder.Services.AddQuartzHostedService(o =>
{
    o.WaitForJobsToComplete = true;
});

builder.Services.AddScoped<AppointmentScheduler>();

builder.Services.AddControllers().AddNewtonsoftJson(options =>
{
    options.SerializerSettings.ContractResolver = new Newtonsoft.Json.Serialization.CamelCasePropertyNamesContractResolver();
});

builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
});

builder.Services.AddIdentityApiEndpoints<IdentityUser>(options =>
{
    options.Password.RequiredLength = 8;
    options.Password.RequireDigit = true;
    options.Password.RequireLowercase = true;
    options.Password.RequireUppercase = true;
    options.Password.RequireNonAlphanumeric = true;

    options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(15);
    options.Lockout.MaxFailedAccessAttempts = 5;
    options.Lockout.AllowedForNewUsers = true;
}).AddEntityFrameworkStores<ApplicationDbContext>();

var app = builder.Build();

app.UseExceptionHandler(errorApp =>
{
    errorApp.Run(async context =>
    {
        context.Response.StatusCode = 500;
        context.Response.ContentType = "application/json";
        await context.Response.WriteAsync(
            JsonSerializer.Serialize(new { message = "an unexpected error occurred." })
        );
    });
});

app.MapIdentityApi<IdentityUser>();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapHub<EventHub>("/events");

app.UseRateLimiter();

app.UseMiddleware<AntiforgeryMiddleware>();

app.UseHttpsRedirection();

app.UseCors();

app.UseAuthentication();
app.UseAuthorization();

app.UseHsts();

app.MapControllers();

app.Run();
