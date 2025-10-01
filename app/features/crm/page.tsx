"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function CRM() {
  return (
    <main className="mx-auto max-w-7xl px-6 pt-28 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-semibold tracking-tight">CRM</h1>
        <p className="mt-3 text-neutral-600 max-w-2xl">
          Gestiona oportunidades, pipeline unificado y seguimiento de clientes. 
          Integrado con facturación y contabilidad para una visión 360°.
        </p>
      </motion.div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-2xl border border-neutral-200 p-6 bg-white"
        >
          <div className="font-medium text-neutral-900">Pipeline de ventas</div>
          <p className="mt-2 text-sm text-neutral-600">
            Visualiza oportunidades por etapas, probabilidades de cierre y previsiones de ingresos.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-2xl border border-neutral-200 p-6 bg-white"
        >
          <div className="font-medium text-neutral-900">Gestión de contactos</div>
          <p className="mt-2 text-sm text-neutral-600">
            Base de datos centralizada con historial completo de interacciones y documentos asociados.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="rounded-2xl border border-neutral-200 p-6 bg-white"
        >
          <div className="font-medium text-neutral-900">Automatización de seguimiento</div>
          <p className="mt-2 text-sm text-neutral-600">
            Recordatorios automáticos, secuencias de email y tareas programadas para no perder oportunidades.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="rounded-2xl border border-neutral-200 p-6 bg-white"
        >
          <div className="font-medium text-neutral-900">Reportes y analytics</div>
          <p className="mt-2 text-sm text-neutral-600">
            Métricas de conversión, análisis de rendimiento comercial y dashboards personalizables.
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
          Solicitar demo de CRM
        </Link>
      </motion.div>
    </main>
  );
}
