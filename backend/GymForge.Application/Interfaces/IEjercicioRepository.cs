using GymForge.Domain.Entities;

namespace GymForge.Application.Interfaces;

// El CONTRATO: dice QUÉ se necesita, no CÓMO se obtiene.
public interface IEjercicioRepository {
    Task<IEnumerable<Ejercicio>> GetAllAsync();
    Task<Ejercicio> AddAsync(Ejercicio ejercicio); // Nuevo: contrato para el POST
}