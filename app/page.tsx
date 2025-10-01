"use client";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";

// Child component to keep hooks order stable
function Phrase({ index, total, text, progress }: { index: number; total: number; text: string; progress: any }) {
  const isLast = index === total - 1;
  
  // Distribución: Primera 25%, Segunda 35%, Última 40%
  let start, fadeInEnd, fadeOutStart, end;
  
  if (index === 0) {
    // Primera frase: 0-28%
    start = 0;
    fadeInEnd = 0.04;
    fadeOutStart = 0.24;
    end = 0.28;
  } else if (index === 1) {
    // Segunda frase: 28-60% (32% del total)
    start = 0.28;
    fadeInEnd = 0.31;
    fadeOutStart = 0.57;
    end = 0.60;
  } else {
    // Última frase: 60-100% (40% del total)
    start = 0.60;
    fadeInEnd = 0.63;
    fadeOutStart = 0.97;
    end = 1.0;
  }
  
  const opacity = useTransform(
    progress,
    [start, fadeInEnd, fadeOutStart, end],
    [0, 1, 1, 0]
  );
  
  // Zoom más pronunciado: de 0.85 a 1.08 mientras haces scroll
  const scale = useTransform(
    progress,
    [start, fadeInEnd, (fadeInEnd + fadeOutStart) / 2, fadeOutStart, end],
    [0.85, 1.0, 1.08, 1.0, 0.85]
  );
  
  return (
    <motion.h2
      style={{ opacity, scale }}
      className="absolute left-1/2 -translate-x-1/2 top-[28%] -translate-y-1/2 text-center text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.2] text-slate-900 px-6 max-w-6xl"
    >
      {text}
    </motion.h2>
  );
}

function TopQuickNav() {
  const items = [
    { label: 'Inicio', target: '#home' },
    { label: 'Sobre nosotros', target: '#about' },
    { label: 'Pricing', target: '#pricing' },
    { label: 'Cómo funciona', target: '#how' },
  ];
  const onClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    else if (href === '#home') window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <nav className="w-full">
      <div className="mx-auto max-w-7xl px-6">
        <ul className="flex flex-wrap items-center gap-2 md:gap-3">
          {items.map((it) => (
            <li key={it.target}>
              <a href={it.target} onClick={(e)=>onClick(e, it.target)} className="inline-flex items-center rounded-full border border-gray-200 bg-white/80 backdrop-blur px-3 md:px-4 py-1.5 text-sm text-gray-700 hover:bg-white hover:border-gray-300">
                {it.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

function PricingSection() {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('yearly');
  const [audience, setAudience] = useState<'empresa' | 'asesoria'>('empresa');

  const plansEmpresa = [
    {
      name: 'Starter',
      monthly: 19,
      yearly: 180, // 15 €/mes anual
      invoices: 80, // al mes
      features: [
        'Hasta 80 facturas/mes',
        '2 correos conectados',
        'Portal colaborativo básico',
        'Usuarios ilimitados',
        'Soporte estándar (24h)',
        'Para pequeñas empresas que empiezan a digitalizarse.'
      ],
      cta: 'Probar gratis',
      popular: false,
    },
    {
      name: 'Growth',
      monthly: 59,
      yearly: 540, // 45 €/mes anual
      invoices: 250,
      features: [
        'Hasta 250 facturas/mes',
        '5 correos conectados',
        'Integración con Google Drive/Dropbox',
        'Chat colaborativo con la asesoría',
        'Soporte prioritario (12h)',
        'Para empresas en crecimiento con más flujo de documentos.'
      ],
      cta: 'Probar gratis',
      popular: false,
    },
    {
      name: 'Scale (Más popular)',
      monthly: 99,
      yearly: 948, // 79 €/mes anual
      invoices: 500,
      features: [
        'Hasta 500 facturas/mes',
        '15 correos conectados',
        'Automatización avanzada de flujos',
        'Reportes trimestrales automáticos',
        'Soporte premium (8h)',
        'Ideal para compañías con alto volumen de facturas.'
      ],
      cta: 'Probar gratis',
      popular: true,
    },
    {
      name: 'Enterprise',
      monthly: 179,
      yearly: 1668, // 139 €/mes anual
      invoices: 1000,
      features: [
        'Hasta 1000 facturas/mes',
        'Correos ilimitados conectados',
        'API e integraciones personalizadas',
        'Onboarding dedicado',
        'Gestor de cuenta asignado',
        'Soporte en tiempo real',
        'Para corporaciones que necesitan personalización total.'
      ],
      cta: 'Hablar con ventas',
      popular: false,
    },
  ];

  const plansAsesoria = [
    {
      name: 'Despacho - Básico',
      monthly: 39,
      yearly: 468,
      invoices: 3000,
      features: [
        'Panel multi‑cliente',
        'Cuentas de clientes ilimitadas',
        'Descarga paquetes ZIP+CSV',
        'Detección de duplicados',
      ],
      cta: 'Probar gratis',
      popular: false,
    },
    {
      name: 'Despacho - Pro',
      monthly: 79,
      yearly: 948,
      invoices: 12000,
      features: [
        'Flujos colaborativos cliente‑asesoría',
        'Etiquetas y estados personalizados',
        'Soporte prioritario (12h)',
        'Todo lo de Básico',
      ],
      cta: 'Probar gratis',
      popular: true,
    },
    {
      name: 'Despacho - Escala',
      monthly: 149,
      yearly: 1788,
      invoices: 30000,
      features: [
        'SLA 8h y gestor dedicado',
        'Integraciones avanzadas',
        'Reportes y auditoría',
        'Todo lo de Pro',
      ],
      cta: 'Hablar con ventas',
      popular: false,
    },
  ];

  const plans = audience === 'empresa' ? plansEmpresa : plansAsesoria;

  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-10">
          {/* Audience toggle (distinct style and different row) */}
          <div className="mb-5 inline-flex items-center gap-2">
            <button
              type="button"
              onClick={() => setAudience('empresa')}
              className={`px-4 py-1.5 rounded-full text-sm border ${audience==='empresa' ? 'border-blue-300 bg-blue-50 text-blue-700 shadow-sm' : 'border-gray-200 text-gray-700 bg-white hover:bg-gray-50'}`}
            >
              Empresas
            </button>
            <button
              type="button"
              onClick={() => setAudience('asesoria')}
              className={`px-4 py-1.5 rounded-full text-sm border ${audience==='asesoria' ? 'border-blue-300 bg-blue-50 text-blue-700 shadow-sm' : 'border-gray-200 text-gray-700 bg-white hover:bg-gray-50'}`}
            >
              Asesorías
            </button>
          </div>

          <h2 className="text-[clamp(28px,5.6vw,48px)] font-extrabold tracking-tight text-gray-900">Precios simples y transparentes para equipos</h2>
          <p className="text-gray-600/90 mt-2">Elige el plan que mejor se adapta a tu equipo, sin costes ocultos y con todo lo necesario para crecer.</p>

          {/* Billing toggle (kept as segmented control) */}
          <div className="mt-4 inline-flex items-center bg-gray-100 rounded-full p-1">
            <button type="button" onClick={() => setBilling('monthly')} className={`px-4 py-1.5 rounded-full text-sm ${billing==='monthly' ? 'bg-white shadow text-blue-700' : 'text-gray-600'}`}>Mensual</button>
            <button type="button" onClick={() => setBilling('yearly')} className={`px-4 py-1.5 rounded-full text-sm ${billing==='yearly' ? 'bg-white shadow text-blue-700' : 'text-gray-600'}`}>Anual</button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((p, idx) => (
            <div key={p.name} className={`rounded-2xl border ${p.popular ? 'border-blue-200 bg-blue-50/40' : 'border-gray-200 bg-white'} shadow-sm p-6 flex flex-col`}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-gray-900 font-semibold">{p.name}</div>
                  <div className="mt-3">
                    <div className="text-3xl font-extrabold text-gray-900">€{billing==='monthly' ? p.monthly : Math.round(p.yearly/12)}<span className="text-sm font-medium text-gray-500"> / mes{billing==='yearly' ? ' anual' : ''}</span></div>
                    <div className="text-xs text-gray-500">{billing==='monthly' ? 'Facturación mensual' : `Facturación anual (€${p.yearly}/año)`}</div>
                  </div>
                </div>
                {p.popular && (
                  <span className="text-[10px] font-semibold px-2 py-1 rounded-full bg-blue-100 text-blue-700">Popular</span>
                )}
              </div>

              <hr className="my-5 border-gray-200" />

              <ul className="space-y-2 text-sm text-gray-700 flex-1">
                {idx > 0 && (
                  <li className="flex items-start gap-2">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-300 mt-2"></span>
                    <span>Incluye todo lo de {plans[idx-1].name.replace(/\s*\(.*\)$/,'')}</span>
                  </li>
                )}
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-300 mt-2"></span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <button type="button" className={`mt-6 w-full rounded-lg px-4 py-2.5 text-sm font-semibold ${p.popular ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-500 text-white hover:bg-blue-600'}`}>{p.cta}</button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

function KPIsShowcaseSection() {
  const stats = [
    {
      title: 'Horas ahorradas',
      desc: 'Tu equipo reduce drásticamente el tiempo dedicado a clasificar, buscar y enviar facturas a la asesoría.'
    },
    {
      title: 'Costes operativos',
      desc: 'La automatización disminuye el gasto en tareas administrativas y libera recursos para invertir en lo que importa.'
    },
    {
      title: 'Menos errores',
      desc: 'La IA minimiza incidencias en cierres y trimestres, evitando repeticiones y revisiones innecesarias.'
    },
    {
      title: 'Más capacidad',
      desc: 'Cada asesor puede gestionar más clientes de forma eficiente, sin necesidad de ampliar equipo.'
    },
  ];

  return (
    <section id="about" className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <h2 className="text-[clamp(28px,5.6vw,48px)] font-extrabold tracking-tight text-gray-900 leading-tight">Resultados reales con Clerio</h2>
        <p className="text-gray-600/90 max-w-3xl mx-auto mt-3">Así transformamos la colaboración con tu asesoría y el cierre de cada mes.</p>

        <div className="mt-10 relative">
          <div className="rounded-3xl overflow-hidden shadow-sm border border-gray-100">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80"
              alt="Equipos trabajando con Clerio"
              className="w-full h-[360px] md:h-[440px] object-cover"
              loading="lazy"
            />
          </div>

          {/* Floating KPI card */}
          <div className="max-w-5xl mx-auto -mt-10 md:-mt-14 relative">
            <div className="bg-white/95 backdrop-blur rounded-2xl md:rounded-3xl shadow-md border border-gray-100 p-4 md:p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                {stats.map((s, i) => (
                  <div key={i} className="p-4 md:p-5 text-left">
                    <div className="text-[clamp(14px,2.6vw,16px)] font-semibold text-gray-900 tracking-tight">{s.title}</div>
                    <p className="text-xs md:text-sm text-gray-600 mt-1 leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Accordion item for the Teams-like section
function AccordionItem({ i, active, onToggle, title, desc, icon }: { i: number; active: number; onToggle: (i:number)=>void; title: string; desc: string; icon: ReactNode }) {
  const isOpen = active === i;
  return (
    <button
      type="button"
      onClick={() => onToggle(i)}
      className={`w-full text-left rounded-2xl border transition ${isOpen ? 'bg-blue-50/60 border-blue-100 shadow-sm' : 'bg-white border-gray-100 hover:border-gray-200 hover:shadow-sm'} p-4 md:p-5`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <span className={`inline-flex items-center justify-center w-6 h-6 rounded-md ${isOpen ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>{icon}</span>
          <div>
            <div className={`font-semibold tracking-tight ${isOpen ? 'text-blue-800' : 'text-gray-900'}`}>{title}</div>
            {isOpen && (
              <p className="mt-2 text-gray-600 leading-relaxed text-sm md:text-base">{desc}</p>
            )}
          </div>
        </div>
        <span className={`mt-1 text-sm ${isOpen ? 'text-blue-600' : 'text-gray-400'} transform transition-transform ${isOpen ? 'rotate-180' : ''}`} aria-hidden>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
        </span>
      </div>
    </button>
  );
}

function TeamsLikeSection() {
  const [active, setActive] = useState(0);
  const items = [
    {
      title: 'Equipos de finanzas',
      desc: 'Centraliza facturas de correo, Drive y portales. La IA extrae proveedor, fecha, base, IVA e importe y detecta duplicados. Exporta ZIP+CSV y comparte con tu asesoría en un clic.',
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><path d="M3 10h18"/></svg>
      ),
      img: 'https://images.unsplash.com/photo-1556742031-c6961e8560b0?auto=format&fit=crop&w=1200&q=80'
    },
    {
      title: 'E‑commerce y ventas online',
      desc: 'Conecta Amazon Business y otros portales; Clerio descarga y clasifica automáticamente tus facturas. Búsqueda avanzada por proveedor, periodo o importe.',
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3h18v4H3z"/><path d="M16 13H8"/><path d="M3 7l2 12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2l2-12"/></svg>
      ),
      img: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80'
    },
    {
      title: 'Asesorías y gestorías',
      desc: 'Acceso gratuito al portal compartido del cliente, descarga de paquetes listos y trazabilidad total. Cierres mensuales x5 más rápidos.',
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21v-4a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v4"/><circle cx="12" cy="7" r="4"/></svg>
      ),
      img: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80'
    },
    {
      title: 'Autónomos y PYMEs',
      desc: 'Simplifica tu gestión documental. Sube desde el móvil, deja que la IA clasifique y comparte con tu asesoría cuando quieras, sin emails de ida y vuelta.',
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5-5 5 5"/></svg>
      ),
      img: 'https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&fit=crop&w=1200&q=80'
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: heading + accordion */}
          <div>
            <h2 className="text-[clamp(32px,6.2vw,56px)] font-extrabold tracking-tight text-gray-900 leading-[1.08] mb-3">Perfecto para tu equipo</h2>
            <p className="text-gray-600/90 text-base md:text-lg leading-relaxed mb-7 max-w-[55ch]">Clerio se adapta a tu forma de trabajar: conecta fuentes, automatiza la extracción y comparte con tu asesoría.</p>
            <div className="space-y-3">
              {items.map((it, i) => (
                <AccordionItem key={i} i={i} active={active} onToggle={(idx)=> setActive(Math.max(0, Math.min(idx, items.length-1)))} title={it.title} desc={it.desc} icon={it.icon} />
              ))}
            </div>
          </div>
          {/* Right: image changing with active item */}
          <div className="rounded-3xl overflow-hidden bg-gray-50 shadow-sm border border-gray-100">
            {(() => { const cur = items[active] ?? items[0]; return (
            <img
              src={cur.img}
              alt={cur.title}
              className="w-full h-[360px] md:h-[460px] object-cover"
              loading="lazy"
            />); })()}
          </div>
        </div>
      </div>
    </section>
  );
}
// InvoicesCard: Dashboard tabla de facturas
function InvoicesCard() {
  return (
    <div className="rounded-[28px] bg-white border border-gray-200 shadow-sm p-4 md:p-6 h-auto md:h-[440px] flex flex-col">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h4 className="text-[18px] md:text-[20px] font-semibold text-gray-900">Gestión documental</h4>
        <span className="text-[12px] font-medium text-blue-600">Sincronizado</span>
      </div>

      {/* Indicadores clave */}
      <div className="space-y-3 md:space-y-4 pb-2 md:pb-3">
        {/* Correo conectado */}
        <div className="flex items-center justify-between rounded-2xl border border-gray-100 p-3 md:p-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-blue-50 text-blue-600">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16v16H4z"/><path d="m22 6-10 7L2 6"/></svg>
            </span>
            <div>
              <div className="text-[14px] md:text-[16px] text-gray-900 font-medium">Correo conectado</div>
              <div className="text-[12px] text-gray-600">facturas@empresa.com</div>
            </div>
          </div>
          <span className="inline-flex items-center rounded-full bg-green-50 text-green-700 text-[12px] px-2.5 py-1">Activo</span>
        </div>

        {/* Facturas procesadas este mes */}
        <div className="flex items-center justify-between rounded-2xl border border-gray-100 p-3 md:p-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 4h18"/><path d="M8 2v4"/><path d="M16 2v4"/><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M8 11h8"/><path d="M8 16h5"/></svg>
            </span>
            <div>
              <div className="text-[14px] md:text-[16px] text-gray-900 font-medium">Facturas procesadas este mes</div>
              <div className="text-[12px] text-gray-600">124 documentos</div>
            </div>
          </div>
          <span className="inline-flex items-center rounded-full bg-blue-50 text-blue-700 text-[12px] px-2.5 py-1">OK</span>
        </div>

        {/* Pendientes de revisión */}
        <div className="flex items-center justify-between rounded-2xl border border-gray-100 p-3 md:p-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-amber-50 text-amber-600">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 9v4"/><path d="M12 17h.01"/><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/></svg>
            </span>
            <div>
              <div className="text-[14px] md:text-[16px] text-gray-900 font-medium">Pendientes de revisión</div>
              <div className="text-[12px] text-gray-600">7 documentos</div>
            </div>
          </div>
          <span className="inline-flex items-center rounded-full bg-amber-50 text-amber-700 text-[12px] px-2.5 py-1">Revisar</span>
        </div>

        {/* Asesoría conectada */}
        <div className="flex items-center justify-between rounded-2xl border border-gray-100 p-3 md:p-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-green-50 text-green-600">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
            </span>
            <div>
              <div className="text-[14px] md:text-[16px] text-gray-900 font-medium">Asesoría conectada</div>
              <div className="text-[12px] text-gray-600">Gestoría Martínez</div>
            </div>
          </div>
          <span className="inline-flex items-center rounded-full bg-green-50 text-green-700 text-[12px] px-2.5 py-1">OK</span>
        </div>
      </div>

      <div className="mt-auto" />
    </div>
  );
}

// ScrollTextWithStickyKPIs: sección con texto fijo y KPIs abajo
function ScrollTextWithStickyKPIs() {
  const container = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: container, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 50, damping: 30, mass: 0.5 });

  const texts = [
    "Automatiza. Conecta. Crece.",
    "Mejora la colaboración con tu asesoría",
    "Cierra tus meses en minutos, no en horas.",
  ];

  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(m.matches);
    const onChange = () => setReduced(m.matches);
    m.addEventListener?.("change", onChange);
    return () => m.removeEventListener?.("change", onChange);
  }, []);

  return (
    <section ref={container} className="relative bg-white" style={{ minHeight: '300vh' }}>
      {/* Contenedor sticky que ocupa toda la pantalla */}
      <div className="sticky top-0 h-screen w-full">
        {/* Fondo */}
        <div className="absolute inset-0 bg-white" />
        
        {/* Texto animado centrado */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div className="relative w-full max-w-5xl mx-auto px-6">
            {reduced ? (
              <h2 className="text-center text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.15] text-slate-900 max-w-4xl mx-auto">
                {texts[0]}
              </h2>
            ) : (
              texts.map((t, i) => (
                <Phrase key={i} index={i} total={texts.length} text={t} progress={smooth} />
              ))
            )}
          </div>
        </div>

        {/* KPIs fijos abajo */}
        <div className="absolute bottom-0 inset-x-0 pb-12 md:pb-16">
          <div className="w-full max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              <div className="text-center">
                <div className="text-[clamp(32px,4.8vw,56px)] font-extrabold text-slate-900">85%</div>
                <p className="text-sm md:text-base text-slate-600 mt-2 leading-relaxed">
                  Menos tiempo dedicando a buscar y clasificar facturas: tu bandeja se organiza automáticamente.
                </p>
              </div>
              <div className="text-center">
                <div className="text-[clamp(32px,4.8vw,56px)] font-extrabold text-slate-900">70%</div>
                <p className="text-sm md:text-base text-slate-600 mt-2 leading-relaxed">
                  Menos emails y idas y vueltas con la asesoría: todo queda compartido y trazable.
                </p>
              </div>
              <div className="text-center">
                <div className="text-[clamp(32px,4.8vw,56px)] font-extrabold text-slate-900">x5</div>
                <p className="text-sm md:text-base text-slate-600 mt-2 leading-relaxed">
                  Cierres mensuales mucho más rápidos: documentos listos y validaciones en minutos.
                </p>
              </div>
              <div className="text-center">
                <div className="text-[clamp(32px,4.8vw,56px)] font-extrabold text-slate-900">100%</div>
                <p className="text-sm md:text-base text-slate-600 mt-2 leading-relaxed">
                  Trazabilidad completa: quién subió, cuándo se modificó y qué se compartió.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// StressedPhotoCard: Foto con chip seguro inferior-izquierda
function StressedPhotoCard() {
  return (
    <div className="rounded-[28px] bg-white border border-gray-200 shadow-sm h-auto md:h-[440px] overflow-hidden relative">
      <img
        src="https://images.unsplash.com/photo-1529078155058-5d716f45d604?q=80&w=1600&auto=format&fit=crop"
        alt="Profesional financiero calculando trimestrales"
        className="w-full h-full object-cover"
        loading="lazy"
      />
      {/* Chip seguro */}
      <div className="absolute left-4 bottom-4 pointer-events-none">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/95 backdrop-blur-sm shadow-md px-3 py-2 border border-gray-100">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-500" aria-hidden="true"></span>
          <div className="text-left leading-tight">
            <div className="text-[12px] md:text-[14px] font-medium text-gray-900 line-through decoration-gray-300">Enviar facturas trimestre asesoría</div>
            <div className="text-[11px] md:text-[12px] text-gray-600">Para hoy</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ProductivityBanner: 5x con contador animado accesible
function ProductivityBanner() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [value, setValue] = useState(1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setValue(5);
      return;
    }

    let started = false;
    let raf = 0;
    let startTime = 0;
    const duration = 1700; // ~1.7s

    const animate = (ts: number) => {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      const cur = Math.round(1 + eased * (10 - 1));
      setValue(cur);
      if (p < 1) raf = requestAnimationFrame(animate);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!started && e.isIntersecting) {
            started = true;
            raf = requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="rounded-[28px] bg-white border border-blue-200 shadow-sm p-4 md:p-6 col-span-12 relative overflow-hidden"
      role="region"
      aria-label="Productividad con IA"
    >
      {/* Rayo tenue */}
      <div className="absolute inset-y-0 right-4 flex items-center opacity-5 pointer-events-none" aria-hidden>
        <svg width="100" height="100" viewBox="0 0 64 64" fill="none" stroke="currentColor" className="text-blue-600">
          <path d="M28 2 6 36h18l-6 26 32-40H34l6-20z" strokeWidth="6" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="flex items-center gap-4 md:gap-6 pr-24 md:pr-32">
        <div className="text-blue-600 font-extrabold leading-none" aria-live="polite" aria-atomic="true">
          <span className="text-4xl md:text-6xl">×{value}</span>
        </div>
        <p className="text-[14px] md:text-[16px] text-gray-800 md:text-gray-700">
          Acelera la productividad de tu equipo automatizando tareas manuales con IA
        </p>
      </div>
    </div>
  );
}

// CardsGrid: contenedor 12 columnas con gap coherente
function CardsGrid() {
  return (
    <div className="mt-10 md:mt-12 grid grid-cols-12 gap-4 md:gap-6 px-1">
      <div className="col-span-12 md:col-span-6">
        <InvoicesCard />
      </div>
      <div className="col-span-12 md:col-span-6">
        <StressedPhotoCard />
      </div>
      <ProductivityBanner />
    </div>
  );
}

export default function Home() {
  // Always start at the top when landing/refeshing the Home
  useEffect(() => {
    try {
      // Prevent browser from restoring previous scroll
      if (typeof history !== 'undefined' && 'scrollRestoration' in history) {
        // @ts-ignore
        history.scrollRestoration = 'manual';
      }
    } catch {}
    // Jump to top on mount
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }
  }, []);
  return (
    <main className="font-sans">
      {/* Hero Section */}
      <section id="home" className="relative pt-28 md:pt-36 pb-16 md:pb-24 px-6 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center text-center relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 leading-[1.05] mb-5">
                <span className="block">Automatiza la gestión de tus facturas</span>
                <span className="block"><span className="text-blue-600">con IA</span></span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 md:text-gray-500 mb-8 md:mb-10 leading-relaxed max-w-2xl mx-auto">
                Olvídate de perseguir documentos. Clerio extrae, organiza y entrega tus facturas listas para tu asesoría.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-3 justify-center items-center">
                <Link
                  href="#signup"
                  className="inline-flex items-center justify-center rounded-full bg-blue-600 text-white px-7 md:px-8 py-3 text-sm md:text-base font-semibold shadow-sm hover:shadow-md hover:bg-blue-700 transition"
                >
                  Prueba gratis Clerio
                </Link>
                <Link
                  href="#google-signin"
                  className="inline-flex items-center justify-center rounded-full bg-gray-900 text-white px-7 md:px-8 py-3 text-sm md:text-base font-semibold shadow-sm hover:shadow-md hover:bg-black transition"
                  aria-label="Sign in with Google"
                >
                  <span className="inline-flex items-center justify-center w-5 h-5 md:w-6 md:h-6 rounded bg-white text-gray-900 mr-2.5 font-bold">G</span>
                  Sign in with Google
                </Link>
              </div>
              
              {/* Floating benefit pills */}
              <div aria-hidden className="pointer-events-none absolute inset-0 z-10">
                {/* Left pill near heading (now Exportar) */}
                <div className="hidden md:flex items-center gap-2 bg-white rounded-full shadow-lg px-4 py-2 text-sm text-gray-900 absolute -left-12 lg:-left-24 top-20 lg:top-24 float-ud transform-gpu">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-gray-700">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/></svg>
                  </span>
                  <span>Exportar ZIP+CSV</span>
                </div>
                {/* Right pill near heading (moved down for spacing) */}
                <div className="hidden md:flex items-center gap-2 bg-white rounded-full shadow-lg px-4 py-2 text-sm text-gray-900 absolute -right-12 lg:-right-24 top-40 lg:top-48 float-ud-2 transform-gpu">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-600">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                  </span>
                  <span>Acceso para la asesoría</span>
                </div>
                {/* Right upper pill */}
                <div className="hidden md:flex items-center gap-2 bg-white rounded-full shadow-lg px-4 py-2 text-sm text-gray-900 absolute -right-16 lg:-right-28 top-14 lg:top-16 float-lr transform-gpu">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 text-amber-600">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4"/><path d="M12 18v4"/><path d="m4.93 4.93 2.83 2.83"/><path d="m16.24 16.24 2.83 2.83"/><path d="M2 12h4"/><path d="M18 12h4"/><path d="m4.93 19.07 2.83-2.83"/><path d="m16.24 7.76 2.83-2.83"/></svg>
                  </span>
                  <span>Duplicado detectado</span>
                </div>
                {/* Left pill aligned with buttons (now Factura clasificada) */}
                <div className="hidden md:flex items-center gap-2 bg-white rounded-full shadow-lg px-4 py-2 text-sm text-gray-900 absolute -left-12 lg:-left-24 top-52 lg:top-60 float-ud transform-gpu">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </span>
                  <span>Factura clasificada automáticamente</span>
                </div>
              </div>

              {/* Cards showcase under buttons (normalized grid) */}
              <CardsGrid />
            </motion.div>
          </div>
          
          {/* Inline features row (no pills, no heading) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 md:mt-14 text-center"
          >
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-5 text-sm md:text-base text-gray-900/80">
              <span className="inline-flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 12h-6l-2 3h-4l-2-3H2"/>
                  <path d="M5 12V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v7"/>
                  <path d="M12 12V7"/>
                  <path d="m9 10 3-3 3 3"/>
                </svg>
                <span>Escaneo de bandeja</span>
              </span>
              <span className="text-gray-300/70">•</span>
              <span className="inline-flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M2 12h20"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10"/>
                </svg>
                <span>Portales online</span>
              </span>
              <span className="text-gray-300/70">•</span>
              <span className="inline-flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M14 22h-4a2 2 0 0 1-2-2v-1H6a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h2v-1a2 2 0 0 1 2-2h1a2 2 0 1 0 0-4h-1"/>
                  <path d="M18 12h-1a2 2 0 0 0-2 2v1h-1a2 2 0 0 0-2 2v1"/>
                </svg>
                <span>Integraciones</span>
              </span>
              <span className="text-gray-300/70">•</span>
              <span className="inline-flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82A1.65 1.65 0 0 0 3 12.6H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9A1.65 1.65 0 0 0 10.6 3V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9A1.65 1.65 0 0 0 21 10.6H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                </svg>
                <span>Procesamiento con IA</span>
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problema: El trabajo manual sigue... (moved up) */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl mx-6 my-20">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            <div className="text-white">
              <h2 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
                El trabajo manual sigue frenando la colaboración entre empresa y asesoría
              </h2>
              <ul className="text-blue-100 text-lg leading-relaxed space-y-3 mb-8 list-disc pl-6">
                <li>Facturas repartidas en correos, carpetas y WhatsApps.</li>
                <li>Horas perdidas clasificando y buscando documentos.</li>
                <li>Asesorías saturadas en cierres y trimestres.</li>
              </ul>
              <Link
                href="#signup"
                className="inline-flex items-center justify-center rounded-full bg-white text-blue-600 px-8 py-3 text-lg font-semibold hover:bg-blue-50 transition"
              >
                Prueba gratis Clerio
              </Link>
            </div>

            {/* Dashboard mockup (Clerio) */}
            <div className="relative">
              <div className="bg-white/10 backdrop-blur rounded-2xl p-4 md:p-6">
                <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border border-gray-100">
                  {/* Tarjetas superiores */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-8 mb-4 md:mb-6">
                    {/* Izquierda: Documentos organizados automáticamente */}
                    <div className="rounded-2xl border border-gray-100 p-5 md:p-6 flex flex-col gap-3">
                      <div className="grid grid-cols-[auto,1fr] items-center gap-3 md:gap-4">
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-blue-50 text-blue-600">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7h5l2 2h11v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z"/><path d="M3 7V5a2 2 0 0 1 2-2h4l2 2h6"/></svg>
                        </span>
                        <div className="min-w-0">
                          <div className="text-sm text-gray-600">Documentos</div>
                          <div className="text-[15px] md:text-[16px] font-semibold text-gray-900 leading-snug whitespace-normal">Organizados automáticamente</div>
                        </div>
                      </div>
                      {/* Fila porcentaje, misma altura en ambas tarjetas */}
                      <div className="flex justify-end items-center mt-1">
                        <div className="text-2xl font-bold text-gray-900">100%</div>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 rounded-full" style={{width:'100%'}} />
                      </div>
                    </div>

                    {/* Derecha: Colaboración con asesoría */}
                    <div className="rounded-2xl border border-gray-100 p-5 md:p-6 flex flex-col gap-3">
                      <div className="grid grid-cols-[auto,1fr] items-center gap-3 md:gap-4">
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                        </span>
                        <div className="min-w-0">
                          <div className="text-sm text-gray-600">Colaboración</div>
                          <div className="text-[15px] md:text-[16px] font-semibold text-gray-900 leading-snug whitespace-normal">Con asesoría</div>
                        </div>
                      </div>
                      {/* Fila porcentaje, misma altura en ambas tarjetas */}
                      <div className="flex justify-end items-center mt-1">
                        <div className="text-2xl font-bold text-gray-900">85%</div>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{width:'85%'}} />
                      </div>
                    </div>
                  </div>

                  {/* Gráfico inferior */}
                  <div className="rounded-2xl border border-gray-100 p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-gray-900 font-semibold">Flujo de documentos</h4>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="inline-flex items-center gap-1 text-gray-600"><span className="w-3 h-1.5 bg-blue-300 rounded"/> Recibidas</div>
                        <div className="inline-flex items-center gap-1 text-gray-700"><span className="w-3 h-1.5 bg-blue-600 rounded"/> Procesadas por IA</div>
                      </div>
                    </div>
                    <div className="relative h-40 md:h-48">
                      {/* Grid de fondo */}
                      <div className="absolute inset-0 grid grid-cols-6">
                        {Array.from({length:6}).map((_,i)=> (
                          <div key={i} className="border-r border-gray-100" />
                        ))}
                      </div>
                      <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
                        {/* Recibidas (clara) */}
                        <polyline points="0,28 20,22 40,20 60,18 80,14 100,10" fill="none" stroke="#93c5fd" strokeWidth="2" />
                        {/* Procesadas por IA (oscura) */}
                        <polyline points="0,30 20,26 40,25 60,22 80,18 100,16" fill="none" stroke="#2563eb" strokeWidth="2.5" />
                      </svg>
                      {/* Línea base */}
                      <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-200" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sección sticky con KPIs y texto animado (estilo Tolvia) */}
      <ScrollTextWithStickyKPIs />

      {/* Sección con mockup (Solución) */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            {/* Mockup Clerio adaptado */}
            <div className="relative">
              <div className="bg-blue-50 rounded-2xl p-8">
                {/* Panel: Fuentes conectadas */}
                <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Fuentes conectadas</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <div className="w-8 h-8 bg-orange-100 rounded-full"></div>
                      <span className="text-sm text-gray-700">Correo</span>
                      <span className="text-sm text-gray-500">facturas@empresa.com</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <div className="w-8 h-8 bg-green-100 rounded-full"></div>
                      <span className="text-sm text-gray-700">Drive</span>
                      <span className="text-sm text-gray-500">Carpeta "Facturas 2025"</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                      <div className="w-8 h-8 bg-blue-100 rounded-full"></div>
                      <span className="text-sm text-gray-700">Portal proveedor</span>
                      <span className="text-sm text-gray-500">Amazon Business</span>
                    </div>
                  </div>
                </div>

                {/* Panel: Reglas de clasificación */}
                <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Reglas de clasificación</h4>
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <p className="text-sm text-gray-700">Aplicadas</p>
                    <div className="bg-blue-600 text-white rounded-lg px-3 py-2 mt-2 inline-block">
                      <p className="text-sm">Gasto recurrente ✓</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">Procesado automático por IA</p>
                </div>

                {/* Acciones */}
                <div className="flex gap-3">
                  <button className="flex items-center gap-2 bg-white rounded-lg px-4 py-2 shadow text-sm">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    Compartir con asesoría
                  </button>
                  <button className="flex items-center gap-2 bg-blue-600 text-white rounded-lg px-4 py-2 text-sm">
                    <div className="w-4 h-4 bg-white rounded"></div>
                    Exportar ZIP+CSV
                  </button>
                </div>

                {/* Panel de resumen de cierre */}
                <div className="bg-white rounded-xl p-6 shadow-lg mt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">Clerio</span>
                    </div>
                    <span className="text-sm text-gray-500">Cierre mensual</span>
                  </div>
                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-gray-700">248 facturas organizadas y listas. 12 duplicadas detectadas, 100% con proveedor, fecha, base, IVA y total.</p>
                    <p className="text-sm text-blue-600 underline">ver paquete.</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">Procesadas</div>
                    <div className="text-3xl font-bold text-gray-900">248 <span className="text-green-500 text-lg">↑52%</span></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contenido de texto (Solución) */}
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
                Un portal colaborativo que centraliza y automatiza todo el flujo documental
              </h2>
              <ul className="text-xl text-gray-600 mb-8 leading-relaxed space-y-3 list-disc pl-6">
                <li>Inbox inteligente que recoge facturas desde correo y plataformas.</li>
                <li>IA que extrae automáticamente proveedor, fecha, base, IVA e importe.</li>
                <li>Portal compartido donde tu asesoría accede y descarga paquetes listos.</li>
                <li>Búsqueda avanzada por número, importe, proveedor o periodo.</li>
              </ul>
              <Link
                href="#signup"
                className="inline-flex items-center justify-center rounded-full bg-blue-600 text-white px-8 py-3 text-lg font-semibold hover:bg-blue-700 transition"
              >
                Prueba gratis Clerio
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* KPIs de beneficios (estilo referencia) */}
      <KPIsShowcaseSection />

      {/* Sección equipos (inspirada en Projecty) */}
      <TeamsLikeSection />


      {/* Pricing */}
      <PricingSection />

      {/* Integraciones */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-blue-700 text-white relative overflow-hidden">
            <div className="px-8 py-20 text-center max-w-2xl mx-auto">
              <div className="text-xs uppercase tracking-widest text-blue-100 mb-2">Integraciones</div>
              <h3 className="text-3xl sm:text-4xl font-bold mb-4">Funciona con las herramientas que ya usas</h3>
              <p className="text-blue-100">Gmail, Outlook, Google Drive, Dropbox, Shopify, Amazon, Holded.</p>
            </div>
            {/* Iconos flotantes */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="hidden sm:block absolute left-16 top-16 bg-white/10 rounded-2xl p-3">
                <img src="/logos/drive.svg" alt="Drive" className="w-8 h-8" />
              </div>
              <div className="hidden sm:block absolute right-20 top-24 bg-white/10 rounded-2xl p-3">
                <img src="/logos/dropbox.svg" alt="Dropbox" className="w-8 h-8" />
              </div>
              <div className="hidden sm:block absolute left-24 bottom-16 bg-white/10 rounded-2xl p-3">
                <img src="/logos/aeat.svg" alt="AEAT" className="w-8 h-8" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-gray-50 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-10">
            <div className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600 mb-3">FAQ</div>
            <h3 className="text-3xl sm:text-4xl font-bold text-gray-900">Preguntas frecuentes</h3>
          </div>
          <div className="divide-y divide-gray-200 bg-white rounded-2xl border border-gray-100">
            {[
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
            ].map((f, i) => (
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

      {/* CTA final */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-5xl text-center">
          <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Automatiza la gestión documental y colabora con tu asesoría</h3>
          <p className="text-gray-600 mb-8">Empieza gratis y conecta tus fuentes en minutos.</p>
          <Link href="#demo" className="inline-flex items-center justify-center rounded-full bg-blue-600 text-white px-6 py-3 text-sm font-medium hover:bg-blue-700 transition">
            Solicitar acceso
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 pb-10">
        <div className="mx-auto max-w-7xl rounded-3xl overflow-hidden">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white">
            <div className="px-8 pt-12 pb-10 grid md:grid-cols-3 gap-10">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-bold">Clerio</span>
                </div>
                <p className="text-blue-100 text-sm">Clerio — Automatiza la gestión documental y colabora con tu asesoría.</p>
              </div>
              <div>
                <h5 className="font-semibold mb-3">Contacto</h5>
                <ul className="space-y-2 text-sm text-blue-100">
                  <li>contact@ascendsolutions.es</li>
                  <li>+34 625 97 85 76</li>
                  <li>Barcelona, España</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold mb-3">Legal</h5>
                <ul className="space-y-2 text-sm text-blue-100">
                  <li><a href="#features">Características</a> · <a href="#pricing">Precios</a></li>
                  <li><a href="#privacy">Privacidad</a> · <a href="#terms">Términos</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-white/10 px-8 py-4 text-xs text-blue-100 flex items-center justify-between">
              <span>© {new Date().getFullYear()} Clerio.</span>
          
            </div>
          </div>
        </div>
      </footer>
      </main>
    );
}
