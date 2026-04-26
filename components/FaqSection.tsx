"use client";

import { useEffect, useRef, useState } from "react";

type FaqItem = { q: string; a: string };

function renderAnswer(answer: string) {
  return answer.split(/\n\s*\n/).map((block, index) => {
    const lines = block.split("\n").filter((line) => line.trim().length > 0);
    const isList = lines.length > 0 && lines.every((line) => line.trim().startsWith("- "));

    if (isList) {
      return (
        <ul key={index} className="mt-3 list-disc space-y-1 pl-5 text-[13px] leading-[1.55] text-[#4a5565] sm:text-[14px]">
          {lines.map((line) => (
            <li key={line}>{line.trim().slice(2)}</li>
          ))}
        </ul>
      );
    }

    return (
      <p key={index} className="mt-3 whitespace-pre-line text-[13px] leading-[1.55] text-[#4a5565] sm:text-[14px]">
        {block}
      </p>
    );
  });
}

export default function FaqSection({ items }: { items: FaqItem[] }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const hasRevealedRef = useRef(false);
  const [isVisible, setIsVisible] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
      { threshold: 0.14, rootMargin: "-8% 0px -12% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="overflow-visible px-4 pt-10 pb-4 sm:px-6 sm:pt-14 sm:pb-4">
      <div
        className={`container-page grid gap-10 transition-all duration-[950ms] [transition-timing-function:cubic-bezier(0.2,0.75,0.2,1)] lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16 ${
          isVisible ? "translate-y-0 opacity-100 blur-0" : "translate-y-8 opacity-0 blur-[6px]"
        }`}
      >
        <div className="relative lg:pt-0">
          <div className="inline-flex items-center rounded-[8px] border border-[#bcc4d1] px-3 py-1 text-[13px] font-medium text-[#3d4655] lg:absolute lg:left-0 lg:top-[-48px]">
            <span className="mr-2 h-1.5 w-1.5 rounded-full bg-[#4e8fff]" />
            Preguntas Frecuentes
          </div>

          <h2 className="mt-4 text-[34px] font-medium leading-[1.08] tracking-[-0.03em] text-[#101828] sm:text-[44px] lg:mt-0">
            ¿Tienes preguntas?
            <span className="block text-[#6a7383]">Nos alegra que preguntes.</span>
          </h2>

          <p className="mt-4 max-w-[40ch] text-[15px] leading-[1.55] text-[#6a7383]">
            Todo lo que necesitas saber sobre Clerio, cómo funciona y cómo puede ayudar a tu empresa y a tu asesoría.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {items.map((item, index) => (
            <div
              key={index}
              className={`group rounded-[16px] border border-[#e6ebf3] bg-white/90 px-5 py-4 ring-1 ring-white/90 backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                openIndex === index
                  ? "shadow-[0_16px_34px_rgba(15,23,42,0.08)]"
                  : "shadow-[0_10px_24px_rgba(15,23,42,0.04)]"
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenIndex((current) => (current === index ? null : index))}
                aria-expanded={openIndex === index}
                className="flex w-full cursor-pointer items-center justify-between gap-4 text-left"
              >
                <span className="text-[14px] font-medium leading-[1.4] text-[#1b2430] sm:text-[15px]">{item.q}</span>
                <span
                  className={`relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#dce3ef] bg-white text-[#5d6778] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    openIndex === index
                      ? "rotate-45 border-[#1f73f1]/40 text-[#1f5dc9] shadow-[0_10px_20px_rgba(31,115,241,0.12)]"
                      : "rotate-0"
                  }`}
                >
                  <span className="absolute left-1/2 top-1/2 h-[2px] w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-current" />
                  <span className="absolute left-1/2 top-1/2 h-3.5 w-[2px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-current" />
                </span>
              </button>

              <div
                className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  openIndex === index ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div
                  className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    openIndex === index ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"
                  }`}
                >
                  <div>{renderAnswer(item.a)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
