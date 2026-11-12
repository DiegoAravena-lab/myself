---
slug: auditoria-medios-pago-pos
titulo: Auditoría automática de medios de pago, recepciones y ERP
tipo: Proyecto laboral
categoria: Python y Automatización
estado: En producción
impacto: multipunto
tecnologias: Python, pandas, openpyxl, CSV, gráficos Excel
---
# Auditoría automática de medios de pago, recepciones y cruce hacia ERP

**Resumen:** Suite de scripts en Python que cruza reportes del punto de venta (medios de pago, promociones, transferencias, recepciones y maestros de artículos) para detectar desvíos y generar libros Excel ejecutivos con gráficos nativos.

## Problema
Controlar incoherencias en cobros con billeteras digitales, promociones mal aplicadas, transferencias entre depósitos, recepciones de mercadería y altas de artículos hacia el sistema contable requería cruzar manualmente archivos CSV y Excel de gran tamaño.

## Mi responsabilidad
Relevamiento de reglas de control, programación de los scripts de cruce y diseño de las salidas ejecutivas en Excel.

## Solución
- **Auditoría de medios de pago y promociones:** scripts en Python (`pandas`, `openpyxl`) que cruzan transacciones por terminal y número de operación para detectar descuentos superpuestos o fuera de regla, generando tableros con KPIs y gráficos nativos de Excel (barras y dona) separados por sucursales y franquicias
- **Reorganización de recepciones y transferencias:** procesadores con auto-detección de dependencias y registro de logs que estructuran grillas operativas en informes listos para auditoría
- **Normalización de artículos para sistema contable:** script que busca automáticamente el reporte CSV más reciente y adapta columnas y códigos a la plantilla oficial de importación

## Resultado
- Detección rápida de desvíos de promociones y medios de pago que pasaban inadvertidos en controles manuales
- Salidas estandarizadas con formato ejecutivo sin fórmulas manuales propensas a error

## Qué demuestra
Automatización financiera y operativa en Python, análisis de datos transaccionales y generación programática de tableros Excel.

