
import type { Ejercicio } from '../types/ejercicio.types'

// Capa de servicio: por ahora simula el servidor.
// En la Clase 15 se cambiará por una llamada real a GET /api/ejercicios.
export const obtenerEjerciciosAsync = (): Promise<Ejercicio[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const datosCatalogo: Ejercicio[] = [
                { id: 1, nombre: 'Sentadillas' },
                { id: 2, nombre: 'Plancha 1 minuto' },
                { id: 3, nombre: 'Lagartijas' },
                { id: 4, nombre: 'Burpees' },
                { id: 5, nombre: 'Peso muerto' },
                { id: 6, nombre: 'Correr 20 minutos' },
            ]
            resolve(datosCatalogo)
        }, 1000)
    })
}