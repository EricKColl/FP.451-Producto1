import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Jugador } from '../../models/jugador.model';
import { JUGADORES } from '../../data/jugadores.data';

@Component({
  selector: 'app-players',
  imports: [NgFor, NgIf],
  templateUrl: './players.component.html',
  styleUrl: './players.component.css',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class PlayersComponent {
  // CONTRATO (no cambiar nombres): lo rellena Persona 2
  @Input() idSeleccionado: number | null = null;
  @Output() jugadorSeleccionado = new EventEmitter<Jugador>();

  jugadores: Jugador[] = JUGADORES;
}
