import { MetadataRoute } from 'next';

export const dynamic = 'force-static';
export const revalidate = 3600; // revalidate every hour

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://app.ascendsolutions.es";
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
  
  return routes.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: path === "/" ? 1 : 0.7
  }));
}
