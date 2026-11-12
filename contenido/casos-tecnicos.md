# Casos técnicos

Formato: Problema → Diagnóstico → Solución → Resultado. Todos los casos provienen de incidentes reales resueltos, redactados sin IPs, usuarios ni datos confidenciales.

## Caso 1 — Servicio de Windows que no encontraba Node.js
- **Problema:** una API basada en Node.js del ecosistema POS no iniciaba cuando se ejecutaba como servicio de Windows.
- **Diagnóstico:** el entorno aislado de la cuenta de servicio no incluía la ruta de instalación de Node.js en la variable `PATH`.
- **Solución:** configuré explícitamente la ruta absoluta del ejecutable y el directorio de trabajo en la definición del servicio.
- **Resultado:** el servicio inició automáticamente y mantuvo operación continua tras reinicios del servidor.

## Caso 2 — Conexión serverless a PostgreSQL por Transaction Pooler
- **Problema:** una aplicación web desplegada en Vercel fallaba en producción al consultar la base de datos en Supabase usando el puerto del Transaction Pooler.
- **Diagnóstico:** el cliente Prisma no estaba configurado con el adaptador `pg` ni forzaba SSL compatible, y en desarrollo se agotaban las conexiones tras recargas rápidas.
- **Solución:** integré `@prisma/adapter-pg` con SSL explícito sobre el driver `pg` e implementé un patrón Singleton (`globalThis`) para reutilizar la instancia en memoria.
- **Resultado:** conexión estable en producción serverless y entorno local sin saturación del pool.

## Caso 3 — Carga y procesamiento de archivos pesados en funciones serverless
- **Problema:** los archivos de reportes del POS (~18 MB en CSV) superaban el límite de 4.5 MB por petición en Vercel Serverless y devolvían error `413 Payload Too Large`.
- **Diagnóstico:** enviar los archivos sin comprimir impedía procesarlos en el backend Python alojado en la nube.
- **Solución:** implementé compresión GZIP transparente en el navegador con `CompressionStream("gzip")` (reduciendo ~18 MB a ~3.3 MB) y descompresión automática en memoria del backend Flask antes de ejecutar el script.
- **Resultado:** procesamiento web fluido de reportes masivos desde el navegador sin depender de consola local.

## Caso 4 — Exposición segura de API local hacia la nube sin abrir puertos
- **Problema:** un verificador de precios web en la nube necesitaba consultar en vivo la base MongoDB local de casa central.
- **Diagnóstico:** abrir puertos en el router hacia la red interna o exponer el motor de base de datos introducía riesgos de seguridad y fragilidad ante IP dinámica.
- **Solución:** configuré un túnel HTTPS persistente (Cloudflare Named Tunnel) ejecutado como servicio autoejecutable de Windows, apuntando únicamente al backend Node.js de consultas controladas.
- **Resultado:** disponibilidad continua vía HTTPS tras cada reinicio sin exponer puertos de entrada ni la base de datos.

## Caso 5 — Error de fuentes estándar al generar PDFs con PyMuPDF
- **Problema:** el generador automatizado de cartelería promocional en Python lanzaba la excepción `need font file or buffer` al renderizar precios en negrita.
- **Diagnóstico:** en versiones modernas de PyMuPDF sobre Python 3.13, el alias abreviado heredado `"helvb"` dejó de reconocerse como fuente Base-14 incorporada.
- **Solución:** actualicé todas las inserciones de texto tipográfico al alias oficial `"hebo"` (Helvetica-Bold) sin depender de fuentes externas.
- **Resultado:** generación estable y portátil de PDFs multipágina por región desde planillas Excel.

## Caso 6 — Pinpad Ingenico con error de dispositivo desconectado en POS
- **Problema:** al procesar pagos con tarjeta en terminales de caja con Pinpad Ingenico, el sistema POS devolvía el error "dispositivo desconectado".
- **Diagnóstico:** al auditar los logs del cliente VTOL y los archivos `.properties` de configuración, las propiedades de driver apuntaban por defecto a un pinpad Verifone y faltaba la definición del puerto serie `COM`.
- **Solución:** actualicé las propiedades al driver serie `IngenicoRamSerialDriver`, configuré los parámetros del puerto `COM` correspondiente y creé un script batch con respaldo automático para aplicar el parche de forma uniforme en cualquier caja.
- **Resultado:** operación de cobro con tarjeta restablecida y tiempo de resolución en soporte reducido a segundos.

## Caso 7 — Base de datos local vacía por UAC VirtualStore en Windows
- **Problema:** un extractor automático de fichadas biométricas leía la base `MDB` en la carpeta de instalación dentro de `Program Files (x86)` y devolvía cero registros, aunque el software mostraba actividad diaria normal.
- **Diagnóstico:** al tratarse de una aplicación legada de 32 bits sin manifiesto de elevación, Windows aplicaba virtualización de archivos (UAC VirtualStore), redirigiendo silenciosamente las escrituras reales hacia el perfil de usuario (`AppData\Local\VirtualStore\...`).
- **Solución:** actualicé el agente extractor en PowerShell para escanear tanto la ruta estándar como todas las rutas de `VirtualStore` de los perfiles del equipo, seleccionando automáticamente la base con mayor volumen real de registros activos.
- **Resultado:** sincronización confiable en todas las sucursales independientemente de la versión instalada o permisos heredados de Windows.
