namespace GymForge.Domain.Entities;

// Entidad pura del negocio: un ejercicio del catálogo (Ej. "Sentadillas").
// No tiene ningún using de Entity Framework: Domain no conoce la base de datos.
public class Ejercicio {
    public int Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
}