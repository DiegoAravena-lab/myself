---
slug: publicacion-web
titulo: Publicación y exposición segura de aplicaciones web
tipo: Experiencia laboral y proyectos
categoria: Infraestructura y Web
estado: En producción
impacto: HTTPS
tecnologias: Nginx, Node.js, SSL, win-acme, Cloudflare Tunnel, WSL, Docker
---
# Administración y publicación de aplicaciones web

**Resumen:** Puesta en producción de aplicaciones internas y web, desde el entorno de desarrollo local hasta acceso seguro por red con HTTPS.

## Problema
Las herramientas desarrolladas internamente necesitaban pasar de ejecución local a entornos accesibles por red o internet de forma estable, sin exponer puertos innecesarios.

## Mi responsabilidad
Configuración de servidores web, proxies inversos, certificados SSL, túneles persistentes y contenedores de prueba.

## Solución
- Nginx como servidor web y proxy inverso para aplicaciones Node.js y servicios internos
- Gestión de dominios y emisión automática de certificados SSL mediante win-acme
- Configuración de Cloudflare Named Tunnels instalados como servicios de Windows para exponer APIs locales por HTTPS sin abrir puertos en el router
- Pruebas y estandarización de entornos Linux mediante WSL y Docker

## Resultado
- Despliegue seguro, reproducible y persistente ante reinicios de servidor
- Separación clara entre red interna de datos y capa de exposición HTTPS

## Qué demuestra
Dominio del ciclo completo de despliegue, redes, seguridad perimetral y operación de servicios.
