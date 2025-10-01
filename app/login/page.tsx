"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Login() {
  const handleGoogleLogin = () => {
    // Aquí se implementará la lógica de Google OAuth
    console.log("Iniciando sesión con Google...");
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-neutral-50 flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <Link href="/" className="inline-block mb-6">
            <span className="text-3xl font-bold text-[--color-brand]">Clerio</span>
          </Link>
          <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
            Accede a tu gestoría
          </h1>
          <p className="mt-2 text-neutral-600">
            Inicia sesión para gestionar tu cuenta demo
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-2xl border border-neutral-200 p-8 shadow-lg"
        >
          {/* Google Login Button */}
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-neutral-300 rounded-xl hover:bg-neutral-50 transition-colors mb-6"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className="font-medium text-neutral-700">Continuar con Google</span>
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-neutral-500">o continúa con email</span>
            </div>
          </div>

          <form className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full h-12 rounded-xl border border-neutral-300 px-4 outline-none focus:ring-2 focus:ring-[--color-accent] focus:border-transparent transition"
                placeholder="tu@gestoria.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-2">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full h-12 rounded-xl border border-neutral-300 px-4 outline-none focus:ring-2 focus:ring-[--color-accent] focus:border-transparent transition"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[--color-accent] focus:ring-[--color-accent] border-neutral-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-neutral-700">
                  Recordarme
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-[--color-accent] hover:brightness-95">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-[--color-accent] hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[--color-accent] transition"
            >
              Iniciar sesión
            </button>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-center"
        >
          <p className="text-sm text-neutral-600">
            ¿No tienes cuenta demo?{" "}
            <Link href="/#demo" className="font-medium text-[--color-accent] hover:brightness-95">
              Solicita acceso
            </Link>
          </p>
        </motion.div>
      </div>
    </main>
  );
}
