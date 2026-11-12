---
slug: vectorizador-alta-calidad
titulo: Vectorizador raster a SVG de alta calidad
tipo: Proyecto propio
categoria: Python y Automatización
estado: En producción
impacto: drag & drop
tecnologias: Python, vtracer, Pillow, Batch, SVG
---
# Vectorizador de imágenes raster a SVG de alta calidad

**Resumen:** Herramienta personal en Python con motor `vtracer` (Rust) e interfaz drag-and-drop en Windows para convertir carteles e imágenes rasterizadas en gráficos vectoriales SVG limpios.

## Problema
Vectorizar cartelería, logotipos o piezas gráficas de baja resolución producía bordes escalonados y exceso de nodos por el ruido del anti-aliasing.

## Mi responsabilidad
Ajuste paramétrico del motor de vectorización, empaquetado de dependencias y flujo de ejecución directa para uso cotidiano.

## Solución
- Script en Python sobre `vtracer` y `Pillow` configurado en modo color apilado (`spline`) con precisión de trazos, agrupación de colores y filtrado de ruido (`filter_speckle`) para obtener curvas suaves y limpias
- Lanzador `.bat` en Windows que permite arrastrar y soltar cualquier imagen sobre el ejecutable, verifica automáticamente la disponibilidad de Python y librerías y genera el archivo `_vectorizado.svg`

## Resultado
- Conversión directa sin abrir editores gráficos pesados ni configurar parámetros repetitivos
- Archivos SVG livianos y escalables aptos para impresión y cartelería

## Qué demuestra
Automatización práctica de escritorio con Python, integración de motores nativos (Rust/Python) y foco en usabilidad inmediata.

