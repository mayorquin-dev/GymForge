namespace GymForge.Application.Features.Ejercicios.DTOs;

// Lo que la API ACEPTA al actualizar. El Id viene en la URL, no en el cuerpo.
public class UpdateEjercicioRequestDto {
    public string Nombre { get; set; } = string.Empty;
}