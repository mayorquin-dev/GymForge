using FluentValidation;
using GymForge.Application.Features.Ejercicios.DTOs;

namespace GymForge.Application.Features.Ejercicios.Validators;

// Validador exclusivo para la actualización (PUT).
public class UpdateEjercicioValidator : AbstractValidator<UpdateEjercicioRequestDto> {
    public UpdateEjercicioValidator() {
        RuleFor(x => x.Nombre)
            .NotEmpty().WithMessage("El nombre del ejercicio no puede estar vacío.")
            .MinimumLength(3).WithMessage("El ejercicio debe tener al menos 3 caracteres.")
            .MaximumLength(100).WithMessage("El nombre del ejercicio es demasiado largo.");
    }
}