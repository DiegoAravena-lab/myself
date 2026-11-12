---
slug: panel-scripts-python
titulo: Portal web de scripts y automatizaciones en Python
tipo: Proyecto laboral
categoria: Python y Automatización
estado: En producción
impacto: autoservicio
tecnologias: Python, Flask, PostgreSQL, SQLite, JavaScript, CompressionStream
---
# Portal web de scripts y automatizaciones en Python

**Resumen:** Plataforma web autoservicio que centraliza scripts operativos en Python para que usuarios no técnicos procesen reportes complejos sin usar consola ni fórmulas manuales.

## Problema
Distintos sectores dependían de scripts locales en Python o planillas pesadas con fórmulas de Excel propensas a bloqueo para cruzar promociones, liquidaciones, transferencias y reportes de ventas.

## Mi responsabilidad
Arquitectura del portal, motor de ejecución desatendida de scripts, adaptación de módulos Python y optimización para despliegue serverless.

## Solución
- Backend en Python (Flask) con persistencia en PostgreSQL/SQLite para gestionar catálogo de scripts, parámetros dinámicos, descargas y enlaces internos
- Procesador en memoria de reportes de ventas fiscales y no fiscales (sin fórmulas de Excel), generador de informes biométricos y cruces de promociones/convenios desde múltiples archivos de entrada
- Compresión GZIP automática en el navegador (`CompressionStream`) para archivos pesados (> 18 MB) y descompresión transparente en el servidor, superando los límites de carga de funciones serverless

## Resultado
- Ejecución desatendida en segundos de reportes que antes requerían edición manual en Excel
- Autonomía de los equipos operativos para generar informes y descargar herramientas desde una interfaz web única

## Qué demuestra
Ingeniería en Python aplicada a negocio, resolución de límites de infraestructura serverless y diseño de herramientas centradas en el usuario final.

