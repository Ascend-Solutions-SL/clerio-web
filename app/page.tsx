import FaqSection from "@/components/FaqSection";
import FeatureShowcaseSection from "@/components/FeatureShowcaseSection";
import FooterSection from "@/components/FooterSection";
import FounderTestimonialSection from "@/components/FounderTestimonialSection";
import IntegrationsMarqueeSection from "@/components/IntegrationsMarqueeSection";
import PremiumStatementSection from "@/components/PremiumStatementSection";
import PricingSection from "@/components/PricingSection";
import SavingsEstimatorSection from "@/components/SavingsEstimatorSection";
import ScrollStepsSection from "@/components/ScrollStepsSection";

export default function Home() {
  const faqItems = [
    {
      q: "¿Cómo ayuda Clerio a mi empresa?",
      a: "Clerio elimina el trabajo manual de gestión y organización de facturas dentro de tu empresa. Tu equipo ya no tiene que:\n\n- Perseguir facturas\n- Descargarlas manualmente\n- Clasificarlas una a una\n\nEl resultado:\n\n- Menos tiempo operativo\n- Menos errores\n- Procesos más rápidos y controlados",
    },
    {
      q: "¿Qué integraciones soporta Clerio?",
      a: "Clerio se conecta con los principales servicios de correo (Gmail, Outlook), plataformas de almacenamiento (Google Drive, Onedrive, Dropbox), y softwares de facturación/ERP como Holded o Sage.\n\nTratamos deintegrarnos con tantos software como sea posible así que, si utilizas uno que no soportemos, solo tienes que pedirlo.",
    },
    {
      q: "¿Qué pasa si tengo facturas en distintos lugares (correo, portales, WhatsApp, Drive)?",
      a: "¡Es exactamente el problema que Clerio resuelve!\n\nClerio recoge automáticamente facturas desde múltiples fuentes, las centraliza y las organiza en un único lugar.\n\nDejas de:\n\n- Buscar facturas en 5 sitios distintos\n- Pedir documentos a proveedores\n- Reenviar emails constantemente\n\nTodo queda ordenado y accesible en segundos.",
    },
    {
      q: "¿Necesito cambiar de software contable para usar Clerio?",
      a: "No, Clerio no sustituye tu software contable.\n\nClerio se encarga de recoger, organizar y estructurar todas tus facturas (correo, portales, archivos, etc.) y dejarlas listas para importarlas en tu sistema actual (A3, SAGE, Contasol, Holded, etc.).\n\nEn la práctica: mantienes tus herramientas, pero eliminas el caos previo.",
    },
    {
      q: "¿Es seguro subir mis facturas a Clerio?",
      a: "Sí. Clerio utiliza cifrado y almacenamiento seguro en la nube para proteger toda la información. Además, cada empresa y usuario tiene accesos separados y controlados para garantizar la privacidad de la información.",
    },
    {
      q: "¿Qué ocurre si supero el límite de facturas de mi plan?",
      a: "Si tu volumen de facturación crece y superas el límite de tu plan, Clerio te notificará y podrás actualizar al plan inmediatamente superior o añadir paquetes extra (add-on) de facturas. En ningún momento pierdes acceso a tus facturas.",
    },
    {
      q: "¿Cuánto tiempo ahorro usando Clerio?",
      a: "Las empresas reducen hasta un 95% del tiempo dedicado a gestionar facturas. Tareas que antes llevaban horas (buscar, descargar, clasificar, enviar) pasan a ser automáticas.\n\nResultado: más tiempo en el negocio, menos trabajo manual. Esto significa más foco en el negocio y menos tareas manuales.",
    },
    {
      q: "¿Qué pasa si decido dejar de usar Clerio?",
      a: "Tus documentos siempre son tuyos. Dado que organizamos las facturas en tu propio almacenamiento en la nube (Google Drive, OneDrive, Dropbox...), tus facturas siempre están en tu posesión, con la misma organización que hizo Clerio.",
    },
  ];

  return (
    <main className="font-sans bg-[#f7f7f8] min-h-screen">
      <section id="inicio" className="pt-36 sm:pt-40 md:pt-44 pb-10 sm:pb-12 px-4 sm:px-6">
        <div className="container-page-narrow text-center">
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

      <div id="productos">
        <FeatureShowcaseSection />
      </div>

      <div id="integraciones">
        <IntegrationsMarqueeSection />
      </div>

      <PremiumStatementSection />

      <div id="recursos">
        <ScrollStepsSection />
      </div>

      {/* <div id="clientes">
        <FounderTestimonialSection />
      </div> */}

      <div id="pricing">
        <PricingSection />
      </div>

      <SavingsEstimatorSection />

      <div id="faq">
        <FaqSection items={faqItems} />
      </div>

      <FooterSection />
    </main>
  );
}
