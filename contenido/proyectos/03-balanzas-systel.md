---
slug: balanzas-systel
titulo: Actualización automática de balanzas Systel
tipo: Proyecto laboral
categoria: Python y Automatización
estado: En producción
impacto: -4 h/sem
tecnologias: Python, openpyxl, FTP, automatización
---
# Actualización automática de balanzas Systel

**Resumen:** Eliminé una tarea repetitiva semanal sobre unas 15 balanzas combinando conversión automática de precios en Python y distribución vía FTP.

## Problema
Actualizar listas de precios y PLUs en unas 15 balanzas comerciales era una tarea manual que consumía varias horas por semana y presentaba riesgo de errores de formato.

## Mi responsabilidad
Relevamiento del formato requerido por las balanzas, desarrollo del conversor en Python y automatización de la distribución por red.

## Solución
- Script en Python (`openpyxl`) que lee planillas Excel de nuevos precios, genera automáticamente una copia de respaldo con marca temporal del archivo vigente y actualiza el CSV respetando delimitadores (`;`) y formato decimal requerido
- Servidor FTP centralizado para distribuir los archivos actualizados hacia las balanzas

## Resultado
- Ahorro estimado de unas 4 horas semanales en tareas repetitivas
- Respaldo automático previo a cada actualización para permitir reversión inmediata

## Qué demuestra
Detección de cuellos de botella operativos, scripting defensivo en Python y automatización de equipamiento comercial.
