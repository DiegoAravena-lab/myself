---
slug: suite-python-vouchers-precios
titulo: Suite de vouchers CR80, cenefas PDF y precios en MongoDB
tipo: Proyecto laboral
categoria: Python y Automatización
estado: En producción
impacto: automático
tecnologias: Python, PyMuPDF, ReportLab, openpyxl, Node.js, MongoDB
---
# Suite de automatización: vouchers CR80, cenefas PDF y gestión de precios

**Resumen:** Conjunto de utilidades en Python y Node.js para emitir vouchers/credenciales con códigos de barras POS, maquetar cenefas promocionales en PDF y automatizar respaldos y listas de precios mayoristas.

## Problema
Generar cientos de credenciales o cupones impresos, maquetar ofertas por región y actualizar o exportar listas de precios desde el POS consumía jornadas completas de trabajo manual.

## Mi responsabilidad
Diseño y programación de generadores web/CLI, scripts de maquetación PDF y herramientas de consulta y respaldo sobre MongoDB.

## Solución
- **Generador de vouchers y credenciales ISO CR80:** aplicación web estática + motor Python (`ReportLab`, `PyMuPDF`, `openpyxl`) que genera planchas A4 dúplex con guías de corte y códigos EAN-13 / Code 128 con secuencias de escape POS (`TAB` y `ENTER`)
- **Generador de cenefas promocionales:** script Python con interfaz gráfica que toma planillas Excel de ofertas y genera PDFs multipágina listos para imprenta por región
- **Herramientas de precios sobre MongoDB:** scripts de respaldo solo lectura, actualización porcentual reversible y exportación a Excel de listas mayoristas filtrando SKUs internos de sistema

## Resultado
- Producción masiva de material imprimible con alineación dúplex milimétrica
- Reducción de errores humanos en lectura de cupones en caja y en modificaciones de listas de precios

## Qué demuestra
Automatización integral de procesos de retail combinando Python, generación PDF de precisión y manipulación segura de datos en MongoDB.

