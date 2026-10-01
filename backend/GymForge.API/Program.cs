using DotNetEnv;
using GymForge.Infrastructure;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

// Lee el archivo .env (busca hacia carpetas superiores hasta encontrarlo)
Env.TraversePath().Load();

var connectionString = Environment.GetEnvironmentVariable("ConnectionStrings__PostgresConnection")
                       ?? throw new InvalidOperationException("Falta la cadena de conexión.");

builder.Services.AddInfrastructure(connectionString);
builder.Services.AddControllers();

// Genera la especificación OpenAPI (el "contrato" de la API en JSON)
builder.Services.AddOpenApi();

var app = builder.Build();

if (app.Environment.IsDevelopment()) {
    app.MapOpenApi();              // /openapi/v1.json
    app.MapScalarApiReference();   // /scalar/v1  (interfaz visual)
}

app.MapControllers();
app.Run();