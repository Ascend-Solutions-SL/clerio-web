import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Clerio • Automatización de gestorías con IA",
    template: "%s • Clerio",
  },
  description:
    "Software SaaS para gestorías: documentación automática, contabilidad inteligente con IA y modelos AEAT listos para presentar.",
  metadataBase: new URL("https://clerio.example"),
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-white text-neutral-900`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
