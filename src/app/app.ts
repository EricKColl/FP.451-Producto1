import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  inject,
  Injector,
} from '@angular/core';
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

  private injector = inject(Injector);

  // Lo llama PlayersComponent mediante su @Output (jugadorSeleccionado)
  onJugadorSeleccionado(jugador: Jugador): void {
    this.jugadorActual = jugador;
    // En móvil y tablet la ficha queda debajo del listado: bajamos hasta ella cuando ya está pintada
    if (window.matchMedia('(max-width: 991.98px)').matches) {
      this.despuesDePintar(() =>
        document.getElementById('ficha')?.scrollIntoView({ behavior: this.desplazamiento() }),
      );
    }
  }

  // Lo llama DetailComponent mediante su @Output (cerrar)
  onCerrarDetalle(): void {
    const id = this.jugadorActual?.id;
    this.jugadorActual = null;
    // El botón de cerrar desaparece: el foco vuelve al jugador del listado (teclado y lectores)
    this.despuesDePintar(() => document.getElementById(`jugador-${id}`)?.focus());
  }

  private despuesDePintar(accion: () => void): void {
    afterNextRender(accion, { injector: this.injector });
  }

  // Sin animación si el usuario lo ha pedido en su sistema (movimiento reducido)
  private desplazamiento(): ScrollBehavior {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
  }
}
