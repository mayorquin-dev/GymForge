using Microsoft.EntityFrameworkCore;
using GymForge.Application.Interfaces;
using GymForge.Domain.Entities;
using GymForge.Infrastructure.Data;

namespace GymForge.Infrastructure.Repositories;

// La IMPLEMENTACIÓN: cumple el contrato usando Entity Framework.
public class EjercicioRepository : IEjercicioRepository {
    private readonly GymForgeDbContext _context;

    // Recibe el DbContext por el constructor (también es inyección de dependencias)
    public EjercicioRepository(GymForgeDbContext context) {
        _context = context;
    }

    public async Task<IEnumerable<Ejercicio>> GetAllAsync() {
        return await _context.Ejercicios.ToListAsync(); // = SELECT * FROM "Ejercicios"
    }
}