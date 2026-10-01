using FluentValidation;
using GymForge.Application.Features.Ejercicios.DTOs;

namespace GymForge.Application.Features.Ejercicios.Validators;

// Las reglas de validación viven aquí, no en el controlador.
public class CreateEjercicioValidator : AbstractValidator<CreateEjercicioRequestDto> {
    public CreateEjercicioValidator() {
        RuleFor(x => x.Nombre)
            .NotEmpty().WithMessage("El nombre del ejercicio no puede estar vacío.")
            .MinimumLength(3).WithMessage("El ejercicio debe tener al menos 3 caracteres.")
            .MaximumLength(100).WithMessage("El nombre del ejercicio es demasiado largo.");
    }
}