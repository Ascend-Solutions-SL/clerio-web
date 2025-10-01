import Link from "next/link";

export default function FeaturesIndex() {
  const features = [
    { href: "/features/invoicing", title: "Facturación", desc: "Crea, programa y cobra más rápido." },
    { href: "/features/accounting", title: "Contabilidad (IA)", desc: "Automatiza asientos y conciliación." },
    { href: "/features/treasury", title: "Tesorería", desc: "Cashflow y bancos conectados." },
    { href: "/features/crm", title: "CRM", desc: "Gestiona leads y oportunidades." },
    { href: "/features/projects", title: "Proyectos", desc: "Planificación y rentabilidad." },
    { href: "/features/inventory", title: "Inventario", desc: "Control de stock y compras." },
  ];
  return (
    <main className="mx-auto max-w-7xl px-6 pt-28 pb-20">
      <h1 className="text-4xl font-semibold tracking-tight">Funcionalidades</h1>
      <p className="mt-3 text-neutral-600 max-w-2xl">Todo lo que una gestoría moderna necesita. Elige un módulo para ver detalles y casos de uso.</p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <Link key={f.href} href={f.href} className="rounded-2xl border border-neutral-200 p-6 bg-white hover:shadow-subtle transition">
            <div className="font-medium text-neutral-900">{f.title}</div>
            <div className="mt-2 text-sm text-neutral-600">{f.desc}</div>
          </Link>
        ))}
      </div>
    </main>
  );
}

