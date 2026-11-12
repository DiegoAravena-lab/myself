import Link from "next/link";
import type { ProyectoResumen } from "@/lib/contenido";

interface ProyectoFilaProps {
  proyecto: ProyectoResumen;
}

export function ProyectoFila({ proyecto }: ProyectoFilaProps) {
  return (
    <article className="border-b border-[#B9C3CC] py-5 last:border-b-0">
      <div className="grid gap-4 md:grid-cols-[44px_1fr_auto] md:items-start md:gap-6">
        <div className="text-sm font-semibold tabular-nums text-[#475467]">
          {proyecto.orden}
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3 className="text-lg font-semibold leading-snug text-[#232B38]">
              <Link
                href={`/proyectos/${proyecto.slug}`}
                className="hover:text-[#2F5BEA] hover:underline"
              >
                {proyecto.titulo}
              </Link>
            </h3>
            <span className="text-sm text-[#475467]">
              {proyecto.categoria} · {proyecto.estado}
            </span>
          </div>

          <p className="mt-1.5 max-w-[72ch] text-[15px] leading-relaxed text-[#232B38]">
            {proyecto.resumen}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            {proyecto.tecnologias.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="rounded-[4px] border border-[#B9C3CC] bg-[#DCE3E8]/45 px-2 py-0.5 text-[13px] text-[#232B38]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 md:flex-col md:items-end md:justify-start">
          <span className="text-sm font-semibold text-[#232B38]">
            {proyecto.impacto}
          </span>
          <Link
            href={`/proyectos/${proyecto.slug}`}
            className="inline-flex items-center gap-1 rounded-[4px] border border-[#2F5BEA] px-3 py-1.5 text-sm font-medium text-[#2F5BEA] transition-colors hover:bg-[#2F5BEA] hover:text-[#FAFBFA]"
          >
            Ver proyecto
            <span aria-hidden="true">-&gt;</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

