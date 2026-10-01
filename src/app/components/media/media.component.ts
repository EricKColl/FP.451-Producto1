import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Jugador } from '../../models/jugador.model';

@Component({
  selector: 'app-media',
  imports: [],
  templateUrl: './media.component.html',
  styleUrl: './media.component.css',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class MediaComponent {
  // CONTRATO (no cambiar nombres): lo rellena Persona 4
  @Input({ required: true }) jugador!: Jugador;
}
