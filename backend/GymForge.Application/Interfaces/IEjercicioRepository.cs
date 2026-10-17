using GymForge.Domain.Entities;

namespace GymForge.Application.Interfaces;

// El CONTRATO: dice QUÉ se necesita, no CÓMO se obtiene.
public interface IEjercicioRepository {
    Task<IEnumerable<Ejercicio>> GetAllAsync();
    Task<Ejercicio?> GetByIdAsync(int id);          // Clase 9: null si no existe
    Task<Ejercicio> AddAsync(Ejercicio ejercicio);
    Task UpdateAsync(Ejercicio ejercicio);          // Clase 9
    Task DeleteAsync(Ejercicio ejercicio);          // Clase 9
}