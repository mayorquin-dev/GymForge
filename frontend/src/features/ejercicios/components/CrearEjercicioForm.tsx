// src/features/ejercicios/components/CrearEjercicioForm.tsx
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Ejercicio } from '../types/ejercicio.types'
import { crearEjercicioAsync, extraerMensajeErrorBackend } from '../api/ejerciciosApi'
import { crearEjercicioSchema, type CrearEjercicioSchemaType } from '../schemas/ejercicio.schema'

interface CrearEjercicioFormProps {
    onEjercicioCreado: (nuevoEjercicio: Ejercicio) => void;
    onCancelar: () => void;
}

export function CrearEjercicioForm({ onEjercicioCreado, onCancelar }: CrearEjercicioFormProps) {
    // Mensaje exacto que devuelva .NET si rechaza la petición
    const [errorServidor, setErrorServidor] = useState<string | null>(null)

    // Zod + React Hook Form: valida cada tecla (mode: 'onChange') sin usar la red
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid, isSubmitting },
    } = useForm<CrearEjercicioSchemaType>({
        resolver: zodResolver(crearEjercicioSchema),
        mode: 'onChange',
        defaultValues: { nombre: '' },
    })

    // Solo se ejecuta cuando Zod garantiza que el dato está limpio
    const procesarEnvioLimpio = async (datosValidados: CrearEjercicioSchemaType) => {
        try {
            setErrorServidor(null)
            const ejercicioCreado = await crearEjercicioAsync(datosValidados)
            reset()
            onEjercicioCreado(ejercicioCreado)
        } catch (error) {
            // Si .NET rechaza, mostramos su mensaje exacto
            console.error('🚨 Rechazo reportado por el Backend .NET:', error)
            setErrorServidor(extraerMensajeErrorBackend(error))
        }
    }

    return (
        <form
            onSubmit={handleSubmit(procesarEnvioLimpio)}
            className="bg-slate-800 border border-indigo-500/40 rounded-xl p-5 mb-6 space-y-3"
        >
            <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-base font-bold text-white">✨ Registrar Nuevo Ejercicio</h2>
                <span className="text-xs text-slate-400 font-mono">🛡️ Zod + FluentValidation · POST /api/ejercicios</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
                <input
                    type="text"
                    placeholder="Ej. Sentadillas con barra"
                    autoFocus
                    disabled={isSubmitting}
                    {...register('nombre', {
                        // Si el usuario corrige el texto, borramos el error anterior del servidor
                        onChange: () => {
                            if (errorServidor) setErrorServidor(null)
                        },
                    })}
                    className={`flex-1 bg-slate-950 border rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors ${
                        errors.nombre
                            ? 'border-amber-500 focus:border-amber-400'
                            : errorServidor
                            ? 'border-red-500 focus:border-red-400'
                            : 'border-slate-700 focus:border-indigo-500'
                    }`}
                />
                <button
                    type="submit"
                    disabled={!isValid || isSubmitting}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm px-4 py-2.5 rounded-lg transition-colors cursor-pointer disabled:bg-slate-700 disabled:text-slate-400 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? '⏳ Guardando...' : '💾 Guardar en PostgreSQL'}
                </button>
                <button
                    type="button"
                    onClick={onCancelar}
                    className="text-slate-300 hover:text-white text-sm px-4 py-2.5 rounded-lg border border-slate-700 hover:border-slate-500 transition-colors cursor-pointer"
                >
                    Cancelar
                </button>
            </div>

            {/* 1. Validación en vivo (Zod, mientras escribe) */}
            {errors.nombre && (
                <p className="text-sm text-amber-400">⚡ Validación en vivo: {errors.nombre.message}</p>
            )}

            {/* 2. Rechazo del servidor (.NET FluentValidation) */}
            {errorServidor && (
                <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2">
                    🛡️ Respuesta del Backend (.NET): {errorServidor}
                </p>
            )}
        </form>
    )
}