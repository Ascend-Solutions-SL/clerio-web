"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Projects() {
  return (
    <main className="mx-auto max-w-7xl px-6 pt-28 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-semibold tracking-tight">Proyectos</h1>
        <p className="mt-3 text-neutral-600 max-w-2xl">
          Planifica, ejecuta y mide la rentabilidad de proyectos. 
          Control de tiempos, costes y márgenes en tiempo real.
        </p>
      </motion.div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-2xl border border-neutral-200 p-6 bg-white"
        >
          <div className="font-medium text-neutral-900">Planificación y seguimiento</div>
          <p className="mt-2 text-sm text-neutral-600">
            Crea proyectos con fases, tareas y dependencias. Seguimiento de progreso y alertas de desviaciones.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-2xl border border-neutral-200 p-6 bg-white"
        >
          <div className="font-medium text-neutral-900">Control de tiempos</div>
          <p className="mt-2 text-sm text-neutral-600">
            Registro de horas por proyecto y tarea. Integración con facturación por horas trabajadas.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="rounded-2xl border border-neutral-200 p-6 bg-white"
        >
          <div className="font-medium text-neutral-900">Análisis de rentabilidad</div>
          <p className="mt-2 text-sm text-neutral-600">
            Calcula márgenes reales comparando ingresos vs costes de personal y recursos utilizados.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="rounded-2xl border border-neutral-200 p-6 bg-white"
        >
          <div className="font-medium text-neutral-900">Colaboración en equipo</div>
          <p className="mt-2 text-sm text-neutral-600">
            Asignación de tareas, comentarios, archivos compartidos y notificaciones automáticas.
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
          Solicitar demo de Proyectos
        </Link>
      </motion.div>
    </main>
  );
}
