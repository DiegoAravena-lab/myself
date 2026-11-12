"use client";

import { useState } from "react";
import type { CategoriaProyecto, ProyectoResumen } from "@/lib/contenido";
import { ProyectoFila } from "./ProyectoFila";

interface ProyectosListaProps {
  proyectos: ProyectoResumen[];
}

const CATEGORIAS: Array<"Todos" | CategoriaProyecto> = [
  "Todos",
  "POS y Retail",
  "Python y Automatización",
  "Infraestructura y Web",
];

export function ProyectosLista({ proyectos }: ProyectosListaProps) {
  const [categoriaActiva, setCategoriaActiva] = useState<
    "Todos" | CategoriaProyecto
  >("Todos");

  const filtrados =
    categoriaActiva === "Todos"
      ? proyectos
      : proyectos.filter((p) => p.categoria === categoriaActiva);

  return (
    <div>
      <div
        role="group"
        aria-label="Filtrar proyectos por área"
        className="mb-4 flex flex-wrap gap-2"
      >
        {CATEGORIAS.map((cat) => {
          const cantidad =
            cat === "Todos"
              ? proyectos.length
              : proyectos.filter((p) => p.categoria === cat).length;
          const activo = categoriaActiva === cat;

          return (
            <button
              key={cat}
              type="button"
              onClick={() => setCategoriaActiva(cat)}
              aria-pressed={activo}
              className={`rounded-[4px] border px-3 py-1.5 text-sm font-medium transition-colors ${
                activo
                  ? "border-[#2F5BEA] bg-[#2F5BEA] text-[#FAFBFA]"
                  : "border-[#B9C3CC] bg-[#FAFBFA] text-[#232B38] hover:border-[#2F5BEA] hover:text-[#2F5BEA]"
              }`}
            >
              {cat} ({cantidad})
            </button>
          );
        })}
      </div>

      <div className="rounded-[4px] border border-[#B9C3CC] bg-[#FAFBFA] px-5 sm:px-6">
        {filtrados.map((proyecto) => (
          <ProyectoFila key={proyecto.slug} proyecto={proyecto} />
        ))}
      </div>
    </div>
  );
}

