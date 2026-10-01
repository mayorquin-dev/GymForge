namespace GymForge.Application.Features.Ejercicios.DTOs;

// Lo que la API DEVUELVE al cliente.
public class EjercicioResponseDto {
    public int Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
}