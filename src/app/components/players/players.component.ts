import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { DecimalPipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Jugador, POSICIONES } from '../../models/jugador.model';
import { JUGADORES } from '../../data/jugadores.data';

@Component({
  selector: 'app-players',
  imports: [NgFor, NgIf, DecimalPipe, FormsModule],
  templateUrl: './players.component.html',
  styleUrl: './players.component.css',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class PlayersComponent {
  // CONTRATO (no cambiar nombres): lo rellena Persona 2
  @Input() idSeleccionado: number | null = null;
  @Output() jugadorSeleccionado = new EventEmitter<Jugador>();

  jugadores: Jugador[] = JUGADORES;
  posiciones = POSICIONES;
  textoBusqueda = '';
  posicionSeleccionada = '';
  rangoEdad = '';
  fotosNoDisponibles = new Set<number>();

  marcarFotoNoDisponible(id: number): void {
    this.fotosNoDisponibles.add(id);
  }

  seleccionar(jugador: Jugador): void {
    this.jugadorSeleccionado.emit(jugador);
  }

  limpiarFiltros(): void {
    this.textoBusqueda = '';
    this.posicionSeleccionada = '';
    this.rangoEdad = '';
  }
}
