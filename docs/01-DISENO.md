# Sistema de diseño

## Concepto
La web es un **ticket de punto de venta**, que es el mundo real del trabajo: retail mayorista, POS, balanzas, impresoras de 80 mm. El hero imprime un ticket una sola vez al cargar; cada renglón es un proyecto y el importe es el resultado. Todo lo demás queda quieto y sobrio.

## Color
| Nombre | Hex | Uso |
|---|---|---|
| Mostrador | `#DCE3E8` | Fondo de página |
| Papel térmico | `#FAFBFA` | Ticket y bloques de contenido |
| Tinta | `#232B38` | Texto |
| Sello fiscal | `#2F5BEA` | Enlaces, botones, foco |
| Línea | `#B9C3CC` | Bordes y separadores |

## Tipografía
- **Public Sans**: toda la web (títulos 600, cuerpo 400)
- **IBM Plex Mono**: solo dentro del ticket
- Escala: 14 / 16 / 18 / 24 / 32 / 48 px; interlineado 1.55 en cuerpo; línea menor a 80 caracteres

## Layout
- Alineación a la izquierda en todo el sitio
- Escritorio: texto a la izquierda y ticket a la derecha. Móvil: ticket arriba, ancho completo
- Proyectos: lista de filas (no tarjetas idénticas); cada una abre su página
- Casos técnicos: numerados (es una secuencia real)

```
+------------------------------------------+
| Diego Aravena                  [Contacto]|
|                                          |
| Administro y automatizo      +---------+ |
| la infraestructura IT        | TICKET  | |
| de operaciones retail.       | ....... | |
| [Ver proyectos]              | TOTAL   | |
|                              +---------+ |
+------------------------------------------+
| Proyectos (filas)                        |
| Casos técnicos                           |
| Stack  | Experiencia | Contacto          |
+------------------------------------------+
```

## Reglas
- Una sola animación autónoma (el ticket); todo lo demás reacciona solo a acciones del usuario
- Sin degradados, sin sombras decorativas, sin etiquetas en mayúsculas sobre cada título
- Un solo radio de borde pequeño (4 px) o ninguno
- Botones con verbo concreto: "Ver proyecto", "Escribir por mail"
- Imágenes: solo diagramas simplificados o mockups con datos ficticios

## Calidad mínima
Responsive hasta 360 px, foco visible, `prefers-reduced-motion`, contraste AA.
