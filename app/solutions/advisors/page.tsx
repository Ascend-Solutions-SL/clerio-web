export default function Advisors() {
  return (
    <main className="mx-auto max-w-7xl px-6 pt-28 pb-20">
      <h1 className="text-4xl font-semibold tracking-tight">Soluciones para gestorías</h1>
      <p className="mt-3 text-neutral-600 max-w-3xl">Perks exclusivos, flujos de trabajo colaborativos y automatización de la relación con tus clientes. Multiplica la capacidad de tu firma sin añadir complejidad.</p>
      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {[
          { title: "Onboarding cliente", desc: "Recopila documentos y valida datos en minutos." },
          { title: "Colaboración", desc: "Tareas, comentarios y seguimiento centralizado." },
          { title: "Modelos AEAT", desc: "Generación y presentación asistida con IA." },
        ].map((c) => (
          <div key={c.title} className="rounded-2xl border border-neutral-200 p-6 bg-white">
            <div className="font-medium text-neutral-900">{c.title}</div>
            <div className="mt-2 text-sm text-neutral-600">{c.desc}</div>
          </div>
        ))}
      </div>
      <a href="/demo" className="mt-10 inline-flex items-center justify-center rounded-full bg-[--color-accent] text-[--color-accent-foreground] px-6 py-3 text-sm font-medium hover:brightness-95 transition">Habla con ventas</a>
    </main>
  );
}

