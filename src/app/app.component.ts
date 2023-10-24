import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ConfiguracionService } from './core/services/configuracion.service';
import { take } from 'rxjs';
import { AuthService } from './modules/auth/services/auth.service';
import { Configuraciones } from './core/constantes/configuracion';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'icem';
  tema: string = '';
  inactividad: any;
  tiempoInactividad: number = 0;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private configuracionService: ConfiguracionService,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.obtenerTema();
    if (this.authService.isLogging()) this.comprobarToken();
    this.obtenerConfiguracion();
  }

  comprobarToken() {
    this.configuracionService.checkToken().pipe(take(1)).subscribe();
  }

  obtenerConfiguracion() {
    this.configuracionService
      .getConfiguracion(Configuraciones.INACTIVITY_TIME)
      .pipe(take(1))
      .subscribe({
        next: (result) => {
          this.tiempoInactividad = Number(result.config);
          this.establecerContadorInactividad();
        },
      });
  }

  obtenerTema() {
    this.tema = localStorage.getItem('tema')!;
    if (this.tema === 'dark') {
      document.documentElement.classList.add('dark');
      this.document.body.classList.add('dark-theme');
      this.document.body.classList.remove('light-theme');
      this.tema = 'light';
    } else {
      document.documentElement.classList.remove('dark');
      this.document.body.classList.remove('dark-theme');
      this.document.body.classList.add('light-theme');
      this.tema = 'dark';
    }
  }

  establecerContadorInactividad() {
    this.inactividad = setInterval(() => {
      const ultimaActividad = (
        localStorage.getItem('ultimaActividad')
          ? new Date(localStorage.getItem('ultimaActividad')!)
          : new Date()
      ).getTime();
      const ahora = new Date().getTime();

      if (
        this.authService.isLogging() &&
        ahora - ultimaActividad >= this.tiempoInactividad
      ) {
        this.authService
          .logout()
          .pipe(take(1))
          .subscribe({
            next: () => {
              location.reload();
            },
          });
      }
    }, 60000); //intervalo cada 1 min para checkear la inactividad
  }

  @HostListener('document:mousemove', ['$event'])
  @HostListener('document:click', ['$event'])
  @HostListener('document:keyup', ['$event'])
  reiniciarContadorInactividad(event: MouseEvent | KeyboardEvent) {
    clearInterval(this.inactividad);
    localStorage.setItem('ultimaActividad', new Date().toString());
    this.establecerContadorInactividad();
  }
}
