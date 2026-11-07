// src/features/ejercicios/components/CatalogoEjerciciosView.tsx
import { useState, useEffect } from 'react'
import type { Ejercicio } from '../types/ejercicio.types'
import { obtenerEjerciciosAsync, eliminarEjercicioAsync, extraerMensajeErrorBackend } from '../api/ejerciciosApi'
import { EjercicioCard } from './EjercicioCard'
import { CrearEjercicioForm } from './CrearEjercicioForm'

export function CatalogoEjerciciosView() {
  // --- ZONA 3: CEREBRO DEL MÓDULO ---
  const [ejercicios, setEjercicios] = useState<Ejercicio[]>([])
  const [cargando, setCargando] = useState<boolean>(true)
  const [errorRed, setErrorRed] = useState<string | null>(null)
  const [busqueda, setBusqueda] = useState<string>('')
  const [mostrarFormulario, setMostrarFormulario] = useState<boolean>(false)
  const [eliminandoId, setEliminandoId] = useState<number | null>(null)
  const [errorAccion, setErrorAccion] = useState<string | null>(null)

  // Clase 15: GET real a .NET al montar el componente
  useEffect(() => {
    obtenerEjerciciosAsync()
      .then((datosDesdePostgres) => {
        setEjercicios(datosDesdePostgres)
        setErrorRed(null)
      })
      .catch((error) => {
        console.error('Fallo en la comunicación HTTP con .NET:', error)
        setErrorRed(extraerMensajeErrorBackend(error))
      })
      .finally(() => {
        setCargando(false) // se apaga tanto si hubo éxito como si hubo error
      })
  }, [])

  // Clase 16: agregamos el nuevo ejercicio SIN otro GET, con un arreglo nuevo (inmutabilidad)
  const manejarEjercicioCreado = (nuevoDesdeBD: Ejercicio) => {
    setEjercicios((actuales) => [...actuales, nuevoDesdeBD])
    setMostrarFormulario(false)
  }

  // Clase 17: DELETE real a .NET y quitamos la tarjeta con .filter() (también inmutable)
  const manejarEliminar = async (id: number) => {
    if (!window.confirm(`¿Eliminar el ejercicio #${id} del catálogo?`)) return

    try {
      setEliminandoId(id)
      setErrorAccion(null)
      await eliminarEjercicioAsync(id)
      setEjercicios((actuales) => actuales.filter((ejercicio) => ejercicio.id !== id))
    } catch (error) {
      console.error('🚨 No se pudo eliminar:', error)
      setErrorAccion(extraerMensajeErrorBackend(error))
    } finally {
      setEliminandoId(null)
    }
  }

  const ejerciciosFiltrados = ejercicios.filter((ejercicio) =>
    ejercicio.nombre.toLowerCase().includes(busqueda.toLowerCase())
  )

  // --- ZONA 4: RENDERIZADO DEL CATÁLOGO ---
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 mb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Catálogo de Ejercicios</h1>
          <p className="text-slate-400 text-sm mt-1">
            Conectado en tiempo real vía <code className="text-indigo-400 font-mono">HTTP/CORS</code> con PostgreSQL.
          </p>
        </div>

        {!mostrarFormulario && (
          <button
            onClick={() => setMostrarFormulario(true)}
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm px-4 py-2.5 rounded-lg transition-colors shadow-sm self-start sm:self-auto cursor-pointer"
          >
            + Nuevo Ejercicio
          </button>
        )}
      </div>

      {/* Formulario POST (solo cuando se pide) */}
      {mostrarFormulario && (
        <CrearEjercicioForm
          onEjercicioCreado={manejarEjercicioCreado}
          onCancelar={() => setMostrarFormulario(false)}
        />
      )}

      {/* Error al eliminar */}
      {errorAccion && (
        <div className="mb-6 text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 flex justify-between gap-4">
          <span>🚨 {errorAccion}</span>
          <button onClick={() => setErrorAccion(null)} className="text-red-300 hover:text-white cursor-pointer">✕</button>
        </div>
      )}

      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <input
          type="text"
          placeholder="🔍 Filtrar ejercicios..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full sm:max-w-md bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
        />
        <span className="text-xs text-slate-400">
          Mostrando <strong className="text-white">{ejerciciosFiltrados.length}</strong> de {ejercicios.length} registros en BD
        </span>
      </div>

      {/* 1. Cargando */}
      {cargando && (
        <div className="bg-slate-800/50 border border-slate-800 rounded-xl p-12 text-center">
          <p className="text-indigo-400 font-semibold animate-pulse text-lg">
            ⏳ Consultando GET /api/ejercicios en .NET...
          </p>
        </div>
      )}

      {/* 2. Error de red o bloqueo CORS */}
      {!cargando && errorRed && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-8 text-center">
          <p className="text-red-400 font-semibold text-lg mb-2">🚨 Error de Comunicación Full-Stack</p>
          <p className="text-red-300 text-sm">{errorRed}</p>
        </div>
      )}

      {/* 3. Éxito: tarjetas con los registros reales de PostgreSQL */}
      {!cargando && !errorRed && (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {ejerciciosFiltrados.map((ejercicio) => (
            <EjercicioCard
              key={ejercicio.id}
              id={ejercicio.id}
              nombre={ejercicio.nombre}
              onEliminar={manejarEliminar}
              eliminando={eliminandoId === ejercicio.id}
            />
          ))}
        </section>
      )}
    </div>
  )
}