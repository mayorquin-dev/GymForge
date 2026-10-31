// src/App.tsx
import { EjercicioCard } from './components/EjercicioCard'

function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col md:flex-row">

      {/* 1. SIDEBAR: 256px en escritorio | oculto en celular */}
      <aside className="hidden md:flex md:w-64 md:flex-col bg-slate-950 border-r border-slate-800 justify-between p-5 shrink-0">
        <div>
          <div className="flex items-center gap-3 mb-8 px-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white shadow">
              GF
            </div>
            <span className="text-xl font-bold tracking-tight text-white">GymForge</span>
          </div>

          <nav className="space-y-2">
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 bg-indigo-600/15 text-indigo-400 rounded-lg font-medium text-sm border border-indigo-500/20">
              <span>🏋️</span> Catálogo de Ejercicios
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

      {/* 2. CABECERA MÓVIL (solo en celular: md:hidden) */}
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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 mb-8 border-b border-slate-800">
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

        {/* REJILLA: 1 columna en celular | 2 en tablet | 3 en escritorio */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <EjercicioCard id={1} nombre="Sentadillas" />
          <EjercicioCard id={2} nombre="Plancha 1 minuto" />
          <EjercicioCard id={3} nombre="Lagartijas" />
        </section>
      </main>
    </div>
  )
}

export default App