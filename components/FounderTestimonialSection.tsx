"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function FounderTestimonialSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const hasRevealedRef = useRef(false);
  const [isVisible, setIsVisible] = useState(false);

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
      { threshold: 0.18, rootMargin: "-8% 0px -12% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="px-4 pt-7 pb-8 sm:px-6 sm:pt-9 sm:pb-9">
      <div
        className={`mx-auto grid max-w-6xl gap-3 transition-all duration-[950ms] [transition-timing-function:cubic-bezier(0.2,0.75,0.2,1)] lg:grid-cols-[1.05fr_1fr] ${
          isVisible ? "translate-y-0 opacity-100 blur-0" : "translate-y-8 opacity-0 blur-[6px]"
        }`}
      >
        <div className="relative overflow-hidden rounded-[28px] bg-[#151211] px-6 py-6 text-white shadow-[0_28px_80px_rgba(17,12,10,0.18)] sm:px-8 sm:py-7 lg:min-h-[372px] lg:rounded-[32px] lg:px-10 lg:py-8">
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-[radial-gradient(circle_at_50%_100%,rgba(101,186,255,0.12)_0%,rgba(21,18,17,0)_68%)]" />

          <div className="relative flex h-full flex-col">
            <div className="text-[13px] font-bold uppercase leading-[0.88] tracking-[0.08em] text-white/96 sm:text-[15px]">
              <span className="block">Ram</span>
              <span className="block">on</span>
              <span className="block">Este</span>
              <span className="block">ve</span>
              <span className="mt-3 block text-[11px] font-bold tracking-[0.08em] text-white/92 sm:text-[8px]">Estudio</span>
            </div>

            <div className="mt-8 sm:mt-10">
              <p className="max-w-[24ch] text-[18px] font-medium leading-[1.2] tracking-[-0.03em] text-[#f5f6f8] sm:max-w-[22ch] sm:text-[24px] lg:text-[27px]">
                “Antes perdíamos horas gestionando facturas. Ahora todo está automatizado y podemos centrarnos en nuestro trabajo, lo que directamente se traduce en más facturación.”
              </p>

              <div className="mt-5 sm:mt-6">
                <p className="text-[14px] font-semibold text-white/94 sm:text-[15px]">Ramon Esteve</p>
                <p className="mt-1 text-[12px] text-white/62 sm:text-[13px]">Fundador Ramon Esteve Studio</p>
              </div>
            </div>

            <div className="mt-7 grid gap-4 pt-4 sm:mt-auto sm:grid-cols-2 sm:gap-5 sm:pt-6">
              <div>
                <p className="text-[36px] font-semibold leading-none tracking-[-0.05em] text-[#b8eeff] sm:text-[46px]">94%</p>
                <p className="mt-2 max-w-[16ch] text-[11px] leading-[1.45] text-white/62 sm:text-[12px]">Tiempo reducido gestionando facturas</p>
              </div>
              <div>
                <p className="text-[36px] font-semibold leading-none tracking-[-0.05em] text-[#b8eeff] sm:text-[46px]">20x</p>
                <p className="mt-2 max-w-[16ch] text-[11px] leading-[1.45] text-white/62 sm:text-[12px]">Más rápido que de forma tradicional</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[28px] bg-[linear-gradient(180deg,#ffffff_0%,#f5f5f4_100%)] shadow-[0_26px_70px_rgba(15,23,42,0.08)] ring-1 ring-[#eceae7] sm:rounded-[32px] lg:min-h-[372px]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.88)_0%,rgba(255,255,255,0.14)_34%,rgba(255,255,255,0)_62%)]" />
          <div className="relative aspect-[1/0.9] h-full min-h-[250px] w-full lg:min-h-[372px]">
            <Image
              src="/logos/imagen_ramon.png"
              alt="Ramon Esteve"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
              priority={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
