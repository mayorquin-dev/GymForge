using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using GymForge.Application.Interfaces;
using GymForge.Application.Features.Ejercicios.DTOs;
using GymForge.Domain.Entities;

namespace GymForge.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EjerciciosController : ControllerBase {
    private readonly IEjercicioRepository _repository;
    private readonly IValidator<CreateEjercicioRequestDto> _createValidator;
    private readonly IValidator<UpdateEjercicioRequestDto> _updateValidator;

    public EjerciciosController(
        IEjercicioRepository repository,
        IValidator<CreateEjercicioRequestDto> createValidator,
        IValidator<UpdateEjercicioRequestDto> updateValidator) {
        _repository = repository;
        _createValidator = createValidator;
        _updateValidator = updateValidator;
    }

    // GET /api/ejercicios -> lista completa (200)
    [HttpGet]
    public async Task<IActionResult> GetEjercicios() {
        var ejercicios = await _repository.GetAllAsync();
        var response = ejercicios.Select(e => new EjercicioResponseDto {
            Id = e.Id,
            Nombre = e.Nombre
        });
        return Ok(response);
    }

    // GET /api/ejercicios/5 -> un ejercicio (200) o 404 si no existe
    [HttpGet("{id}")]
    public async Task<IActionResult> GetEjercicioById(int id) {
        var ejercicio = await _repository.GetByIdAsync(id);
        if (ejercicio is null) {
            return NotFound($"No existe un ejercicio con Id {id}."); // 404
        }

        return Ok(new EjercicioResponseDto { Id = ejercicio.Id, Nombre = ejercicio.Nombre }); // 200
    }

    // POST /api/ejercicios -> crea (201) o 400 si no pasa la validación
    [HttpPost]
    public async Task<IActionResult> CrearEjercicio([FromBody] CreateEjercicioRequestDto request) {
        var validationResult = await _createValidator.ValidateAsync(request);
        if (!validationResult.IsValid) {
            return BadRequest(validationResult.Errors); // 400
        }

        var creado = await _repository.AddAsync(new Ejercicio { Nombre = request.Nombre });

        var response = new EjercicioResponseDto { Id = creado.Id, Nombre = creado.Nombre };

        // 201 + header Location apuntando a GET /api/ejercicios/{id}
        return CreatedAtAction(nameof(GetEjercicioById), new { id = response.Id }, response);
    }

    // PUT /api/ejercicios/5 -> actualiza (204), 400 si no valida, 404 si no existe
    [HttpPut("{id}")]
    public async Task<IActionResult> ActualizarEjercicio(int id, [FromBody] UpdateEjercicioRequestDto request) {
        var validationResult = await _updateValidator.ValidateAsync(request);
        if (!validationResult.IsValid) {
            return BadRequest(validationResult.Errors); // 400
        }

        var ejercicio = await _repository.GetByIdAsync(id);
        if (ejercicio is null) {
            return NotFound($"No existe un ejercicio con Id {id}."); // 404
        }

        ejercicio.Nombre = request.Nombre; // Mapeo manual: DTO -> Entidad existente
        await _repository.UpdateAsync(ejercicio);

        return NoContent(); // 204
    }

    // DELETE /api/ejercicios/5 -> elimina (204) o 404 si no existe
    [HttpDelete("{id}")]
    public async Task<IActionResult> EliminarEjercicio(int id) {
        var ejercicio = await _repository.GetByIdAsync(id);
        if (ejercicio is null) {
            return NotFound($"No existe un ejercicio con Id {id}."); // 404
        }

        await _repository.DeleteAsync(ejercicio);
        return NoContent(); // 204
    }
}