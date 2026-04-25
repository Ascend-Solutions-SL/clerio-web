import FeatureShowcaseSection from "@/components/FeatureShowcaseSection";
import IntegrationsMarqueeSection from "@/components/IntegrationsMarqueeSection";
import PremiumStatementSection from "@/components/PremiumStatementSection";
import ScrollStepsSection from "@/components/ScrollStepsSection";

export default function Home() {
  const faqItems = [
    {
      q: "¿Necesito cambiar de software contable para usar Clerio?",
      a: "No, Clerio no sustituye tu software contable. Es un portal colaborativo que organiza, clasifica y centraliza tus facturas, y luego exporta toda la información lista para que tu asesoría la use en su propio programa (A3, SAGE, Contasol, Holded, etc.).",
    },
    {
      q: "¿La asesoría paga algo por usar Clerio?",
      a: "Sí. Clerio funciona como un portal profesional de colaboración entre asesoría y empresas, y requiere una suscripción. Aun así, el coste es muy bajo comparado con el ahorro de tiempo: la asesoría recibe la información de sus clientes lista para trabajar, sin perseguir documentos ni clasificarlos.",
    },
    {
      q: "¿Qué integraciones soporta Clerio?",
      a: "Clerio se conecta con los principales servicios de correo (Gmail, Outlook), plataformas de almacenamiento (Google Drive, Dropbox), y software de facturación/ERP como Holded. También soporta exportación de informes en formatos compatibles con programas contables.",
    },
    {
      q: "¿Qué pasa si tengo facturas en distintos lugares (correo, portales, WhatsApp, Drive)?",
      a: "Precisamente ahí está el valor de Clerio: centraliza automáticamente facturas de diferentes fuentes, las organiza y las pone a disposición de tu asesoría sin que tengas que reenviar documentos ni perder tiempo buscándolos.",
    },
    {
      q: "¿Cómo ayuda Clerio a mi asesoría?",
      a: "Tu asesoría recibe las facturas ya organizadas por fecha, cliente y categoría. Así evita perder tiempo clasificando documentos, conciliando pagos o persiguiendo información. Esto significa cierres más rápidos y menos errores en la contabilidad.",
    },
    {
      q: "¿Es seguro subir mis facturas a Clerio?",
      a: "Sí. Clerio utiliza cifrado de extremo a extremo y almacenamiento seguro en la nube. Además, cada empresa y asesoría tiene accesos separados y controlados para garantizar la privacidad de la información.",
    },
    {
      q: "¿Qué ocurre si supero el límite de facturas de mi plan?",
      a: "Si tu volumen de facturación crece y superas el límite de tu plan, Clerio te notificará y podrás actualizar al plan inmediatamente superior. El cambio es automático y no pierdes ningún documento.",
    },
    {
      q: "¿Cuánto tiempo ahorro usando Clerio?",
      a: "De media, las empresas reducen hasta un 85% del tiempo dedicado a organizar facturas y las asesorías hacen los cierres mensuales hasta 5 veces más rápido. Esto significa más foco en el negocio y menos tareas manuales.",
    },
    {
      q: "¿Puedo usar Clerio con varios usuarios dentro de mi empresa?",
      a: "Cada plan incluye un número de usuarios determinado. Puedes asignarlos a tu equipo, añadir asientos extra o subir de plan cuando lo necesites. Los asientos se pueden reasignar sin perder información.",
    },
    {
      q: "¿Qué pasa si decido dejar de usar Clerio?",
      a: "Tus documentos siempre son tuyos. Puedes descargar todas tus facturas en ZIP o CSV antes de cancelar la suscripción. Clerio garantiza que nunca perderás acceso a tu información.",
    },
  ];

  return (
    <main className="font-sans bg-[#f7f7f8] min-h-screen">
      <section className="pt-36 sm:pt-40 md:pt-44 pb-10 sm:pb-12 px-4 sm:px-6">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="text-[36px] sm:text-[44px] md:text-[52px] leading-[1.08] font-semibold tracking-[-0.03em] text-[#0d1117]">
            <span className="block">Deja de perder tiempo</span>
            <span className="block">persiguiendo tus facturas</span>
          </h1>
          <p className="mt-5 text-[14px] sm:text-[15px] leading-relaxed text-[#7f8894] max-w-xl mx-auto px-2 sm:px-0">
            Centraliza y organiza toda tu documentación en minutos,
            <br />
            sin procesos manuales.
          </p>

          <div className="mt-9 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5">
            <span className="inline-flex items-center justify-center rounded-md bg-[#1f73f1] text-white px-6 h-10 text-[14px] font-semibold">
              Prueba gratis Clerio →
            </span>
            <a
              href="https://app.clerio.es/login"
              className="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md border border-[#1f73f1] bg-white/90 px-6 text-[14px] font-medium text-[#1f2a37] shadow-[0_2px_10px_rgba(31,115,241,0.2)] backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-[1px] hover:bg-white hover:shadow-[0_10px_20px_rgba(31,115,241,0.24)]"
            >
              Acceder
            </a>
          </div>
        </div>
      </section>

      <FeatureShowcaseSection />

      <IntegrationsMarqueeSection />

      <PremiumStatementSection />

      <ScrollStepsSection />

      <section className="pt-8 pb-20 sm:pt-12 sm:pb-24 px-4 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-10">
            <div className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600 mb-3">FAQ</div>
            <h3 className="text-3xl sm:text-4xl font-bold text-gray-900">Preguntas frecuentes</h3>
          </div>
          <div className="divide-y divide-gray-200 bg-white rounded-2xl border border-gray-100">
            {faqItems.map((f, i) => (
              <details key={i} className="group p-6">
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <span className="font-medium text-gray-900">{f.q}</span>
                  <span className="text-gray-400 group-open:rotate-45 transition">+</span>
                </summary>
                <p className="mt-3 text-gray-600">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
