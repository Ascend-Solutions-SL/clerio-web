import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Configuración para producción
  output: 'export',
  // Configuración de imágenes
  images: {
    unoptimized: true, // Importante para export estático
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
  trailingSlash: true,
  basePath: process.env.NODE_ENV === 'production' ? '' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
};

export default nextConfig;
