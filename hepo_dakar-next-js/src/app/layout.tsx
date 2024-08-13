import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "../../styles/custom-bootstrap.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../styles/globals.css";
import "../../styles/custom.scss";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BootstrapClient from "@/components/BootstrapClient";
import { Providers } from "./providers";
import { Button } from "@nextui-org/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Test Hepo Dakar",
  description: "Ecole bou nekh",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
