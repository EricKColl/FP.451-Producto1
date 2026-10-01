import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class HeaderComponent {
  // Datos que le pasa el componente padre (App)
  @Input() nombreEquipo = '';
  @Input() totalJugadores = 0;
}
