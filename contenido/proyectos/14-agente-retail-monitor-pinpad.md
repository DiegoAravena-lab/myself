---
slug: agente-retail-monitor-pinpad
titulo: Agente de monitoreo POS, scripts offline y soporte de pinpads
tipo: Proyecto laboral
categoria: Infraestructura y Web
estado: En producción
impacto: preventivo
tecnologias: Python, psutil, PowerShell, Batch, VTOL, servicios Windows
---
# Agente de monitoreo de nodos POS y automatización de soporte en cajas

**Resumen:** Conjunto de utilidades de infraestructura para supervisar servicios críticos en cada nodo POS, mantener operación offline de precios/códigos y automatizar parches de periféricos de cobro.

## Problema
Las fallas silenciosas de servicios locales en cajas, caídas de enlace o desconfiguraciones de pinpads serie detenían la línea de cobro y exigían intervención manual equipo por equipo.

## Mi responsabilidad
Desarrollo del agente de monitoreo en Python, scripts de contingencia offline en PowerShell/Batch y automatización de parches de configuración en cajas.

## Solución
- **Agente RetailMonitor en Python (`psutil`, `requests`):** servicio liviano instalado en cada servidor POS que verifica el estado de servicios críticos (motor MongoDB, agente y APIs del punto de venta) y reporta heartbeats periódicos a un monitor central
- **Contingencia offline (`PowerShell` + `Batch`):** tareas programadas que consolidan e integran listados locales de precios vigentes, costos y códigos de barras para mantener consultas activas ante cortes de conectividad
- **Parche automatizado de pinpads y diagnóstico:** script con respaldo previo automático que corrige el driver serie (`IngenicoRamSerialDriver`) y puerto `COM` en la configuración VTOL/Bridge, junto con utilidades rápidas de diagnóstico de red y reinicios del equipo

## Resultado
- Visibilidad proactiva del estado de servicios críticos por sucursal antes del reclamo en caja
- Resolución estandarizada en segundos para incidentes recurrentes de pinpads y redes

## Qué demuestra
Observabilidad de infraestructura distribuida, scripting de sistemas en Windows y continuidad operativa en punto de venta.

