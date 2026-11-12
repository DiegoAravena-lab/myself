# Planificación del proyecto — Portfolio de Diego Aravena

## 1. Objetivo
Una web de presentación para darse a conocer ante empleadores y clientes, que muestre proyectos reales (problema, responsabilidad, solución, resultado) **sin exponer información confidencial**.

## 2. Alcance
**Incluye (v1):** sitio estático con home, 6 proyectos, casos técnicos, stack, experiencia y contacto por mail, WhatsApp y LinkedIn.
**No incluye (v1):** backend, formulario con envío, blog, CMS, panel de administración.
**Backend (al final, opcional):** formulario de contacto (Route Handler de Next.js + Resend, o Supabase) y analítica básica.

## 3. Stack
- Next.js (App Router) + TypeScript + Tailwind CSS
- Contenido en archivos `.md`/`.mdx` dentro del repo (sin base de datos)
- Deploy en Vercel conectado a GitHub (cada push a `main` publica)
- Fuentes: Public Sans (general) e IBM Plex Mono (solo dentro del ticket), con `next/font`

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
- [ ] Funciona en móvil (360 px) y escritorio
- [ ] Navegación por teclado con foco visible
- [ ] Animación desactivada con `prefers-reduced-motion`
- [ ] Contraste de texto suficiente
- [ ] Metadatos: título, descripción, imagen para compartir
- [ ] Línea de lectura menor a 80 caracteres
- [ ] Revisado contra `02-CONFIDENCIALIDAD.md`

## 7. Decisiones pendientes
1. **[DECIDIR]** ¿Nombrar a la empresa o usar "organización retail/mayorista multisucursal"? (recomendado: genérico, salvo autorización escrita)
2. **[COMPLETAR]** Ciudad a mostrar (propuesta: Mendoza, Argentina)
3. **[COMPLETAR]** Fechas de experiencia, formación, certificaciones e idiomas
4. **[COMPLETAR]** Nivel real por tecnología (básico / intermedio / avanzado)
5. **[DECIDIR]** Publicar o no el teléfono (riesgo de spam; alternativa: botón de WhatsApp)
6. **[COMPLETAR]** Repositorios de GitHub que se puedan mostrar
7. **[DECIDIR]** Dominio propio (ej. `diegoaravena.dev`) o subdominio `*.vercel.app`

## 8. Orden de trabajo recomendado
Fase 0 → 1 → 2 → 3 → 6 (publicar una primera versión) → 4 → 5 → 7.
Publicar temprano permite iterar con la web ya en línea.
