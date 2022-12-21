using Microsoft.EntityFrameworkCore;
using mToiletAPI.Models.Entities;

namespace mToiletAPI.Persistence
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<Device> Devices { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<QRCode> QRCodes { get; set; }
        public DbSet<Event> Events { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Device>()
                .ToTable("devices");
            modelBuilder.Entity<Device>()
                .Property(e => e.Id)
                .HasColumnName("id");
            modelBuilder.Entity<Device>()
                .Property(e => e.DeviceName)
                .HasColumnName("device_name");
            modelBuilder.Entity<Device>()
                .Property(e => e.Latitude)
                .HasColumnName("latitude");
            modelBuilder.Entity<Device>()
                .Property(e => e.Longitude)
                .HasColumnName("longitude");
            modelBuilder.Entity<Device>()
                .Property(e => e.LastSync)
                .HasColumnName("last_sync");

            modelBuilder.Entity<User>()
                .ToTable("users");
            modelBuilder.Entity<User>()
                .Property(e => e.Id)
                .HasColumnName("id");
            modelBuilder.Entity<User>()
                .Property(e => e.Username)
                .HasColumnName("username");
            modelBuilder.Entity<User>()
                .Property(e => e.Password)
                .HasColumnName("password");
            modelBuilder.Entity<User>()
                .Property(e => e.Gender)
                .HasColumnName("gender");

            modelBuilder.Entity<QRCode>()
                .ToTable("qrcodes");
            modelBuilder.Entity<QRCode>()
                .Property(e => e.Id)
                .HasColumnName("id");
                modelBuilder.Entity<QRCode>()
                .Property(e => e.Price)
                .HasColumnName("price");

            modelBuilder.Entity<Event>()
                .ToTable("events");
            modelBuilder.Entity<Event>()
                .Property(e => e.Id)
                .HasColumnName("id");
            modelBuilder.Entity<Event>()
                .Property(e => e.Date)
                .HasColumnName("date");
            modelBuilder.Entity<Event>()
                .Property(e => e.UserId)
                .HasColumnName("user_id");
            modelBuilder.Entity<Event>()
                .Property(e => e.DeviceId)
                .HasColumnName("device_id");
        }
    }
}