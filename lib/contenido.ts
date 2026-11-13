import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

const CONTENIDO_DIR = path.join(process.cwd(), "contenido");
const PROYECTOS_DIR = path.join(CONTENIDO_DIR, "proyectos");

export type CategoriaProyecto =
  | "POS y Retail"
  | "Python y Automatización"
  | "Infraestructura y Web";

export interface ProyectoResumen {
  orden: string;
  slug: string;
  titulo: string;
  tipo: string;
  categoria: CategoriaProyecto;
  estado: string;
  impacto: string;
  tecnologias: string[];
  resumen: string;
}

export interface ProyectoDetalle extends ProyectoResumen {
  contenidoHtml: string;
  diagrama?: "red-multisucursal" | "flujo-fichadas" | "distribucion-ftp";
}

export interface CasoTecnicoItem {
  numero: number;
  titulo: string;
  problema: string;
  diagnostico: string;
  solucion: string;
  resultado: string;
}

export interface TicketLinea {
  cantidad: string;
  concepto: string;
  detalle: string;
  resultado: string;
  slug?: string;
}

export interface HomeData {
  heroTitulo: string;
  heroSubtitulo: string;
  presentacion: string[];
  metaTitulo: string;
  metaDescripcion: string;
  ticketLineas: TicketLinea[];
}

export interface StackGrupo {
  titulo: string;
  items: string[];
  enExploracion?: boolean;
}

export interface ExperienciaData {
  puesto: string;
  entorno: string;
  responsabilidades: string[];
  trayectoriaComplementaria: string[];
  formacion: string[];
  formaDeTrabajo: string[];
  objetivo: string;
}

export interface ContactoData {
  titulo: string;
  texto: string;
  ubicacion: string;
  emailUser: string;
  emailDomain: string;
  whatsappUrl: string;
}

function readUtf8(filePath: string): string {
  return fs.readFileSync(filePath, "utf8").replace(/\r\n/g, "\n");
}

function extractSummaryLine(body: string): string {
  const resumenMatch = body.match(/^\*\*(?:Resumen|Entorno):\*\*\s*(.+)$/m);
  if (resumenMatch) {
    return resumenMatch[1].trim();
  }
  const lines = body
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("#"));
  return lines[0] ?? "";
}

function mapDiagramForSlug(
  slug: string
): "red-multisucursal" | "flujo-fichadas" | "distribucion-ftp" | undefined {
  if (slug === "fichadas-biometricas") return "flujo-fichadas";
  if (slug === "distribucion-ftp" || slug === "balanzas-systel") {
    return "distribucion-ftp";
  }
  if (
    slug === "napse-pos" ||
    slug === "monitor-ventas-pos" ||
    slug === "verificador-precios-carteleria" ||
    slug === "publicacion-web"
  ) {
    return "red-multisucursal";
  }
  return undefined;
}

export function getAllProyectos(): ProyectoResumen[] {
  const files = fs
    .readdirSync(PROYECTOS_DIR)
    .filter((file) => file.endsWith(".md"))
    .sort();

  return files.map((file, index) => {
    const raw = readUtf8(path.join(PROYECTOS_DIR, file));
    const { data, content } = matter(raw);
    const tecnologiasRaw =
      typeof data.tecnologias === "string" ? data.tecnologias : "";

    return {
      orden: String(index + 1).padStart(2, "0"),
      slug: String(data.slug ?? file.replace(/\.md$/, "")),
      titulo: String(data.titulo ?? ""),
      tipo: String(data.tipo ?? "Proyecto"),
      categoria: (data.categoria as CategoriaProyecto) ?? "Infraestructura y Web",
      estado: String(data.estado ?? "En producción"),
      impacto: String(data.impacto ?? "productivo"),
      tecnologias: tecnologiasRaw
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      resumen: extractSummaryLine(content),
    };
  });
}

export function getProyectoBySlug(slug: string): {
  proyecto: ProyectoDetalle;
  anterior: ProyectoResumen | null;
  siguiente: ProyectoResumen | null;
} | null {
  const files = fs
    .readdirSync(PROYECTOS_DIR)
    .filter((file) => file.endsWith(".md"))
    .sort();

  const todos = getAllProyectos();
  const idx = todos.findIndex((p) => p.slug === slug);
  if (idx === -1) return null;

  const file = files[idx];
  const raw = readUtf8(path.join(PROYECTOS_DIR, file));
  const { content } = matter(raw);

  // Remover el primer H1 y la línea de Resumen/Entorno para evitar duplicar el encabezado de la página
  const bodyCleaned = content
    .replace(/^#\s+.+\n+/, "")
    .replace(/^\*\*(?:Resumen|Entorno):\*\*\s*.+\n+/, "");

  const contenidoHtml = marked.parse(bodyCleaned, { async: false }) as string;
  const base = todos[idx];

  return {
    proyecto: {
      ...base,
      contenidoHtml,
      diagrama: mapDiagramForSlug(base.slug),
    },
    anterior: idx > 0 ? todos[idx - 1] : null,
    siguiente: idx < todos.length - 1 ? todos[idx + 1] : null,
  };
}

export function getCasosTecnicos(): CasoTecnicoItem[] {
  const raw = readUtf8(path.join(CONTENIDO_DIR, "casos-tecnicos.md"));
  const sections = raw.split(/^##\s+Caso\s+(\d+)\s+[—-]\s+(.+)$/gm);
  const casos: CasoTecnicoItem[] = [];

  for (let i = 1; i < sections.length; i += 3) {
    const numero = Number(sections[i]);
    const titulo = sections[i + 1]?.trim() ?? "";
    const body = sections[i + 2] ?? "";

    const extractField = (label: string): string => {
      const regex = new RegExp(`^-\\s*\\*\\*${label}:\\*\\*\\s*(.+)$`, "m");
      const match = body.match(regex);
      return match ? match[1].trim() : "";
    };

    casos.push({
      numero,
      titulo,
      problema: extractField("Problema"),
      diagnostico: extractField("Diagnóstico"),
      solucion: extractField("Solución"),
      resultado: extractField("Resultado"),
    });
  }

  return casos;
}

export function getHomeData(): HomeData {
  const raw = readUtf8(path.join(CONTENIDO_DIR, "home.md"));

  const heroTituloMatch = raw.match(/^\*\*Título:\*\*\s*(.+)$/m);
  const heroSubtituloMatch = raw.match(/^\*\*Subtítulo:\*\*\s*(.+)$/m);
  const metaTituloMatch = raw.match(/^-\s*\*\*Título:\*\*\s*(.+)$/m);
  const metaDescMatch = raw.match(/^-\s*\*\*Descripción:\*\*\s*(.+)$/m);

  const presentacionMatch = raw.match(
    /## Presentación\n([\s\S]*?)\n## Ticket del hero/
  );
  const presentacion = presentacionMatch
    ? presentacionMatch[1]
        .trim()
        .split(/\n\n+/)
        .map((p) => p.trim())
        .filter(Boolean)
    : [];

  const ticketLineas: TicketLinea[] = [
    {
      cantidad: "01",
      concepto: "NexaPOS e Inventario Web",
      detalle: "POS, roles y activos QR",
      resultado: "producción",
      slug: "nexapos-web",
    },
    {
      cantidad: "02",
      concepto: "Fichadas biométricas auto.",
      detalle: "NSSM + API + reportes Python",
      resultado: "en línea",
      slug: "fichadas-biometricas",
    },
    {
      cantidad: "03",
      concepto: "Panel Web Scripts Python",
      detalle: "Reporte VR y GZIP cliente",
      resultado: "autoservicio",
      slug: "panel-scripts-python",
    },
    {
      cantidad: "04",
      concepto: "Monitor Ventas Red POS",
      detalle: "~35 sucursales en paralelo",
      resultado: "tiempo real",
      slug: "monitor-ventas-pos",
    },
    {
      cantidad: "15",
      concepto: "Balanzas Systel + FTP",
      detalle: "Python CSV + ~1 TB archivos",
      resultado: "-4 h/sem",
      slug: "balanzas-systel",
    },
    {
      cantidad: "06",
      concepto: "Verificador, Vouchers y PDF",
      detalle: "MongoDB, CR80 y cartelería",
      resultado: "automático",
      slug: "verificador-precios-carteleria",
    },
  ];

  return {
    heroTitulo:
      heroTituloMatch?.[1].trim() ??
      "Administro y automatizo la infraestructura IT de operaciones retail.",
    heroSubtitulo:
      heroSubtituloMatch?.[1].trim() ??
      "Soporte técnico, sistemas, redes, desarrollo full-stack y automatización en Python y Node.js.",
    presentacion,
    metaTitulo:
      metaTituloMatch?.[1].trim() ??
      "Diego Aravena — IT Support, SysAdmin, POS y Automatización",
    metaDescripcion:
      metaDescMatch?.[1].trim() ??
      "Portfolio de Diego Aravena: soporte IT, administración de sistemas, puntos de venta web y automatización.",
    ticketLineas,
  };
}

export function getStackData(): StackGrupo[] {
  const raw = readUtf8(path.join(CONTENIDO_DIR, "stack.md"));
  const sections = raw.split(/^##\s+(.+)$/gm);
  const grupos: StackGrupo[] = [];

  for (let i = 1; i < sections.length; i += 2) {
    const titulo = sections[i].trim();
    const body = sections[i + 1]?.trim() ?? "";
    const isExploration = titulo.toLowerCase().includes("desarrollo y exploración");

    if (isExploration) {
      const items = body
        .split("\n")
        .map((l) => l.trim())
        .filter((l) => l.startsWith("-"))
        .map((l) => l.replace(/^-\s*/, "").replace(/\*\*/g, ""));
      grupos.push({ titulo, items, enExploracion: true });
    } else {
      const items = body
        .split("·")
        .map((item) => item.trim())
        .filter(Boolean);
      grupos.push({ titulo, items, enExploracion: false });
    }
  }

  return grupos;
}

export function getExperienciaData(): ExperienciaData {
  const raw = readUtf8(path.join(CONTENIDO_DIR, "experiencia.md"));

  const puestoMatch = raw.match(/^##\s+([^\n]+)\n\*\*([^*]+)\*\*\s*·\s*\*\*Modalidad:\*\*\s*([^\n]+)/m);
  const responsabilidadesBlock = raw.match(
    /\*\*Modalidad:\*\*[^\n]*\n\n([\s\S]*?)\n\n## (?:Trayectoria complementaria|Forma de trabajo)/
  );
  const trayectoriaBlock = raw.match(
    /## Trayectoria complementaria[^\n]*\n([\s\S]*?)\n\n## Formación académica/
  );
  const formacionBlock = raw.match(
    /## Formación académica[^\n]*\n([\s\S]*?)\n\n## Forma de trabajo/
  );
  const formaBlock = raw.match(
    /## Forma de trabajo\n([\s\S]*?)\n\n## Objetivo profesional/
  );
  const objetivoBlock = raw.match(/## Objetivo profesional\n([\s\S]*)$/);

  const parseBullets = (text?: string): string[] =>
    (text ?? "")
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l.startsWith("-"))
      .map((l) => l.replace(/^-\s*/, "").replace(/\*\*/g, ""));

  return {
    puesto: puestoMatch?.[1].trim() ?? "Coordinación IT, Capacitación, Gestión Tecnológica & Marketing",
    entorno: puestoMatch
      ? `${puestoMatch[2].trim()} · ${puestoMatch[3].trim()}`
      : "La Yunta Mayorista (~38 sucursales)",
    responsabilidades: parseBullets(responsabilidadesBlock?.[1]),
    trayectoriaComplementaria: parseBullets(trayectoriaBlock?.[1]),
    formacion: parseBullets(formacionBlock?.[1]),
    formaDeTrabajo: parseBullets(formaBlock?.[1]),
    objetivo: objetivoBlock?.[1].trim() ?? "",
  };
}

export function getContactoData(): ContactoData {
  const raw = readUtf8(path.join(CONTENIDO_DIR, "contacto.md"));

  const mailMatch = raw.match(/\*\*Mail:\*\*\s*([^\s\n]+@[^\s\n]+)/);
  const waMatch = raw.match(/`?(https:\/\/wa\.me\/\d+)`?/);
  const ubicacionMatch = raw.match(/\*\*Ubicación:\*\*\s*([^\n]+)/);
  const tituloMatch = raw.match(/\*\*Título:\*\*\s*([^\n]+)/);
  const textoMatch = raw.match(/\*\*Texto:\*\*\s*([^\n]+)/);

  const email = mailMatch?.[1].trim() ?? "diegofabian.aravena@gmail.com";
  const [emailUser, emailDomain] = email.split("@");

  return {
    titulo: tituloMatch?.[1].trim() ?? "Hablemos",
    texto:
      textoMatch?.[1].trim() ??
      "Si buscás a alguien para soporte IT, administración de infraestructura o desarrollo de automatizaciones y sistemas internos, escribime y te respondo.",
    ubicacion: ubicacionMatch?.[1].trim() ?? "Mendoza, Argentina",
    emailUser: emailUser ?? "diegofabian.aravena",
    emailDomain: emailDomain ?? "gmail.com",
    whatsappUrl: waMatch?.[1].trim() ?? "https://wa.me/542604840852",
  };
}

