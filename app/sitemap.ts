import type { MetadataRoute } from "next";
import { getAllProyectos } from "@/lib/contenido";
import { getBaseUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();
  const proyectos = getAllProyectos();

  const rutasProyectos: MetadataRoute.Sitemap = proyectos.map((proyecto) => ({
    url: `${baseUrl}/proyectos/${proyecto.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/casos`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...rutasProyectos,
  ];
}

