import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { PlayersComponent } from './components/players/players.component';
import { DetailComponent } from './components/detail/detail.component';
import { MediaComponent } from './components/media/media.component';
import { Jugador } from './models/jugador.model';
import { JUGADORES } from './data/jugadores.data';

@Component({
  selector: 'app-root',
  imports: [NgIf, HeaderComponent, PlayersComponent, DetailComponent, MediaComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class App {
  nombreEquipo = 'EQUIPO BASKET';
  totalJugadores = JUGADORES.length;

  // Jugador elegido en el listado (null = ninguno)
  jugadorActual: Jugador | null = null;

  // Lo llama PlayersComponent mediante su @Output (jugadorSeleccionado)
  onJugadorSeleccionado(jugador: Jugador): void {
    this.jugadorActual = jugador;
  }

  // Lo llama DetailComponent mediante su @Output (cerrar)
  onCerrarDetalle(): void {
    this.jugadorActual = null;
  }
}
