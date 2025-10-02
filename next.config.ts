/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Deshabilitar la exportación estática para Vercel
  output: 'standalone',
  // Configuración de imágenes
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
};

module.exports = nextConfig;
