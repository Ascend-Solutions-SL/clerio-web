"use client";
import Link from "next/link";

export default function Header() {

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white">
      <div className="mx-auto max-w-screen-2xl px-6 h-16 flex items-center relative">
        {/* Left: Logo */}
        <div className="shrink-0">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900">Clerio</span>
          </Link>
        </div>

        {/* Center: Nav (truly centered) */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <nav className="hidden md:block">
            <ul className="flex items-center gap-8 text-sm text-gray-700">
              <li><a href="#home" className="hover:text-gray-900">Inicio</a></li>
              <li><a href="#about" className="hover:text-gray-900">Sobre nosotros</a></li>
              <li><a href="#pricing" className="hover:text-gray-900">Pricing</a></li>
              <li><a href="#how" className="hover:text-gray-900">Cómo funciona</a></li>
            </ul>
          </nav>
        </div>

        {/* Right: Actions pinned */}
        <div className="shrink-0 flex items-center gap-3 md:gap-4 ml-auto">
          <Link
            href="/login"
            className="inline-flex items-center justify-center rounded-full border border-blue-600 text-blue-600 px-6 py-2.5 text-sm font-medium hover:bg-blue-50 transition"
          >
            Acceder
          </Link>
          <Link
            href="#demo"
            className="inline-flex items-center justify-center rounded-full bg-blue-600 text-white px-6 py-2.5 text-sm font-medium hover:bg-blue-700 transition"
          >
            Solicitar demo
          </Link>
        </div>
      </div>
    </header>
  );
}

