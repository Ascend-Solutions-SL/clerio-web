"use client";
import { motion } from "framer-motion";
import { useState } from "react";

export default function DemoPage() {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [companySize, setCompanySize] = useState("");

  const features = [
    { id: "accounting", name: "Contabilidad con IA", desc: "Automatización de asientos contables" },
    { id: "invoicing", name: "Facturación", desc: "Creación y envío automático" },
    { id: "treasury", name: "Tesorería", desc: "Conexión bancaria y cashflow" },
    { id: "aeat", name: "Modelos AEAT", desc: "Generación automática de formularios" },
  ];

  const toggleFeature = (featureId: string) => {
    setSelectedFeatures(prev => 
      prev.includes(featureId) 
        ? prev.filter(id => id !== featureId)
        : [...prev, featureId]
    );
  };

  return (
    <main className="mx-auto max-w-4xl px-6 pt-28 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="text-4xl font-semibold tracking-tight">Solicita una demo personalizada</h1>
        <p className="mt-3 text-neutral-600">Cuéntanos sobre tu gestoría y te mostraremos cómo Clerio puede ayudarte</p>
      </motion.div>

      <div className="mt-12 grid lg:grid-cols-2 gap-12">
        {/* Formulario */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <form method="post" action="/api/demo" className="space-y-6">
            <div className="grid gap-2">
              <label htmlFor="name" className="text-sm font-medium text-neutral-700">Nombre completo</label>
              <input 
                id="name" 
                name="name" 
                required 
                className="h-11 rounded-xl border border-neutral-300 px-3 outline-none focus:ring-2 focus:ring-[--color-accent] focus:border-transparent transition" 
                placeholder="Tu nombre"
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="email" className="text-sm font-medium text-neutral-700">Email profesional</label>
              <input 
                id="email" 
                name="email" 
                type="email" 
                required 
                className="h-11 rounded-xl border border-neutral-300 px-3 outline-none focus:ring-2 focus:ring-[--color-accent] focus:border-transparent transition" 
                placeholder="tu@gestoria.com"
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="company" className="text-sm font-medium text-neutral-700">Nombre de la gestoría</label>
              <input 
                id="company" 
                name="company" 
                className="h-11 rounded-xl border border-neutral-300 px-3 outline-none focus:ring-2 focus:ring-[--color-accent] focus:border-transparent transition" 
                placeholder="Gestoría ABC"
              />
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium text-neutral-700">Tamaño de la empresa</label>
              <div className="grid grid-cols-2 gap-2">
                {["1-5 empleados", "6-20 empleados", "21-50 empleados", "50+ empleados"].map((size) => (
                  <label key={size} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="company_size"
                      value={size}
                      checked={companySize === size}
                      onChange={(e) => setCompanySize(e.target.value)}
                      className="text-[--color-accent] focus:ring-[--color-accent]"
                    />
                    <span className="text-sm text-neutral-700">{size}</span>
                  </label>
                ))}
              </div>
            </div>

            <input type="hidden" name="selected_features" value={selectedFeatures.join(",")} />
            
            <button 
              type="submit" 
              className="w-full inline-flex items-center justify-center rounded-full bg-[--color-accent] text-[--color-accent-foreground] px-6 py-3 text-sm font-medium hover:brightness-95 transition"
            >
              Solicitar demo personalizada
            </button>
          </form>
        </motion.div>

        {/* Selector de funcionalidades */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-lg font-medium text-neutral-900 mb-4">¿Qué funcionalidades te interesan más?</h3>
          <div className="space-y-3">
            {features.map((feature) => (
              <div
                key={feature.id}
                onClick={() => toggleFeature(feature.id)}
                className={`p-4 rounded-xl border cursor-pointer transition ${
                  selectedFeatures.includes(feature.id)
                    ? "border-[--color-accent] bg-[--color-accent]/5"
                    : "border-neutral-200 hover:border-neutral-300"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`mt-1 h-4 w-4 rounded border-2 flex items-center justify-center transition ${
                    selectedFeatures.includes(feature.id)
                      ? "border-[--color-accent] bg-[--color-accent]"
                      : "border-neutral-300"
                  }`}>
                    {selectedFeatures.includes(feature.id) && (
                      <svg className="h-2.5 w-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-neutral-900">{feature.name}</div>
                    <div className="text-sm text-neutral-600">{feature.desc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-neutral-50 rounded-xl">
            <div className="text-sm text-neutral-600">
              <strong>¿Qué incluye la demo?</strong>
              <ul className="mt-2 space-y-1">
                <li>• Sesión personalizada de 30 minutos</li>
                <li>• Demostración con tus datos de prueba</li>
                <li>• Análisis de ROI para tu gestoría</li>
                <li>• Plan de implementación detallado</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

