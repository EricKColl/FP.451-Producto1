import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  ViewChild,
} from '@angular/core';
import { Jugador } from '../../models/jugador.model';

@Component({
  selector: 'app-media',
  imports: [],
  templateUrl: './media.component.html',
  styleUrl: './media.component.css',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class MediaComponent implements OnChanges {
  @Input({ required: true }) jugador!: Jugador;
  @ViewChild('video') videoRef?: ElementRef<HTMLVideoElement>;
  @ViewChild('reproductor') reproductorRef?: ElementRef<HTMLElement>;

  pantallaCompleta = false;
  errorPantallaCompleta = '';

  async alternarPantallaCompleta(): Promise<void> {
    const contenedor = this.reproductorRef?.nativeElement;
    if (!contenedor) return;
    this.errorPantallaCompleta = '';
    if (!contenedor.requestFullscreen || !document.exitFullscreen || !document.fullscreenEnabled) {
      this.errorPantallaCompleta =
        'Este navegador no permite mostrar el reproductor en pantalla completa.';
      return;
    }
    try {
      if (document.fullscreenElement === contenedor) {
        await document.exitFullscreen();
      } else {
        await contenedor.requestFullscreen();
      }
    } catch {
      this.errorPantallaCompleta =
        'No se ha podido cambiar el modo de pantalla completa. Vuelve a intentarlo desde el botón.';
    }
  }

  // También se ejecuta al salir con Escape o desde los controles del navegador.
  @HostListener('document:fullscreenchange')
  alCambiarPantallaCompleta(): void {
    this.pantallaCompleta = document.fullscreenElement === this.reproductorRef?.nativeElement;
    this.errorPantallaCompleta = '';
  }

  videoDisponible = false;
  errorDeCarga = false;
  reproduciendo = false;
  errorDeReproduccion = '';
  tiempoActual = 0;
  duracion = 0;
  volumen = 50;
  silenciado = false;
  private ultimoVolumenConSonido = 50;

  private get video(): HTMLVideoElement | undefined {
    return this.videoRef?.nativeElement;
  }

  // Cada selección comienza con su propio estado de carga.
  ngOnChanges(): void {
    this.stop();
    this.duracion = 0;
    this.videoDisponible = false;
    this.errorDeCarga = !this.jugador.video.trim();
  }

  async reproducir(): Promise<void> {
    const video = this.video;
    if (!video || !this.videoDisponible || this.errorDeCarga) return;

    const jugador = this.jugador;
    this.errorDeReproduccion = '';
    try {
      await video.play();
    } catch (error) {
      // Cambiar de jugador o pulsar Stop puede cancelar un play pendiente.
      if (
        jugador !== this.jugador ||
        (error instanceof DOMException && error.name === 'AbortError')
      ) {
        return;
      }
      this.reproduciendo = !video.paused && !video.ended;
      this.errorDeReproduccion =
        'No se ha podido iniciar la reproducción. Pulsa Reproducir para volver a intentarlo.';
    }
  }

  pausar(): void {
    this.video?.pause();
  }

  stop(): void {
    const video = this.video;
    if (video) {
      video.pause();
      if (video.readyState > 0) video.currentTime = 0;
    }
    this.reproduciendo = false;
    this.errorDeReproduccion = '';
    this.tiempoActual = 0;
  }

  alReproducir(): void {
    this.reproduciendo = true;
    this.errorDeReproduccion = '';
  }

  alPausar(): void {
    this.reproduciendo = false;
  }

  alCargarMetadatos(): void {
    this.videoDisponible = true;
    this.errorDeCarga = false;
    this.actualizarDuracion();
  }

  actualizarDuracion(): void {
    const duracion = this.video?.duration ?? 0;
    this.duracion = Number.isFinite(duracion) && duracion > 0 ? duracion : 0;
  }

  alActualizarTiempo(): void {
    // Ignoramos eventos pendientes de la fuente anterior durante un cambio de jugador.
    if (!this.videoDisponible || this.errorDeCarga) return;
    this.tiempoActual = this.video?.currentTime ?? 0;
  }

  buscar(evento: Event): void {
    const video = this.video;
    if (!video || !this.videoDisponible || this.errorDeCarga || this.duracion <= 0) return;
    const tiempo = Number((evento.target as HTMLInputElement).value);
    if (!Number.isFinite(tiempo)) return;
    video.currentTime = Math.min(this.duracion, Math.max(0, tiempo));
    this.tiempoActual = video.currentTime;
  }

  cambiarVolumen(evento: Event): void {
    const video = this.video;
    if (!video || !this.videoDisponible || this.errorDeCarga) return;
    const valor = Number((evento.target as HTMLInputElement).value);
    if (!Number.isFinite(valor)) return;
    this.volumen = Math.min(100, Math.max(0, valor));
    // Mover el deslizador recupera el sonido si el nivel es mayor que cero.
    this.silenciado = this.volumen === 0;
    video.volume = this.volumen / 100;
    video.muted = this.silenciado;
  }

  alternarSilencio(): void {
    const video = this.video;
    if (!video || !this.videoDisponible || this.errorDeCarga) return;
    if (this.silenciado || this.volumen === 0) {
      // Si se llegó a cero con la barra, recuperamos el último nivel audible.
      if (this.volumen === 0) this.volumen = this.ultimoVolumenConSonido;
      this.silenciado = false;
    } else {
      this.silenciado = true;
    }
    video.volume = this.volumen / 100;
    video.muted = this.silenciado;
  }

  alCambiarVolumen(): void {
    const video = this.video;
    if (!video) return;
    this.volumen = Math.round(video.volume * 100);
    this.silenciado = video.muted;
    if (this.volumen > 0) this.ultimoVolumenConSonido = this.volumen;
  }

  formatearTiempo(segundos: number): string {
    const total = Number.isFinite(segundos) ? Math.max(0, Math.floor(segundos)) : 0;
    const minutos = Math.floor(total / 60)
      .toString()
      .padStart(2, '0');
    const resto = (total % 60).toString().padStart(2, '0');
    return `${minutos}:${resto}`;
  }

  alFallarCarga(): void {
    this.stop();
    this.videoDisponible = false;
    this.errorDeCarga = true;
    this.duracion = 0;
  }
}
