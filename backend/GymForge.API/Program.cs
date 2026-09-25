using Microsoft.EntityFrameworkCore;
using GymForge.Infrastructure.Data;
using GymForge.Application.Interfaces;
using GymForge.Infrastructure.Repositories;

var builder = WebApplication.CreateBuilder(args);

// A. Conexión a PostgreSQL (lee "PostgresConnection" de la configuración)
builder.Services.AddDbContext<GymForgeDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("PostgresConnection")));

// B. Inversión de Dependencias:
// "Cuando alguien pida IEjercicioRepository, entrégale un EjercicioRepository"
builder.Services.AddScoped<IEjercicioRepository, EjercicioRepository>();

builder.Services.AddControllers();

var app = builder.Build();
app.MapControllers();
app.Run();