#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Script generador del Curriculum Vitae de Diego Aravena en formato Microsoft Word (.docx).
- Estructura y contenidos 100% idénticos al PDF.
- 2 Columnas mediante tabla fija con fondo técnico en sidebar.
- Foto circular con anillo azul integrada.
- 2 Códigos QR nativos en alta resolución (Portafolio Web y WhatsApp directo).
- Totalmente editable en Microsoft Word, Google Docs o LibreOffice.
- Cero emojis y tipografía corporativa calibrada.
"""

import os
import sys
from pathlib import Path
import qrcode
from PIL import Image, ImageDraw

import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import parse_xml, OxmlElement
from docx.oxml.ns import nsdecls, qn

BASE_DIR = Path(__file__).resolve().parent
OUTPUT_DOCX = BASE_DIR / "Curriculum_Diego_Aravena.docx"
PUBLIC_DOCX = BASE_DIR / "public" / "Curriculum_Diego_Aravena.docx"
PHOTO_RAW = BASE_DIR / "public" / "diego-aravena.jpg"
PHOTO_CIRCLE = BASE_DIR / "public" / "diego-aravena-circle.png"
QR_WEB = BASE_DIR / "public" / "qr_web.png"
QR_WA = BASE_DIR / "public" / "qr_wa.png"

# Colores en RGB
CLR_PRIMARY = RGBColor(30, 58, 138)    # #1E3A8A Azul profundo
CLR_ACCENT = RGBColor(37, 99, 235)     # #2563EB Azul cobalto
CLR_DARK = RGBColor(15, 23, 42)        # #0F172A Slate 900
CLR_TEXT = RGBColor(51, 65, 85)        # #334155 Slate 700
CLR_MUTED = RGBColor(100, 116, 139)    # #64748B Slate 500

def prepare_assets():
    """Genera la foto circular y los 2 códigos QR en PNG."""
    # 1. Foto circular con borde azul
    if PHOTO_RAW.exists() and not PHOTO_CIRCLE.exists():
        photo = Image.open(str(PHOTO_RAW)).convert('RGBA')
        size = photo.size
        mask = Image.new('L', size, 0)
        draw = ImageDraw.Draw(mask)
        draw.ellipse((0, 0, size[0], size[1]), fill=255)

        output = Image.new('RGBA', size, (0, 0, 0, 0))
        output.paste(photo, (0, 0), mask=mask)

        draw_out = ImageDraw.Draw(output)
        draw_out.ellipse((2, 2, size[0]-3, size[1]-3), outline=(37, 99, 235, 255), width=6)
        output.save(str(PHOTO_CIRCLE))
        print(f"[OK] Foto circular generada: {PHOTO_CIRCLE}")

    # 2. QR Web
    qr_web = qrcode.QRCode(box_size=6, border=1)
    qr_web.add_data("https://diegoaravena-it.vercel.app")
    qr_web.make(fit=True)
    img_web = qr_web.make_image(fill_color="black", back_color="white")
    img_web.save(str(QR_WEB))

    # 3. QR WhatsApp
    qr_wa = qrcode.QRCode(box_size=6, border=1)
    qr_wa.add_data("https://wa.me/542604840852")
    qr_wa.make(fit=True)
    img_wa = qr_wa.make_image(fill_color="black", back_color="white")
    img_wa.save(str(QR_WA))
    print("[OK] QRs en PNG generados para Word")

def set_cell_margins(cell, top=100, bottom=100, left=150, right=150):
    """Ajusta márgenes internos de una celda en dxa (1 pt = 20 dxa)."""
    tcPr = cell._tc.get_or_add_tcPr()
    tcMar = OxmlElement('w:tcMar')
    for m_name, m_val in [('top', top), ('bottom', bottom), ('left', left), ('right', right)]:
        node = OxmlElement(f'w:{m_name}')
        node.set(qn('w:w'), str(m_val))
        node.set(qn('w:type'), 'dxa')
        tcMar.append(node)
    tcPr.append(tcMar)

def set_cell_shading(cell, color_hex="F8FAFC"):
    """Aplica sombreado de fondo a la celda."""
    tcPr = cell._tc.get_or_add_tcPr()
    shd = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{color_hex}"/>')
    tcPr.append(shd)

def set_cell_border_right(cell, color_hex="E2E8F0", sz="6"):
    """Agrega un borde derecho sutil a la celda para separar columnas."""
    tcPr = cell._tc.get_or_add_tcPr()
    tcBorders = parse_xml(
        f'<w:tcBorders {nsdecls("w")}>'
        f'<w:top w:val="none"/>'
        f'<w:left w:val="none"/>'
        f'<w:bottom w:val="none"/>'
        f'<w:right w:val="single" w:sz="{sz}" w:space="0" w:color="{color_hex}"/>'
        f'</w:tcBorders>'
    )
    tcPr.append(tcBorders)

def add_sidebar_heading(cell, title):
    p = cell.add_paragraph()
    p.paragraph_format.space_before = Pt(8)
    p.paragraph_format.space_after = Pt(2)
    p.paragraph_format.line_spacing = Pt(11)
    run = p.add_run(title)
    run.font.name = "Arial"
    run.font.size = Pt(8.5)
    run.font.bold = True
    run.font.color.rgb = CLR_PRIMARY

    # Línea debajo del heading
    p_line = cell.add_paragraph()
    p_line.paragraph_format.space_before = Pt(0)
    p_line.paragraph_format.space_after = Pt(4)
    run_line = p_line.add_run("―" * 28)
    run_line.font.name = "Arial"
    run_line.font.size = Pt(4)
    run_line.font.color.rgb = CLR_ACCENT

def add_main_heading(cell, title):
    p = cell.add_paragraph()
    p.paragraph_format.space_before = Pt(8)
    p.paragraph_format.space_after = Pt(2)
    run = p.add_run(title)
    run.font.name = "Arial"
    run.font.size = Pt(9.5)
    run.font.bold = True
    run.font.color.rgb = CLR_PRIMARY

    p_line = cell.add_paragraph()
    p_line.paragraph_format.space_before = Pt(0)
    p_line.paragraph_format.space_after = Pt(4)
    run_line = p_line.add_run("―" * 58)
    run_line.font.name = "Arial"
    run_line.font.size = Pt(4)
    run_line.font.color.rgb = RGBColor(226, 232, 240)

def build_docx():
    prepare_assets()

    doc = docx.Document()

    # 1. Configuración de página A4 con márgenes de 0.4 pulgadas
    section = doc.sections[0]
    section.page_width = Inches(8.27)
    section.page_height = Inches(11.69)
    section.top_margin = Inches(0.4)
    section.bottom_margin = Inches(0.4)
    section.left_margin = Inches(0.4)
    section.right_margin = Inches(0.4)

    # 2. Tabla principal de 2 columnas (1 fila)
    table = doc.add_table(rows=1, cols=2)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    table.autofit = False

    cell_sb = table.cell(0, 0)
    cell_mn = table.cell(0, 1)

    cell_sb.width = Inches(2.40)
    cell_mn.width = Inches(5.07)

    # Padding y estilos de celda
    set_cell_margins(cell_sb, top=140, bottom=140, left=160, right=160)
    set_cell_margins(cell_mn, top=100, bottom=100, left=200, right=100)
    set_cell_shading(cell_sb, "F8FAFC")
    set_cell_border_right(cell_sb, "E2E8F0", "6")

    # =========================================================================
    # SIDEBAR (COLUMNA IZQUIERDA)
    # =========================================================================
    # Foto de perfil
    p_photo = cell_sb.paragraphs[0]
    p_photo.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_photo.paragraph_format.space_before = Pt(0)
    p_photo.paragraph_format.space_after = Pt(4)
    if PHOTO_CIRCLE.exists():
        p_photo.add_run().add_picture(str(PHOTO_CIRCLE), width=Inches(1.05))

    # Badge Ubicación
    p_pill = cell_sb.add_paragraph()
    p_pill.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_pill.paragraph_format.space_before = Pt(0)
    p_pill.paragraph_format.space_after = Pt(8)
    run_pill = p_pill.add_run("SAN RAFAEL, MENDOZA")
    run_pill.font.name = "Arial"
    run_pill.font.size = Pt(7.5)
    run_pill.font.bold = True
    run_pill.font.color.rgb = CLR_ACCENT

    # CONTACTO DIRECTO
    add_sidebar_heading(cell_sb, "CONTACTO DIRECTO")

    contacts = [
        ("EMAIL", "diegofabian.aravena@gmail.com"),
        ("WHATSAPP / TEL", "+54 260 484 0852"),
        ("PORTAFOLIO WEB", "diegoaravena-it.vercel.app"),
        ("GITHUB", "github.com/DiegoAravena-lab"),
        ("UBICACIÓN", "San Rafael, Mendoza, Argentina"),
    ]
    for lbl, val in contacts:
        p_c = cell_sb.add_paragraph()
        p_c.paragraph_format.space_before = Pt(0)
        p_c.paragraph_format.space_after = Pt(2.5)
        p_c.paragraph_format.line_spacing = Pt(9.5)

        r_lbl = p_c.add_run(f"{lbl}\n")
        r_lbl.font.name = "Arial"
        r_lbl.font.size = Pt(6.8)
        r_lbl.font.bold = True
        r_lbl.font.color.rgb = CLR_MUTED

        r_val = p_c.add_run(val)
        r_val.font.name = "Arial"
        r_val.font.size = Pt(7.5)
        r_val.font.color.rgb = CLR_DARK

    # ACCESO RÁPIDO (QR)
    add_sidebar_heading(cell_sb, "ACCESO RÁPIDO (QR)")

    # Tabla anidada para colocar los 2 QRs en paralelo
    table_qr = cell_sb.add_table(rows=2, cols=2)
    table_qr.autofit = False
    table_qr.alignment = WD_TABLE_ALIGNMENT.CENTER
    for row in table_qr.rows:
        row.cells[0].width = Inches(1.0)
        row.cells[1].width = Inches(1.0)
        for c in row.cells:
            set_cell_margins(c, top=20, bottom=20, left=40, right=40)

    # Fila 1: Imágenes QR
    p_q1 = table_qr.cell(0, 0).paragraphs[0]
    p_q1.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_q1.paragraph_format.space_after = Pt(0)
    p_q1.add_run().add_picture(str(QR_WEB), width=Inches(0.72))

    p_q2 = table_qr.cell(0, 1).paragraphs[0]
    p_q2.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_q2.paragraph_format.space_after = Pt(0)
    p_q2.add_run().add_picture(str(QR_WA), width=Inches(0.72))

    # Fila 2: Etiquetas
    p_t1 = table_qr.cell(1, 0).paragraphs[0]
    p_t1.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_t1.paragraph_format.space_before = Pt(1)
    p_t1.paragraph_format.space_after = Pt(0)
    r1 = p_t1.add_run("PORTAFOLIO\n")
    r1.font.name = "Arial"
    r1.font.size = Pt(6.5)
    r1.font.bold = True
    r1_sub = p_t1.add_run("16 Proyectos")
    r1_sub.font.name = "Arial"
    r1_sub.font.size = Pt(5.8)
    r1_sub.font.color.rgb = CLR_MUTED

    p_t2 = table_qr.cell(1, 1).paragraphs[0]
    p_t2.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_t2.paragraph_format.space_before = Pt(1)
    p_t2.paragraph_format.space_after = Pt(0)
    r2 = p_t2.add_run("WHATSAPP\n")
    r2.font.name = "Arial"
    r2.font.size = Pt(6.5)
    r2.font.bold = True
    r2_sub = p_t2.add_run("Contacto directo")
    r2_sub.font.name = "Arial"
    r2_sub.font.size = Pt(5.8)
    r2_sub.font.color.rgb = CLR_MUTED

    # COMPETENCIAS & STACK
    add_sidebar_heading(cell_sb, "COMPETENCIAS & STACK")

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

    for grp_t, grp_items in stack_groups:
        p_gt = cell_sb.add_paragraph()
        p_gt.paragraph_format.space_before = Pt(3)
        p_gt.paragraph_format.space_after = Pt(1)
        r_gt = p_gt.add_run(grp_t)
        r_gt.font.name = "Arial"
        r_gt.font.size = Pt(6.8)
        r_gt.font.bold = True
        r_gt.font.color.rgb = CLR_PRIMARY

        for itm in grp_items:
            p_i = cell_sb.add_paragraph()
            p_i.paragraph_format.space_before = Pt(0)
            p_i.paragraph_format.space_after = Pt(1)
            p_i.paragraph_format.line_spacing = Pt(9)
            r_bullet = p_i.add_run("• ")
            r_bullet.font.name = "Arial"
            r_bullet.font.size = Pt(7)
            r_bullet.font.bold = True
            r_bullet.font.color.rgb = CLR_ACCENT

            r_i = p_i.add_run(itm)
            r_i.font.name = "Arial"
            r_i.font.size = Pt(7)
            r_i.font.color.rgb = CLR_TEXT

    # IDIOMAS & DATOS
    add_sidebar_heading(cell_sb, "IDIOMAS & DATOS")
    p_im = cell_sb.add_paragraph()
    p_im.paragraph_format.space_before = Pt(1)
    p_im.paragraph_format.space_after = Pt(0)
    p_im.paragraph_format.line_spacing = Pt(9.5)
    r_im1 = p_im.add_run("Español: ")
    r_im1.font.bold = True
    r_im1.font.size = Pt(7.2)
    r_im2 = p_im.add_run("Nativo  ·  ")
    r_im2.font.size = Pt(7.2)
    r_im3 = p_im.add_run("Inglés: ")
    r_im3.font.bold = True
    r_im3.font.size = Pt(7.2)
    r_im4 = p_im.add_run("Avanzado\n")
    r_im4.font.size = Pt(7.2)
    r_im5 = p_im.add_run("Movilidad: ")
    r_im5.font.bold = True
    r_im5.font.size = Pt(7.2)
    r_im6 = p_im.add_run("Carnet y vehículo propio\n")
    r_im6.font.size = Pt(7.2)
    r_im7 = p_im.add_run("Disponibilidad: ")
    r_im7.font.bold = True
    r_im7.font.size = Pt(7.2)
    r_im8 = p_im.add_run("Para viajar · Híbrido/Remoto")
    r_im8.font.size = Pt(7.2)

    # =========================================================================
    # COLUMNA PRINCIPAL (MAIN CONTENT)
    # =========================================================================
    # Nombre
    p_name = cell_mn.paragraphs[0]
    p_name.paragraph_format.space_before = Pt(0)
    p_name.paragraph_format.space_after = Pt(1)
    r_name = p_name.add_run("DIEGO ARAVENA")
    r_name.font.name = "Arial"
    r_name.font.size = Pt(21)
    r_name.font.bold = True
    r_name.font.color.rgb = CLR_DARK

    # Título profesional
    p_title = cell_mn.add_paragraph()
    p_title.paragraph_format.space_before = Pt(0)
    p_title.paragraph_format.space_after = Pt(2)
    r_title = p_title.add_run("IT SUPPORT · SYSADMIN · AUTOMATIZACIÓN & IA · MARKETING")
    r_title.font.name = "Arial"
    r_title.font.size = Pt(9)
    r_title.font.bold = True
    r_title.font.color.rgb = CLR_ACCENT

    # Barra decorativa
    p_div = cell_mn.add_paragraph()
    p_div.paragraph_format.space_before = Pt(0)
    p_div.paragraph_format.space_after = Pt(12)
    r_div = p_div.add_run("―" * 58)
    r_div.font.name = "Arial"
    r_div.font.size = Pt(4)
    r_div.font.bold = True
    r_div.font.color.rgb = CLR_PRIMARY

    # 1. PERFIL PROFESIONAL
    add_main_heading(cell_mn, "PERFIL PROFESIONAL")
    p_prof = cell_mn.add_paragraph()
    p_prof.paragraph_format.space_before = Pt(0)
    p_prof.paragraph_format.space_after = Pt(6)
    p_prof.paragraph_format.line_spacing = Pt(11)

    r_prof = p_prof.add_run(
        "Profesional IT y desarrollador Full-Stack especializado en infraestructura crítica, automatización con IA "
        "y gestión estratégica de Marketing y Proyectos. Combino administración de sistemas (Windows Server, VPN, POS, "
        "MongoDB, PostgreSQL) con desarrollo a medida (Python, Node.js, Next.js) y visión comercial para optimizar "
        "operaciones multisucursal y potenciar resultados."
    )
    r_prof.font.name = "Arial"
    r_prof.font.size = Pt(8.0)
    r_prof.font.color.rgb = CLR_TEXT

    # 2. EXPERIENCIA LABORAL
    add_main_heading(cell_mn, "EXPERIENCIA LABORAL")

    p_exp_h = cell_mn.add_paragraph()
    p_exp_h.paragraph_format.space_before = Pt(0)
    p_exp_h.paragraph_format.space_after = Pt(1)
    r_eh1 = p_exp_h.add_run("Coordinación IT, Capacitación, Gestión Tecnológica & Marketing")
    r_eh1.font.name = "Arial"
    r_eh1.font.size = Pt(8.6)
    r_eh1.font.bold = True
    r_eh1.font.color.rgb = CLR_DARK

    r_eh2 = p_exp_h.add_run("     2021 — ACTUALIDAD")
    r_eh2.font.name = "Arial"
    r_eh2.font.size = Pt(7.5)
    r_eh2.font.bold = True
    r_eh2.font.color.rgb = CLR_MUTED

    p_exp_sub = cell_mn.add_paragraph()
    p_exp_sub.paragraph_format.space_before = Pt(0)
    p_exp_sub.paragraph_format.space_after = Pt(4)
    r_es = p_exp_sub.add_run("La Yunta Mayorista (La Yunta S.A.) · Gestión transversal de ~38 sucursales")
    r_es.font.name = "Arial"
    r_es.font.size = Pt(7.4)
    r_es.font.italic = True
    r_es.font.color.rgb = CLR_MUTED

    exp_bullets = [
        ("Coordinación Operativa & Infraestructura (~38 sucursales): ", "Gestión transversal de tecnología, resolución de incidencias, operación de Windows Server, VPN, NSSM, Nginx/FTP (~1 TB) y soporte POS (pinpads, balanzas, MongoDB/Node.js)."),
        ("Capacitación & Acompañamiento a Equipos: ", "Capacitación continua a usuarios de distintos niveles jerárquicos, elaboración de documentación operativa (videos y registros) e implementación de mejoras en procesos internos."),
        ("Automatización & Herramientas Propias (IA / Full-Stack): ", "Impulso y desarrollo de portales web internos y scripts en Python/IA para optimizar tareas, reducir tiempos y mejorar la disponibilidad de información para toma de decisiones."),
        ("Marketing Manager: ", "Planificación y ejecución de acciones de marketing, definición de objetivos comerciales y apoyo estratégico en toma de decisiones.")
    ]

    for b_bold, b_text in exp_bullets:
        p_b = cell_mn.add_paragraph()
        p_b.paragraph_format.space_before = Pt(0)
        p_b.paragraph_format.space_after = Pt(2.5)
        p_b.paragraph_format.line_spacing = Pt(10)

        r_bullet = p_b.add_run("• ")
        r_bullet.font.name = "Arial"
        r_bullet.font.size = Pt(8)
        r_bullet.font.bold = True
        r_bullet.font.color.rgb = CLR_ACCENT

        r_bb = p_b.add_run(b_bold)
        r_bb.font.name = "Arial"
        r_bb.font.size = Pt(7.6)
        r_bb.font.bold = True
        r_bb.font.color.rgb = CLR_DARK

        r_bt = p_b.add_run(b_text)
        r_bt.font.name = "Arial"
        r_bt.font.size = Pt(7.6)
        r_bt.font.color.rgb = CLR_TEXT

    # 2.5 EXPERIENCIA PREVIA Y FREELANCE
    p_jt2 = cell_mn.add_paragraph()
    p_jt2.paragraph_format.space_before = Pt(3)
    p_jt2.paragraph_format.space_after = Pt(1)
    r_jt2 = p_jt2.add_run("Consultor IT & Desarrollador Freelance — Sistemas a Medida")
    r_jt2.font.name = "Arial"
    r_jt2.font.size = Pt(8.3)
    r_jt2.font.bold = True
    r_jt2.font.color.rgb = CLR_DARK

    p_b2 = cell_mn.add_paragraph()
    p_b2.paragraph_format.space_before = Pt(0)
    p_b2.paragraph_format.space_after = Pt(2)
    p_b2.paragraph_format.line_spacing = Pt(9.5)
    r_bu2 = p_b2.add_run("• ")
    r_bu2.font.name = "Arial"
    r_bu2.font.size = Pt(8)
    r_bu2.font.bold = True
    r_bu2.font.color.rgb = CLR_ACCENT
    r_bb2 = p_b2.add_run("Distribuidora de Bebidas & Distribuidora de Ferreterías: ")
    r_bb2.font.name = "Arial"
    r_bb2.font.size = Pt(7.5)
    r_bb2.font.bold = True
    r_bb2.font.color.rgb = CLR_DARK
    r_bt2 = p_b2.add_run("Desarrollo e implementación de Punto de Venta (POS) programado a medida; control de inventario y carga estructurada de ítems en base de datos.")
    r_bt2.font.name = "Arial"
    r_bt2.font.size = Pt(7.5)
    r_bt2.font.color.rgb = CLR_TEXT

    p_jt3 = cell_mn.add_paragraph()
    p_jt3.paragraph_format.space_before = Pt(2)
    p_jt3.paragraph_format.space_after = Pt(1)
    r_jt3 = p_jt3.add_run("Profesor & Acompañante Terapéutico — Educación y Formación")
    r_jt3.font.name = "Arial"
    r_jt3.font.size = Pt(8.3)
    r_jt3.font.bold = True
    r_jt3.font.color.rgb = CLR_DARK

    p_b3 = cell_mn.add_paragraph()
    p_b3.paragraph_format.space_before = Pt(0)
    p_b3.paragraph_format.space_after = Pt(2)
    p_b3.paragraph_format.line_spacing = Pt(9.5)
    r_bu3 = p_b3.add_run("• ")
    r_bu3.font.name = "Arial"
    r_bu3.font.size = Pt(8)
    r_bu3.font.bold = True
    r_bu3.font.color.rgb = CLR_ACCENT
    r_bb3 = p_b3.add_run("Esc. San Martín, Esc. República de Siria e Instituto CENECA (San Rafael, Mza.): ")
    r_bb3.font.name = "Arial"
    r_bb3.font.size = Pt(7.5)
    r_bb3.font.bold = True
    r_bb3.font.color.rgb = CLR_DARK
    r_bt3 = p_b3.add_run("Dictado de clases, acompañamiento terapéutico y seguimiento formativo personalizado.")
    r_bt3.font.name = "Arial"
    r_bt3.font.size = Pt(7.5)
    r_bt3.font.color.rgb = CLR_TEXT

    # 3. SISTEMAS & AUTOMATIZACIONES EN PRODUCCIÓN
    add_main_heading(cell_mn, "SISTEMAS & AUTOMATIZACIONES EN PRODUCCIÓN (SELECCIÓN)")

    projects = [
        (
            "BioReport Nexa & Automatización de Fichadas Biométricas",
            "Node.js · PowerShell · NSSM · OLEDB · Python · Supabase",
            "Extractor universal como servicio Windows desatendido + API Node.js + panel web en vivo que supera virtualización UAC en MDB y centraliza fichadas multisucursal."
        ),
        (
            "NexaPOS & Sistema de Inventario de Activos con QR",
            "Next.js (App Router) · TypeScript · Prisma · PostgreSQL / Supabase · QR",
            "Plataforma transaccional con roles jerárquicos, auditoría de cobranzas, edición inline de stock con trazabilidad histórica e inventario físico mediante lectura QR móvil."
        ),
        (
            "Portal de Scripts Operativos, Monitor POS (~35 nodos) & Balanzas Systel",
            "Python (Flask) · Node.js · MongoDB · PDFKit · Cloudflare Named Tunnels",
            "Portal autoservicio con procesador de Reportes de Ventas, tablero en paralelo de nodos POS, automatización FTP para ~15 balanzas (-4 h/sem) y cartelería PDF vectorial."
        ),
    ]

    for p_title, p_tech, p_desc in projects:
        p_pt = cell_mn.add_paragraph()
        p_pt.paragraph_format.space_before = Pt(2)
        p_pt.paragraph_format.space_after = Pt(0)
        r_pt = p_pt.add_run(p_title)
        r_pt.font.name = "Arial"
        r_pt.font.size = Pt(8.2)
        r_pt.font.bold = True
        r_pt.font.color.rgb = CLR_DARK

        p_ptc = cell_mn.add_paragraph()
        p_ptc.paragraph_format.space_before = Pt(0)
        p_ptc.paragraph_format.space_after = Pt(1)
        r_ptc = p_ptc.add_run(p_tech)
        r_ptc.font.name = "Arial"
        r_ptc.font.size = Pt(6.8)
        r_ptc.font.bold = True
        r_ptc.font.color.rgb = CLR_ACCENT

        p_pd = cell_mn.add_paragraph()
        p_pd.paragraph_format.space_before = Pt(0)
        p_pd.paragraph_format.space_after = Pt(3.5)
        p_pd.paragraph_format.line_spacing = Pt(9.5)
        r_pd = p_pd.add_run(p_desc)
        r_pd.font.name = "Arial"
        r_pd.font.size = Pt(7.4)
        r_pd.font.color.rgb = CLR_TEXT

    # 4. FORMACIÓN ACADÉMICA
    add_main_heading(cell_mn, "FORMACIÓN ACADÉMICA")
    formacion = [
        ("Desarrollo de Software con IA (2025–2026) · ", "BigSchool — Universidad Isabel I de España"),
        ("Ciberseguridad y Hacking Ético (2024–2026) · ", "BigSchool — Universidad Isabel I de España"),
        ("Profesorado de Inglés (2017–2022) · ", "Formación complementaria en Grado en Marketing"),
    ]
    for f_bold, f_desc in formacion:
        p_cr = cell_mn.add_paragraph()
        p_cr.paragraph_format.space_before = Pt(0)
        p_cr.paragraph_format.space_after = Pt(1.5)
        p_cr.paragraph_format.line_spacing = Pt(9.5)

        r_cb = p_cr.add_run(f_bold)
        r_cb.font.name = "Arial"
        r_cb.font.size = Pt(7.6)
        r_cb.font.bold = True
        r_cb.font.color.rgb = CLR_DARK

        r_cd = p_cr.add_run(f_desc)
        r_cd.font.name = "Arial"
        r_cd.font.size = Pt(7.6)
        r_cd.font.color.rgb = CLR_TEXT

    # 5. REFERENCIAS LABORALES Y COMERCIALES
    add_main_heading(cell_mn, "REFERENCIAS LABORALES Y COMERCIALES")
    refs = [
        ("Florencia Carboni ", "| Gerente General — La Yunta S.A. | Tel: +54 9 11 6203-1060"),
        ("Directora General — Instituto CENECA ", "(Docencia / Acomp. Terapéutico) | Tel: +54 260 440 7977"),
        ("Jorge Cruzate ", "| Dueño — Distribuidora de Ferreterías (Control Inventario / BD) | Tel: +54 260 466 2421"),
        ("Dueño — Distribuidora de Bebidas ", "(POS Programado a Medida) | Tel: +54 260 427 3325"),
    ]
    for r_bold, r_rest in refs:
        p_ref = cell_mn.add_paragraph()
        p_ref.paragraph_format.space_before = Pt(0)
        p_ref.paragraph_format.space_after = Pt(1.5)
        p_ref.paragraph_format.line_spacing = Pt(9.5)
        r_rb = p_ref.add_run(r_bold)
        r_rb.font.name = "Arial"
        r_rb.font.size = Pt(7.5)
        r_rb.font.bold = True
        r_rb.font.color.rgb = CLR_DARK
        r_rd = p_ref.add_run(r_rest)
        r_rd.font.name = "Arial"
        r_rd.font.size = Pt(7.5)
        r_rd.font.color.rgb = CLR_TEXT

    # Guardar documento
    doc.save(str(OUTPUT_DOCX))
    print(f"[OK] Documento Word generado: {OUTPUT_DOCX}")

    import shutil
    shutil.copy2(OUTPUT_DOCX, PUBLIC_DOCX)
    print(f"[OK] Copia en public/ generada: {PUBLIC_DOCX}")

if __name__ == "__main__":
    build_docx()

