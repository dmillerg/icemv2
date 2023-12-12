import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { Table } from 'src/app/core/components/table-generico/model/table.model';
import { Usuario } from 'src/app/core/models/usuario.model';
import { AdminService } from '../../service/admin.service';
import { pipe, take } from 'rxjs';
import { Formulario } from 'src/app/core/components/form-generico/model/formulario.model';
import { MatDrawer } from '@angular/material/sidenav';
import { Boton } from 'src/app/core/components/boton-generico/model/boton.model';
import { Store } from '@ngrx/store';
import {
  addDetalle,
  deleteAllDetalle,
} from 'src/app/shared/state/actions/detalle.actions';
import { MatDialog } from '@angular/material/dialog';
import { ModalGenericoComponent } from 'src/app/core/components/modal-generico/modal-generico.component';
import { Modal } from 'src/app/core/components/modal-generico/model/modal.model';
import { DialogRef } from '@angular/cdk/dialog';
import { SnackService } from 'src/app/core/components/snack/service/snack.service';
import { Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Detalle } from 'src/app/core/components/detalle-generico/model/detalle.model';
import { matchPasswordValidator } from 'src/app/core/validators/match-password.validator';
import * as ApexCharts from 'apexcharts';
import { reglasPasswordValidator } from 'src/app/core/validators/reglas-password.validator';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss'],
})
export class UsuarioComponent implements OnInit {
  tabla!: Table;
  formulario!: Formulario;
  formularioReseteo!: Formulario;
  drawer!: MatDrawer;
  activas: number = 0;
  inactivas: number = 0;
  online: number = 0;
  offline: number = 0;
  deshabilitarActivar: boolean = false;
  botones: Boton[] = [
    {
      icono: 'bi bi-pencil',
      class:
        'p-2 rounded h-fit hover:border dark:border-icem-500 text-icem-500 dark:text-gray-100 flex justify-center items-center',
      funcion: (value) => {
        this.seleccionado(value);
      },
    },
    {
      icono: 'bi bi-trash',
      class:
        'p-2 rounded h-fit hover:shadow-md text-icem-500 dark:text-gray-100 flex justify-center items-center',
      funcion: (value) => this.eliminar(value),
    },
  ];

  botonesDetalle: Boton[] = [
    {
      icono: 'bi bi-pencil',
      tooltip: 'Editar',
      cargando: () => this.loadingEditar,
      funcion: () =>
        this.formulario.form?.valid
          ? this.agregarOEditar(true)
          : this.formulario.form?.markAllAsTouched(),
    },
    {
      icono: 'bi bi-check',
      tooltip: 'Activar',
      disabled: () => this.deshabilitarActivar,
      funcion: () => this.activar(),
    },
    {
      icono: 'bi bi-trash',
      tooltip: 'Eliminar',
      funcion: (value) => this.eliminar(value),
    },
    {
      icono: 'bi bi-unlock',
      tooltip: 'Resetear contraseña',
      funcion: (value) => this.modalReseteo(value),
    },
  ];
  botonesAgregarActualizar: Boton[] = [
    {
      label: 'Agregar usuario',
      icono: 'bi bi-plus',
      funcion: () => this.agregarUsuario(),
    },
    {
      label: 'Actualizar',
      icono: 'bi bi-arrow-clockwise',
      funcion: () => this.obtenerUsuario(),
    },
  ];
  loading: boolean = false;
  loadingEditar: boolean = false;
  loadingActivar: boolean = false;
  reseteando: boolean = false;

  chartOptions: any;
  chart: any;
  dataChart: {
    amount: number;
    percent: number;
    shortOrigin: string;
    origin: string;
    color: string;
  }[] = [];

  constructor(
    private adminService: AdminService,
    private store: Store,
    private dialog: MatDialog,
    private snackService: SnackService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.obtenerUsuario();
  }

  generarTabla(values?: Usuario[]) {
    this.tabla = {
      columnas: [
        { tipo: 'texto', nombre: 'usuario', campo: 'usuario' },
        { tipo: 'texto', nombre: 'Nombre', campo: 'nombre' },
        { tipo: 'fecha', nombre: 'Fecha', campo: 'fecha' },
        {
          tipo: 'numero',
          nombre: 'Cantidad de visitas',
          campo: 'cant_visitas',
        },
        { tipo: 'boolean', nombre: 'Activo', campo: 'activo' },
        { tipo: 'boolean', nombre: 'En línea', campo: 'online' },
      ],
      values: values ?? [],
      cargando: !values,
      acciones: this.botones,
      accionesTexto: 'Acciones',
    };
  }

  obtenerUsuario() {
    this.generarTabla();
    this.adminService
      .getUsuarios()
      .pipe(take(1))
      .subscribe({
        next: (result) => {
          this.activas = result.filter((e) => e.activo).length;
          this.inactivas = result.filter((e) => !e.activo).length;
          this.online = result.filter((e) => e.online).length;
          this.offline = result.filter((e) => !e.online).length;
          setTimeout(() => {
            if (result.length > 0) {
              this.generarTabla(result);
            } else this.generarTabla([]);
          }, 2000);
        },
      });
  }

  seleccionado(item: Usuario) {
    if (item) {
      this.generarFormulario(item);
      this.adminService.setFormulario(this.formulario);
      const usuario: Usuario = item;
      this.deshabilitarActivar = item.activo!;
      this.store.dispatch(
        addDetalle({
          detalle: {
            titulo: 'Editar usuario',
            textos: [
              {
                nombre: 'fecha creación',
                valor: this.datePipe
                  .transform(usuario.fecha, 'dd-MM-yyyy')!
                  .toString(),
              },
              {
                nombre: 'última sesión',
                valor: this.datePipe
                  .transform(usuario.ultsession ?? new Date(), 'dd-MM-yyyy')!
                  .toString(),
              },
            ],
            botones: this.botonesDetalle,
            data: usuario,
          },
        })
      );
    } else
      this.store.dispatch(
        addDetalle({
          detalle: {},
        })
      );
  }

  generarFormulario(item?: Usuario) {
    this.formulario = {
      controles: [
        {
          tipo: 'text',
          nombre: 'Usuario',
          control: 'usuario',
          valor: item ? item.usuario : '',
          icono: 'bi bi-person',
          validator: [Validators.required],
        },
        {
          tipo: 'text',
          nombre: 'Nombre',
          control: 'nombre',
          valor: item ? item.nombre : '',
          icono: 'bi bi-person',
          validator: [Validators.required],
        },
        {
          tipo: 'text',
          nombre: 'Correo',
          control: 'correo',
          valor: item ? item.correo : '',
          icono: 'bi bi-envelope',
          validator: [Validators.required, Validators.email],
        },
        {
          tipo: 'text',
          nombre: 'País',
          control: 'pais',
          valor: item ? item.pais : '',
          icono: 'bi bi-pais',
        },
        {
          tipo: 'text',
          nombre: 'Dirección',
          control: 'direccion',
          valor: item ? item.direccion : '',
          icono: 'bi bi-geo-alt',
        },
        {
          tipo: 'text',
          nombre: 'Teléfono',
          control: 'telefono',
          valor: item ? item.telefono : '',
          icono: 'bi bi-telephone',
        },
        {
          tipo: 'select',
          nombre: 'Rol',
          control: 'rol',
          valor: item ? item.rol : '',
          opciones: [
            { codigo: 'admin', nombre: 'admin' },
            { codigo: 'usuario', nombre: 'usuario' },
          ],
          icono: 'bi bi-shield',
          validator: [Validators.required],
        },
        {
          tipo: 'password',
          nombre: 'Contraseña',
          control: 'password',
          valor: item ? item.password : '',
          icono: 'bi bi-lock',
          validator: [Validators.required, Validators.minLength(8)],
        },
        {
          tipo: 'password',
          nombre: 'Confirmación',
          control: 'confirm',
          valor: item ? item.password : '',
          icono: 'bi bi-lock',
          validator: [
            Validators.required,
            Validators.minLength(8),
            matchPasswordValidator,
          ],
        },
        {
          tipo: 'text',
          nombre: 'id',
          control: 'id',
          valor: item ? item.id : '',
          icono: 'bi bi-shield',
        },

        {
          tipo: 'date',
          nombre: 'Fecha',
          control: 'fecha',
          valor: item ? item.fecha : '',
          icono: 'bi bi-shield',
        },
      ],
      columnas: item ? [1, 1, 1, 1, 1, 1, 1] : [1, 1, 1, 1, 1, 1, 1, 1, 1],
    };
  }

  eliminar(usuario: Usuario) {
    let ref: any;
    const modal: Modal = {
      texto: `Desea eliminar al usuario ${usuario.usuario}, esta acción no tiene vuelta atrás?`,
      botones: [
        {
          label: 'Aceptar',
          icono: 'bi bi-check',
          funcion: () => this.eliminarUsuario(usuario.id, ref),
          cargando: () => this.loading,
        },
        { label: 'Cancelar', icono: 'bi bi-x', funcion: () => ref.close() },
      ],
      icono: 'bi bi-exclamation-diamond text-red-500',
    };
    ref = this.dialog.open(ModalGenericoComponent, {
      data: modal,
    });
  }

  eliminarUsuario(id: number, ref: DialogRef) {
    this.loading = true;
    this.adminService
      .deleteUsuarios(id)
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          this.loading = false;
          this.obtenerUsuario();
          setTimeout(() => ref.close(), 300);
        },
        error: () => (this.loading = false),
      });
  }

  agregarOEditar(accion: boolean) {
    this.loadingEditar = true;
    const data = this.formulario.form?.getRawValue();
    let formData = new FormData();
    formData.append('id', data.id.toString());
    formData.append('usuario', data.usuario.toString());
    formData.append('password', data.password.toString());
    formData.append('nombre', data.nombre.toString());
    formData.append('fecha', data.fecha.toString());
    formData.append('correo', data.correo.toString());
    formData.append('pais', data.pais.toString());
    formData.append('direccion', data.direccion.toString());
    formData.append('telefono', data.telefono.toString());
    formData.append('rol', data.rol.toString());
    if (accion) {
      this.adminService
        .updateUsuarioWithOutPass(formData, data.id)
        .pipe(take(1))
        .subscribe({
          next: () => {
            this.loadingEditar = false;
            this.snackService.success({
              texto: `!Se ha actualizado los datos del usuario ${data.usuario} correctamente.`,
            });
            this.obtenerUsuario();
          },
        });
    } else {
      this.adminService
        .addUsuarios(formData)
        .pipe(take(1))
        .subscribe({
          next: (result) => {
            this.loading = false;
            this.obtenerUsuario();
            this.snackService.success({
              texto: `!Se ha guardado correctamente el nuevo usuario.`,
            });
            this.store.dispatch(deleteAllDetalle());
          },
          error: (error) => {
            this.loading = false;
          },
        });
    }
  }

  activar() {
    this.loadingActivar = true;
    const data = this.formulario.form?.getRawValue();
    this.adminService
      .activarUsuario(data.id)
      .pipe(take(1))
      .subscribe({
        next: (result) => {
          this.loadingActivar = false;
          data.activo = true;
          this.snackService.success({
            texto: `El usuario ${data.usuario} ya esta activo.`,
          });
          this.obtenerUsuario();
        },
        error: () => {
          data.activo = false;
        },
      });
  }

  modalReseteo(usuario: Usuario) {
    this.generarFormularioReseteo(usuario.usuario);
    let ref: any;
    const modal: Modal = {
      titulo: 'Gestionar contraseña',
      subtitulo: `Cambie la contraseña del usuario ${usuario.usuario}`,
      formulario: this.formularioReseteo,
      botones: [
        {
          label: 'Aceptar',
          icono: 'bi bi-check',
          cargando: () => this.reseteando,
          funcion: () =>
            this.formularioReseteo.form?.valid
              ? this.resetearContrasenna(usuario.id, ref)
              : this.formularioReseteo.form?.markAllAsTouched(),
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

  generarFormularioReseteo(usuario: string) {
    this.formularioReseteo = {
      controles: [
        {
          tipo: 'text',
          nombre: 'Usuario',
          icono: 'bi bi-person',
          control: 'usuario',
          valor: usuario,
          disabled: true,
        },
        {
          tipo: 'password',
          nombre: 'Nueva contraseña',
          icono: 'bi bi-lock',
          control: 'password',
          validator: [
            Validators.required,
            reglasPasswordValidator
          ],
        },
        {
          tipo: 'password',
          nombre: 'Confirmación contraseña',
          icono: 'bi bi-lock',
          control: 'confirm',
          validator: [
            Validators.required,
            matchPasswordValidator,
          ],
        },
      ],
      columnas: [1, 1, 1],
    };
  }

  resetearContrasenna(id: number, ref: DialogRef) {
    this.reseteando = true;
    let formData = new FormData();
    formData.append('id_usuario', id.toString());
    formData.append(
      'new_password',
      this.formularioReseteo.form?.getRawValue().password
    );
    this.adminService
      .adminResetPassword(formData)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.reseteando = false;
          ref.close();
        },
        error: () => {
          this.reseteando = false;
        },
      });
  }

  agregarUsuario() {
    this.generarFormulario();
    const detalle: Detalle = {
      titulo: 'Agregar nuevo usuario',
      subtitulo: 'Rellene todos los campos necesarios',
      botones: [
        {
          icono: 'bi bi-plus',
          tooltip: 'Agregar',
          cargando: () => this.loading,
          funcion: () =>
            this.formulario.form?.valid
              ? this.agregarOEditar(false)
              : this.formulario.form?.markAllAsTouched(),
        },
      ],
    };
    this.adminService.setFormulario(this.formulario);
    this.store.dispatch(addDetalle({ detalle: detalle }));
  }

  generateChart() {
    const p = window
      .getComputedStyle(document.body, null)
      .getPropertyValue('--fuse-primary');
    this.chartOptions = {
      series: this.dataChart.map((e) => e.amount),
      chart: {
        type: 'donut',
        width: 250,
      },
      legend: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 2,
      },
      theme: {
        mode: 'light',
        palette: 'palette1',
        monochrome: {
          enabled: true,
          color: p,
          shadeTo: 'light',
          shadeIntensity: 0.65,
        },
      },
      labels: this.dataChart.map((e) => e.origin),
    };
    if (this.chart) {
      this.chart.destroy();
    }
    this.chart = new ApexCharts(
      document.querySelector('#chart-container'),
      this.chartOptions
    );
    this.chart.render();
  }
}
