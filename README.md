# EQUIPO BASKET · Producto 1

Aplicación de una sola página (SPA) hecha con **Angular 22** y **Bootstrap 5.3** para gestionar la plantilla de un equipo de baloncesto: listado de jugadores con buscador y filtros, ficha de detalle y reproductor de vídeo.

## Equipo

| Persona | Rol | Nombre |
|---|---|---|
| Persona 1 | Coordinación técnica e integración | Erick Coll Rodríguez |
| Persona 2 | Datos + listado (PlayersComponent) + arquetipos | Jacobo Barrera Toba |
| Persona 3 | Detalle (DetailComponent) + pipe de filtros + mockup | Marc Pérez Rodríguez |
| Persona 4 | Reproductor (MediaComponent) + multimedia + documentación | Carles Miguel Millán |

## Enlaces

- CodeSandbox (editor): https://codesandbox.io/p/devbox/jq68p5
- CodeSandbox (web funcionando): https://jq68p5-4200.csb.app
- Trello: _pendiente_
- Figma (mockup): _pendiente_

## Ramas

| Rama | Uso |
|---|---|
| `main` | Versión estable y entregable. Solo recibe cambios desde `develop`. |
| `develop` | Integración. Aquí se unen las ramas de cada integrante mediante Pull Request. |
| `feature/erick-coll` | Trabajo de Erick |
| `feature/jacobo-barrera` | Trabajo de Jacobo |
| `feature/marc-perez` | Trabajo de Marc |
| `feature/carles-miguel` | Trabajo de Carles |

Flujo: cada uno trabaja en su rama → Pull Request a `develop` → cuando `develop` está probado, Pull Request de `develop` a `main`.

## Cómo arrancarlo

Requisitos: Node.js 24 LTS (24.15 o superior) y Angular CLI 22.

```bash
npm install
ng serve -o
```

Se abre en http://localhost:4200

## Tecnologías

- Angular 22 (componentes standalone, `*ngFor`, `*ngIf`, `@Input`, `@Output`, pipe propio)
- Bootstrap 5.3.8 + Bootstrap Icons
- Tipografías Oswald e Inter (Google Fonts)
