export default function Integrations() {
  const items = ["Gmail", "Google Drive", "Dropbox", "AEAT / Cl@ve", "Bancos SEPA", "Excel/CSV", "SSO", "Webhooks"];
  return (
    <main className="mx-auto max-w-7xl px-6 pt-28 pb-20">
      <h1 className="text-4xl font-semibold tracking-tight">Integraciones</h1>
      <p className="mt-3 text-neutral-600 max-w-2xl">Conecta tus herramientas favoritas en minutos para automatizar aún más.</p>
      <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {items.map((name) => (
          <div key={name} className="rounded-2xl border border-neutral-200 p-6 bg-white flex items-center justify-center text-sm text-neutral-700">
            {name}
          </div>
        ))}
      </div>
    </main>
  );
}

