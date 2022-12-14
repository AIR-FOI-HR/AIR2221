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
    }
}