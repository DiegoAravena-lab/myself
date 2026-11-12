---
slug: inventario-activos
titulo: Sistema de inventario de activos multisucursal
tipo: Proyecto laboral
categoria: POS y Retail
estado: En producción
impacto: trazable
tecnologias: Next.js, TypeScript, Tailwind CSS, shadcn/ui, Supabase, PostgreSQL, RLS, QR
---
# Sistema de inventario de activos multisucursal

**Resumen:** Plataforma web para registrar, transferir y auditar el inventario físico (equipos IT, impresoras, mobiliario e insumos) entre múltiples sucursales y sectores.

## Problema
Controlar la ubicación, el estado y las transferencias de equipamiento entre decenas de sucursales mediante planillas aisladas impedía mantener trazabilidad y valorización actualizada.

## Mi responsabilidad
Diseño funcional, esquema relacional con Row Level Security (RLS), desarrollo full-stack e importación de datos iniciales.

## Solución
- Aplicación en Next.js + TypeScript + Tailwind CSS + shadcn/ui respaldada por Supabase (PostgreSQL, Auth y políticas RLS)
- Gestión completa de altas, transferencias entre sucursales, bajas totales o parciales e historial auditable de movimientos
- Escáner de códigos QR desde dispositivos móviles (`html5-qrcode`), buscador global en vivo, exportación/importación Excel y dashboard valorizado en ARS y USD con gráficos en SVG puro

## Resultado
- Trazabilidad histórica por sucursal, sector y categoría de activo
- Acceso rápido mediante atajos de teclado y verificación móvil en planta

## Qué demuestra
Desarrollo full-stack orientado a operaciones reales, seguridad a nivel de fila en PostgreSQL e integración de utilidades móviles.

