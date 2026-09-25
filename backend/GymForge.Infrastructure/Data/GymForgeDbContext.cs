using Microsoft.EntityFrameworkCore;
using GymForge.Domain.Entities;

namespace GymForge.Infrastructure.Data;

// El "puente" entre C# y PostgreSQL.
public class GymForgeDbContext : DbContext {
    public GymForgeDbContext(DbContextOptions<GymForgeDbContext> options) : base(options) { }

    // Este DbSet se convertirá en la tabla "Ejercicios"
    public DbSet<Ejercicio> Ejercicios { get; set; }
}