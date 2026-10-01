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
    private readonly IValidator<CreateEjercicioRequestDto> _validator;

    public EjerciciosController(IEjercicioRepository repository,
        IValidator<CreateEjercicioRequestDto> validator) {
        _repository = repository;
        _validator = validator;
    }

    // GET /api/ejercicios -> devuelve DTOs, no entidades
    [HttpGet]
    public async Task<IActionResult> GetEjercicios() {
        var ejercicios = await _repository.GetAllAsync();
        var response = ejercicios.Select(e => new EjercicioResponseDto {
            Id = e.Id,
            Nombre = e.Nombre
        });
        return Ok(response); // 200
    }

    // POST /api/ejercicios -> recibe un DTO, lo valida, lo convierte en entidad
    [HttpPost]
    public async Task<IActionResult> CrearEjercicio([FromBody] CreateEjercicioRequestDto request) {
        var validationResult = await _validator.ValidateAsync(request);
        if (!validationResult.IsValid) {
            return BadRequest(validationResult.Errors); // 400 con la lista de errores
        }

        // Mapeo manual: DTO -> Entidad
        var nuevoEjercicio = new Ejercicio {
            Nombre = request.Nombre
        };

        var creado = await _repository.AddAsync(nuevoEjercicio);

        // Mapeo manual: Entidad -> DTO
        var response = new EjercicioResponseDto {
            Id = creado.Id,
            Nombre = creado.Nombre
        };

        return CreatedAtAction(nameof(GetEjercicios), new { id = response.Id }, response); // 201
    }
}