export default function Accounting() {
  return (
    <main className="mx-auto max-w-7xl px-6 pt-28 pb-20">
      <h1 className="text-4xl font-semibold tracking-tight">Contabilidad con IA</h1>
      <p className="mt-3 text-neutral-600 max-w-2xl">Automatiza asientos, conciliación bancaria y validación de modelos AEAT.</p>
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-neutral-200 p-6 bg-white">
          <div className="font-medium">Asientos sugeridos</div>
          <p className="mt-2 text-sm text-neutral-600">Aprendizaje continuo para clasificar gastos e ingresos con precisión.</p>
        </div>
        <div className="rounded-2xl border border-neutral-200 p-6 bg-white">
          <div className="font-medium">Conciliación y alertas</div>
          <p className="mt-2 text-sm text-neutral-600">Revisa excepciones y recibe alertas de anomalías.</p>
        </div>
      </div>
    </main>
  );
}

