import type { Metadata } from "next";
import Link from "next/link";
import { IBM_Plex_Mono, Public_Sans } from "next/font/google";
import { getHomeData } from "@/lib/contenido";
import "./globals.css";

const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-public-sans",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export function generateMetadata(): Metadata {
  const home = getHomeData();
  return {
    title: home.metaTitulo,
    description: home.metaDescripcion,
    openGraph: {
      title: home.metaTitulo,
      description: home.metaDescripcion,
      type: "website",
      locale: "es_AR",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${publicSans.variable} ${ibmPlexMono.variable}`}
    >
      <body className="min-h-screen bg-[#DCE3E8] text-[#232B38] antialiased">
        <a
          href="#contenido-principal"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-[4px] focus:bg-[#2F5BEA] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#FAFBFA]"
        >
          Ir al contenido principal
        </a>

        <header className="border-b border-[#B9C3CC] bg-[#FAFBFA]">
          <div className="mx-auto flex max-w-[1100px] flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-8">
            <Link
              href="/"
              className="text-base font-semibold tracking-tight text-[#232B38] hover:text-[#2F5BEA]"
            >
              Diego Aravena
            </Link>

            <nav aria-label="Navegación principal">
              <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium text-[#232B38]">
                <li>
                  <Link href="/#proyectos" className="hover:text-[#2F5BEA]">
                    Proyectos
                  </Link>
                </li>
                <li>
                  <Link href="/casos" className="hover:text-[#2F5BEA]">
                    Casos técnicos
                  </Link>
                </li>
                <li>
                  <Link href="/#stack" className="hover:text-[#2F5BEA]">
                    Stack
                  </Link>
                </li>
                <li>
                  <Link href="/#experiencia" className="hover:text-[#2F5BEA]">
                    Experiencia
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#contacto"
                    className="rounded-[4px] border border-[#2F5BEA] px-3 py-1.5 text-[#2F5BEA] transition-colors hover:bg-[#2F5BEA] hover:text-[#FAFBFA]"
                  >
                    Contacto
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        <main id="contenido-principal">{children}</main>

        <footer className="mt-16 border-t border-[#B9C3CC] bg-[#FAFBFA]">
          <div className="mx-auto flex max-w-[1100px] flex-wrap items-center justify-between gap-4 px-5 py-6 text-sm text-[#475467] sm:px-8">
            <p>
              Diego Aravena · IT Support, SysAdmin, POS y Automatización ·
              Mendoza, Argentina
            </p>
            <p>Documentación publicada sin datos sensibles ni credenciales.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}

