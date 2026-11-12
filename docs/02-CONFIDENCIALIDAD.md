# Confidencialidad: qué se puede publicar

## Nunca publicar
- IPs públicas o privadas, puertos expuestos, nombres de host o dominios internos
- Credenciales, tokens, cadenas de conexión, claves de API
- Nombres de usuarios, empleados o clientes; datos personales
- Bases de datos, capturas de sistemas reales, reportes comerciales, precios, volúmenes de venta
- Códigos de promociones, cupones o números de documento reales
- Nombres de sucursales y ubicaciones exactas

## Se puede publicar
- El problema y la solución explicados de forma genérica
- Tecnologías usadas (Node.js, MongoDB, Nginx, FTP, Supabase, etc.)
- Diagramas de arquitectura simplificados con nombres genéricos ("Casa central", "Sucursal A")
- Métricas que puedas demostrar (por ejemplo, "unas 4 h semanales ahorradas")
- Código propio sin datos de la empresa, en repositorios públicos

## Reglas de redacción
- Escribir "organización retail/mayorista multisucursal" salvo autorización para nombrarla
- Aproximar cifras sensibles ("cerca de 1 TB de reportes", "unas 15 balanzas")
- Los mockups usan datos inventados

## Checklist antes de cada publicación
- [ ] Busqué en el texto: números con puntos (IPs), "http", "@", contraseñas, nombres propios
- [ ] Las imágenes no muestran datos reales
- [ ] Los repos públicos no tienen `.env`, historiales con claves ni dumps
- [ ] Si dudo, no lo publico o pido autorización por escrito
