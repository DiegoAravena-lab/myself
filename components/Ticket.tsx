import Link from "next/link";
import type { TicketLinea } from "@/lib/contenido";

interface TicketProps {
  lineas: TicketLinea[];
  totalProyectos: number;
}

export function Ticket({ lineas, totalProyectos }: TicketProps) {
  return (
    <aside
      aria-label="Resumen de proyectos en formato ticket térmico"
      className="w-full"
    >
      <div className="ticket-animate border border-[#B9C3CC] bg-[#FAFBFA]">
        <div className="ticket-edge-top bg-[#DCE3E8]" aria-hidden="true" />
        <div className="ticket-font px-5 py-6 text-[13px] leading-relaxed text-[#232B38] sm:px-6">
          <div className="border-b border-dashed border-[#B9C3CC] pb-3">
            <p className="font-semibold tracking-tight text-[#232B38]">
              PORTFOLIO IT · DIEGO ARAVENA
            </p>
            <p className="text-[12px] text-[#475467]">
              MENDOZA, AR · OPERACIONES &amp; SISTEMAS
            </p>
          </div>

          <div className="mt-3 flex items-center justify-between border-b border-dashed border-[#B9C3CC] pb-2 text-[11px] font-medium text-[#475467]">
            <span>REF / SISTEMA</span>
            <span>RESULTADO</span>
          </div>

          <ul className="divide-y divide-dashed divide-[#B9C3CC]/70">
            {lineas.map((linea) => (
              <li key={linea.concepto} className="py-2.5">
                {linea.slug ? (
                  <Link
                    href={`/proyectos/${linea.slug}`}
                    className="group block rounded-[4px] focus-visible:outline-2 focus-visible:outline-[#2F5BEA]"
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="font-medium text-[#232B38] group-hover:text-[#2F5BEA] group-hover:underline">
                        {linea.cantidad} {linea.concepto}
                      </span>
                      <span className="shrink-0 font-semibold text-[#2F5BEA]">
                        {linea.resultado}
                      </span>
                    </div>
                    <p className="pl-5 text-[12px] text-[#475467]">
                      {linea.detalle}
                    </p>
                  </Link>
                ) : (
                  <div>
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="font-medium text-[#232B38]">
                        {linea.cantidad} {linea.concepto}
                      </span>
                      <span className="shrink-0 font-semibold text-[#232B38]">
                        {linea.resultado}
                      </span>
                    </div>
                    <p className="pl-5 text-[12px] text-[#475467]">
                      {linea.detalle}
                    </p>
                  </div>
                )}
              </li>
            ))}
          </ul>

          <div className="mt-2 border-t border-dashed border-[#B9C3CC] pt-3">
            <div className="flex items-baseline justify-between font-semibold text-[#232B38]">
              <span>TOTAL PROYECTOS DOCUMENTADOS</span>
              <span>{totalProyectos}</span>
            </div>
            <div className="mt-1 flex items-baseline justify-between text-[12px] text-[#475467]">
              <span>HORAS MANUALES EVITADAS</span>
              <span>EN DESCENSO</span>
            </div>
          </div>

          <div className="mt-4 border-t border-dashed border-[#B9C3CC] pt-3 text-[12px] text-[#475467]">
            <p className="font-medium text-[#232B38]">
              FIN DEL COMPROBANTE · GRACIAS POR SU VISITA
            </p>
          </div>
        </div>
        <div className="ticket-edge-bottom bg-[#DCE3E8]" aria-hidden="true" />
      </div>
    </aside>
  );
}

