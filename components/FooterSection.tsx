"use client";

import Image from "next/image";
import { loginUrl } from "@/lib/pricing-plans";

const generalLinks = [
  "Inicio",
  "Productos",
  "Integraciones",
  "Clientes",
  "Pricing",
];

const resourceLinks = [
  "Preguntas Frecuentes",
  "Centro de ayuda",
  "Sobre nosotros",
  "Contacto",
];

const legalLinks = [
  "Política de privacidad",
  "Términos y condiciones",
  "Política de cookies",
  "Aviso legal",
];

function SocialIcon({ label, d }: { label: string; d: string }) {
  return (
    <span
      aria-label={label}
      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#d8dfea] bg-white text-[#4a5565] shadow-[0_6px_14px_rgba(15,23,42,0.04)] transition-colors"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d={d} />
      </svg>
    </span>
  );
}

export default function FooterSection() {
  return (
    <section className="px-4 pb-8 pt-0 sm:px-6 sm:pb-10">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-[32px] px-6 py-7 text-center sm:px-10 sm:py-8">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_48%,rgba(129,168,255,0.52)_0%,rgba(129,168,255,0.18)_32%,rgba(247,247,248,0)_66%)]" />
          <div className="pointer-events-none absolute left-1/2 top-[78%] -z-10 h-[240px] w-[86%] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(88,140,255,0.44)_0%,rgba(88,140,255,0.16)_38%,rgba(88,140,255,0)_72%)] blur-[42px]" />

          <h2 className="mx-auto max-w-[22ch] text-[30px] font-medium leading-[1.08] tracking-[-0.03em] text-[#0d1117] sm:text-[44px]">
            ¿Listo para dejar de perder tiempo con tus facturas?
          </h2>

          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <span className="inline-flex h-11 items-center justify-center rounded-md bg-[#1f73f1] px-6 text-[14px] font-semibold text-white shadow-[0_16px_34px_rgba(31,115,241,0.26)]">
              Prueba gratis Clerio →
            </span>
            <a
              href={loginUrl}
              className="inline-flex h-11 items-center justify-center whitespace-nowrap rounded-md border border-[#1f73f1] bg-white/95 px-6 text-[14px] font-medium text-[#1f2a37] shadow-[0_2px_10px_rgba(31,115,241,0.18)] backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-[1px] hover:bg-white hover:shadow-[0_10px_20px_rgba(31,115,241,0.24)]"
            >
              Iniciar sesión
            </a>
          </div>
        </div>

        <div className="relative mt-4 rounded-[32px] bg-[#eceff3] px-6 py-8 sm:px-10 sm:py-9">
          <div className="pointer-events-none absolute left-1/2 top-0 -z-0 h-[180px] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(88,140,255,0.3)_0%,rgba(88,140,255,0.12)_42%,rgba(88,140,255,0)_74%)] blur-[48px]" />

          <div className="relative z-10 grid items-start gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,2fr)]">
            <div className="flex items-start">
              <Image
                src="/logos/logo_clerio.png"
                alt="Clerio"
                width={36}
                height={36}
                className="h-9 w-auto"
              />
            </div>

            <div className="grid w-full grid-cols-2 items-start gap-6 sm:ml-auto sm:max-w-[420px] sm:gap-10">
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#6a7383]">General</p>
                <ul className="mt-4 space-y-3 text-[14px] text-[#1f2a37]">
                  {generalLinks.map((item) => (
                    <li key={item} className="cursor-default select-none">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#6a7383]">Recursos</p>
                <ul className="mt-4 space-y-3 text-[14px] text-[#1f2a37]">
                  {resourceLinks.map((item) => (
                    <li key={item} className="cursor-default select-none">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-8 flex flex-col gap-6 border-t border-[#d8dde5] pt-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] text-[#6a7383]">
              <span>© {new Date().getFullYear()} Clerio</span>
              {legalLinks.map((item) => (
                <span key={item} className="cursor-default select-none">
                  {item}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <SocialIcon
                label="LinkedIn"
                d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.05-1.86-3.05-1.86 0-2.15 1.45-2.15 2.95v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.63-1.86 3.36-1.86 3.59 0 4.25 2.36 4.25 5.43v6.32zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.11 20.45H3.56V9H7.1v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"
              />
              <SocialIcon
                label="WhatsApp"
                d="M19.11 4.9A9.81 9.81 0 0 0 12.02 2C6.55 2 2.1 6.45 2.1 11.92c0 1.75.46 3.45 1.33 4.95L2 22l5.26-1.38a9.9 9.9 0 0 0 4.75 1.21h.01c5.47 0 9.92-4.45 9.92-9.92 0-2.65-1.03-5.14-2.83-7.01zm-7.09 15.26h-.01a8.24 8.24 0 0 1-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.27-4.38c0-4.54 3.7-8.24 8.26-8.24 2.2 0 4.27.86 5.83 2.42a8.2 8.2 0 0 1 2.42 5.83c0 4.55-3.7 8.25-8.24 8.25zm4.52-6.18c-.25-.12-1.47-.72-1.7-.81-.23-.08-.4-.12-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.04-.38-1.98-1.22a7.4 7.4 0 0 1-1.37-1.71c-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.42h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.09 0 1.23.9 2.42 1.03 2.59.13.17 1.78 2.72 4.3 3.82.6.26 1.07.42 1.44.54.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.29z"
              />
              <SocialIcon
                label="Instagram"
                d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.22.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.05.41 2.22.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.22-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.05.36-2.22.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.22-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.36-1.05-.41-2.22C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.22.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.05-.36 2.22-.41C8.42 2.17 8.8 2.16 12 2.16zm0-2.16C8.74 0 8.33.01 7.05.07 5.78.13 4.9.34 4.14.64 3.35.95 2.68 1.37 2.01 2.04 1.34 2.71.92 3.38.61 4.17c-.3.76-.51 1.64-.57 2.91C-.01 8.36 0 8.77 0 12s.01 3.64.07 4.92c.06 1.27.27 2.15.57 2.91.31.79.73 1.46 1.4 2.13.67.67 1.34 1.09 2.13 1.4.76.3 1.64.51 2.91.57 1.28.06 1.69.07 4.92.07s3.64-.01 4.92-.07c1.27-.06 2.15-.27 2.91-.57.79-.31 1.46-.73 2.13-1.4.67-.67 1.09-1.34 1.4-2.13.3-.76.51-1.64.57-2.91.06-1.28.07-1.69.07-4.92s-.01-3.64-.07-4.92c-.06-1.27-.27-2.15-.57-2.91a5.88 5.88 0 0 0-1.4-2.13A5.88 5.88 0 0 0 19.83.64C19.07.34 18.19.13 16.92.07 15.64.01 15.23 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"
              />
              <SocialIcon
                label="Facebook"
                d="M22.68 0H1.32C.59 0 0 .59 0 1.32v21.36C0 23.41.59 24 1.32 24h11.5v-9.29H9.69v-3.62h3.13V8.41c0-3.1 1.89-4.79 4.66-4.79 1.33 0 2.47.1 2.8.14v3.25l-1.92.01c-1.5 0-1.8.72-1.8 1.77v2.31h3.59l-.47 3.62h-3.12V24h6.12c.73 0 1.32-.59 1.32-1.32V1.32C24 .59 23.41 0 22.68 0z"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
