import type { CasoTecnicoItem } from "@/lib/contenido";

interface CasoTecnicoProps {
  caso: CasoTecnicoItem;
}

export function CasoTecnico({ caso }: CasoTecnicoProps) {
  const numeroStr = String(caso.numero).padStart(2, "0");

  return (
    <article className="border-b border-[#B9C3CC] py-6 last:border-b-0">
      <div className="grid gap-4 md:grid-cols-[44px_1fr] md:gap-6">
        <div className="text-sm font-semibold tabular-nums text-[#2F5BEA]">
          {numeroStr}
        </div>
        <div>
          <h3 className="text-lg font-semibold leading-snug text-[#232B38]">
            {caso.titulo}
          </h3>
          <dl className="mt-3 grid gap-3 sm:grid-cols-2">
            <div className="rounded-[4px] border border-[#B9C3CC] bg-[#DCE3E8]/35 p-3.5">
              <dt className="text-xs font-semibold text-[#475467]">Problema</dt>
              <dd className="mt-1 text-sm leading-relaxed text-[#232B38]">
                {caso.problema}
              </dd>
            </div>
            <div className="rounded-[4px] border border-[#B9C3CC] bg-[#DCE3E8]/35 p-3.5">
              <dt className="text-xs font-semibold text-[#475467]">
                Diagnóstico
              </dt>
              <dd className="mt-1 text-sm leading-relaxed text-[#232B38]">
                {caso.diagnostico}
              </dd>
            </div>
            <div className="rounded-[4px] border border-[#B9C3CC] bg-[#DCE3E8]/35 p-3.5">
              <dt className="text-xs font-semibold text-[#475467]">Solución</dt>
              <dd className="mt-1 text-sm leading-relaxed text-[#232B38]">
                {caso.solucion}
              </dd>
            </div>
            <div className="rounded-[4px] border border-[#B9C3CC] bg-[#FAFBFA] p-3.5">
              <dt className="text-xs font-semibold text-[#2F5BEA]">
                Resultado
              </dt>
              <dd className="mt-1 text-sm font-medium leading-relaxed text-[#232B38]">
                {caso.resultado}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </article>
  );
}

