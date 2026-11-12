---
slug: fichadas-biometricas
titulo: Automatización de fichadas biométricas y reportes
tipo: Proyecto laboral
categoria: Python y Automatización
estado: En producción
impacto: en línea
tecnologias: Python, pandas, openpyxl, Node.js, Supabase, API REST, NSSM
---
# Automatización de fichadas biométricas y reportes de asistencia

**Resumen:** Reemplacé un proceso semanal manual por un flujo automático que extrae, procesa y reporta las fichadas de relojes biométricos de múltiples sucursales, complementado con un generador de reportes en Python con formato de tabla.

## Problema
Procesar las fichadas implicaba juntar archivos de distintos relojes, armar planillas periódicas y revisarlas manualmente. El proceso era lento y propenso a duplicados, marcas faltantes y errores al calcular horas trabajadas y horas extra.

## Mi responsabilidad
Análisis del circuito operativo, diseño de la arquitectura y desarrollo completo (agente extractor, API de ingesta, base de datos, frontend y scripts de reporte en Python).

## Solución
- Agente extractor que corre como servicio de Windows mediante NSSM y envía archivos MDB hacia una API REST en Node.js
- Backend y frontend conectados a Supabase para centralizar registros casi en tiempo real
- Motor de reportes en Python (`pandas`, `numpy`, `openpyxl`) que transforma las exportaciones biométricas en un libro Excel estructurado en 3 hojas tipo tabla: asistencia completa, resumen de horas por persona y marcas incompletas (entradas o salidas faltantes)

## Resultado
- Extracción y consolidación automática de fichadas entre sucursales
- Información disponible casi en tiempo real e informes listos para liquidación
- Detección automática de duplicados, registros faltantes e inconsistencias horarias

## Qué demuestra
Análisis de procesos, integración de hardware biométrico con servicios web, desarrollo full-stack y procesamiento de datos en Python.
