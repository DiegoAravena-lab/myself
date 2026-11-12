import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#DCE3E8",
          display: "flex",
          padding: "56px",
          fontFamily: "sans-serif",
          color: "#232B38",
          justifyContent: "space-between",
          alignItems: "stretch",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "62%",
            paddingRight: "32px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontSize: "24px",
                fontWeight: 600,
                color: "#2F5BEA",
                marginBottom: "18px",
              }}
            >
              Diego Aravena · Mendoza, Argentina
            </span>
            <span
              style={{
                fontSize: "52px",
                fontWeight: 700,
                lineHeight: 1.12,
                color: "#232B38",
              }}
            >
              Infraestructura IT, POS y Automatización.
            </span>
          </div>

          <span
            style={{
              fontSize: "24px",
              lineHeight: 1.45,
              color: "#475467",
            }}
          >
            Soporte técnico, administración de sistemas, puntos de venta web,
            Python y Node.js para operaciones retail multisucursal.
          </span>
        </div>

        <div
          style={{
            width: "36%",
            backgroundColor: "#FAFBFA",
            border: "2px solid #B9C3CC",
            padding: "32px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            fontFamily: "monospace",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontSize: "20px",
                fontWeight: 700,
                borderBottom: "2px dashed #B9C3CC",
                paddingBottom: "12px",
                marginBottom: "16px",
              }}
            >
              PORTFOLIO IT · RESUMEN
            </span>
            <span style={{ fontSize: "18px", marginBottom: "10px" }}>
              01 NexaPOS e Inventario QR
            </span>
            <span style={{ fontSize: "18px", marginBottom: "10px" }}>
              02 Fichadas biométricas auto.
            </span>
            <span style={{ fontSize: "18px", marginBottom: "10px" }}>
              03 Portal Scripts Python
            </span>
            <span style={{ fontSize: "18px", marginBottom: "10px" }}>
              04 Monitor ~35 nodos POS
            </span>
            <span style={{ fontSize: "18px", marginBottom: "10px" }}>
              05 Balanzas Systel + FTP
            </span>
          </div>
          <span
            style={{
              fontSize: "19px",
              fontWeight: 700,
              color: "#2F5BEA",
              borderTop: "2px dashed #B9C3CC",
              paddingTop: "14px",
            }}
          >
            16 PROYECTOS EN PRODUCCIÓN
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

