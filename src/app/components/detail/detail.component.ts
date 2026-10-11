import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Jugador } from '../../models/jugador.model';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-detail',
  imports: [DecimalPipe],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class DetailComponent {
  // ENTRADA: el jugador que el usuario ha pulsado en el listado
  @Input({ required: true }) jugador!: Jugador;
  // SALIDA: avisamos al padre de que hay que cerrar el detalle
  @Output() cerrar = new EventEmitter<void>();

  onCerrar(): void {
    this.cerrar.emit();
  }
}
