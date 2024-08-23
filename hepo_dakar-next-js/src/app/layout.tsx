import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "bootstrap-icons/font/bootstrap-icons.css";
import "../../styles/globals.css";
import "../../styles/custom.scss";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Hepo Dakar",
    default: "Hepo Dakar",
  },
  description:
    "L'Ecole des Hautes Etudes Polytechniques de Dakar est née de la volonté d'un groupe de professionnels de l'éducation et de la formation professionnelle.",
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
