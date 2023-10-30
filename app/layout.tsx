import "./globals.css";
import type { Metadata } from "next";
import { Rajdhani } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import ModalProvider from "@/providers/modal-provider";
import ToastProvider from "@/providers/toast-provider";
import { Suspense } from "react";
import LoadingSkeleton from "@/components/ui/loading-skeleton";

const fonte = Rajdhani({ subsets: ["latin"], weight: ["500"] });

export const metadata: Metadata = {
  authors: [{ name: "Josh", url: "" }],
  title: "Seu site perfeito para loja e atendimento virtual!",
  description: "Loja teste feita para modelo de apresentação",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="google-adsense-account" content="ca-pub-7914582297226182" />
        <link rel="icon" href="images/icon.ico" sizes="any" />
      </head>

      <body className={fonte.className}>
        <ModalProvider />
        <ToastProvider />

        <Navbar />
        <Suspense fallback={<LoadingSkeleton />}>{children}</Suspense>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
