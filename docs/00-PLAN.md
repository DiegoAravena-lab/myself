# Planificación del proyecto — Portfolio de Diego Aravena

## 1. Objetivo
Una web de presentación para darse a conocer ante empleadores y clientes, que muestre proyectos reales (problema, responsabilidad, solución, resultado) **sin exponer información confidencial**.

## 2. Alcance
**Incluye (v1):** sitio estático con home, 17 proyectos productivos documentados, casos técnicos, stack, experiencia laboral transversal, formación académica, referencias y contacto directo.
**Analítica y métricas:** Google Analytics 4 (GA4) integrado con ID de medición `G-XE1MPNYJ86`.
**Currículum Vitae descargable:** PDF y DOCX en 1 sola hoja A4 con diseño ejecutivo y códigos QR, sincronizados en `public/`.
**No incluye (v1):** backend pesado, blog o base de datos externa para el contenido.

## 3. Stack
- Next.js 15 (App Router) + TypeScript + Tailwind CSS
- Contenido en Markdown (`contenido/` y `contenido/proyectos/`) parseado estáticamente
- Analítica: Google Analytics 4 vía `next/script` (`G-XE1MPNYJ86`)
- Generadores de CV: Python con ReportLab y python-docx
- Deploy continuo en Vercel conectado a GitHub (`https://diegoaravena-it.vercel.app`)
- Fuentes: Public Sans (general) e IBM Plex Mono (dentro del ticket térmico)

## 4. Estructura sugerida del repo
```
portfolio/
├─ app/
│  ├─ layout.tsx
│  ├─ page.tsx                 # home: hero (ticket) + proyectos + stack + contacto
│  ├─ proyectos/[slug]/page.tsx
│  └─ casos/page.tsx
├─ components/
│  ├─ Ticket.tsx               # hero: ticket térmico animado (único movimiento)
│  ├─ ProyectoFila.tsx
│  ├─ CasoTecnico.tsx          # Problema → Diagnóstico → Solución → Resultado
│  └─ Diagrama.tsx             # diagramas SVG simplificados
├─ contenido/                  # los .md de este paquete
├─ public/                     # diagramas e imágenes SIN datos reales
└─ docs/
```

## 5. Fases

| Fase | Entregable | Criterio de "terminado" |
|---|---|---|
| 0. Preparación | Revisar `02-CONFIDENCIALIDAD.md`, completar los **[COMPLETAR]** | Ningún dato sensible en los textos |
| 1. Base | Repo, Next.js, Tailwind, fuentes, colores | Compila y se ve vacío con el fondo y la tipografía correctos |
| 2. Contenido | Cargar los `.md`, páginas de proyecto y casos | Todas las rutas navegables con texto real |
| 3. Hero (ticket) | Componente `Ticket` con animación de impresión una sola vez | Respeta `prefers-reduced-motion`; legible sin animación |
| 4. Diagramas | 3 diagramas SVG simplificados (red multisucursal, flujo de fichadas, FTP) | Sin IPs, nombres ni datos reales |
| 5. Calidad | Responsive, foco visible por teclado, contraste, Lighthouse > 90 | Pasa el checklist de abajo |
| 6. Deploy | Importar el repo en Vercel, dominio propio opcional | URL pública funcionando |
| 7. Backend (final) | Formulario de contacto y anti-spam | Los mensajes llegan al mail |

## 6. Checklist de calidad
- [x] Funciona en móvil (360 px) y escritorio
- [x] Navegación por teclado con foco visible
- [x] Animación desactivada con `prefers-reduced-motion`
- [x] Contraste de texto suficiente
- [x] Metadatos: título, descripción, OpenGraph para redes
- [x] Línea de lectura menor a 80 caracteres
- [x] Revisado contra `02-CONFIDENCIALIDAD.md`
- [x] Descarga de CV en PDF y DOCX en 1 sola hoja A4
- [x] Medición de visitas con Google Analytics 4 (`G-XE1MPNYJ86`)

## 7. Decisiones tomadas
1. **Empresa / Entorno:** La Yunta Mayorista (~38 sucursales), con confidencialidad en datos internos.
2. **Ciudad:** San Rafael, Mendoza, Argentina.
3. **Formación:** BigSchool / Universidad Isabel I (IA y Ciberseguridad), Profesorado de Inglés, Grado en Marketing e Ingeniería Informática (sin finalizar).
4. **Dominio:** `diegoaravena-it.vercel.app`.
5. **Contacto:** Botón directo a WhatsApp, mail y enlaces de GitHub/LinkedIn.
6. **Proyectos:** 17 proyectos productivos en línea, incluyendo BioReport Nexa y POS de bebidas a medida.

## 8. Orden de trabajo recomendado
Fase 0 → 1 → 2 → 3 → 6 (publicar una primera versión) → 4 → 5 → 7.
Publicar temprano permite iterar con la web ya en línea.
