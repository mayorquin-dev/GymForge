using Microsoft.AspNetCore.Mvc;
using GymForge.Application.Interfaces;
using GymForge.Domain.Entities;

namespace GymForge.API.Controllers;

// El "recepcionista" de la API: recibe la petición, delega al repositorio
// y responde con un código de estado. NO tiene reglas de negocio ni SQL.
[ApiController]
[Route("api/[controller]")] // [controller] = "Ejercicios" -> /api/ejercicios
public class EjerciciosController : ControllerBase {
    private readonly IEjercicioRepository _repository;

    // Inyección de Dependencias: pide la interfaz y .NET le entrega la implementación
    public EjerciciosController(IEjercicioRepository repository) {
        _repository = repository;
    }

    // GET /api/ejercicios -> "Dame la lista"
    [HttpGet]
    public async Task<IActionResult> GetEjercicios() {
        var ejercicios = await _repository.GetAllAsync();
        return Ok(ejercicios); // 200 OK
    }

    // POST /api/ejercicios -> "Creá uno nuevo"
    [HttpPost]
    public async Task<IActionResult> CrearEjercicio([FromBody] Ejercicio ejercicio) {
        if (string.IsNullOrWhiteSpace(ejercicio.Nombre)) {
            return BadRequest("El nombre del ejercicio es obligatorio."); // 400
        }

        var nuevo = await _repository.AddAsync(ejercicio);
        return CreatedAtAction(nameof(GetEjercicios), new { id = nuevo.Id }, nuevo); // 201
    }
}