---
slug: bioreport-nexa
titulo: BioReport Nexa — Sincronización biométrica centralizada
tipo: Proyecto laboral / ingeniería de sistemas
categoria: Python y Automatización
estado: En producción
impacto: multisucursal
tecnologias: Node.js, PowerShell, Python, NSSM, OLEDB, SSE, XLSX
---
# BioReport Nexa — Sincronización biométrica centralizada multisucursal

**Resumen:** Arquitectura completa (agente extractor autoinstalable en PowerShell + servidor central en Node.js + panel web estilo Excel) para consolidar en tiempo real las fichadas de relojes biométricos legados entre múltiples sucursales.

## Problema
El software biométrico legado (arquitectura 32 bits en Windows) operaba aislado por sucursal sobre bases Access locales (`MDB`), sin sincronización centralizada, con diferencias entre rutas de instalación y sin control unificado de marcas faltantes o cierre diario.

## Mi responsabilidad
Ingeniería inversa de la arquitectura del software legado y su protocolo TCP de relojes biométricos, desarrollo del agente universal en PowerShell, servidor central HTTP en Node.js, motor de reglas horarias y panel web operativo.

## Solución
- **Agente extractor universal (`ProsoftExtractor.ps1` + `NSSM`):** detecta automáticamente múltiples versiones del software y rutas de `VirtualStore` en Windows, consulta las bases locales vía OLEDB en solo lectura y corre bajo cuenta `LocalSystem` como servicio nativo con auto-reinicio sin requerir sesión iniciada
- **Servidor central en Node.js (`server.js`):** API REST con persistencia JSON, transmisión en vivo (SSE), gestión web para renombrar o filtrar sucursales y reglas de cálculo con filtro anti-rebote de 60 segundos, cierre diario a las 23:59 y regla de 24 horas para detectar salidas faltantes
- **Panel web estilo planilla:** interfaz con tema claro/oscuro, navegación por teclado tipo celdas de Excel, ranking de marcas incompletas y exportación directa a `.xlsx`

## Resultado
- Consolidación automática de fichadas desde distintas sucursales hacia un tablero único sin intervención manual
- Detección inmediata de empleados sin marca de salida y cálculo consistente de horas trabajadas

## Qué demuestra
Ingeniería inversa en entornos Windows, automatización de servicios desatendidos con PowerShell/NSSM y arquitectura cliente-servidor liviana sin dependencias pesadas.

