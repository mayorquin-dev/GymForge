// src/App.tsx
import './App.css'
import { EjercicioCard } from './components/EjercicioCard'

function App() {
  return (
    <main>
      <h1>Catálogo de Ejercicios</h1>
      <p>Explora los ejercicios disponibles en nuestra base de datos.</p>

      <section className="ejercicios-container">
        <EjercicioCard id={1} nombre="Sentadillas" />
        <EjercicioCard id={2} nombre="Plancha 1 minuto" />
        <EjercicioCard id={3} nombre="Lagartijas" />
      </section>
    </main>
  )
}

export default App