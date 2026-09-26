using Microsoft.EntityFrameworkCore;
using GymForge.Application.Interfaces;
using GymForge.Domain.Entities;
using GymForge.Infrastructure.Data;

namespace GymForge.Infrastructure.Repositories;

// La IMPLEMENTACIÓN: cumple el contrato usando Entity Framework.
public class EjercicioRepository : IEjercicioRepository {       // ← abre la clase
    private readonly GymForgeDbContext _context;

    public EjercicioRepository(GymForgeDbContext context) {
        _context = context;
    }

    public async Task<IEnumerable<Ejercicio>> GetAllAsync() {
        return await _context.Ejercicios.ToListAsync(); // = SELECT * FROM "Ejercicios"
    }

    public async Task<Ejercicio> AddAsync(Ejercicio ejercicio) {
        await _context.Ejercicios.AddAsync(ejercicio);

        // SaveChangesAsync ejecuta el INSERT dentro de una transacción (COMMIT)
        await _context.SaveChangesAsync();

        return ejercicio; // ya viene con el Id que le asignó PostgreSQL
    }
}                                                                  // ← cierra la clase (¡la última línea!)