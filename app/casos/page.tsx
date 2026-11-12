import type { Metadata } from "next";
import Link from "next/link";
import { CasoTecnico } from "@/components/CasoTecnico";
import { getCasosTecnicos } from "@/lib/contenido";

export const metadata: Metadata = {
  title: "Casos técnicos — Diego Aravena",
  description:
    "Incidentes reales de infraestructura, servicios Windows, PostgreSQL, serverless y generación PDF resueltos desde la causa raíz.",
};

export default function CasosPage() {
  const casos = getCasosTecnicos();

  return (
    <div className="mx-auto max-w-[1100px] px-5 py-10 sm:px-8 sm:py-12">
      <nav aria-label="Ruta de navegación" className="mb-6 text-sm">
        <Link href="/" className="font-medium text-[#2F5BEA] hover:underline">
          &lt;- Volver al inicio
        </Link>
      </nav>

      <header className="mb-8">
        <h1 className="text-3xl font-semibold text-[#232B38]">
          Casos técnicos resueltos
        </h1>
        <p className="mt-2 max-w-[68ch] text-base leading-relaxed text-[#475467]">
          Registro de incidentes complejos resueltos en producción: Problema
          -&gt; Diagnóstico -&gt; Solución -&gt; Resultado. Publicados sin IPs,
          usuarios ni datos sensibles.
        </p>
      </header>

      <div className="rounded-[4px] border border-[#B9C3CC] bg-[#FAFBFA] px-5 sm:px-6">
        {casos.map((caso) => (
          <CasoTecnico key={caso.numero} caso={caso} />
        ))}
      </div>
    </div>
  );
}

