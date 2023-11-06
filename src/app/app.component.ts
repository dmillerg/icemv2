import {
  Component,
  OnInit,
  Inject,
  HostListener,
  ViewChild,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ConfiguracionService } from './core/services/configuracion.service';
import { take } from 'rxjs';
import { AuthService } from './modules/auth/services/auth.service';
import { Configuraciones } from './core/constantes/configuracion';
import { ChartComponent } from 'ng-apexcharts';
import { ActivatedRoute } from '@angular/router';
import { CatalogoService } from './core/services/catalogo.service';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { Modal } from './core/components/modal-generico/model/modal.model';
import { ModalGenericoComponent } from './core/components/modal-generico/modal-generico.component';
import { Usuario } from './core/models/usuario.model';
import { SnackService } from './core/components/snack/service/snack.service';

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
  cargando: boolean = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private configuracionService: ConfiguracionService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private catalogoService: CatalogoService,
    private dialog: Dialog,
    private snackService: SnackService
  ) {
    this.chartOp();
    this.activate();
  }

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

  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions!: Partial<any>;

  chartOp() {
    this.chartOptions = {
      series: [44, 55, 13, 43, 22],
      chart: {
        type: 'donut',
      },
      labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    };
  }

  activate() {
    console.log('activate');

    this.activatedRoute.queryParams.subscribe((params) => {
      console.log(params);

      let link = params['link'];
      let reset = params['reset'];

      if (link && link.length > 0) {
        this.catalogoService
          .checkLinks(link)
          .pipe(take(1))
          .subscribe({
            next: (res) => {
              console.log(res);
              Number(
                link.substring(link.indexOf('Edd') + 3, link.indexOf('Dde'))
              );

              // this.modalService.open(ModalActivationComponent, { backdrop: 'static' });
            },
          });
      } else if (reset != undefined) {
        this.catalogoService
          .checkLinks(reset)
          .pipe(take(1))
          .subscribe({
            next: (res) => {
              console.log(res);

              // this.modalService.open(ModalUserResetPasswordComponent, { backdrop: 'static' });
            },
          });
      }
    });
  }

  obtenerUsuarioPorId(id: number) {
    this.authService
      .getUsuariosById(id)
      .pipe(take(1))
      .subscribe({
        next: (result) => {
          this.activarCuentaModal(result);
        },
      });
  }

  activarCuentaModal(usuario: Usuario) {
    let ref: any;
    this.cargando = true;
    const modal: Modal = {
      titulo: 'Activación de la cuenta de usuario',
      subtitulo: `Si su usuario es ${usuario.usuario} por favor presione el botón de Aceptar en caso contrario cancele.`,
      botones: [
        {
          label: 'Aceptar',
          icono: 'bi bi-check',
          funcion: () => this.activandoUsuario(usuario.id, ref),
        },
        { label: 'Cancelar', icono: 'bi bi-x', funcion: () => ref.close() },
      ],
    };
    ref = this.dialog.open(ModalGenericoComponent, {
      data: modal,
    });
  }

  activandoUsuario(id: number, ref: DialogRef) {
    this.authService
      .activarUsuario(id)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.cargando = false;
          this.snackService.success({
            texto: 'Su cuenta se ha activado con exito',
          });
          ref.close();
        },
      });
  }
}
