---
slug: verificador-precios-carteleria
titulo: Verificador de precios en vivo y cartelería POS
tipo: Proyecto laboral
categoria: POS y Retail
estado: En producción
impacto: en vivo
tecnologias: Node.js, MongoDB, PDFKit, bwip-js, Cloudflare Tunnel, servicios de Windows
---
# Verificador de precios en vivo y generador de cartelería POS

**Resumen:** Aplicación web autenticada conectada en vivo a la base MongoDB del POS para consultar precios desde planta y generar carteles/flejes en PDF con código de barras vectorial.

## Problema
Los equipos de salón y venta externa necesitaban verificar precios vigentes y emitir carteles o flejes estandarizados sin ocupar terminales de caja ni exponer la base de datos a internet.

## Mi responsabilidad
Integración directa con las colecciones de precios y códigos de barras en MongoDB, motor de generación PDF y exposición segura mediante túnel persistente.

## Solución
- Backend Node.js conectado en vivo a las colecciones de precios, artículos y códigos de barras del POS, con búsqueda optimizada por SKU o código de barras
- Generador de cartelería PDF (`PDFKit` + `bwip-js`) en formato A4 completo o grilla 10x hoja, con códigos de barras vectoriales y texto seleccionable
- Exposición remota segura mediante Cloudflare Named Tunnel ejecutado como servicio autoejecutable de Windows, sin abrir puertos entrantes en la red local

## Resultado
- Verificación instantánea de precios reales y emisión uniforme de cartelería comercial
- Conectividad continua desde dispositivos externos sin comprometer la red interna

## Qué demuestra
Integración con bases MongoDB productivas, generación documental vectorial y arquitectura de acceso remoto seguro.

