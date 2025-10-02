import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Configuración para rutas estáticas
  trailingSlash: true,
  // Deshabilita el prefijo de ruta base en producción
  basePath: '',
  assetPrefix: '',
};

export default nextConfig;
