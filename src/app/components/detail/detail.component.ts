import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Jugador } from '../../models/jugador.model';

@Component({
  selector: 'app-detail',
  imports: [],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class DetailComponent {
  // CONTRATO (no cambiar nombres): lo rellena Persona 3
  @Input({ required: true }) jugador!: Jugador;
  @Output() cerrar = new EventEmitter<void>();
}
