---
slug: nexapos-web
titulo: NexaPOS — Punto de venta web y auditoría
tipo: Proyecto propio
categoria: POS y Retail
estado: En producción
impacto: multi-rol
tecnologias: Next.js, TypeScript, Tailwind CSS, Prisma, PostgreSQL, Supabase, NextAuth, XLSX
---
# NexaPOS — Sistema de punto de venta web y auditoría

**Resumen:** Aplicación POS web completa con gestión de ventas, inventario masivo por Excel, cobranzas a proveedores y control de acceso granular por roles.

## Problema
Los vendedores y supervisores necesitaban registrar ventas, controlar stock y auditar pagos a proveedores desde cualquier dispositivo, manteniendo estricta privacidad sobre costos y márgenes comerciales.

## Mi responsabilidad
Arquitectura de base de datos, backend, interfaz de usuario, autenticación y despliegue productivo en Vercel + Supabase.

## Solución
- Aplicación full-stack construida con Next.js (App Router), TypeScript, Tailwind CSS y Prisma sobre PostgreSQL (Supabase Connection Pooler con SSL)
- Carga masiva de productos vía Excel (`xlsx`) con trazabilidad agrupada y edición inline de stock con registro automático de ajustes (`INVENTORY_ADJUSTMENT`)
- Sistema de roles (`Superusuario`, `Vendedor`, `Supervisor/Proveedor`) con visibilidad filtrada por proveedor asignado, permiso dinámico de edición de stock y enmascaramiento automático de márgenes de ganancia en reportes para cuentas externas

## Resultado
- Operación comercial, cobranzas y auditoría de stock centralizadas en la nube
- Segregación efectiva de información sensible entre vendedores y proveedores externos

## Qué demuestra
Diseño de aplicaciones transaccionales seguras, modelado relacional con Prisma y control de permisos basado en roles.

