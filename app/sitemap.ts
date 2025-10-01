import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://clerio.example";
  const routes = [
    "/",
    "/pricing",
    "/demo",
    "/resources",
    "/integrations",
    "/features",
    "/features/invoicing",
    "/features/accounting",
    "/solutions/advisors",
  ];
  return routes.map((path) => ({ url: base + path, lastModified: new Date(), changeFrequency: "weekly", priority: path === "/" ? 1 : 0.7 }));
}

