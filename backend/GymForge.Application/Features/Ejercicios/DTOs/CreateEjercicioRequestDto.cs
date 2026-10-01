namespace GymForge.Application.Features.Ejercicios.DTOs;

// Lo que la API ACEPTA al crear. No trae Id: lo asigna la base de datos.
public class CreateEjercicioRequestDto {
    public string Nombre { get; set; } = string.Empty;
}