---
slug: monitor-ventas-pos
titulo: Monitor de ventas en tiempo real para red POS
tipo: Proyecto laboral
categoria: POS y Retail
estado: En producción
impacto: ~35 nodos
tecnologias: Node.js, Express, JavaScript, Chart.js, API REST
---
# Monitor de ventas en tiempo real para ecosistema POS

**Resumen:** Backend en Node.js y panel SPA que consulta en paralelo unos 35 nodos de punto de venta para visualizar facturación horaria y comparativa semanal en una sola vista.

## Problema
Consultar la evolución diaria de ventas y verificar si cada sucursal o franquicia tenía su servicio POS activo exigía conectarse nodo por nodo.

## Mi responsabilidad
Ingeniería inversa del flujo de consulta KPI del POS, desarrollo del cliente HTTP concurrente y construcción del tablero web.

## Solución
- Servidor Node.js + Express con cliente HTTP nativo que gestiona sesiones y cookies de autenticación contra cada nodo POS
- Consultas en paralelo para obtener ventas por hora del día actual y de 7 días atrás, ordenando naturalmente sucursales propias y franquicias
- Interfaz SPA responsiva con tarjetas KPI, prueba de conectividad por nodo y gráficos comparativos con Chart.js

## Resultado
- Supervisión centralizada de ~35 puntos de venta en tiempo real
- Detección inmediata de nodos caídos o con desvíos horarios frente a la semana anterior

## Qué demuestra
Integración con sistemas POS heredados, concurrencia en Node.js y observabilidad operativa.

