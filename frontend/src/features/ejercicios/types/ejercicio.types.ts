// src/features/ejercicios/types/ejercicio.types.ts

// 1. Contrato de lectura (salida): espejo de EjercicioResponseDto en C#
export interface Ejercicio {
    id: number;
    nombre: string;
}

// 2. Contrato de escritura (entrada): espejo de CreateEjercicioRequestDto en C#
//    No lleva Id: lo genera PostgreSQL.
export interface CrearEjercicioDto {
    nombre: string;
}

// 3. Contrato de error: así serializa .NET cada ValidationFailure de FluentValidation
export interface FluentValidationError {
    propertyName: string;
    errorMessage: string;
    attemptedValue?: unknown;
    errorCode?: string;
}