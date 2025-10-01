export default function PricingPage() {
  const plans = [
    { name: "Starter", price: "€79", period: "/mes", features: ["Hasta 500 facturas/mes", "1 gestoría", "Portal cliente básico"] },
    { name: "Pro", price: "€199", period: "/mes", features: ["Hasta 2.500 facturas/mes", "5 gestorías", "AEAT modelos incluidos"] },
    { name: "Enterprise", price: "A medida", period: "", features: ["Volúmenes altos", "SSO / SLA", "Integraciones avanzadas"] },
  ];
  return (
    <main className="mx-auto max-w-7xl px-6 pt-28 pb-20">
      <h1 className="text-4xl font-semibold tracking-tight">Precios</h1>
      <p className="mt-3 text-neutral-600">Transparencia total. Elige el plan que mejor se adapte a tu volumen.</p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {plans.map((p) => (
          <div key={p.name} className="rounded-2xl border border-neutral-200 p-6 bg-white flex flex-col hover:shadow-subtle transition-shadow">
            <div className="font-medium text-neutral-900">{p.name}</div>
            <div className="mt-2 text-3xl font-semibold">{p.price} <span className="text-base font-normal text-neutral-500">{p.period}</span></div>
            <ul className="mt-4 space-y-2 text-sm text-neutral-700">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-[--color-accent]" />{f}</li>
              ))}
            </ul>
            <a href="/demo" className="mt-6 inline-flex items-center justify-center rounded-full bg-[--color-accent] text-[--color-accent-foreground] px-4 py-2 text-sm font-medium hover:brightness-95 transition">Solicitar demo</a>
          </div>
        ))}
      </div>
      <p className="mt-6 text-sm text-neutral-600">Facturas extra con cargo adicional. Contacta con ventas para descuentos por volumen.</p>
    </main>
  );
}

