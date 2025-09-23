using API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Emit;

namespace API.Data
{
    public class ApplicationDbContext : IdentityDbContext<IdentityUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        public virtual DbSet<Appointment> Appointments { get; set; }

        public virtual DbSet<Owner> Owners { get; set; }
        
        public virtual DbSet<Telephone> Telephones { get; set; }

        public virtual DbSet<TelephoneType> TelephoneTypes { get; set; }

        public virtual DbSet<Pet> Pets { get; set; }

        public virtual DbSet<AppointmentStatsYearly> AppointmentStatsYearly { get; set; }

        public virtual DbSet<AppointmentStatsMonthly> AppointmentStatsMonthly { get; set; }

        public virtual DbSet<AppointmentStatsWeekly> AppointmentStatsWeekly { get; set; }

        public virtual DbSet<AppointmentType> AppointmentType { get; set; }

        public virtual DbSet<PetType> PetTypes { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Appointment>().ToTable("appointment");

            builder.Entity<AppointmentType>().ToTable("appointmentType");

            builder.Entity<Owner>().ToTable("owner");

            builder.Entity<Telephone>().ToTable("telephone");

            builder.Entity<TelephoneType>().ToTable("telephoneType");

            builder.Entity<Pet>().ToTable("pet");

            builder.Entity<PetType>().ToTable("petType");

            builder.Entity<BreedDTO>().ToTable("breed");

            builder.Entity<Appointment>().HasOne(a => a.Pet)
                .WithMany(p => p.Appointments).HasForeignKey(k => k.PetId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<AppointmentStatsMonthly>().HasNoKey();

            builder.Entity<AppointmentStatsWeekly>().HasNoKey();

            builder.Entity<AppointmentStatsYearly>().HasNoKey();
        }

        public override int SaveChanges()
        {
            var entries = ChangeTracker.Entries<BaseEntity>();

            foreach (var entry in entries)
            {
                if (entry.State == EntityState.Added)
                {
                    entry.Entity.CreatedAt = DateTime.UtcNow;
                    entry.Entity.CreatedAt = DateTime.UtcNow;
                }
                else if (entry.State == EntityState.Modified)
                {
                    entry.Entity.UpdatedAt = DateTime.UtcNow;
                }
            }

            return base.SaveChanges();
        }

        public override Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = default)
        {
            var entries = ChangeTracker.Entries<BaseEntity>();

            foreach (var entry in entries)
            {
                if (entry.State == EntityState.Added)
                {
                    entry.Entity.CreatedAt = DateTime.UtcNow;
                    entry.Entity.CreatedAt = DateTime.UtcNow;
                }
                else if (entry.State == EntityState.Modified)
                {
                    entry.Entity.UpdatedAt = DateTime.UtcNow;
                }
            }

            return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
        }
    }
}
