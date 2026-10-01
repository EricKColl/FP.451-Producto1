import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Jugador } from '../../models/jugador.model';

@Component({
  selector: 'app-players',
  imports: [],
  templateUrl: './players.component.html',
  styleUrl: './players.component.css',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class PlayersComponent {
  // CONTRATO (no cambiar nombres): lo rellena Persona 2
  @Input() idSeleccionado: number | null = null;
  @Output() jugadorSeleccionado = new EventEmitter<Jugador>();
}
