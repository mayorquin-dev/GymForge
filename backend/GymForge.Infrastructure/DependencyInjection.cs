using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using GymForge.Application.Interfaces;
using GymForge.Infrastructure.Data;
using GymForge.Infrastructure.Repositories;

namespace GymForge.Infrastructure;

// Infrastructure registra SUS propias piezas (DbContext y repositorios).
// Así Program.cs no necesita conocer los detalles de la base de datos.
public static class DependencyInjection {
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, string connectionString) {

        services.AddDbContext<GymForgeDbContext>(options =>
            options.UseNpgsql(connectionString));

        services.AddScoped<IEjercicioRepository, EjercicioRepository>();

        return services;
    }
}