#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Script generador del Curriculum Vitae de Diego Aravena en PDF.
Garantiza:
- Exactamente 1 sola hoja A4 (verificado por PyMuPDF).
- Diseño ejecutivo de alta gama con paleta corporativa coherente con la web.
- Foto de perfil circular optimizada con anillo azul de realce.
- 2 Códigos QR nativos vectoriales: WhatsApp directo y Portafolio Web.
- Enlaces interactivos clickeables en PDF para correo, WhatsApp, web, GitHub y proyectos.
- Copia automática en public/ para descarga directa desde la web.
- Cero emojis, tipografía calibrada y márgenes precisos.
"""

import os
import sys
import shutil
from pathlib import Path
import pymupdf

from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.pdfgen import canvas
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Paragraph
from reportlab.graphics.barcode.qr import QrCodeWidget
from reportlab.graphics.shapes import Drawing
from reportlab.graphics import renderPDF

# Rutas
BASE_DIR = Path(__file__).resolve().parent
OUTPUT_PDF = BASE_DIR / "Curriculum_Diego_Aravena.pdf"
PUBLIC_PDF = BASE_DIR / "public" / "Curriculum_Diego_Aravena.pdf"
OUTPUT_PNG = BASE_DIR / "Curriculum_Diego_Aravena.png"
PHOTO_PATH = BASE_DIR / "public" / "diego-aravena.jpg"

PAGE_W, PAGE_H = A4  # 595.28 x 841.89

# Paleta de Colores
C_PRIMARY = colors.HexColor("#1E3A8A")      # Azul corporativo profundo
C_ACCENT = colors.HexColor("#2563EB")       # Azul cobalto dinámico
C_DARK = colors.HexColor("#0F172A")         # Slate 900
C_TEXT = colors.HexColor("#334155")         # Slate 700
C_MUTED = colors.HexColor("#64748B")        # Slate 500
C_SIDEBAR_BG = colors.HexColor("#F8FAFC")   # Fondo gris técnico lateral
C_SIDEBAR_LINE = colors.HexColor("#E2E8F0") # Borde sutil
C_CARD_BG = colors.HexColor("#F1F5F9")      # Fondo de tarjeta
C_CARD_BORDER = colors.HexColor("#CBD5E1")
C_WHITE = colors.HexColor("#FFFFFF")
C_PILL_BG = colors.HexColor("#EFF6FF")
C_PILL_BORDER = colors.HexColor("#BFDBFE")
C_PILL_TEXT = colors.HexColor("#1D4ED8")

def create_qr_drawing(url: str, size: float = 46.0) -> Drawing:
    qr = QrCodeWidget(url)
    bounds = qr.getBounds()
    w = bounds[2] - bounds[0]
    h = bounds[3] - bounds[1]
    scale_x = size / w
    scale_y = size / h
    d = Drawing(size, size, transform=[scale_x, 0, 0, scale_y, 0, 0])
    d.add(qr)
    return d

def render_cv():
    c = canvas.Canvas(str(OUTPUT_PDF), pagesize=A4)
    c.setTitle("Curriculum Vitae — Diego Aravena")
    c.setAuthor("Diego Aravena")
    c.setSubject("IT Support, SysAdmin, POS & Automatización")

    # Coordenadas generales
    margin_top = 22
    margin_bottom = 22
    margin_left = 22
    margin_right = 22

    sidebar_w = 176
    sidebar_x = margin_left
    sidebar_y = margin_bottom
    sidebar_h = PAGE_H - margin_top - margin_bottom

    main_x = sidebar_x + sidebar_w + 14
    main_w = PAGE_W - margin_right - main_x

    # 1. FONDO DE LA BARRA LATERAL (SIDEBAR)
    c.setFillColor(C_SIDEBAR_BG)
    c.setStrokeColor(C_SIDEBAR_LINE)
    c.setLineWidth(1)
    c.roundRect(sidebar_x, sidebar_y, sidebar_w, sidebar_h, 6, fill=1, stroke=1)

    # 2. FOTO DE PERFIL (CIRCULAR)
    photo_radius = 32
    photo_cx = sidebar_x + sidebar_w / 2.0
    photo_cy = sidebar_y + sidebar_h - 48

    if PHOTO_PATH.exists():
        c.saveState()
        p = c.beginPath()
        p.circle(photo_cx, photo_cy, photo_radius)
        c.clipPath(p, stroke=0)
        c.drawImage(
            str(PHOTO_PATH),
            photo_cx - photo_radius,
            photo_cy - photo_radius,
            width=photo_radius * 2,
            height=photo_radius * 2,
            preserveAspectRatio=True
        )
        c.restoreState()

        # Borde circular azul
        c.setStrokeColor(C_ACCENT)
        c.setLineWidth(2)
        c.circle(photo_cx, photo_cy, photo_radius, stroke=1, fill=0)

    # PILL DEBAJO DE LA FOTO (Disponibilidad / Ubicación)
    pill_w = 144
    pill_h = 16
    pill_x = sidebar_x + (sidebar_w - pill_w) / 2.0
    pill_y = photo_cy - photo_radius - 14

    c.setFillColor(C_PILL_BG)
    c.setStrokeColor(C_PILL_BORDER)
    c.setLineWidth(0.8)
    c.roundRect(pill_x, pill_y, pill_w, pill_h, 4, fill=1, stroke=1)

    c.setFillColor(C_PILL_TEXT)
    c.setFont("Helvetica-Bold", 7.5)
    c.drawCentredString(sidebar_x + sidebar_w / 2.0, pill_y + 4.5, "MENDOZA, AR  ·  DISPONIBILIDAD INMEDIATA")

    # ESTILOS DE TEXTO SIDEBAR
    style_sb_label = ParagraphStyle(
        'SB_Label',
        fontName='Helvetica-Bold',
        fontSize=7,
        leading=9,
        textColor=C_MUTED
    )
    style_sb_val = ParagraphStyle(
        'SB_Val',
        fontName='Helvetica',
        fontSize=7.5,
        leading=10,
        textColor=C_DARK
    )
    style_sb_badge = ParagraphStyle(
        'SB_Badge',
        fontName='Helvetica',
        fontSize=7,
        leading=9.5,
        textColor=C_TEXT
    )

    def draw_sb_section_header(title, y_pos):
        c.setFillColor(C_PRIMARY)
        c.setFont("Helvetica-Bold", 8.5)
        c.drawString(sidebar_x + 14, y_pos, title)
        c.setStrokeColor(C_ACCENT)
        c.setLineWidth(1.2)
        c.line(sidebar_x + 14, y_pos - 3, sidebar_x + sidebar_w - 14, y_pos - 3)
        return y_pos - 12

    # BLOQUE DE CONTACTO
    cur_y = pill_y - 18
    cur_y = draw_sb_section_header("CONTACTO DIRECTO", cur_y)

    contact_items = [
        ("EMAIL", "diegofabian.aravena@gmail.com", "mailto:diegofabian.aravena@gmail.com"),
        ("WHATSAPP / TEL", "+54 260 484 0852", "https://wa.me/542604840852"),
        ("PORTAFOLIO WEB", "diegoaravena-it.vercel.app", "https://diegoaravena-it.vercel.app"),
        ("GITHUB", "github.com/DiegoAravena-lab", "https://github.com/DiegoAravena-lab"),
        ("UBICACIÓN", "Mendoza, Argentina", None),
    ]

    for label, val, link in contact_items:
        p_lbl = Paragraph(label, style_sb_label)
        p_val = Paragraph(val, style_sb_val)
        _, h_lbl = p_lbl.wrap(sidebar_w - 28, 50)
        p_lbl.drawOn(c, sidebar_x + 14, cur_y - h_lbl)
        cur_y -= h_lbl + 1

        _, h_val = p_val.wrap(sidebar_w - 28, 50)
        item_y = cur_y - h_val
        p_val.drawOn(c, sidebar_x + 14, item_y)

        # Enlace clickeable en PDF si aplica
        if link:
            c.linkURL(link, (sidebar_x + 14, item_y - 1, sidebar_x + sidebar_w - 14, item_y + h_val + 2), relative=0)

        cur_y -= h_val + 6

    # BLOQUE DE ACCESO RÁPIDO QR (2 Códigos: Web y WhatsApp)
    cur_y -= 4
    cur_y = draw_sb_section_header("ACCESO RÁPIDO (QR)", cur_y)

    qr_size = 48.0
    qr1_x = sidebar_x + 18
    qr2_x = sidebar_x + sidebar_w - 18 - qr_size
    qr_y = cur_y - qr_size

    # Fondo blanco de tarjetas QR con link interactivo
    web_url = "https://diegoaravena-it.vercel.app"
    wa_url = "https://wa.me/542604840852"

    for qx, target_url in [(qr1_x, web_url), (qr2_x, wa_url)]:
        c.setFillColor(C_WHITE)
        c.setStrokeColor(C_CARD_BORDER)
        c.setLineWidth(0.8)
        c.roundRect(qx - 4, qr_y - 4, qr_size + 8, qr_size + 8, 4, fill=1, stroke=1)
        # Link clickeable sobre la tarjeta QR completa
        c.linkURL(target_url, (qx - 4, qr_y - 16, qx + qr_size + 4, qr_y + qr_size + 4), relative=0)

    # Dibujar QR 1: Web
    d_qr1 = create_qr_drawing(web_url, qr_size)
    renderPDF.draw(d_qr1, c, qr1_x, qr_y)

    # Dibujar QR 2: WhatsApp
    d_qr2 = create_qr_drawing(wa_url, qr_size)
    renderPDF.draw(d_qr2, c, qr2_x, qr_y)

    cur_y = qr_y - 14
    c.setFillColor(C_DARK)
    c.setFont("Helvetica-Bold", 6.5)
    c.drawCentredString(qr1_x + qr_size / 2.0, cur_y + 4, "PORTAFOLIO WEB")
    c.drawCentredString(qr2_x + qr_size / 2.0, cur_y + 4, "CHAT WHATSAPP")

    c.setFillColor(C_MUTED)
    c.setFont("Helvetica", 6)
    c.drawCentredString(qr1_x + qr_size / 2.0, cur_y - 3, "16 Proyectos online")
    c.drawCentredString(qr2_x + qr_size / 2.0, cur_y - 3, "Contacto directo")

    # BLOQUE DE CORE STACK & COMPETENCIAS
    cur_y -= 14
    cur_y = draw_sb_section_header("COMPETENCIAS & STACK", cur_y)

    stack_groups = [
        ("SISTEMAS & INFRAESTRUCTURA", [
            "Windows Server, Linux (Ubuntu/WSL)",
            "Hyper-V, NSSM (servicios auto)",
            "Nginx (proxy inverso), FTP, SSL",
            "Cloudflare Named Tunnels (HTTPS)"
        ]),
        ("POS & DISPOSITIVOS RETAIL", [
            "Ecosistema Napse POS / Bridge / VTOL",
            "Balanzas Systel, Pinpads Ingenico",
            "Relojes biométricos de acceso"
        ]),
        ("BASES DE DATOS", [
            "MongoDB, PostgreSQL, Supabase",
            "SQLite, Prisma ORM, Jet OLEDB"
        ]),
        ("DESARROLLO & AUTOMATIZACIÓN", [
            "Python (pandas, openpyxl, Flask)",
            "TypeScript, Node.js, Next.js",
            "PowerShell, Batch, Git, Docker"
        ]),
    ]

    for grp_title, grp_items in stack_groups:
        c.setFillColor(C_PRIMARY)
        c.setFont("Helvetica-Bold", 6.8)
        c.drawString(sidebar_x + 14, cur_y, grp_title)
        cur_y -= 8

        for itm in grp_items:
            c.setFillColor(C_ACCENT)
            c.circle(sidebar_x + 17, cur_y + 2.5, 1.2, fill=1, stroke=0)

            p_itm = Paragraph(itm, style_sb_badge)
            _, h_itm = p_itm.wrap(sidebar_w - 32, 40)
            p_itm.drawOn(c, sidebar_x + 22, cur_y - h_itm + 8)
            cur_y -= h_itm + 1.5
        cur_y -= 4

    # IDIOMAS Y MODALIDAD
    cur_y = draw_sb_section_header("IDIOMAS & MODALIDAD", cur_y)
    p_mod = Paragraph("<b>Español:</b> Nativo · <b>Inglés:</b> Técnico<br/><b>Modalidad:</b> Presencial / Híbrido / Remoto", style_sb_val)
    _, h_mod = p_mod.wrap(sidebar_w - 28, 50)
    p_mod.drawOn(c, sidebar_x + 14, cur_y - h_mod)


    # =========================================================================
    # COLUMNA PRINCIPAL (MAIN COLUMN)
    # =========================================================================
    main_top_y = sidebar_y + sidebar_h

    # ENCABEZADO PRINCIPAL (NOMBRE Y TITULO)
    c.setFillColor(C_DARK)
    c.setFont("Helvetica-Bold", 23)
    c.drawString(main_x, main_top_y - 20, "DIEGO ARAVENA")

    c.setFillColor(C_ACCENT)
    c.setFont("Helvetica-Bold", 9.5)
    c.drawString(main_x, main_top_y - 33, "IT SUPPORT  ·  SYSTEM ADMINISTRATOR  ·  AUTOMATIZACIÓN & FULL-STACK")

    # Línea divisoria elegante
    c.setStrokeColor(C_PRIMARY)
    c.setLineWidth(1.8)
    c.line(main_x, main_top_y - 39, main_x + main_w, main_top_y - 39)

    c_y = main_top_y - 48

    # Estilos de la columna principal
    style_summary = ParagraphStyle(
        'Main_Summary',
        fontName='Helvetica',
        fontSize=8.2,
        leading=11.5,
        textColor=C_TEXT
    )
    style_job_title = ParagraphStyle(
        'Main_JobTitle',
        fontName='Helvetica-Bold',
        fontSize=8.8,
        leading=11.5,
        textColor=C_DARK
    )
    style_job_meta = ParagraphStyle(
        'Main_JobMeta',
        fontName='Helvetica-Bold',
        fontSize=7.5,
        leading=9.5,
        textColor=C_MUTED
    )
    style_bullet = ParagraphStyle(
        'Main_Bullet',
        fontName='Helvetica',
        fontSize=7.8,
        leading=10.5,
        textColor=C_TEXT
    )
    style_proj_title = ParagraphStyle(
        'Main_ProjTitle',
        fontName='Helvetica-Bold',
        fontSize=8.4,
        leading=10.5,
        textColor=C_DARK
    )
    style_proj_tech = ParagraphStyle(
        'Main_ProjTech',
        fontName='Helvetica-Bold',
        fontSize=7.0,
        leading=9,
        textColor=C_ACCENT
    )
    style_proj_desc = ParagraphStyle(
        'Main_ProjDesc',
        fontName='Helvetica',
        fontSize=7.6,
        leading=10.0,
        textColor=C_TEXT
    )

    def draw_main_section(title, y_pos):
        c.setFillColor(C_PRIMARY)
        c.setFont("Helvetica-Bold", 9.5)
        c.drawString(main_x, y_pos, title)
        c.setStrokeColor(C_SIDEBAR_LINE)
        c.setLineWidth(1)
        c.line(main_x, y_pos - 3, main_x + main_w, y_pos - 3)
        return y_pos - 12

    # 1. PERFIL PROFESIONAL (EL GANCHO)
    c_y = draw_main_section("PERFIL PROFESIONAL", c_y)
    summary_text = (
        "Profesional IT especializado en <b>soporte de infraestructura crítica, administración de sistemas y automatización "
        "de procesos para operaciones comerciales multisucursal</b>. Experiencia integral combinando diagnóstico de causa raíz "
        "sobre servicios Windows, redes VPN y bases de datos (MongoDB, PostgreSQL) con desarrollo de aplicaciones a medida "
        "(Python, Node.js, Next.js). Capacidad probada para relevar puntos de fricción operativa, integrar equipamiento comercial "
        "(relojes biométricos, balanzas, pinpads) y <b>reemplazar tareas repetitivas por herramientas autónomas</b> que ahorran "
        "horas de trabajo semanales y garantizan continuidad comercial."
    )
    p_sum = Paragraph(summary_text, style_summary)
    _, h_sum = p_sum.wrap(main_w, 200)
    p_sum.drawOn(c, main_x, c_y - h_sum)
    c_y -= h_sum + 10

    # 2. EXPERIENCIA LABORAL
    c_y = draw_main_section("EXPERIENCIA LABORAL", c_y)

    p_jt = Paragraph("Soporte IT / Operaciones de Sistemas & Desarrollo Interno", style_job_title)
    _, h_jt = p_jt.wrap(main_w - 90, 50)
    p_jt.drawOn(c, main_x, c_y - h_jt)

    p_date = Paragraph("2021 — ACTUALIDAD", style_job_meta)
    _, h_date = p_date.wrap(80, 20)
    p_date.drawOn(c, main_x + main_w - 75, c_y - h_jt + 1)

    c_y -= h_jt + 2

    p_org = Paragraph("Organización Retail / Mayorista Multisucursal · Red de sucursales y franquicias", style_job_meta)
    _, h_org = p_org.wrap(main_w, 50)
    p_org.drawOn(c, main_x, c_y - h_org)
    c_y -= h_org + 5

    exp_bullets = [
        "<b>Administración de infraestructura distribuida:</b> Soporte y operación continua de servidores Windows Server, enlaces VPN multisucursal, servicios NSSM, proxies Nginx y servidores FTP de distribución centralizada (~1 TB de archivos operativos).",
        "<b>Soporte especializado a puntos de venta (POS):</b> Diagnóstico de causa raíz y resolución de incidentes críticos sobre terminales de cobro, conectividad de pinpads serie (Ingenico), bases de datos MongoDB y APIs Node.js del ecosistema comercial.",
        "<b>Desarrollo de software y automatizaciones internas:</b> Construcción de portales web autoservicio y scripts desatendidos en Python que eliminaron planillas manuales de liquidación, conciliación de medios de pago y emisión de cartelería.",
        "<b>Supervisión proactiva y despliegues seguros:</b> Implementación de monitores concurrentes en tiempo real para ~35 nodos comerciales y publicación de servicios internos mediante Cloudflare Named Tunnels sin exponer puertos de red."
    ]

    for b in exp_bullets:
        c.setFillColor(C_ACCENT)
        c.circle(main_x + 4, c_y - 4, 1.5, fill=1, stroke=0)
        p_b = Paragraph(b, style_bullet)
        _, h_b = p_b.wrap(main_w - 14, 60)
        p_b.drawOn(c, main_x + 12, c_y - h_b)
        c_y -= h_b + 4

    c_y -= 4

    # 3. SISTEMAS & PROYECTOS DESTACADOS EN PRODUCCIÓN (16 PROYECTOS TOTALES EN WEB)
    c_y = draw_main_section("SISTEMAS & AUTOMATIZACIONES EN PRODUCCIÓN (SELECCIÓN)", c_y)

    projects_data = [
        (
            "BioReport Nexa & Automatización de Fichadas Biométricas",
            "Node.js · PowerShell · NSSM · OLEDB · Python · Supabase",
            "Arquitectura integral (extractor universal como servicio Windows desatendido bajo LocalSystem + API Node.js + panel web en vivo) "
            "que supera la virtualización UAC en bases MDB legadas y centraliza registros de múltiples sucursales con cierre diario y alertas de salidas faltantes.",
            "https://diegoaravena-it.vercel.app/proyectos/bioreport-nexa"
        ),
        (
            "NexaPOS & Sistema de Inventario de Activos con QR",
            "Next.js (App Router) · TypeScript · Tailwind · Prisma · PostgreSQL / Supabase · QR",
            "Plataforma transaccional completa con control de acceso por roles jerárquicos (Vendedor / Supervisor de proveedores), auditoría de cobranzas, "
            "edición inline de stock con trazabilidad histórica y gestión de inventario físico mediante lectura de códigos QR desde dispositivos móviles.",
            "https://diegoaravena-it.vercel.app/proyectos/nexapos-web"
        ),
        (
            "Portal Web de Scripts Operativos & Procesador VR Masivo",
            "Python (Flask) · pandas · CompressionStream (GZIP) · openpyxl · SQLite",
            "Plataforma web autoservicio que centraliza scripts de negocio para usuarios no técnicos. Incluye motor de cálculo para Reportes de Ventas "
            "(discriminación Verde fiscal vs Rojo no fiscal sin fórmulas Excel) y compresión GZIP en navegador para superar límites serverless.",
            "https://diegoaravena-it.vercel.app/proyectos/panel-scripts-python"
        ),
        (
            "Monitor de Ventas POS en Tiempo Real & Red de Balanzas Systel",
            "Node.js · Express · Chart.js · Python · Servidor FTP",
            "Tablero SPA con cliente HTTP nativo que consulta en paralelo ~35 nodos comerciales para supervisar ventas horarias y caídas de servicio, "
            "combinado con script Python que automatiza la actualización de listas de precios para ~15 balanzas (-4 h/semana ahorradas).",
            "https://diegoaravena-it.vercel.app/proyectos/monitor-ventas-pos"
        ),
        (
            "Verificador de Precios MongoDB & Cartelería Vectorial OCR",
            "Node.js · MongoDB · PDFKit · bwip-js · Cloudflare Named Tunnels",
            "Consulta en vivo a colecciones de precios del POS expuestas mediante túnel HTTPS persistente sin abrir puertos, con generación masiva "
            "de cartelería y cupones comerciales en PDF con códigos de barras vectoriales seleccionables.",
            "https://diegoaravena-it.vercel.app/proyectos/verificador-precios-carteleria"
        ),
    ]

    for p_title, p_tech, p_desc, p_url in projects_data:
        p_t = Paragraph(f"<b>{p_title}</b>", style_proj_title)
        _, h_t = p_t.wrap(main_w, 30)
        p_t.drawOn(c, main_x, c_y - h_t)

        # Enlace interactivo en título del proyecto hacia la web
        c.linkURL(p_url, (main_x, c_y - h_t, main_x + main_w, c_y), relative=0)
        c_y -= h_t + 1

        p_tc = Paragraph(p_tech, style_proj_tech)
        _, h_tc = p_tc.wrap(main_w, 20)
        p_tc.drawOn(c, main_x, c_y - h_tc)
        c_y -= h_tc + 1.5

        p_d = Paragraph(p_desc, style_proj_desc)
        _, h_d = p_d.wrap(main_w, 60)
        p_d.drawOn(c, main_x, c_y - h_d)
        c_y -= h_d + 6

    # 4. METODOLOGÍA & CRITERIO OPERATIVO (PIE DE COLUMNA)
    c_y -= 1
    c_y = draw_main_section("CRITERIO DE TRABAJO & METODOLOGÍA", c_y)
    crit_text = (
        "<b>Diagnóstico de Causa Raíz:</b> Análisis del flujo técnico real antes de aplicar parches temporales.<br/>"
        "<b>Automatización con Retorno Medible:</b> Enfoque pragmático en tareas que devuelven tiempo operativo al equipo.<br/>"
        "<b>Seguridad y Resguardo:</b> Respaldos automatizados previos a cambios en producción y documentación de mantenimiento."
    )
    p_crit = Paragraph(crit_text, style_summary)
    _, h_crit = p_crit.wrap(main_w, 60)
    p_crit.drawOn(c, main_x, c_y - h_crit)

    # FINALIZAR Y GUARDAR
    c.showPage()
    c.save()
    print(f"[OK] PDF generado: {OUTPUT_PDF}")

    # Copiar también en public/
    shutil.copy2(OUTPUT_PDF, PUBLIC_PDF)
    print(f"[OK] Copia en public/ generada: {PUBLIC_PDF}")

def verify_and_render_image():
    doc = pymupdf.open(str(OUTPUT_PDF))
    page_count = len(doc)
    print(f"[VERIFICACIÓN] Cantidad de páginas: {page_count}")
    if page_count != 1:
        print(f"[ERROR] El documento tiene {page_count} páginas en vez de 1!")
        sys.exit(1)

    page = doc[0]
    pix = page.get_pixmap(dpi=150)
    pix.save(str(OUTPUT_PNG))
    print(f"[OK] Imagen de previsualización generada: {OUTPUT_PNG} ({pix.width}x{pix.height} px)")

if __name__ == "__main__":
    render_cv()
    verify_and_render_image()
