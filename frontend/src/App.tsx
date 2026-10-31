// src/App.tsx
import { useState, useEffect } from 'react'
import { EjercicioCard, type EjercicioProps } from './components/EjercicioCard'

function App() {
  // ZONA 3: EL CEREBRO (ESTADO)
  const [ejercicios, setEjercicios] = useState<EjercicioProps[]>([])
  const [cargando, setCargando] = useState<boolean>(true)
  const [busqueda, setBusqueda] = useState<string>('')

  // useEffect con [] se ejecuta UNA SOLA VEZ, después del primer render
  useEffect(() => {
    // Simulamos 1.2 segundos de espera, como si viniera del servidor
    const temporizador = setTimeout(() => {
      const datosSimuladosBD: EjercicioProps[] = [
        { id: 1, nombre: 'Sentadillas' },
        { id: 2, nombre: 'Plancha 1 minuto' },
        { id: 3, nombre: 'Lagartijas' },
        { id: 4, nombre: 'Burpees' },
        { id: 5, nombre: 'Peso muerto' },
        { id: 6, nombre: 'Correr 20 minutos' },
      ]

      setEjercicios(datosSimuladosBD) // guarda en el estado y provoca un re-render
      setCargando(false)
    }, 1200)

    // Limpieza: si el componente desaparece antes, cancelamos el temporizador
    return () => clearTimeout(temporizador)
  }, [])

  // Se recalcula en cada render con el estado actual
  const ejerciciosFiltrados = ejercicios.filter((ejercicio) =>
    ejercicio.nombre.toLowerCase().includes(busqueda.toLowerCase())
  )

  // ZONA 4: EL RENDERIZADO
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col md:flex-row">

      {/* 1. SIDEBAR */}
      <aside className="hidden md:flex md:w-64 md:flex-col bg-slate-950 border-r border-slate-800 justify-between p-5 shrink-0">
        <div>
          <div className="flex items-center gap-3 mb-8 px-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white shadow">
              GF
            </div>
            <span className="text-xl font-bold tracking-tight text-white">GymForge</span>
          </div>

          <nav className="space-y-2">
            <a href="#" className="flex items-center justify-between px-3 py-2.5 bg-indigo-600/15 text-indigo-400 rounded-lg font-medium text-sm border border-indigo-500/20">
              <span className="flex items-center gap-3"><span>🏋️</span> Catálogo de Ejercicios</span>
              {/* Pasa de 0 (primer render) a 6 (segundo render) */}
              <span className="bg-indigo-500/20 text-indigo-300 text-xs px-2 py-0.5 rounded-full">
                {ejercicios.length}
              </span>
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-slate-500 rounded-lg font-medium text-sm cursor-not-allowed">
              <span>📈</span> Mis Entrenamientos (Unidad 3)
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-slate-500 rounded-lg font-medium text-sm cursor-not-allowed">
              <span>🏅</span> Insignias (Unidad 3)
            </a>
          </nav>
        </div>

        <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800">
          <p className="text-xs text-slate-400 mb-1">Estado de Seguridad</p>
          <p className="text-sm font-semibold text-amber-400">👤 Modo Invitado</p>
        </div>
      </aside>

      {/* 2. CABECERA MÓVIL */}
      <header className="md:hidden bg-slate-950 border-b border-slate-800 p-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md bg-indigo-600 flex items-center justify-center font-bold text-sm text-white">
            GF
          </div>
          <span className="font-bold text-lg text-white">GymForge</span>
        </div>
        <span className="text-xs bg-amber-500/10 text-amber-400 px-2.5 py-1 rounded-md border border-amber-500/20 font-medium">
          👤 Invitado
        </span>
      </header>

      {/* 3. ÁREA CENTRAL */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 mb-6 border-b border-slate-800">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">Catálogo de Ejercicios</h1>
            <p className="text-slate-400 text-sm mt-1">
              Ejercicios registrados en la tabla <code className="text-indigo-400 font-mono">Ejercicios</code>.
            </p>
          </div>

          <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm px-4 py-2.5 rounded-lg transition-colors shadow-sm self-start sm:self-auto cursor-pointer">
            + Nuevo Ejercicio
          </button>
        </div>

        {/* Buscador: cada tecla actualiza 'busqueda' y React vuelve a pintar */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <input
            type="text"
            placeholder="🔍 Filtrar ejercicios..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full sm:max-w-md bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
          />
          <span className="text-xs text-slate-400">
            Mostrando <strong className="text-white">{ejerciciosFiltrados.length}</strong> de {ejercicios.length} ejercicios
          </span>
        </div>

        {/* Renderizado condicional: cargando o la rejilla */}
        {cargando ? (
          <div className="bg-slate-800/50 border border-slate-800 rounded-xl p-12 text-center">
            <p className="text-indigo-400 font-semibold animate-pulse text-lg">
              ⏳ Cargando catálogo de ejercicios...
            </p>
          </div>
        ) : (
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ejerciciosFiltrados.map((ejercicio) => (
              <EjercicioCard
                key={ejercicio.id}
                id={ejercicio.id}
                nombre={ejercicio.nombre}
              />
            ))}
          </section>
        )}

      </main>
    </div>
  )
}

export default App