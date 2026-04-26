"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

type Step = {
  id: string;
  label: string;
  marker: string;
  title: string;
  description: ReactNode;
  panelClass: string;
};

const steps: Step[] = [
  {
    id: "recibo",
    label: "Recibo",
    marker: "bg-[#f4c56d]",
    title: "Centraliza la recepción de tus facturas de forma automática",
    description:
      <>
        Clerio recoge automáticamente tus facturas desde tu <strong className="font-semibold text-[#121926]">correo</strong> y <strong className="font-semibold text-[#121926]">portales de proveedores</strong>, sin que tengas que subir nada manualmente.
      </>,
    panelClass:
      "bg-[radial-gradient(circle_at_24%_22%,rgba(255,173,196,0.62)_0%,rgba(255,191,147,0.34)_34%,rgba(242,246,252,0.9)_68%,rgba(252,156,153,0.46)_100%)]",
  },
  {
    id: "procesa",
    label: "Procesamiento y organización",
    marker: "bg-[#89c6eb]",
    title: "Procesa y organiza tus facturas",
    description:
      <>
        Clerio analiza cada factura con <strong className="font-semibold text-[#121926]">IA</strong>, identifica automáticamente si es un ingreso o un gasto, extrae los datos clave como importe, fecha o proveedor, y la organiza en la nube <strong className="font-semibold text-[#121926]">lista para trabajar</strong> sin intervención manual.
      </>,
    panelClass:
      "bg-[radial-gradient(circle_at_22%_10%,rgba(113,181,246,0.68)_0%,rgba(108,152,255,0.44)_34%,rgba(194,218,246,0.74)_68%,rgba(167,176,230,0.54)_100%)]",
  },
  {
    id: "validacion",
    label: "Validación",
    marker: "bg-[#9ae494]",
    title: "La tecnología ayuda, las personas validan.",
    description:
      <>
        En Clerio creemos en un enfoque <strong className="font-semibold text-[#121926]">human-first</strong>: la IA es una herramienta para facilitar el trabajo de las personas. Automatizamos todo el proceso para que tu equipo solo tenga que <strong className="font-semibold text-[#121926]">revisar y validar</strong> las facturas antes de cerrar el trimestre.
      </>,
    panelClass:
      "bg-[radial-gradient(circle_at_22%_12%,rgba(132,223,172,0.68)_0%,rgba(150,231,190,0.5)_34%,rgba(207,241,239,0.76)_66%,rgba(161,227,190,0.56)_100%)]",
  },
];

const STEP_SCROLL_COOLDOWN_MS = 240;
const PIN_CAPTURE_TOLERANCE_PX = 24;
const PIN_MAGNET_ZONE_PX = 220;
const PIN_SETTLE_MS = 100;
const PIN_ANCHOR_RATIO = 0.62;
const MAGNET_DURATION_MS = 480;
const GESTURE_DELTA_THRESHOLD_PX = 4;
const TOUCH_DELTA_THRESHOLD_PX = 8;
const WHEEL_GESTURE_IDLE_MS = 45;
const WHEEL_STEP_LOCK_MS = 160;
const RELEASE_SCROLL_NUDGE_PX = 28;
const REPIN_RESET_DISTANCE_PX = 140;
const UPWARD_RELEASE_ATTEMPTS = 2;
const DOWNWARD_RELEASE_ATTEMPTS = 1;

type BodyLockStyles = {
  position: string;
  top: string;
  left: string;
  right: string;
  overflowY: string;
  touchAction: string;
  overscrollBehavior: string;
  htmlOverscrollBehavior: string;
};

export default function ScrollStepsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const hasEnteredRef = useRef(false);
  const repinBlockedRef = useRef(false);
  const lockScrollYRef = useRef(0);
  const lastStepAtRef = useRef(0);
  const activeStepRef = useRef(0);
  const edgeReleaseAttemptsRef = useRef({ up: 0, down: 0 });
  const touchStartYRef = useRef<number | null>(null);
  const touchGestureConsumedRef = useRef(false);
  const awaitWheelGestureEndRef = useRef(false);
  const awaitTouchReleaseRef = useRef(false);
  const wheelGestureLockRef = useRef(false);
  const wheelAwaitTimeoutRef = useRef<number | null>(null);
  const wheelStepLockTimeoutRef = useRef<number | null>(null);
  const frameRef = useRef<number | null>(null);
  const bodyLockStylesRef = useRef<BodyLockStyles | null>(null);
  const isMagnetActiveRef = useRef(false);
  const magnetTargetYRef = useRef<number | null>(null);
  const magnetAnimationRef = useRef<number | null>(null);
  const [hasEntered, setHasEntered] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [isPinned, setIsPinned] = useState(false);
  const [isPinTransitioning, setIsPinTransitioning] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const query = window.matchMedia("(min-width: 1024px) and (hover: hover) and (pointer: fine)");
    const update = () => setIsDesktop(query.matches);
    update();
    query.addEventListener?.("change", update);
    return () => query.removeEventListener?.("change", update);
  }, []);

  useEffect(() => {
    activeStepRef.current = activeStep;
  }, [activeStep]);

  const restorePageLockStyles = () => {
    const previousStyles = bodyLockStylesRef.current;
    if (!previousStyles) return;

    const body = document.body;
    const html = document.documentElement;
    body.style.position = previousStyles.position;
    body.style.top = previousStyles.top;
    body.style.left = previousStyles.left;
    body.style.right = previousStyles.right;
    body.style.overflowY = previousStyles.overflowY;
    body.style.touchAction = previousStyles.touchAction;
    body.style.overscrollBehavior = previousStyles.overscrollBehavior;
    html.style.overscrollBehavior = previousStyles.htmlOverscrollBehavior;
    bodyLockStylesRef.current = null;
  };

  const lockPageScroll = () => {
    const body = document.body;
    const html = document.documentElement;

    bodyLockStylesRef.current = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      overflowY: body.style.overflowY,
      touchAction: body.style.touchAction,
      overscrollBehavior: body.style.overscrollBehavior,
      htmlOverscrollBehavior: html.style.overscrollBehavior,
    };

    body.style.position = "fixed";
    body.style.top = `-${lockScrollYRef.current}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.overflowY = "hidden";
    body.style.touchAction = "none";
    body.style.overscrollBehavior = "none";
    html.style.overscrollBehavior = "none";
  };

  const unlockPageScroll = (direction: number) => {
    restorePageLockStyles();
    const nextScrollY = Math.max(lockScrollYRef.current + direction * RELEASE_SCROLL_NUDGE_PX, 0);

    requestAnimationFrame(() => {
      window.scrollTo({ top: nextScrollY, behavior: "auto" });
    });
  };

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!hasEnteredRef.current && entry.isIntersecting) {
          hasEnteredRef.current = true;
          setHasEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18, rootMargin: "-8% 0px -12% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

  const animateMagnetScroll = (startY: number, targetY: number) => {
    const startTime = performance.now();

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / MAGNET_DURATION_MS, 1);
      const easedProgress = easeOutCubic(progress);
      const currentY = startY + (targetY - startY) * easedProgress;

      window.scrollTo({ top: currentY, behavior: "auto" });

      if (progress < 1) {
        magnetAnimationRef.current = requestAnimationFrame(step);
      } else {
        magnetAnimationRef.current = null;
      }
    };

    magnetAnimationRef.current = requestAnimationFrame(step);
  };

  const cancelMagnetAnimation = () => {
    if (magnetAnimationRef.current != null) {
      cancelAnimationFrame(magnetAnimationRef.current);
      magnetAnimationRef.current = null;
    }
    isMagnetActiveRef.current = false;
    magnetTargetYRef.current = null;
  };

  useEffect(() => {
    if (!isDesktop) return;
    const handleScroll = () => {
      if (frameRef.current != null) {
        cancelAnimationFrame(frameRef.current);
      }

      frameRef.current = requestAnimationFrame(() => {
        const sectionNode = sectionRef.current;
        const contentNode = contentRef.current;
        if (!sectionNode || !contentNode || isPinned) return;

        const anchorLine = window.innerHeight * PIN_ANCHOR_RATIO;
        const sectionRect = sectionNode.getBoundingClientRect();
        const contentRect = contentNode.getBoundingClientRect();
        const contentCenter = contentRect.top + contentRect.height / 2;

        if (repinBlockedRef.current) {
          const hasFullyMovedAway = sectionRect.bottom < anchorLine - REPIN_RESET_DISTANCE_PX || sectionRect.top > anchorLine + REPIN_RESET_DISTANCE_PX;
          if (hasFullyMovedAway) {
            repinBlockedRef.current = false;
            cancelMagnetAnimation();
          }
          return;
        }

        const anchorLineIsInsideSection = sectionRect.top < anchorLine && sectionRect.bottom > anchorLine;
        if (!anchorLineIsInsideSection) {
          cancelMagnetAnimation();
          return;
        }

        const distanceToAnchor = contentCenter - anchorLine;
        const absDistance = Math.abs(distanceToAnchor);

        if (absDistance <= PIN_CAPTURE_TOLERANCE_PX) {
          cancelMagnetAnimation();

          lockScrollYRef.current = window.scrollY;
          wheelGestureLockRef.current = false;
          touchGestureConsumedRef.current = false;
          awaitWheelGestureEndRef.current = true;
          awaitTouchReleaseRef.current = touchStartYRef.current != null;
          edgeReleaseAttemptsRef.current = { up: 0, down: 0 };

          setIsPinTransitioning(true);
          lockPageScroll();
          setIsPinned(true);

          setTimeout(() => {
            setIsPinTransitioning(false);
          }, PIN_SETTLE_MS);
          return;
        }

        if (absDistance <= PIN_MAGNET_ZONE_PX && !isMagnetActiveRef.current) {
          isMagnetActiveRef.current = true;
          const targetScrollY = window.scrollY + distanceToAnchor;
          magnetTargetYRef.current = targetScrollY;
          animateMagnetScroll(window.scrollY, targetScrollY);
        }
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      cancelMagnetAnimation();
      if (frameRef.current != null) {
        cancelAnimationFrame(frameRef.current);
      }
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [isPinned, isDesktop]);

  useEffect(() => {
    if (!isDesktop) return;
    const scheduleWheelAwaitUnlock = () => {
      if (wheelAwaitTimeoutRef.current != null) {
        window.clearTimeout(wheelAwaitTimeoutRef.current);
      }

      wheelAwaitTimeoutRef.current = window.setTimeout(() => {
        awaitWheelGestureEndRef.current = false;
      }, WHEEL_GESTURE_IDLE_MS);
    };

    const startWheelStepLock = () => {
      wheelGestureLockRef.current = true;

      if (wheelStepLockTimeoutRef.current != null) {
        window.clearTimeout(wheelStepLockTimeoutRef.current);
      }

      wheelStepLockTimeoutRef.current = window.setTimeout(() => {
        wheelGestureLockRef.current = false;
      }, WHEEL_STEP_LOCK_MS);
    };

    const releasePin = (direction: number) => {
      setIsPinned(false);
      repinBlockedRef.current = true;
      wheelGestureLockRef.current = false;
      touchGestureConsumedRef.current = false;
      awaitWheelGestureEndRef.current = false;
      awaitTouchReleaseRef.current = false;
      edgeReleaseAttemptsRef.current = { up: 0, down: 0 };
      unlockPageScroll(direction);
    };

    const getScrollOutcome = (direction: number) => {
      if (!isPinned) return "none" as const;

      const now = Date.now();
      if (now - lastStepAtRef.current < STEP_SCROLL_COOLDOWN_MS) {
        return "hold" as const;
      }

      if (direction > 0) {
        edgeReleaseAttemptsRef.current.up = 0;

        if (activeStepRef.current < steps.length - 1) {
          lastStepAtRef.current = now;
          edgeReleaseAttemptsRef.current.down = 0;
          awaitWheelGestureEndRef.current = true;
          setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
          return "step" as const;
        }

        edgeReleaseAttemptsRef.current.down += 1;
        if (edgeReleaseAttemptsRef.current.down >= DOWNWARD_RELEASE_ATTEMPTS) {
          releasePin(1);
          return "release" as const;
        }

        return "hold" as const;
      }

      if (direction < 0) {
        edgeReleaseAttemptsRef.current.down = 0;

        if (activeStepRef.current > 0) {
          lastStepAtRef.current = now;
          edgeReleaseAttemptsRef.current.up = 0;
          awaitWheelGestureEndRef.current = true;
          setActiveStep((prev) => Math.max(prev - 1, 0));
          return "step" as const;
        }

        edgeReleaseAttemptsRef.current.up += 1;
        if (edgeReleaseAttemptsRef.current.up >= UPWARD_RELEASE_ATTEMPTS) {
          releasePin(-1);
          return "release" as const;
        }

        return "hold" as const;
      }

      return "hold" as const;
    };

    const handleWheel = (event: WheelEvent) => {
      if (!isPinned) return;

      if (Math.abs(event.deltaY) < GESTURE_DELTA_THRESHOLD_PX) {
        event.preventDefault();
        return;
      }

      scheduleWheelAwaitUnlock();

      if (awaitWheelGestureEndRef.current) {
        event.preventDefault();
        return;
      }

      if (wheelGestureLockRef.current) {
        event.preventDefault();
        return;
      }

      startWheelStepLock();
      getScrollOutcome(Math.sign(event.deltaY));
      event.preventDefault();
    };

    const handleTouchStart = (event: TouchEvent) => {
      touchStartYRef.current = event.touches[0]?.clientY ?? null;
      touchGestureConsumedRef.current = false;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (!isPinned || touchStartYRef.current == null) return;

      const currentY = event.touches[0]?.clientY ?? touchStartYRef.current;
      const deltaY = touchStartYRef.current - currentY;
      if (Math.abs(deltaY) < TOUCH_DELTA_THRESHOLD_PX) {
        event.preventDefault();
        return;
      }

      if (awaitTouchReleaseRef.current) {
        event.preventDefault();
        return;
      }

      if (touchGestureConsumedRef.current) {
        event.preventDefault();
        return;
      }

      touchGestureConsumedRef.current = true;
      touchStartYRef.current = currentY;
      getScrollOutcome(Math.sign(deltaY));
      event.preventDefault();
    };

    const handleTouchEnd = () => {
      touchStartYRef.current = null;
      touchGestureConsumedRef.current = false;
      awaitTouchReleaseRef.current = false;
    };

    document.addEventListener("wheel", handleWheel, { passive: false, capture: true });
    document.addEventListener("touchstart", handleTouchStart, { passive: true, capture: true });
    document.addEventListener("touchmove", handleTouchMove, { passive: false, capture: true });
    document.addEventListener("touchend", handleTouchEnd, { capture: true });

    return () => {
      if (wheelAwaitTimeoutRef.current != null) {
        window.clearTimeout(wheelAwaitTimeoutRef.current);
      }

      if (wheelStepLockTimeoutRef.current != null) {
        window.clearTimeout(wheelStepLockTimeoutRef.current);
      }

      document.removeEventListener("wheel", handleWheel, true);
      document.removeEventListener("touchstart", handleTouchStart, true);
      document.removeEventListener("touchmove", handleTouchMove, true);
      document.removeEventListener("touchend", handleTouchEnd, true);
    };
  }, [isPinned, isDesktop]);

  useEffect(() => {
    return () => {
      if (frameRef.current != null) {
        cancelAnimationFrame(frameRef.current);
      }

      if (wheelAwaitTimeoutRef.current != null) {
        window.clearTimeout(wheelAwaitTimeoutRef.current);
      }

      if (wheelStepLockTimeoutRef.current != null) {
        window.clearTimeout(wheelStepLockTimeoutRef.current);
      }

      restorePageLockStyles();
    };
  }, []);

  if (!isDesktop) {
    return (
      <section ref={sectionRef} className="px-4 pt-8 pb-8 sm:px-6 sm:pt-12 sm:pb-12">
        <div
          className={`container-page flex flex-col gap-3 transition-all duration-[950ms] [transition-timing-function:cubic-bezier(0.2,0.75,0.2,1)] ${
            hasEntered ? "translate-y-0 opacity-100 blur-0" : "translate-y-8 opacity-0 blur-[6px]"
          }`}
        >
          <div className="inline-flex w-fit items-center rounded-[8px] border border-[#bcc4d1] px-3 py-1 text-[13px] font-medium text-[#3d4655]">
            <span className="mr-2 h-1.5 w-1.5 rounded-full bg-[#4e8fff]" />
            ¿Qué hace Clerio por ti?
          </div>

          {steps.map((step) => (
            <article key={step.id} className="mt-6 first:mt-2">
              <div className="flex items-center gap-3">
                <span className={`h-7 w-7 ${step.marker}`} />
                <p className="text-[12px] font-semibold uppercase tracking-[0.03em] text-[#2f3744]">{step.label}</p>
              </div>

              <h3 className="mt-5 max-w-[18ch] text-[34px] font-medium leading-[1.1] tracking-[-0.022em] text-[#0f1623] sm:max-w-[19ch] sm:text-[44px]">
                {step.title}
              </h3>

              <p className="mt-5 max-w-[62ch] text-[18px] leading-[1.46] text-[#2f3746] sm:text-[20px]">{step.description}</p>

              <div className={`mt-6 h-[260px] overflow-hidden rounded-[32px] sm:h-[340px] ${step.panelClass}`} />
            </article>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="px-4 pt-8 pb-8 sm:px-6 sm:pt-12 sm:pb-12">
      <div
        ref={contentRef}
        className={`container-page grid items-center gap-12 md:gap-16 lg:grid-cols-[minmax(0,1fr)_41%] lg:gap-[84px] ${
          isPinTransitioning
            ? "pin-settle-animation"
            : "transition-all duration-[950ms] [transition-timing-function:cubic-bezier(0.2,0.75,0.2,1)]"
        } ${
          hasEntered ? "translate-y-0 opacity-100 blur-0" : "translate-y-8 opacity-0 blur-[6px]"
        }`}
      >
        <div className="max-w-[540px]">
          <div className="inline-flex items-center rounded-[8px] border border-[#bcc4d1] px-3 py-1 text-[13px] font-medium text-[#3d4655]">
            <span className="mr-2 h-1.5 w-1.5 rounded-full bg-[#4e8fff]" />
            ¿Qué hace Clerio por ti?
          </div>

          <div className="relative mt-8 min-h-[286px] sm:min-h-[300px]">
            {steps.map((step, index) => {
              const isActive = index === activeStep;
              return (
                <article
                  key={step.id}
                  className={`absolute inset-0 transition-all duration-500 ease-out ${
                    isActive ? "opacity-100 blur-0" : "pointer-events-none opacity-0 blur-[4px]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`h-7 w-7 ${step.marker}`} />
                    <p className="text-[12px] font-semibold uppercase tracking-[0.03em] text-[#2f3744]">{step.label}</p>
                  </div>

                  <h3 className="mt-5 max-w-[18ch] text-[34px] font-medium leading-[1.1] tracking-[-0.022em] text-[#0f1623] sm:max-w-[19ch] sm:text-[47px]">
                    {step.title}
                  </h3>

                  <p className="mt-5 max-w-[62ch] text-[19px] leading-[1.46] text-[#2f3746] sm:text-[20px]">{step.description}</p>
                </article>
              );
            })}
          </div>
        </div>

        <div className="relative h-[270px] overflow-hidden rounded-[40px] sm:h-[360px] lg:h-[520px]">
          {steps.map((step, index) => {
            const isActive = index === activeStep;
            return (
              <div
                key={`${step.id}-panel`}
                className={`absolute inset-0 transition-opacity duration-500 ease-out ${isActive ? "opacity-100" : "opacity-0"} ${step.panelClass}`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
