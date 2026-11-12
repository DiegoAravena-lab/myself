import Image from "next/image";
import Link from "next/link";
import { CasoTecnico } from "@/components/CasoTecnico";
import { ContactoAcciones } from "@/components/ContactoAcciones";
import { Diagrama } from "@/components/Diagrama";
import { ProyectosLista } from "@/components/ProyectosLista";
import { Ticket } from "@/components/Ticket";
import {
  getAllProyectos,
  getCasosTecnicos,
  getContactoData,
  getExperienciaData,
  getHomeData,
  getStackData,
} from "@/lib/contenido";

export default function HomePage() {
  const home = getHomeData();
  const proyectos = getAllProyectos();
  const casos = getCasosTecnicos();
  const casosDestacados = casos.slice(0, 3);
  const stack = getStackData();
  const experiencia = getExperienciaData();
  const contacto = getContactoData();

  return (
    <div className="mx-auto max-w-[1100px] px-5 py-10 sm:px-8 sm:py-14">
      {/* 1. Hero + Ticket (en móvil ticket arriba, en escritorio a la derecha) */}
      <section className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-12">
        <div className="order-2 lg:order-1">
          <h1 className="max-w-[20ch] text-[32px] font-semibold leading-[1.15] tracking-tight text-[#232B38] sm:text-[42px]">
            {home.heroTitulo}
          </h1>

          <p className="mt-4 max-w-[60ch] text-lg leading-relaxed text-[#232B38]">
            {home.heroSubtitulo}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href="#proyectos"
              className="rounded-[4px] bg-[#2F5BEA] px-4 py-2.5 text-sm font-semibold text-[#FAFBFA] transition-colors hover:bg-[#2146C7]"
            >
              Ver proyectos ({proyectos.length})
            </a>
            <a
              href="#contacto"
              className="rounded-[4px] border border-[#2F5BEA] bg-[#FAFBFA] px-4 py-2.5 text-sm font-semibold text-[#2F5BEA] transition-colors hover:bg-[#2F5BEA] hover:text-[#FAFBFA]"
            >
              Escribir por mail
            </a>
            <a
              href="/Curriculum_Diego_Aravena.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-[4px] border border-[#B9C3CC] bg-[#FAFBFA] px-4 py-2.5 text-sm font-semibold text-[#232B38] transition-colors hover:border-[#232B38]"
            >
              Descargar CV (PDF)
            </a>
          </div>

          <div className="mt-8 flex flex-col gap-4 border-t border-[#B9C3CC] pt-6 sm:flex-row sm:items-start sm:gap-5">
            <div className="h-20 w-20 shrink-0 overflow-hidden rounded-full border border-[#B9C3CC] bg-[#FAFBFA] sm:h-24 sm:w-24">
              <Image
                src="/diego-aravena.jpg"
                alt="Diego Aravena"
                width={96}
                height={96}
                priority
                className="h-full w-full scale-[1.04] object-cover"
              />
            </div>

            <div className="space-y-3">
              {home.presentacion.map((parrafo) => (
                <p
                  key={parrafo}
                  className="max-w-[65ch] text-[15px] leading-relaxed text-[#232B38]"
                >
                  {parrafo}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <Ticket lineas={home.ticketLineas} totalProyectos={proyectos.length} />
        </div>
      </section>

      {/* 2. Proyectos */}
      <section id="proyectos" className="mt-16 border-t border-[#B9C3CC] pt-12">
        <div className="mb-6 flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-[#232B38]">
              Proyectos y sistemas implementados
            </h2>
            <p className="mt-1 max-w-[68ch] text-[15px] text-[#475467]">
              Soluciones en producción: puntos de venta web, automatizaciones en
              Python, relojes biométricos, infraestructura y herramientas POS.
            </p>
          </div>
        </div>

        <ProyectosLista proyectos={proyectos} />
      </section>

      {/* 3. Casos técnicos destacados */}
      <section id="casos" className="mt-16 border-t border-[#B9C3CC] pt-12">
        <div className="mb-6 flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-[#232B38]">
              Casos técnicos destacados
            </h2>
            <p className="mt-1 max-w-[68ch] text-[15px] text-[#475467]">
              Secuencia real de diagnóstico: Problema -&gt; Diagnóstico -&gt;
              Solución -&gt; Resultado.
            </p>
          </div>

          <Link
            href="/casos"
            className="text-sm font-semibold text-[#2F5BEA] hover:underline"
          >
            Ver los {casos.length} casos técnicos -&gt;
          </Link>
        </div>

        <div className="rounded-[4px] border border-[#B9C3CC] bg-[#FAFBFA] px-5 sm:px-6">
          {casosDestacados.map((caso) => (
            <CasoTecnico key={caso.numero} caso={caso} />
          ))}
        </div>
      </section>

      {/* 4. Arquitectura simplificada (Diagramas SVG) */}
      <section
        id="arquitectura"
        className="mt-16 border-t border-[#B9C3CC] pt-12"
      >
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-[#232B38]">
            Arquitectura simplificada
          </h2>
          <p className="mt-1 max-w-[68ch] text-[15px] text-[#475467]">
            Esquemas funcionales de los flujos implementados. Nombres y
            topologías abstraídas sin IPs ni datos internos.
          </p>
        </div>

        <div className="grid gap-6">
          <Diagrama tipo="red-multisucursal" />
          <div className="grid gap-6 lg:grid-cols-2">
            <Diagrama tipo="flujo-fichadas" />
            <Diagrama tipo="distribucion-ftp" />
          </div>
        </div>
      </section>

      {/* 5. Stack */}
      <section id="stack" className="mt-16 border-t border-[#B9C3CC] pt-12">
        <h2 className="text-2xl font-semibold text-[#232B38]">
          Stack y áreas de conocimiento
        </h2>
        <p className="mt-1 max-w-[68ch] text-[15px] text-[#475467]">
          Herramientas operadas en producción, separadas de las iniciativas en
          prototipo o exploración.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {stack.map((grupo) => (
            <div
              key={grupo.titulo}
              className="rounded-[4px] border border-[#B9C3CC] bg-[#FAFBFA] p-5"
            >
              <h3 className="text-base font-semibold text-[#232B38]">
                {grupo.titulo}
              </h3>
              {grupo.enExploracion ? (
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[#232B38]">
                  {grupo.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : (
                <ul className="mt-3 flex flex-wrap gap-2">
                  {grupo.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-[4px] border border-[#B9C3CC] bg-[#DCE3E8]/40 px-2.5 py-1 text-[13px] text-[#232B38]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 6. Experiencia y forma de trabajo */}
      <section
        id="experiencia"
        className="mt-16 border-t border-[#B9C3CC] pt-12"
      >
        <h2 className="text-2xl font-semibold text-[#232B38]">
          Experiencia y forma de trabajo
        </h2>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="rounded-[4px] border border-[#B9C3CC] bg-[#FAFBFA] p-5 sm:p-6">
            <h3 className="text-lg font-semibold text-[#232B38]">
              {experiencia.puesto}
            </h3>
            <p className="mt-1 text-sm text-[#475467]">{experiencia.entorno}</p>

            <ul className="mt-4 list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-[#232B38]">
              {experiencia.responsabilidades.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-[4px] border border-[#B9C3CC] bg-[#FAFBFA] p-5 sm:p-6">
            <h3 className="text-lg font-semibold text-[#232B38]">
              Criterio de trabajo
            </h3>

            <ul className="mt-4 list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-[#232B38]">
              {experiencia.formaDeTrabajo.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            {experiencia.objetivo ? (
              <p className="mt-5 border-t border-[#B9C3CC] pt-4 text-[15px] leading-relaxed text-[#475467]">
                {experiencia.objetivo}
              </p>
            ) : null}
          </div>
        </div>
      </section>

      {/* 7. Contacto */}
      <section id="contacto" className="mt-16 border-t border-[#B9C3CC] pt-12">
        <div className="rounded-[4px] border border-[#B9C3CC] bg-[#FAFBFA] p-6 sm:p-8">
          <h2 className="text-2xl font-semibold text-[#232B38]">
            {contacto.titulo}
          </h2>
          <p className="mt-2 max-w-[65ch] text-base leading-relaxed text-[#232B38]">
            {contacto.texto}
          </p>
          <p className="mt-2 text-sm text-[#475467]">
            Ubicación: {contacto.ubicacion}
          </p>

          <ContactoAcciones
            emailUser={contacto.emailUser}
            emailDomain={contacto.emailDomain}
            whatsappUrl={contacto.whatsappUrl}
          />
        </div>
      </section>
    </div>
  );
}

