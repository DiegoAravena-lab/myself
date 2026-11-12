import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Diagrama } from "@/components/Diagrama";
import { getAllProyectos, getProyectoBySlug } from "@/lib/contenido";

interface ProyectoPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllProyectos().map((proyecto) => ({
    slug: proyecto.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProyectoPageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = getProyectoBySlug(slug);
  if (!data) {
    return { title: "Proyecto no encontrado — Diego Aravena" };
  }
  return {
    title: `${data.proyecto.titulo} — Diego Aravena`,
    description: data.proyecto.resumen,
  };
}

export default async function ProyectoDetallePage({
  params,
}: ProyectoPageProps) {
  const { slug } = await params;
  const data = getProyectoBySlug(slug);

  if (!data) {
    notFound();
  }

  const { proyecto, anterior, siguiente } = data;

  return (
    <div className="mx-auto max-w-[1100px] px-5 py-10 sm:px-8 sm:py-12">
      <nav aria-label="Ruta de navegación" className="mb-6 text-sm">
        <Link
          href="/#proyectos"
          className="font-medium text-[#2F5BEA] hover:underline"
        >
          &lt;- Volver a proyectos
        </Link>
      </nav>

      <article className="rounded-[4px] border border-[#B9C3CC] bg-[#FAFBFA] p-6 sm:p-8">
        <header className="border-b border-[#B9C3CC] pb-6">
          <p className="text-sm text-[#475467]">
            Proyecto {proyecto.orden} · {proyecto.categoria} · {proyecto.tipo} ·{" "}
            {proyecto.estado}
          </p>
          <h1 className="mt-2 max-w-[34ch] text-2xl font-semibold leading-tight text-[#232B38] sm:text-3xl">
            {proyecto.titulo}
          </h1>
          <p className="mt-3 max-w-[70ch] text-base leading-relaxed text-[#232B38]">
            {proyecto.resumen}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            {proyecto.tecnologias.map((tech) => (
              <span
                key={tech}
                className="rounded-[4px] border border-[#B9C3CC] bg-[#DCE3E8]/45 px-2.5 py-1 text-[13px] text-[#232B38]"
              >
                {tech}
              </span>
            ))}
          </div>
        </header>

        <div
          className="prose-portfolio mt-6"
          dangerouslySetInnerHTML={{ __html: proyecto.contenidoHtml }}
        />

        {proyecto.diagrama ? (
          <section className="mt-8 border-t border-[#B9C3CC] pt-6">
            <h2 className="mb-4 text-lg font-semibold text-[#232B38]">
              Arquitectura asociada
            </h2>
            <Diagrama tipo={proyecto.diagrama} />
          </section>
        ) : null}
      </article>

      <nav
        aria-label="Navegación entre proyectos"
        className="mt-8 grid gap-4 sm:grid-cols-2"
      >
        <div>
          {anterior ? (
            <Link
              href={`/proyectos/${anterior.slug}`}
              className="block rounded-[4px] border border-[#B9C3CC] bg-[#FAFBFA] p-4 hover:border-[#2F5BEA]"
            >
              <span className="block text-xs text-[#475467]">
                &lt;- Proyecto anterior
              </span>
              <span className="mt-1 block text-sm font-semibold text-[#232B38]">
                {anterior.orden} · {anterior.titulo}
              </span>
            </Link>
          ) : null}
        </div>

        <div className="sm:text-right">
          {siguiente ? (
            <Link
              href={`/proyectos/${siguiente.slug}`}
              className="block rounded-[4px] border border-[#B9C3CC] bg-[#FAFBFA] p-4 hover:border-[#2F5BEA]"
            >
              <span className="block text-xs text-[#475467]">
                Siguiente proyecto -&gt;
              </span>
              <span className="mt-1 block text-sm font-semibold text-[#232B38]">
                {siguiente.orden} · {siguiente.titulo}
              </span>
            </Link>
          ) : null}
        </div>
      </nav>
    </div>
  );
}

