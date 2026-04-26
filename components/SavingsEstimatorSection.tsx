"use client";

import { type ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { getPricingPlanFeatures, getRecommendedPlan, loginUrl, pricingPlans, type PricingPlan } from "@/lib/pricing-plans";

const invoiceLevels = [50, 100, 200, 300, 400, 500, 1000] as const;

function formatHours(hours: number, withDecimal = false) {
  return withDecimal ? `${hours.toFixed(1)}h` : `${Math.round(hours)}h`;
}

function SliderField({
  label,
  valueLabel,
  minLabel,
  maxLabel,
  percentage,
  markerPosition,
  markerLabel,
  children,
}: {
  label: string;
  valueLabel: string;
  minLabel: string;
  maxLabel: string;
  percentage: number;
  markerPosition?: number;
  markerLabel?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <p className="min-w-0 flex-1 pr-2 text-[12px] font-medium leading-[1.35] tracking-[-0.01em] text-[#141c2b] sm:text-[13px]">{label}</p>
        <span className="shrink-0 rounded-[8px] border border-[#dbe5f3] bg-[linear-gradient(180deg,#ffffff_0%,#f5f8fc_100%)] px-2.5 py-1 text-[11px] font-semibold text-[#1b2a42] shadow-[0_6px_14px_rgba(15,23,42,0.05)] sm:text-[12px]">
          {valueLabel}
        </span>
      </div>

      <div className="mt-3">
        <div className="relative">
          <div className="pointer-events-none absolute left-0 right-0 top-1/2 h-[6px] -translate-y-1/2 rounded-full bg-[#e6ecf5]" />
          <div
            className="pointer-events-none absolute left-0 top-1/2 h-[6px] -translate-y-1/2 rounded-full bg-[linear-gradient(90deg,#1f73f1_0%,#67a6ff_100%)] shadow-[0_6px_20px_rgba(31,115,241,0.22)]"
            style={{ width: `${percentage}%` }}
          />
          {markerPosition != null ? (
            <div
              className="pointer-events-none absolute top-full mt-1 text-[10px] font-medium text-[#8a96a8]"
              style={{ left: `calc(${markerPosition}% + ${(10 - markerPosition / 5).toFixed(2)}px - 4px)` }}
            >
              ↳ {markerLabel}
            </div>
          ) : null}
          {children}
        </div>

        <div className={`flex items-center justify-between text-[12px] font-medium text-[#8893a3] ${markerPosition != null ? "mt-6" : "mt-3"}`}>
          <span>{minLabel}</span>
          <span>{maxLabel}</span>
        </div>
      </div>
    </div>
  );
}

function ResultRow({
  label,
  value,
  highlighted = false,
  prefix,
}: {
  label: string;
  value: string;
  highlighted?: boolean;
  prefix?: ReactNode;
}) {
  return (
    <div className={`flex items-start justify-between gap-4 rounded-[18px] px-4 py-3 ${highlighted ? "bg-[linear-gradient(180deg,rgba(245,249,255,0.95)_0%,rgba(238,245,255,0.92)_100%)]" : "bg-white/58"}`}>
      <div>
        <p className="text-[13px] leading-[1.4] text-[#293243] sm:whitespace-nowrap sm:text-[14px]">{label}</p>
      </div>
      <div className="flex shrink-0 items-center gap-2.5">
        {prefix}
        <p className="text-[22px] font-semibold leading-none tracking-[-0.05em] text-[#101828] sm:text-[26px]">{value}</p>
      </div>
    </div>
  );
}

function FeatureRow({ label, included }: { label: string; included: boolean }) {
  return (
    <li className={`flex items-start gap-2.5 text-[14px] leading-[1.45] ${included ? "text-[#1a2232]" : "text-[#a2a9b5]"}`}>
      <span className={`mt-[1px] text-[15px] font-semibold ${included ? "text-[#ff980f]" : "opacity-0"}`}>✓</span>
      <span>{label}</span>
    </li>
  );
}

function RecommendationCard({ plan, invoiceCount }: { plan: PricingPlan; invoiceCount: number }) {
  const highestInvoiceLimit = pricingPlans[pricingPlans.length - 1].invoiceLimit;
  const exceedsCatalog = invoiceCount > highestInvoiceLimit;
  const includedFeatures = getPricingPlanFeatures(plan).filter((feature) => feature.included).slice(0, 4);

  return (
    <div>
      <p className="mb-3 text-[14px] font-semibold leading-[1.4] text-[#1f2937] sm:text-[15px]">El paquete adecuado según tus necesidades</p>

      <div className="statement-reveal rounded-[24px] border border-[#e1e9f4] bg-[linear-gradient(180deg,rgba(255,255,255,0.94)_0%,rgba(248,250,253,0.96)_100%)] p-3 shadow-[0_16px_38px_rgba(15,23,42,0.06)]">
      <div className={`rounded-[20px] px-4 py-4 sm:px-5 ${plan.accentClass}`}>
        <div className="grid gap-4 md:grid-cols-[minmax(0,0.7fr)_minmax(0,1fr)] md:items-start">
          <div className="min-w-0">
            <p className="text-[24px] font-medium tracking-[-0.04em] text-[#101828] sm:text-[28px]">{plan.name}</p>
            <div className="mt-4 flex items-end gap-2 text-[#101828]">
              <span className="text-[34px] font-semibold leading-none tracking-[-0.05em] sm:text-[40px]">{plan.monthlyPrice}€</span>
              <span className="pb-1 text-[13px] font-medium text-[#5d6778]">al mes</span>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-[12px] font-semibold text-[#425268]">
              <span className="rounded-full border border-white/70 bg-white/72 px-3 py-1 shadow-[0_6px_14px_rgba(15,23,42,0.04)]">{plan.annualPrice}€/mes anual</span>
            </div>
          </div>

          <div className="flex flex-col items-start gap-2 md:pt-1">
            {plan.featured ? (
              <span className="rounded-full bg-white/82 px-3 py-1 text-[10px] font-semibold text-[#425268] shadow-[0_8px_20px_rgba(15,23,42,0.08)]">
                más popular
              </span>
            ) : null}

            <p className="text-[13px] font-semibold text-[#344255]">Incluye:</p>

              <ul className="grid gap-1.5 text-[12px] text-[#344255] sm:text-[13px]">
                {includedFeatures.map((feature) => (
                  <FeatureRow key={`${plan.id}-${feature.label}`} label={feature.label} included={feature.included} />
                ))}
              </ul>

              {exceedsCatalog ? (
                <span className="rounded-full border border-white/70 bg-white/78 px-3 py-1 text-[12px] font-semibold text-[#1f5dc9] shadow-[0_6px_14px_rgba(15,23,42,0.04)]">
                  Consultar volumen superior
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SavingsEstimatorSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const hasRevealedRef = useRef(false);
  const [isVisible, setIsVisible] = useState(false);
  const [invoiceIndex, setInvoiceIndex] = useState(3);
  const [avgMinutes, setAvgMinutes] = useState(5);
  const [peopleCount, setPeopleCount] = useState(1);
  const [hourlyRate, setHourlyRate] = useState(15);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!hasRevealedRef.current && entry.isIntersecting) {
          hasRevealedRef.current = true;
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "-8% 0px -12% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const invoiceCount = invoiceLevels[invoiceIndex];

  const {
    recommendedPlan,
    manualHours,
    clerioHours,
    savingsPercent,
  } = useMemo(() => {
    const currentManualHours = (invoiceCount * avgMinutes) / 60;
    const currentClerioHours = (invoiceCount * 10) / 3600;
    const currentSavingsPercent = currentManualHours > 0 ? Math.round(((currentManualHours - currentClerioHours) / currentManualHours) * 100) : 0;

    return {
      recommendedPlan: getRecommendedPlan(invoiceCount),
      manualHours: currentManualHours,
      clerioHours: currentClerioHours,
      savingsPercent: currentSavingsPercent,
    };
  }, [avgMinutes, invoiceCount]);

  const invoicePercentage = (invoiceIndex / (invoiceLevels.length - 1)) * 100;
  const minutesPercentage = ((avgMinutes - 1) / 9) * 100;
  const peoplePercentage = ((peopleCount - 1) / 2) * 100;

  return (
    <section ref={sectionRef} className="px-4 pt-4 pb-10 sm:px-6 sm:pt-6 sm:pb-14">
      <div
        className={`mx-auto max-w-6xl transition-all duration-[950ms] [transition-timing-function:cubic-bezier(0.2,0.75,0.2,1)] ${
          isVisible ? "translate-y-0 opacity-100 blur-0" : "translate-y-8 opacity-0 blur-[6px]"
        }`}
      >
        <div className="text-center">
          <div className="inline-flex items-center rounded-[8px] border border-[#bcc4d1] px-3 py-1 text-[13px] font-medium text-[#3d4655]">
            <span className="mr-2 h-1.5 w-1.5 rounded-full bg-[#4e8fff]" />
            Simulador de ahorro
          </div>

          <h2 className="mx-auto mt-4 max-w-3xl text-[28px] font-medium leading-[1.08] tracking-[-0.03em] text-[#101828] sm:text-[36px]">
            Calcula en segundos el impacto real de Clerio
          </h2>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-[0.96fr_1.04fr] lg:items-start">
          <div className="h-full rounded-[30px] border border-[#e7edf5] bg-white/92 p-4 shadow-[0_20px_56px_rgba(15,23,42,0.05)] ring-1 ring-white/80 backdrop-blur-sm sm:p-5">
            <div className="grid gap-4">
              <SliderField
                label="¿Cuántas facturas procesa tu empresa al mes? (como máximo)"
                valueLabel={invoiceCount === 1000 ? "+1000" : `${invoiceCount}`}
                minLabel="50"
                maxLabel="+1000"
                percentage={invoicePercentage}
              >
                <input
                  type="range"
                  min={0}
                  max={invoiceLevels.length - 1}
                  step={1}
                  value={invoiceIndex}
                  onChange={(event) => setInvoiceIndex(Number(event.target.value))}
                  className="estimator-slider relative z-10 w-full"
                />
              </SliderField>

              <SliderField
                label="¿Cuánto tarda en promedio una persona en procesar una factura?"
                valueLabel={`${avgMinutes} min`}
                minLabel="1 min"
                maxLabel="10 min"
                percentage={minutesPercentage}
                markerPosition={((5 - 1) / 9) * 100}
                markerLabel="media observada"
              >
                <input
                  type="range"
                  min={1}
                  max={10}
                  step={1}
                  value={avgMinutes}
                  onChange={(event) => setAvgMinutes(Number(event.target.value))}
                  className="estimator-slider relative z-10 w-full"
                />
              </SliderField>

              <SliderField
                label="¿Cuántas personas trabajan recogiendo y procesando facturas?"
                valueLabel={`${peopleCount}`}
                minLabel="1"
                maxLabel="3"
                percentage={peoplePercentage}
              >
                <input
                  type="range"
                  min={1}
                  max={3}
                  step={1}
                  value={peopleCount}
                  onChange={(event) => setPeopleCount(Number(event.target.value))}
                  className="estimator-slider relative z-10 w-full"
                />
              </SliderField>

              <SliderField
                label="¿Cuál es el salario medio por hora de las personas?"
                valueLabel={`${hourlyRate}€`}
                minLabel="10€"
                maxLabel="25€"
                percentage={((hourlyRate - 10) / 15) * 100}
              >
                <input
                  type="range"
                  min={10}
                  max={25}
                  step={1}
                  value={hourlyRate}
                  onChange={(event) => setHourlyRate(Number(event.target.value))}
                  className="estimator-slider relative z-10 w-full"
                />
              </SliderField>
            </div>
          </div>

          <div className="flex h-full flex-col rounded-[30px] border border-[#e7edf5] bg-white/92 p-4 shadow-[0_20px_56px_rgba(15,23,42,0.05)] ring-1 ring-white/80 backdrop-blur-sm sm:p-5">
            <div className="grid gap-2.5">
              <ResultRow
                label="Tiempo que dedica tu empresa a la gestión de facturas"
                value={formatHours(manualHours)}
              />

              <ResultRow
                label="Gracias a Clerio, solo necesitarás"
                value={formatHours(clerioHours, true)}
                highlighted
                prefix={
                  <span className="inline-flex items-center rounded-full border border-[#dbe7fb] bg-white/78 px-2.5 py-1 text-[10px] font-semibold text-[#6481b2] shadow-[0_6px_16px_rgba(31,115,241,0.06)] sm:text-[11px]">
                    {Math.max(0, savingsPercent)}% menos tiempo
                  </span>
                }
              />
            </div>

            <div className="mt-auto pt-5">
              <RecommendationCard key={recommendedPlan.id} plan={recommendedPlan} invoiceCount={invoiceCount} />
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <a
            href={loginUrl}
            className={`group relative inline-flex h-10 w-full max-w-[164px] items-center justify-center overflow-hidden rounded-[12px] border px-5 text-[14px] font-semibold text-[#0d1b33] ring-1 ring-white/75 transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4e8fff]/45 active:scale-[0.985] ${
              recommendedPlan.featured
                ? "border-[#9bbfff] bg-[linear-gradient(180deg,#f8fbff_0%,#dfeeff_34%,#bdd7ff_100%)] shadow-[0_16px_34px_rgba(31,115,241,0.22),inset_0_1px_0_rgba(255,255,255,0.96)] hover:-translate-y-[2px] hover:border-[#6ea5ff] hover:shadow-[0_24px_48px_rgba(31,115,241,0.28),inset_0_1px_0_rgba(255,255,255,0.98)]"
                : "border-[#c5d4e8] bg-[linear-gradient(180deg,#ffffff_0%,#edf4ff_28%,#d7e4f7_100%)] shadow-[0_14px_30px_rgba(57,84,125,0.12),inset_0_1px_0_rgba(255,255,255,0.94)] hover:-translate-y-[2px] hover:border-[#9db8dc] hover:shadow-[0_22px_40px_rgba(79,114,171,0.18),inset_0_1px_0_rgba(255,255,255,0.98)]"
            }`}
          >
            <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.96)_0%,rgba(255,255,255,0)_58%)] opacity-90" />
            <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0)_18%,rgba(255,255,255,0.82)_50%,rgba(255,255,255,0)_82%)] translate-x-[-135%] transition-transform duration-700 ease-out group-hover:translate-x-[135%]" />
            <span className="relative z-10 tracking-[-0.01em]">Empezar</span>
          </a>
        </div>
      </div>
    </section>
  );
}
