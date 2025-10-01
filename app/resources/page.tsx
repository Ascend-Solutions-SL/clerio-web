export default function Resources() {
  const resources = [
    { title: "Guía Verifactu 2025", desc: "Qué es y cómo cumplir con la normativa.", href: "#" },
    { title: "Factura electrónica", desc: "Concepto, requisitos y cómo implementarla.", href: "#" },
    { title: "Diferencias entre Verifactu y SII", desc: "Cuándo usar cada uno.", href: "#" },
  ];
  return (
    <main className="mx-auto max-w-7xl px-6 pt-28 pb-20">
      <h1 className="text-4xl font-semibold tracking-tight">Recursos</h1>
      <p className="mt-3 text-neutral-600 max-w-2xl">Aprende sobre facturación, contabilidad e implantación de normativas en gestorías.</p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {resources.map((r) => (
          <a key={r.title} href={r.href} className="rounded-2xl border border-neutral-200 p-6 bg-white hover:shadow-subtle transition">
            <div className="font-medium text-neutral-900">{r.title}</div>
            <div className="mt-2 text-sm text-neutral-600">{r.desc}</div>
          </a>
        ))}
      </div>
    </main>
  );
}

