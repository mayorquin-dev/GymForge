// src/features/ejercicios/schemas/ejercicio.schema.ts
import { z } from 'zod'

// Espejo de CreateEjercicioValidator (FluentValidation en .NET)
export const crearEjercicioSchema = z.object({
    nombre: z
        .string()
        .trim() // quita espacios al inicio y al final
        .min(1, 'El nombre del ejercicio no puede estar vacío.')      // = NotEmpty()
        .min(3, 'El ejercicio debe tener al menos 3 caracteres.')      // = MinimumLength(3)
        .max(100, 'El nombre del ejercicio es demasiado largo.')       // = MaximumLength(100)
        .regex(
            /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ0-9\s.,()-]+$/,
            'El ejercicio contiene caracteres especiales no permitidos.'
        ),
})

export type CrearEjercicioSchemaType = z.infer<typeof crearEjercicioSchema>