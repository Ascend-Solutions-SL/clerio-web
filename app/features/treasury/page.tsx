"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Treasury() {
  return (
    <main className="mx-auto max-w-7xl px-6 pt-28 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-semibold tracking-tight">Tesorería</h1>
        <p className="mt-3 text-neutral-600 max-w-2xl">
          Conecta bancos, visualiza cashflow en tiempo real y automatiza conciliaciones. 
          Control total de la liquidez de tus clientes.
        </p>
      </motion.div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-2xl border border-neutral-200 p-6 bg-white"
        >
          <div className="font-medium text-neutral-900">Conexión bancaria</div>
          <p className="mt-2 text-sm text-neutral-600">
            Conecta múltiples bancos con PSD2. Importación automática de movimientos y categorización inteligente.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-2xl border border-neutral-200 p-6 bg-white"
        >
          <div className="font-medium text-neutral-900">Cashflow predictivo</div>
          <p className="mt-2 text-sm text-neutral-600">
            Proyecciones de tesorería basadas en facturas pendientes, gastos recurrentes y patrones históricos.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="rounded-2xl border border-neutral-200 p-6 bg-white"
        >
          <div className="font-medium text-neutral-900">Conciliación automática</div>
          <p className="mt-2 text-sm text-neutral-600">
            Matching inteligente entre movimientos bancarios y facturas. Reduce el trabajo manual al mínimo.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="rounded-2xl border border-neutral-200 p-6 bg-white"
        >
          <div className="font-medium text-neutral-900">Alertas y reportes</div>
          <p className="mt-2 text-sm text-neutral-600">
            Notificaciones de saldos bajos, vencimientos y reportes automáticos para cada cliente.
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-12 text-center"
      >
        <Link
          href="/demo"
          className="inline-flex items-center justify-center rounded-full bg-[--color-accent] text-[--color-accent-foreground] px-6 py-3 text-sm font-medium hover:brightness-95 transition"
        >
          Solicitar demo de Tesorería
        </Link>
      </motion.div>
    </main>
  );
}
