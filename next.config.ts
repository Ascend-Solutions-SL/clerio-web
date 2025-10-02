/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Configuración para producción en Vercel
  output: 'standalone',
  // Deshabilitar la exportación estática
  distDir: '.next',
  // Configuración de imágenes
  images: {
    unoptimized: true,
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
  // Deshabilitar el modo de desarrollo
  env: {
    NODE_ENV: 'production'
  }
};

module.exports = nextConfig;
