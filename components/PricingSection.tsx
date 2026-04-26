"use client";

import { useEffect, useRef, useState } from "react";
import { getPricingPlanFeatures, loginUrl, pricingPlans } from "@/lib/pricing-plans";

type BillingMode = "annual" | "monthly";

function PriceDisplay({ billing, monthlyPrice, annualPrice }: { billing: BillingMode; monthlyPrice: number; annualPrice: number }) {
  return (
    <div className="relative mt-4 h-[70px] overflow-hidden sm:h-[76px]">
      <div
        className={`absolute inset-0 transition-all duration-500 [transition-timing-function:cubic-bezier(0.2,0.75,0.2,1)] ${
          billing === "monthly" ? "translate-y-0 opacity-100 blur-0" : "-translate-y-3 opacity-0 blur-[3px]"
        }`}
      >
        <div className="flex items-end gap-1.5 text-[#101828]">
          <span className="text-[42px] font-semibold leading-none tracking-[-0.05em] sm:text-[50px]">{monthlyPrice}€</span>
        </div>
        <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.08em] text-[#5d6778]">al mes</p>
      </div>

      <div
        className={`absolute inset-0 transition-all duration-500 [transition-timing-function:cubic-bezier(0.2,0.75,0.2,1)] ${
          billing === "annual" ? "translate-y-0 opacity-100 blur-0" : "translate-y-3 opacity-0 blur-[3px]"
        }`}
      >
        <div className="flex items-end gap-2 text-[#101828] sm:gap-2.5">
          <span className="pb-1 text-[20px] font-medium leading-none tracking-[-0.04em] text-[#7d8797] line-through sm:text-[24px]">{monthlyPrice}€</span>
          <span className="text-[42px] font-semibold leading-none tracking-[-0.05em] sm:text-[50px]">{annualPrice}€</span>
        </div>
        <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.08em] text-[#5d6778]">al mes · pago anual</p>
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

export default function PricingSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const hasRevealedRef = useRef(false);
  const [isVisible, setIsVisible] = useState(false);
  const [billing, setBilling] = useState<BillingMode>("monthly");

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
      { threshold: 0.16, rootMargin: "-8% 0px -12% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="px-4 pt-4 pb-8 sm:px-6 sm:pt-4 sm:pb-12">
      <div
        className={`container-page transition-all duration-[950ms] [transition-timing-function:cubic-bezier(0.2,0.75,0.2,1)] ${
          isVisible ? "translate-y-0 opacity-100 blur-0" : "translate-y-8 opacity-0 blur-[6px]"
        }`}
      >
        <div className="text-center">
          <div className="inline-flex items-center rounded-[8px] border border-[#bcc4d1] px-3 py-1 text-[13px] font-medium text-[#3d4655]">
            <span className="mr-2 h-1.5 w-1.5 rounded-full bg-[#4e8fff]" />
            Pricing
          </div>

          <h2 className="mx-auto mt-5 max-w-[18ch] text-[34px] font-medium leading-[1.08] tracking-[-0.03em] text-[#101828] sm:max-w-none sm:text-[46px]">
            Empieza a ahorrar horas cada mes
          </h2>

          <div className="mt-5 flex flex-col items-center">
            <div className="relative inline-grid grid-cols-2 rounded-full border border-[#d7deed] bg-white/92 p-1 shadow-[0_12px_30px_rgba(15,23,42,0.08)] backdrop-blur-sm">
              <span
                className={`absolute bottom-1 left-1 top-1 w-[calc(50%-4px)] rounded-full bg-[#1f73f1] shadow-[0_10px_24px_rgba(31,115,241,0.32)] transition-transform duration-500 [transition-timing-function:cubic-bezier(0.2,0.75,0.2,1)] ${
                  billing === "monthly" ? "translate-x-full" : "translate-x-0"
                }`}
              />

              <button
                type="button"
                onClick={() => setBilling("annual")}
                className={`relative z-10 min-w-[96px] rounded-full px-5 py-2 text-[13px] font-semibold transition-colors duration-300 ${
                  billing === "annual" ? "text-white" : "text-[#4a5565]"
                }`}
              >
                Anual
              </button>

              <button
                type="button"
                onClick={() => setBilling("monthly")}
                className={`relative z-10 min-w-[96px] rounded-full px-5 py-2 text-[13px] font-semibold transition-colors duration-300 ${
                  billing === "monthly" ? "text-white" : "text-[#4a5565]"
                }`}
              >
                Mensual
              </button>
            </div>

            <div className="relative mt-2 h-7 w-full">
              <div
                className={`absolute left-1/2 top-0 -translate-x-1/2 rounded-full border border-[#d7e6ff] bg-[linear-gradient(180deg,#f8fbff_0%,#eef4ff_100%)] px-4 py-1.5 text-[11px] font-semibold tracking-[0.02em] text-[#1f5dc9] shadow-[0_14px_26px_rgba(31,115,241,0.12)] transition-all duration-500 [transition-timing-function:cubic-bezier(0.2,0.75,0.2,1)] ${
                  billing === "annual" ? "translate-y-0 opacity-100 blur-0" : "-translate-y-2 opacity-0 blur-[4px]"
                }`}
              >
                2 meses gratis con pago anual
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-3 lg:gap-5">
          {pricingPlans.map((plan) => (
            <article
              key={plan.id}
              className={`flex h-full flex-col rounded-[30px] border bg-white/92 p-3 shadow-[0_18px_55px_rgba(15,23,42,0.07)] ring-1 ring-white/70 backdrop-blur-sm transition-all duration-300 ${
                plan.featured ? "border-[#2e78ff] shadow-[0_24px_64px_rgba(46,120,255,0.14)]" : "border-[#edf1f6]"
              }`}
            >
              <div className={`rounded-[24px] px-5 pb-4 pt-4 sm:px-6 sm:pb-5 sm:pt-5 ${plan.accentClass}`}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[26px] font-medium tracking-[-0.03em] text-[#101828]">{plan.name}</p>
                  </div>

                  {plan.featured ? (
                    <span className="rounded-full bg-white/82 px-3 py-1 text-[11px] font-semibold text-[#425268] shadow-[0_8px_20px_rgba(15,23,42,0.08)]">
                      más popular
                    </span>
                  ) : null}
                </div>

                <PriceDisplay billing={billing} monthlyPrice={plan.monthlyPrice} annualPrice={plan.annualPrice} />
              </div>

              <div className="flex flex-1 flex-col px-3 pb-3 pt-4 sm:px-4">
                <p className="min-h-[52px] text-[13px] leading-[1.45] text-[#697386]">{plan.description}</p>

                <div className="mt-4">
                  <p className="text-[13px] font-semibold text-[#556070]">Incluye:</p>
                  <ul className="mt-3 space-y-2">
                    {getPricingPlanFeatures(plan).map((feature) => (
                      <FeatureRow key={feature.label} label={feature.label} included={feature.included} />
                    ))}
                  </ul>
                </div>

                <a
                  href={loginUrl}
                  className={`group relative mt-6 inline-flex h-11 w-full max-w-[176px] items-center justify-center self-center overflow-hidden rounded-[12px] border px-5 text-[14px] font-semibold text-[#0d1b33] ring-1 ring-white/75 transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4e8fff]/45 active:scale-[0.985] ${
                    plan.featured
                      ? "border-[#9bbfff] bg-[linear-gradient(180deg,#f8fbff_0%,#dfeeff_34%,#bdd7ff_100%)] shadow-[0_16px_34px_rgba(31,115,241,0.22),inset_0_1px_0_rgba(255,255,255,0.96)] hover:-translate-y-[2px] hover:border-[#6ea5ff] hover:shadow-[0_24px_48px_rgba(31,115,241,0.28),inset_0_1px_0_rgba(255,255,255,0.98)]"
                      : "border-[#c5d4e8] bg-[linear-gradient(180deg,#ffffff_0%,#edf4ff_28%,#d7e4f7_100%)] shadow-[0_14px_30px_rgba(57,84,125,0.12),inset_0_1px_0_rgba(255,255,255,0.94)] hover:-translate-y-[2px] hover:border-[#9db8dc] hover:shadow-[0_22px_40px_rgba(79,114,171,0.18),inset_0_1px_0_rgba(255,255,255,0.98)]"
                  }`}
                >
                  <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.96)_0%,rgba(255,255,255,0)_58%)] opacity-90" />
                  <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0)_18%,rgba(255,255,255,0.82)_50%,rgba(255,255,255,0)_82%)] translate-x-[-135%] transition-transform duration-700 ease-out group-hover:translate-x-[135%]" />
                  <span
                    className={`pointer-events-none absolute inset-x-[1px] bottom-[1px] h-[55%] rounded-b-[11px] ${
                      plan.featured
                        ? "bg-[linear-gradient(180deg,rgba(113,181,246,0.12)_0%,rgba(108,152,255,0.3)_100%)]"
                        : "bg-[linear-gradient(180deg,rgba(78,143,255,0.08)_0%,rgba(78,143,255,0.18)_100%)]"
                    }`}
                  />
                  <span className="relative z-10 tracking-[-0.01em]">Empezar</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
