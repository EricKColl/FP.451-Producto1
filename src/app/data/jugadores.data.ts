import { Jugador } from '../models/jugador.model';

// Datos de ejemplo de la plantilla. Son jugadores INVENTADOS (no usamos personas reales).
// Esta constante se exporta y la importa PlayersComponent (lo pide la rúbrica).
export const JUGADORES: Jugador[] = [
  {
    id: 1,
    nombre: 'Marc',
    apellidos: 'Serra Puig',
    dorsal: 4,
    posicion: 'Base',
    edad: 24,
    altura: 1.85,
    peso: 82,
    nacionalidad: 'España',
    foto: 'assets/img/jugadores/jugador-1.jpg',
    video: 'assets/videos/jugador-1.mp4',
    descripcion: 'Base director de juego, rápido en transición y con muy buena visión de pase.',
    estadisticas: { puntos: 11.4, rebotes: 3.1, asistencias: 7.2 },
  },
  {
    id: 2,
    nombre: 'Lucas',
    apellidos: 'Ferrer Gil',
    dorsal: 7,
    posicion: 'Escolta',
    edad: 27,
    altura: 1.93,
    peso: 88,
    nacionalidad: 'España',
    foto: 'assets/img/jugadores/jugador-2.jpg',
    video: 'assets/videos/jugador-2.mp4',
    descripcion: 'Tirador fiable desde la línea de tres y buen defensor exterior.',
    estadisticas: { puntos: 15.8, rebotes: 3.6, asistencias: 2.4 },
  },
  // Persona 2 añadirá aquí el resto de jugadores (mínimo 6 más)
];
