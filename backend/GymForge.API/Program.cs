using DotNetEnv;
using GymForge.Application;
using GymForge.Infrastructure;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

// Lee el archivo .env (busca hacia carpetas superiores hasta encontrarlo)
Env.TraversePath().Load();

var connectionString = Environment.GetEnvironmentVariable("ConnectionStrings__PostgresConnection")
                       ?? throw new InvalidOperationException("Falta la cadena de conexión.");

// Clase 15: orígenes autorizados por CORS, leídos del .env (nunca quemados en el código)
var corsAllowedOrigins = Environment.GetEnvironmentVariable("CORS_ALLOWED_ORIGINS")
                         ?? throw new InvalidOperationException("Falta la variable CORS_ALLOWED_ORIGINS en el archivo .env.");

// Cada capa registra sus propias dependencias
builder.Services.AddApplication();
builder.Services.AddInfrastructure(connectionString);

// =========================================================================
// 1. POLÍTICA CORS: quién puede llamar a esta API desde un navegador
// =========================================================================
builder.Services.AddCors(options =>
{
    options.AddPolicy("PoliticaCorsGymForge", policy =>
    {
        // Separamos por coma por si hay varios orígenes (ej. localhost + https://*.unah.edu.hn)
        var origenes = corsAllowedOrigins.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);

        policy.WithOrigins(origenes)
              .SetIsOriginAllowedToAllowWildcardSubdomains() // Permite comodines como https://*.unah.edu.hn
              .AllowAnyHeader()                              // Encabezados JSON y futuros tokens JWT
              .AllowAnyMethod();                             // GET, POST, PUT, DELETE y el Preflight OPTIONS
    });
});

builder.Services.AddControllers();

// Clase 7: especificación OpenAPI
builder.Services.AddOpenApi();

var app = builder.Build();

if (app.Environment.IsDevelopment()) {
    app.MapOpenApi();              // /openapi/v1.json
    app.MapScalarApiReference();   // /scalar/v1
}

// =========================================================================
// 2. MIDDLEWARE CORS: siempre ANTES de MapControllers()
// =========================================================================
app.UseCors("PoliticaCorsGymForge");

app.MapControllers();
app.Run();