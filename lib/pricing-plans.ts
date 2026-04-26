export type PricingPlan = {
  id: "standard" | "pro" | "advanced";
  name: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  invoiceLimit: number;
  userLimit: number;
  emailAccountLimit: number;
  assistantLabel: string;
  assistantIncluded: boolean;
  backupIncluded: boolean;
  autoEmailIncluded: boolean;
  accentClass: string;
  featured?: boolean;
};

export const loginUrl = "https://app.clerio.es/login";

export const pricingPlans: PricingPlan[] = [
  {
    id: "standard",
    name: "Estándar",
    description: "Para autónomos y pequeñas empresas que quieren empezar a automatizar su gestión de facturas.",
    monthlyPrice: 29,
    annualPrice: 24,
    invoiceLimit: 80,
    userLimit: 1,
    emailAccountLimit: 1,
    assistantLabel: "ClerIA",
    assistantIncluded: false,
    backupIncluded: false,
    autoEmailIncluded: false,
    accentClass:
      "bg-[radial-gradient(circle_at_24%_22%,rgba(255,173,196,0.62)_0%,rgba(255,191,147,0.34)_34%,rgba(242,246,252,0.9)_68%,rgba(252,156,153,0.46)_100%)]",
  },
  {
    id: "pro",
    name: "Pro",
    description: "Para empresas en crecimiento que necesitan más volumen y colaboración con su equipo o asesoría.",
    monthlyPrice: 79,
    annualPrice: 65,
    invoiceLimit: 250,
    userLimit: 3,
    emailAccountLimit: 3,
    assistantLabel: "ClerIA Plus",
    assistantIncluded: true,
    backupIncluded: false,
    autoEmailIncluded: false,
    accentClass:
      "bg-[radial-gradient(circle_at_22%_10%,rgba(113,181,246,0.68)_0%,rgba(108,152,255,0.44)_34%,rgba(194,218,246,0.74)_68%,rgba(167,176,230,0.54)_100%)]",
    featured: true,
  },
  {
    id: "advanced",
    name: "Avanzado",
    description: "Para empresas con alto volumen que buscan automatización completa y máximo control.",
    monthlyPrice: 179,
    annualPrice: 149,
    invoiceLimit: 500,
    userLimit: 6,
    emailAccountLimit: 6,
    assistantLabel: "ClerIA Pro",
    assistantIncluded: true,
    backupIncluded: true,
    autoEmailIncluded: true,
    accentClass:
      "bg-[radial-gradient(circle_at_22%_12%,rgba(132,223,172,0.68)_0%,rgba(150,231,190,0.5)_34%,rgba(207,241,239,0.76)_66%,rgba(161,227,190,0.56)_100%)]",
  },
];

export function getPricingPlanFeatures(plan: PricingPlan) {
  return [
    { label: `${plan.invoiceLimit} facturas al mes`, included: true },
    { label: `${plan.userLimit} ${plan.userLimit === 1 ? "usuario" : "usuarios"}`, included: true },
    {
      label: `${plan.emailAccountLimit} ${plan.emailAccountLimit === 1 ? "cuenta de correo conectada" : "cuentas de correo conectadas"}`,
      included: true,
    },
    { label: plan.assistantLabel, included: plan.assistantIncluded },
    { label: "Copia de seguridad", included: plan.backupIncluded },
    { label: "Envío de correos automático", included: plan.autoEmailIncluded },
  ];
}

export function getRecommendedPlan(invoiceCount: number) {
  return pricingPlans.find((plan) => invoiceCount <= plan.invoiceLimit) ?? pricingPlans[pricingPlans.length - 1];
}
