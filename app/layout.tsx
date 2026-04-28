import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Clerio",
  description: "FAQ y acceso a login",
  icons: {
    icon: "/logos/favicon.ico",
    apple: "/logos/logo_clerio.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased min-h-screen bg-white text-neutral-900">
        <Header />
        {children}
      </body>
    </html>
  );
}
