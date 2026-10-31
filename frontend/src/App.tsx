// src/App.tsx
import { AppLayout } from './layouts/AppLayout'
import { CatalogoEjerciciosView } from './features/ejercicios/components/CatalogoEjerciciosView'

// Orquestador: solo compone el marco y la vista (como Program.cs en .NET)
function App() {
  return (
    <AppLayout>
      <CatalogoEjerciciosView />
    </AppLayout>
  )
}

export default App