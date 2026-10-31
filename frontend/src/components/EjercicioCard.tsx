
// --- ZONA 1: EL CONTRATO (INTERFAZ) ---
interface EjercicioProps {
    id: number;
    nombre: string;
}

// --- ZONA 2: LA FIRMA ---
export function EjercicioCard({ id, nombre }: EjercicioProps) {

    // --- ZONA 3: EL CEREBRO (LÓGICA) ---
    // (Vacío: componente puramente presentacional)

    // --- ZONA 4: EL RENDERIZADO (JSX) ---
    return (
        <article className="ejercicio-card">
            <small>ID Catálogo: {id}</small>
            <h3>{nombre}</h3>
            <button disabled>
                Registrar Entrenamiento (Próximamente)
            </button>
        </article>
    );
}