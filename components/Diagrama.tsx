export type DiagramaTipo =
  | "red-multisucursal"
  | "flujo-fichadas"
  | "distribucion-ftp";

interface DiagramaProps {
  tipo: DiagramaTipo;
}

export function Diagrama({ tipo }: DiagramaProps) {
  if (tipo === "flujo-fichadas") {
    return (
      <figure className="rounded-[4px] border border-[#B9C3CC] bg-[#FAFBFA] p-4 sm:p-5">
        <svg
          viewBox="0 0 760 200"
          role="img"
          aria-labelledby="diag-fichadas-title diag-fichadas-desc"
          className="h-auto w-full"
        >
          <title id="diag-fichadas-title">
            Flujo de extracción y reportes de fichadas biométricas
          </title>
          <desc id="diag-fichadas-desc">
            Diagrama simplificado sin datos reales: Reloj biométrico en sucursal
            envía archivos MDB a través de un agente NSSM en Windows hacia una
            API Node.js, se almacena en Supabase y genera reportes en Excel con
            Python.
          </desc>

          {/* Caja 1 */}
          <rect
            x="10"
            y="45"
            width="145"
            height="90"
            rx="4"
            fill="#DCE3E8"
            stroke="#B9C3CC"
            strokeWidth="1.5"
          />
          <text
            x="82"
            y="82"
            textAnchor="middle"
            fill="#232B38"
            fontSize="13"
            fontWeight="600"
          >
            Reloj biométrico
          </text>
          <text
            x="82"
            y="102"
            textAnchor="middle"
            fill="#475467"
            fontSize="11"
          >
            Registros MDB locales
          </text>

          <line
            x1="155"
            y1="90"
            x2="195"
            y2="90"
            stroke="#2F5BEA"
            strokeWidth="2"
          />
          <polygon points="195,85 205,90 195,95" fill="#2F5BEA" />

          {/* Caja 2 */}
          <rect
            x="205"
            y="45"
            width="150"
            height="90"
            rx="4"
            fill="#FAFBFA"
            stroke="#232B38"
            strokeWidth="1.5"
          />
          <text
            x="280"
            y="82"
            textAnchor="middle"
            fill="#232B38"
            fontSize="13"
            fontWeight="600"
          >
            Agente NSSM
          </text>
          <text
            x="280"
            y="102"
            textAnchor="middle"
            fill="#475467"
            fontSize="11"
          >
            Servicio Windows auto.
          </text>

          <line
            x1="355"
            y1="90"
            x2="395"
            y2="90"
            stroke="#2F5BEA"
            strokeWidth="2"
          />
          <polygon points="395,85 405,90 395,95" fill="#2F5BEA" />

          {/* Caja 3 */}
          <rect
            x="405"
            y="45"
            width="150"
            height="90"
            rx="4"
            fill="#FAFBFA"
            stroke="#2F5BEA"
            strokeWidth="1.5"
          />
          <text
            x="480"
            y="82"
            textAnchor="middle"
            fill="#232B38"
            fontSize="13"
            fontWeight="600"
          >
            API Node.js + DB
          </text>
          <text
            x="480"
            y="102"
            textAnchor="middle"
            fill="#475467"
            fontSize="11"
          >
            Ingesta y Supabase
          </text>

          <line
            x1="555"
            y1="90"
            x2="595"
            y2="90"
            stroke="#2F5BEA"
            strokeWidth="2"
          />
          <polygon points="595,85 605,90 595,95" fill="#2F5BEA" />

          {/* Caja 4 */}
          <rect
            x="605"
            y="45"
            width="145"
            height="90"
            rx="4"
            fill="#DCE3E8"
            stroke="#B9C3CC"
            strokeWidth="1.5"
          />
          <text
            x="677"
            y="82"
            textAnchor="middle"
            fill="#232B38"
            fontSize="13"
            fontWeight="600"
          >
            Reportes Python
          </text>
          <text
            x="677"
            y="102"
            textAnchor="middle"
            fill="#475467"
            fontSize="11"
          >
            Excel 3 hojas + alertas
          </text>

          <text x="10" y="175" fill="#475467" fontSize="11">
            Esquema simplificado: reemplaza recopilación manual por sincronización continua y cálculo automático de horas.
          </text>
        </svg>
        <figcaption className="mt-2 text-sm text-[#475467]">
          Flujo de fichadas biométricas: relojes locales hacia consola web y
          reportes Python en Excel.
        </figcaption>
      </figure>
    );
  }

  if (tipo === "distribucion-ftp") {
    return (
      <figure className="rounded-[4px] border border-[#B9C3CC] bg-[#FAFBFA] p-4 sm:p-5">
        <svg
          viewBox="0 0 760 220"
          role="img"
          aria-labelledby="diag-ftp-title diag-ftp-desc"
          className="h-auto w-full"
        >
          <title id="diag-ftp-title">
            Distribución centralizada vía FTP y actualización de balanzas
          </title>
          <desc id="diag-ftp-desc">
            Diagrama simplificado: Casa central ejecuta scripts Python para
            preparar listas y publica paquetes en servidor FTP hacia sucursales
            y unas 15 balanzas Systel.
          </desc>

          {/* Origen Python */}
          <rect
            x="10"
            y="65"
            width="165"
            height="84"
            rx="4"
            fill="#DCE3E8"
            stroke="#B9C3CC"
            strokeWidth="1.5"
          />
          <text
            x="92"
            y="100"
            textAnchor="middle"
            fill="#232B38"
            fontSize="13"
            fontWeight="600"
          >
            Casa central (Python)
          </text>
          <text
            x="92"
            y="120"
            textAnchor="middle"
            fill="#475467"
            fontSize="11"
          >
            Excel -&gt; CSV + backup
          </text>

          <line
            x1="175"
            y1="107"
            x2="255"
            y2="107"
            stroke="#2F5BEA"
            strokeWidth="2"
          />
          <polygon points="255,102 265,107 255,112" fill="#2F5BEA" />

          {/* Servidor FTP */}
          <rect
            x="265"
            y="50"
            width="200"
            height="114"
            rx="4"
            fill="#FAFBFA"
            stroke="#2F5BEA"
            strokeWidth="1.5"
          />
          <text
            x="365"
            y="88"
            textAnchor="middle"
            fill="#232B38"
            fontSize="14"
            fontWeight="600"
          >
            Servidor FTP central
          </text>
          <text
            x="365"
            y="110"
            textAnchor="middle"
            fill="#475467"
            fontSize="11"
          >
            Instaladores, bases y scripts
          </text>
          <text
            x="365"
            y="130"
            textAnchor="middle"
            fill="#2F5BEA"
            fontSize="12"
            fontWeight="600"
          >
            ~1 TB administrado
          </text>

          {/* Bifurcación */}
          <line
            x1="465"
            y1="85"
            x2="545"
            y2="55"
            stroke="#2F5BEA"
            strokeWidth="2"
          />
          <line
            x1="465"
            y1="130"
            x2="545"
            y2="160"
            stroke="#2F5BEA"
            strokeWidth="2"
          />

          {/* Destino 1 */}
          <rect
            x="545"
            y="20"
            width="205"
            height="70"
            rx="4"
            fill="#DCE3E8"
            stroke="#B9C3CC"
            strokeWidth="1.5"
          />
          <text
            x="647"
            y="50"
            textAnchor="middle"
            fill="#232B38"
            fontSize="13"
            fontWeight="600"
          >
            ~15 Balanzas Systel
          </text>
          <text
            x="647"
            y="70"
            textAnchor="middle"
            fill="#475467"
            fontSize="11"
          >
            Actualización automática (-4 h/sem)
          </text>

          {/* Destino 2 */}
          <rect
            x="545"
            y="125"
            width="205"
            height="70"
            rx="4"
            fill="#DCE3E8"
            stroke="#B9C3CC"
            strokeWidth="1.5"
          />
          <text
            x="647"
            y="155"
            textAnchor="middle"
            fill="#232B38"
            fontSize="13"
            fontWeight="600"
          >
            Sucursales A .. N
          </text>
          <text
            x="647"
            y="175"
            textAnchor="middle"
            fill="#475467"
            fontSize="11"
          >
            Reportes, soportes y despliegues
          </text>
        </svg>
        <figcaption className="mt-2 text-sm text-[#475467]">
          Infraestructura de distribución FTP entre casa central, balanzas y
          sucursales.
        </figcaption>
      </figure>
    );
  }

  return (
    <figure className="rounded-[4px] border border-[#B9C3CC] bg-[#FAFBFA] p-4 sm:p-5">
      <svg
        viewBox="0 0 760 225"
        role="img"
        aria-labelledby="diag-red-title diag-red-desc"
        className="h-auto w-full"
      >
        <title id="diag-red-title">
          Arquitectura de red multisucursal y exposición segura de servicios
        </title>
        <desc id="diag-red-desc">
          Diagrama simplificado sin direcciones reales: Red interna de casa
          central con servidor POS y MongoDB conectada vía VPN a sucursales, y
          vía túnel HTTPS persistente hacia aplicaciones web desplegadas en la
          nube.
        </desc>

        {/* Casa central */}
        <rect
          x="10"
          y="30"
          width="210"
          height="145"
          rx="4"
          fill="#DCE3E8"
          stroke="#232B38"
          strokeWidth="1.5"
        />
        <text
          x="115"
          y="58"
          textAnchor="middle"
          fill="#232B38"
          fontSize="13"
          fontWeight="600"
        >
          Casa central (red privada)
        </text>
        <rect
          x="28"
          y="74"
          width="174"
          height="36"
          rx="4"
          fill="#FAFBFA"
          stroke="#B9C3CC"
        />
        <text x="115" y="96" textAnchor="middle" fill="#232B38" fontSize="12">
          Napse POS · MongoDB
        </text>
        <rect
          x="28"
          y="120"
          width="174"
          height="36"
          rx="4"
          fill="#FAFBFA"
          stroke="#B9C3CC"
        />
        <text x="115" y="142" textAnchor="middle" fill="#232B38" fontSize="12">
          APIs Node.js · NSSM
        </text>

        {/* Conectores centrales */}
        <line
          x1="220"
          y1="72"
          x2="305"
          y2="72"
          stroke="#2F5BEA"
          strokeWidth="2"
        />
        <line
          x1="220"
          y1="140"
          x2="305"
          y2="140"
          stroke="#2F5BEA"
          strokeWidth="2"
        />

        {/* Capa intermedia */}
        <rect
          x="305"
          y="38"
          width="165"
          height="62"
          rx="4"
          fill="#FAFBFA"
          stroke="#2F5BEA"
          strokeWidth="1.5"
        />
        <text
          x="387"
          y="65"
          textAnchor="middle"
          fill="#232B38"
          fontSize="12"
          fontWeight="600"
        >
          VPN Multisucursal
        </text>
        <text x="387" y="84" textAnchor="middle" fill="#475467" fontSize="11">
          Enlace privado sin exposición
        </text>

        <rect
          x="305"
          y="114"
          width="165"
          height="62"
          rx="4"
          fill="#FAFBFA"
          stroke="#2F5BEA"
          strokeWidth="1.5"
        />
        <text
          x="387"
          y="141"
          textAnchor="middle"
          fill="#232B38"
          fontSize="12"
          fontWeight="600"
        >
          Túnel HTTPS / Nginx
        </text>
        <text x="387" y="160" textAnchor="middle" fill="#475467" fontSize="11">
          SSL sin puertos abiertos
        </text>

        {/* Conectores derecha */}
        <line
          x1="470"
          y1="72"
          x2="540"
          y2="72"
          stroke="#2F5BEA"
          strokeWidth="2"
        />
        <line
          x1="470"
          y1="140"
          x2="540"
          y2="140"
          stroke="#2F5BEA"
          strokeWidth="2"
        />

        {/* Destinos */}
        <rect
          x="540"
          y="38"
          width="210"
          height="62"
          rx="4"
          fill="#DCE3E8"
          stroke="#B9C3CC"
          strokeWidth="1.5"
        />
        <text
          x="645"
          y="65"
          textAnchor="middle"
          fill="#232B38"
          fontSize="12"
          fontWeight="600"
        >
          ~35 Nodos POS / Sucursales
        </text>
        <text x="645" y="84" textAnchor="middle" fill="#475467" fontSize="11">
          Cajas, monitor y balanzas
        </text>

        <rect
          x="540"
          y="114"
          width="210"
          height="62"
          rx="4"
          fill="#DCE3E8"
          stroke="#B9C3CC"
          strokeWidth="1.5"
        />
        <text
          x="645"
          y="141"
          textAnchor="middle"
          fill="#232B38"
          fontSize="12"
          fontWeight="600"
        >
          Apps Web (Vercel / Supabase)
        </text>
        <text x="645" y="160" textAnchor="middle" fill="#475467" fontSize="11">
          NexaPOS, Verificador, Scripts
        </text>

        <text x="10" y="206" fill="#475467" fontSize="11">
          Topología de referencia: separación entre red operativa interna y capa de acceso remoto controlado.
        </text>
      </svg>
      <figcaption className="mt-2 text-sm text-[#475467]">
        Red multisucursal y puente seguro entre servicios locales y aplicaciones
        en la nube.
      </figcaption>
    </figure>
  );
}

