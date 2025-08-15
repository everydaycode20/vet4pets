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

        public virtual DbSet<Pet> Pets { get; set; }

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

            builder.Entity<Breed>().ToTable("breed");

            builder.Entity<Appointment>().HasOne(a => a.Pet)
                .WithMany(p => p.Appointments).HasForeignKey(k => k.Id)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
