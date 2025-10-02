import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Vercel maneja automáticamente la exportación
  output: 'standalone',
  // Configuración de imágenes optimizadas para Vercel
  images: {
    domains: ['vercel.com', 'www.vercel.com', 'ascendsolutions.es', 'app.ascendsolutions.es'],
  },
  // Configuración de ESLint y TypeScript
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Configuración de rutas
  trailingSlash: false,
  basePath: '',
  assetPrefix: '',
};

export default nextConfig;
