'use client';

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/context/AuthContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { queryClient } from "@/lib/queryClient";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Moved metadata export to separate file for client component
// export const metadata: Metadata = { ... }

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <title>Lotería Cripto - LEIDSA Web3</title>
        <meta name="description" content="Plataforma de lotería online con criptomonedas. Juega LOTO, KinoTV, Loto Pool, Quiniela Pale y Pega3Más." />
      </head>
      <body className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <LanguageProvider>
              {children}
            </LanguageProvider>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
