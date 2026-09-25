using GymForge.Domain.Entities;
namespace GymForge.Application.Interfaces;

public interface IEjercicioRepository {
    Task<IEnumerable<Ejercicio>> GetAllAsync();
}

