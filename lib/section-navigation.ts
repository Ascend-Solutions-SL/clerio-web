export const navSectionIds: Record<string, string> = {
  Inicio: "inicio",
  Productos: "productos",
  Integraciones: "integraciones",
  Recursos: "recursos",
  Clientes: "clientes",
  Pricing: "pricing",
  "Preguntas Frecuentes": "faq",
};

const NAVIGATION_PIN_BYPASS_MS = 2200;
const NAVIGATION_START_EVENT = "clerio:navigation-start";

const sectionViewportOffsetOverrides: Partial<Record<string, number>> = {
  faq: 220,
};

function getAnchorViewportOffset(sectionId: string) {
  if (typeof window === "undefined") return 0;

  const sectionOverride = sectionViewportOffsetOverrides[sectionId];
  if (sectionOverride != null) {
    return sectionOverride;
  }

  const preferredOffset = Math.round(window.innerHeight * 0.22);
  return Math.min(Math.max(preferredOffset, 110), 220);
}

export function isProgrammaticSectionNavigationActive() {
  if (typeof window === "undefined") return false;
  return (window.__clerioIgnorePinUntil ?? 0) > Date.now();
}

export function navigateToSection(sectionId: string) {
  if (typeof window === "undefined") return;

  const element = document.getElementById(sectionId);
  if (!element) return;

  window.__clerioIgnorePinUntil = Date.now() + NAVIGATION_PIN_BYPASS_MS;
  window.dispatchEvent(new CustomEvent(NAVIGATION_START_EVENT, { detail: { sectionId } }));

  requestAnimationFrame(() => {
    const rect = element.getBoundingClientRect();
    const targetY = Math.max(window.scrollY + rect.top - getAnchorViewportOffset(sectionId), 0);
    window.scrollTo({ top: targetY, behavior: "smooth" });
  });
}

export function addNavigationStartListener(callback: () => void) {
  if (typeof window === "undefined") return () => undefined;

  const handler = () => callback();
  window.addEventListener(NAVIGATION_START_EVENT, handler);
  return () => window.removeEventListener(NAVIGATION_START_EVENT, handler);
}

declare global {
  interface Window {
    __clerioIgnorePinUntil?: number;
  }
}
