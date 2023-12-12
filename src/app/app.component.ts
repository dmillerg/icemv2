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
import { ActivatedRoute, Router } from '@angular/router';
import { CatalogoService } from './core/services/catalogo.service';
import { DialogRef } from '@angular/cdk/dialog';
import { Modal } from './core/components/modal-generico/model/modal.model';
import { ModalGenericoComponent } from './core/components/modal-generico/modal-generico.component';
import { Usuario } from './core/models/usuario.model';
import { SnackService } from './core/components/snack/service/snack.service';
import { MatDialog } from '@angular/material/dialog';
import { Formulario } from './core/components/form-generico/model/formulario.model';
import { Validators } from '@angular/forms';
import { matchPasswordValidator } from './core/validators/match-password.validator';

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
  formulario!: Formulario;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private configuracionService: ConfiguracionService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private catalogoService: CatalogoService,
    private dialog: MatDialog,
    private snackService: SnackService,
    private router: Router
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
        ahora - ultimaActividad >= this.tiempoInactividad*60000
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
    this.activatedRoute.queryParams.subscribe((params) => {
      let link = params['link'];
      let reset = params['reset'];

      if (link && link.length > 0) {
        this.catalogoService
          .checkLinks(link)
          .pipe(take(1))
          .subscribe({
            next: (res) => {
              this.obtenerUsuarioPorId(
                Number(
                  link.substring(link.indexOf('Edd') + 3, link.indexOf('Dde'))
                )
              );
            },
          });
      } else if (reset != undefined) {
        this.catalogoService
          .checkLinks(reset)
          .pipe(take(1))
          .subscribe({
            next: (res) => {
              this.obtenerUsuarioPorId(
                Number(
                  reset.substring(
                    reset.indexOf('Edd') + 3,
                    reset.indexOf('Dde')
                  )
                ),
                true
              );
            },
          });
      }
    });
  }

  obtenerUsuarioPorId(id: number, reset?: boolean) {
    this.authService
      .getUsuariosById(id)
      .pipe(take(1))
      .subscribe({
        next: (result) => {
          if (reset) {
            this.resetearCuentaModal(result);
          } else this.activarCuentaModal(result);
        },
      });
  }

  activarCuentaModal(usuario: Usuario) {
    let ref: any;
    this.cargando = true;
    const modal: Modal = {
      titulo: 'Activación de la cuenta de usuario',
      texto: `Si su usuario es "${usuario.usuario}" por favor presione el botón de Aceptar en caso contrario cancele.`,
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
          this.router.navigate(['inicio'])
        },
      });
  }

  resetearCuentaModal(usuario: Usuario) {
    let ref: any;
    this.generarFormulario(usuario);
    const modal: Modal = {
      titulo: `Reinicie su contraseña '${usuario.usuario}'`,
      texto: `Rellene los campos a continuación, para resetear su contraseña.`,
      formulario: this.formulario,
      botones: [
        {
          label: 'Aceptar',
          icono: 'bi bi-check',
          funcion: () =>
            this.formulario.form?.valid
              ? this.cambiarPass(ref)
              : this.formulario.form?.markAllAsTouched(),
        },
        {
          label: 'Cancelar',
          icono: 'bi bi-x',
          funcion: () => ref.close(),
        },
      ],
    };
    ref = this.dialog.open(ModalGenericoComponent, {
      data: modal,
    });
  }

  generarFormulario(usuario: Usuario) {
    this.formulario = {
      controles: [
        {
          tipo: 'password',
          nombre: 'Contraseña',
          control: 'password',
          validator: [Validators.required, Validators.minLength(8)],
        },
        {
          tipo: 'password',
          nombre: 'Confirmación',
          control: 'confirm',
          validator: [Validators.required, matchPasswordValidator],
        },
        {
          tipo: 'text',
          nombre: 'ID',
          control: 'id',
          valor: usuario.id,
        },
      ],
      columnas: [1, 1],
    };
  }

  cambiarPass(ref: DialogRef) {
    const data = this.formulario.form?.getRawValue();
    const formData = new FormData();
    formData.append('id_usuario', data.id.toString());
    formData.append('new_password', data.password);
    this.authService
      .adminResetPassword(formData)
      .pipe(take(1))
      .subscribe({
        next: (result) => {
          this.snackService.success({
            texto: 'Contraseña cambiada correctamente',
          });
          ref.close();
          this.router.navigate(['inicio'])
        },
        error: (error) => {
          this.snackService.error({
            texto:
              'Error al intentar cambiar la contraseña, por favor intentelo mas tarde',
          });
        },
      });
  }
}
