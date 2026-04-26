"use client";

import { useEffect, useRef, useState } from "react";

export default function PremiumStatementSection() {
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
    <section ref={sectionRef} className="px-4 pt-8 pb-6 sm:px-6 sm:pt-9 sm:pb-8">
      <div className="container-page relative py-4 sm:py-6">
        <div
          className={`pointer-events-none absolute left-1/2 top-1/2 h-24 w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(153,179,230,0.26)_0%,rgba(153,179,230,0)_74%)] blur-[30px] transition-all duration-900 ease-out sm:h-32 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        />

        <div
          className={`relative text-center transition-all duration-[950ms] [transition-timing-function:cubic-bezier(0.2,0.75,0.2,1)] ${
            isVisible ? "translate-y-0 opacity-100 blur-0" : "translate-y-8 opacity-0 blur-[6px]"
          }`}
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#7c879b] sm:text-[12px]">Excelencia operativa</p>

          <p className="mx-auto mt-4 max-w-5xl text-[31px] font-medium leading-[1.16] tracking-[-0.034em] text-[#0c1320] sm:mt-5 sm:text-[52px]">
            Clerio recoge, organiza y deja tus facturas listas para el trimestre
            <span className="mx-2 text-[#6d7a90]">—</span>
            <span className="bg-[linear-gradient(92deg,#72809a_0%,#4f5d77_45%,#8391a8_100%)] bg-clip-text text-transparent">
              eliminando el trabajo manual y ahorrando horas a tu equipo.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
