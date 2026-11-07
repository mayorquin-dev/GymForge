// src/features/ejercicios/api/ejerciciosApi.ts
import axios from 'axios'
import type { Ejercicio, CrearEjercicioDto, FluentValidationError } from '../types/ejercicio.types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

if (!API_BASE_URL) {
    console.error('🚨 No se encontró VITE_API_BASE_URL en frontend/.env')
}

// Instancia central de Axios (en la Unidad 3 aquí se agregará el token JWT)
export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

// 1. GET /api/ejercicios -> catálogo completo desde PostgreSQL
export const obtenerEjerciciosAsync = async (): Promise<Ejercicio[]> => {
    const respuesta = await apiClient.get<Ejercicio[]>('/ejercicios')

    if (!Array.isArray(respuesta.data)) {
        throw new Error('La respuesta recibida no es un arreglo JSON válido.')
    }

    return respuesta.data
}

// 2. POST /api/ejercicios -> crea un ejercicio y devuelve el registro con su Id (201)
export const crearEjercicioAsync = async (nuevoEjercicio: CrearEjercicioDto): Promise<Ejercicio> => {
    const respuesta = await apiClient.post<Ejercicio>('/ejercicios', nuevoEjercicio)
    return respuesta.data
}

// 3. DELETE /api/ejercicios/{id} -> elimina un ejercicio (204 No Content)
export const eliminarEjercicioAsync = async (id: number): Promise<void> => {
    await apiClient.delete(`/ejercicios/${id}`)
}

// 4. Extractor de errores: convierte cualquier rechazo de .NET en un mensaje legible
export const extraerMensajeErrorBackend = (error: unknown): string => {
    if (axios.isAxiosError(error)) {
        // Caso A: .NET apagado o el navegador bloqueó por CORS
        if (!error.response) {
            return 'Sin respuesta del servidor (.NET apagado o bloqueo de seguridad CORS en el navegador).'
        }

        const status = error.response.status
        const data: unknown = error.response.data

        // Caso B: arreglo de FluentValidation -> [ { propertyName, errorMessage }, ... ]
        if (Array.isArray(data)) {
            const mensajes = (data as FluentValidationError[])
                .map((item) => item?.errorMessage)
                .filter((msg): msg is string => typeof msg === 'string' && msg.trim().length > 0)

            if (mensajes.length > 0) {
                return `[HTTP ${status}] ${mensajes.join(' | ')}`
            }
        }

        // Caso C: texto directo -> NotFound("No existe un ejercicio con Id 5.")
        if (typeof data === 'string' && data.trim().length > 0) {
            return `[HTTP ${status}] ${data}`
        }

        // Caso D: objeto JSON (ProblemDetails de ASP.NET o { error / mensaje })
        if (data && typeof data === 'object') {
            const obj = data as Record<string, unknown>

            if (obj.errors && typeof obj.errors === 'object') {
                const lista = Object.values(obj.errors as Record<string, string[]>).flat()
                if (lista.length > 0) {
                    return `[HTTP ${status}] ${lista.join(' | ')}`
                }
            }

            const mensaje = obj.error ?? obj.mensaje ?? obj.message ?? obj.detail ?? obj.title
            if (typeof mensaje === 'string' && mensaje.trim().length > 0) {
                return `[HTTP ${status}] ${mensaje}`
            }
        }

        return `[HTTP ${status}] El servidor .NET rechazó la operación.`
    }

    return error instanceof Error ? error.message : 'Error inesperado en la aplicación.'
}