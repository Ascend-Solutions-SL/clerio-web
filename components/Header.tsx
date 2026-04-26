"use client";

import { useState } from "react";

export default function Header() {
  const navItems = ["Inicio", "Productos", "Integraciones", "Recursos", "Clientes", "Pricing"];
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-[#f7f7f8]">
      <div className="container-page-header px-4 sm:px-6 lg:px-8 pt-2">
        <div className="h-6 rounded-full bg-[#c7dcf7] text-[11px] sm:text-[12px] text-[#3a4b63] flex items-center justify-center relative px-8 text-center">
          <span>
            Consigue 2 meses gratis con tu plan <span className="font-semibold italic">anual</span>
          </span>
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#66768f]">×</span>
        </div>
      </div>

      <div className="container-page-header px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center relative">
        <div className="shrink-0 mr-3">
          <img src="/logos/logo_clerio.png" alt="Clerio" className="h-8 w-auto" />
        </div>

        <nav className="hidden min-[900px]:flex flex-1 items-center justify-center min-w-0">
          <ul className="flex items-center gap-4 xl:gap-7 text-[12px] xl:text-[13px] text-[#1b2430] whitespace-nowrap">
            {navItems.map((item) => (
              <li key={item} className="cursor-default select-none">
                {item}
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden min-[900px]:flex shrink-0 items-center gap-2 transition-all duration-300 ease-out min-[900px]:opacity-100 min-[900px]:translate-x-0 max-[899px]:opacity-0 max-[899px]:translate-x-2 max-[899px]:pointer-events-none">
          <a
            href="https://app.clerio.es/login"
            className="inline-flex h-8 items-center justify-center whitespace-nowrap rounded-md border border-[#1f73f1] bg-white/90 px-3.5 text-[12px] xl:text-[13px] font-medium text-[#1f2a37] shadow-[0_2px_10px_rgba(31,115,241,0.2)] backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-[1px] hover:bg-white hover:shadow-[0_10px_20px_rgba(31,115,241,0.24)]"
          >
            Iniciar sesión
          </a>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md bg-[#1f73f1] text-white px-3 h-8 text-[12px] xl:text-[13px] font-semibold whitespace-nowrap"
          >
            Solicitar demo
          </button>
        </div>

        <div className="ml-auto flex items-center gap-2 transition-all duration-300 ease-out min-[900px]:w-0 min-[900px]:overflow-hidden min-[900px]:opacity-0 min-[900px]:translate-x-2 min-[900px]:pointer-events-none max-[899px]:w-auto max-[899px]:opacity-100 max-[899px]:translate-x-0">
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className={`inline-flex h-8 w-10 items-center justify-center rounded-md border bg-white/80 text-[#1f2a37] backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              menuOpen
                ? "border-[#1f73f1] bg-white shadow-[0_8px_24px_rgba(31,115,241,0.28)]"
                : "border-[#1f73f1]/45 shadow-[0_2px_10px_rgba(31,115,241,0.16)] hover:border-[#1f73f1]/80 hover:shadow-[0_6px_18px_rgba(31,115,241,0.22)]"
            }`}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            <span className="sr-only">Menú</span>
            <span className="relative block h-3.5 w-4">
              <span
                className={`absolute left-0 block h-[2px] w-4 rounded-full bg-current transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  menuOpen ? "top-[6px] rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-[6px] block h-[2px] w-4 rounded-full bg-current transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  menuOpen ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-[2px] w-4 rounded-full bg-current transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  menuOpen ? "top-[6px] -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
          <a
            href="https://app.clerio.es/login"
            className="inline-flex h-8 items-center justify-center whitespace-nowrap rounded-md border border-[#1f73f1] bg-white/90 px-3.5 text-[13px] font-medium text-[#1f2a37] shadow-[0_2px_10px_rgba(31,115,241,0.2)] backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-[1px] hover:bg-white hover:shadow-[0_10px_20px_rgba(31,115,241,0.24)]"
          >
            Iniciar sesión
          </a>
        </div>

        <div
          id="mobile-menu"
          aria-hidden={!menuOpen}
          className={`absolute top-full right-4 mt-2 w-56 origin-top rounded-xl border border-[#d8e7ff] bg-white/95 p-2 shadow-[0_18px_44px_rgba(10,35,80,0.2)] backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] min-[900px]:hidden ${
            menuOpen
              ? "visible translate-y-0 scale-100 opacity-100 blur-0"
              : "invisible -translate-y-3 scale-[0.94] opacity-0 blur-[2px] pointer-events-none"
          }`}
        >
          <ul className="space-y-1 py-1">
            {navItems.map((item, index) => (
              <li
                key={item}
                className={`rounded-md px-3 py-2 text-[13px] text-[#1b2430] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[#eef4ff] hover:text-[#174ea6] ${
                  menuOpen ? "translate-x-0 translate-y-0 opacity-100 blur-0" : "translate-x-2 translate-y-1 opacity-0 blur-[2px]"
                }`}
                style={{ transitionDelay: `${menuOpen ? 80 + index * 55 : 0}ms` }}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}

