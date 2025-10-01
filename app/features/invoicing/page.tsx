export default function Invoicing() {
  return (
    <main className="mx-auto max-w-7xl px-6 pt-28 pb-20">
      <h1 className="text-4xl font-semibold tracking-tight">Facturación</h1>
      <p className="mt-3 text-neutral-600 max-w-2xl">Crea facturas en segundos, plantillas personalizables y cobro acelerado. Integrada con contabilidad y tesorería.</p>
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-neutral-200 p-6 bg-white">
          <div className="font-medium">Plantillas y serie de facturas</div>
          <p className="mt-2 text-sm text-neutral-600">Más de 50 plantillas, numeraciones, impuestos y envío automático.</p>
        </div>
        <div className="rounded-2xl border border-neutral-200 p-6 bg-white">
          <div className="font-medium">Recurrencias y remesas</div>
          <p className="mt-2 text-sm text-neutral-600">Programa facturas y genera remesas SEPA con un clic.</p>
        </div>
      </div>
    </main>
  );
}

