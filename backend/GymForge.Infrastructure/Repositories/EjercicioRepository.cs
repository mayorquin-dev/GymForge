using Microsoft.EntityFrameworkCore;
using GymForge.Application.Interfaces;
using GymForge.Domain.Entities;
using GymForge.Infrastructure.Data;

namespace GymForge.Infrastructure.Repositories;

// La IMPLEMENTACIÓN: cumple el contrato usando Entity Framework.
public class EjercicioRepository : IEjercicioRepository {
    private readonly GymForgeDbContext _context;

    public EjercicioRepository(GymForgeDbContext context) {
        _context = context;
    }

    public async Task<IEnumerable<Ejercicio>> GetAllAsync() {
        return await _context.Ejercicios.ToListAsync(); // SELECT * FROM "Ejercicios"
    }

    public async Task<Ejercicio?> GetByIdAsync(int id) {
        // FindAsync busca por la llave primaria. Devuelve null si no existe.
        return await _context.Ejercicios.FindAsync(id);
    }

    public async Task<Ejercicio> AddAsync(Ejercicio ejercicio) {
        await _context.Ejercicios.AddAsync(ejercicio);
        await _context.SaveChangesAsync(); // INSERT (COMMIT)
        return ejercicio;
    }

    public async Task UpdateAsync(Ejercicio ejercicio) {
        _context.Ejercicios.Update(ejercicio);
        await _context.SaveChangesAsync(); // UPDATE (COMMIT)
    }

    public async Task DeleteAsync(Ejercicio ejercicio) {
        _context.Ejercicios.Remove(ejercicio);
        await _context.SaveChangesAsync(); // DELETE (COMMIT)
    }
}