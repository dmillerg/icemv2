import { Component } from '@angular/core';
import { Boton } from 'src/app/core/components/boton-generico/model/boton.model';
import { Usuario } from 'src/app/core/models/usuario.model';
import { PerfilService } from '../../service/perfil.service';
import { take } from 'rxjs';
import { Table } from 'src/app/core/components/table-generico/model/table.model';
import { Pedido } from 'src/app/core/models/pedido.model';
import { Router } from '@angular/router';
import { Carrito } from 'src/app/core/models/carrito.model';
import { environment } from 'src/environments/environment';
import { Formulario } from 'src/app/core/components/form-generico/model/formulario.model';
import { Validators } from '@angular/forms';
import { Modal } from 'src/app/core/components/modal-generico/model/modal.model';
import { MatDialog } from '@angular/material/dialog';
import { ModalGenericoComponent } from 'src/app/core/components/modal-generico/modal-generico.component';
import { SnackService } from 'src/app/core/components/snack/service/snack.service';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent {
  botonAtras: Boton[] = [];
  botonRefrescar: Boton[] = [
    { label: 'refrescar', icono: 'bi bi-arrow-clockwise' },
  ];
  botonesPerfil: Boton[] = [];
  usuario!: Usuario;
  tablePedido!: Table;
  tableCarrito!: Table;
  tiempoUsuario: string = '';

  tiempo?: any;
  cargando: boolean = false;
  constructor(
    private perfilService: PerfilService,
    private router: Router,
    public dialog: MatDialog,
    private snackService: SnackService
  ) {
    this.generarBoton();
    this.obtenerDatosUsuario();
    this.obtenerDias();
    this.obtenerPedidos();
    this.obtenerCarrito();
    this.generarBotonesPerfil();
  }

  obtenerDatosUsuario() {
    this.usuario = JSON.parse(localStorage.getItem('usuario')!);
  }

  generarBoton() {
    this.botonAtras = [
      {
        icono: 'bi bi-arrow-left',
        class:
          'rounded-full px-2 pr-1 py-2 border border-2 border-icem-700 dark:border-white hover:border-white hover:bg-icem-700 hover:text-white text-xl font-bold flex justify-center items-center',
      },
    ];
  }

  obtenerDias() {
    this.perfilService
      .calcularTiempo(this.usuario.fecha)
      .pipe(take(1))
      .subscribe({
        next: (result) => {
          this.tiempoUsuario = result[0].tiempo + ' días';
        },
      });
  }

  generarBotonesPerfil() {
    const botonAdmin: Boton = {
      label: 'Administrar',
      icono: 'bi bi-kanban',
      funcion: () => '',
    };

    this.botonesPerfil = [
      {
        label: 'Editar',
        icono: 'bi bi-pencil',
        funcion: () => this.generarEditModal(),
      },
      {
        label: 'Cambiar contraseña',
        icono: 'bi bi-unlock',
        funcion: () => this.generarPasswordModal(),
      },
    ];
    if (this.usuario.rol === 'admin') {
      this.botonesPerfil.unshift(botonAdmin);
    }
  }

  generarTablaPedido(values: Pedido[]) {
    this.tablePedido = {
      columnas: [
        { nombre: 'Nombre', campo: 'titulo', tipo: 'texto' },
        { nombre: 'Cantidad', campo: 'cantidad', tipo: 'texto' },
        { nombre: 'Precio', campo: 'precio', tipo: 'precio' },
        { nombre: 'Precio total', campo: 'precio_total', tipo: 'precio' },
        { nombre: 'Estado', campo: 'estado', tipo: 'texto' },
        { nombre: 'Fecha', campo: 'fecha', tipo: 'fecha' },
      ],
      values: values,
      botonVacio: [
        {
          label: 'Vea nuestro catálogo',
          icono: 'bi bi-arrow-clockwise',
          funcion: () => this.router.navigate(['productos/-1']),
        },
      ],
    };
  }

  generarTablaCarrito(values: any[]) {
    this.tableCarrito = {
      columnas: [
        { nombre: 'Imagen', campo: 'imagen', tipo: 'imagen' },
        { nombre: 'Cantidad', campo: 'cantidad', tipo: 'texto' },
        { nombre: 'Precio', campo: 'precio', tipo: 'precio' },
        { nombre: 'Precio total', campo: 'precio_total', tipo: 'precio' },
        { nombre: 'Estado', campo: 'estado', tipo: 'texto' },
        { nombre: 'Fecha', campo: 'fecha', tipo: 'fecha' },
      ],
      values: values,
      botonVacio: [
        {
          label: 'Vea nuestro catálogo',
          icono: 'bi bi-arrow-clockwise',
          funcion: () => this.router.navigate(['productos/-1']),
        },
      ],
    };
  }

  obtenerPedidos() {
    this.perfilService
      .getPedidos(this.usuario.id)
      .pipe(take(1))
      .subscribe({
        next: (result) => {
          this.generarTablaPedido(result);
        },
      });
  }

  obtenerCarrito() {
    this.perfilService
      .getCarrito(this.usuario.id)
      .pipe(take(1))
      .subscribe({
        next: (result) => {
          if (result.length > 0) this.tiempo = new Date(result[0].fecha);
          this.generarTablaCarrito(
            result.map((e) => {
              return {
                ...e,
                imagen:
                  environment.url_backend +
                  `pictures/${e.producto_id}?tipo=productos`,
              };
            })
          );
        },
      });
  }

  generarEditModal() {
    let ref: any;
    const formularioEditar: Formulario = {
      controles: [
        {
          tipo: 'text',
          nombre: 'Nombre',
          control: 'nombre',
          valor: this.usuario.nombre,
          validator: [Validators.required],
        },
        {
          tipo: 'text',
          nombre: 'correo',
          control: 'correo',
          valor: this.usuario.correo,
          validator: [Validators.required, Validators.email],
        },
        {
          tipo: 'text',
          nombre: 'País',
          control: 'pais',
          valor: this.usuario.pais,
        },
        {
          tipo: 'text',
          nombre: 'Dirección',
          control: 'direccion',
          valor: this.usuario.direccion,
        },
        {
          tipo: 'text',
          nombre: 'Teléfono',
          control: 'telefono',
          valor: this.usuario.telefono,
        },
      ],
      columnas: [2, 2, 1],
      skeleton: false,
      autofixed: true,
    };
    const modal: Modal = {
      formulario: formularioEditar,
      titulo: 'Editar perfil',
      subtitulo: 'cambie todos los datos que necesite.',
      botones: [
        {
          label: 'Aceptar',
          icono: 'bi bi-check',
          cargando: () => this.cargando,
          funcion: () => {
            if (formularioEditar.form!.valid) {
              this.cargando = true;
              this.editar(formularioEditar.form?.getRawValue(), ref);
            } else {
              formularioEditar.form?.markAllAsTouched();
            }
          },
        },
        { label: 'Cancelar', icono: 'bi bi-x', funcion: () => ref.close() },
      ],
    };
    ref = this.dialog.open(ModalGenericoComponent, {
      data: modal,
      width: '50%',
    });
  }

  editar(data: Usuario, ref: DialogRef) {
    let formData = new FormData();
    formData.append('id', this.usuario.id.toString());
    formData.append('usuario', this.usuario.usuario.toString());
    formData.append('nombre', data.nombre.toString());
    formData.append('fecha', this.usuario.fecha.toString());
    formData.append('correo', data.correo.toString());
    formData.append('pais', data.pais.toString());
    formData.append('direccion', data.direccion.toString());
    formData.append('telefono', data.telefono.toString());
    formData.append('rol', this.usuario.rol.toString());
    this.perfilService
      .updateUsuarioWithOutPass(formData, this.usuario.id)
      .pipe(take(1))
      .subscribe({
        next: (result) => {
          this.cargando = false;
          this.snackService.success({
            titulo: 'Notificación',
            texto: 'Datos del perfil actualizados satisfactoriamente',
          });
          this.usuario.nombre = data.nombre;
          this.usuario.correo = data.correo;
          this.usuario.pais = data.pais;
          this.usuario.direccion = data.direccion;
          this.usuario.telefono = data.telefono;
          localStorage.setItem('usuario', JSON.stringify(this.usuario));
          ref.close();
        },
        error: (error) => {
          this.cargando = false;
        },
      });
  }

  generarPasswordModal() {
    let ref: any;
    const formularioPassword: Formulario = {
      controles: [
        {
          tipo: 'password',
          nombre: 'Contraseña anterior',
          control: 'anterior',
          validator: [Validators.required],
        },
        {
          tipo: 'password',
          nombre: 'Contraseña nueva',
          control: 'nueva',
          validator: [Validators.required],
        },
        {
          tipo: 'password',
          nombre: 'Confirma la contraseña',
          control: 'confirm',
          validator: [Validators.required],
        },
      ],
      columnas: [1, 1, 1],
      skeleton: false,
      autofixed: true,
    };
    const modal: Modal = {
      formulario: formularioPassword,
      titulo: 'Cambiar contraseña',
      subtitulo:
        'al cambiar la contraseña se le pedirá que se autentique nuevamente.',
      botones: [
        {
          label: 'Aceptar',
          icono: 'bi bi-check',
          cargando: () => this.cargando,
          funcion: () => {
            if (formularioPassword.form!.valid) {
              this.cargando = true;
              this.cambiarContrasenna(
                formularioPassword.form?.getRawValue(),
                ref
              );
            } else {
              formularioPassword.form?.markAllAsTouched();
            }
          },
        },
        { label: 'Cancelar', icono: 'bi bi-x', funcion: () => ref.close() },
      ],
    };
    ref = this.dialog.open(ModalGenericoComponent, {
      data: modal,
      width: '50%',
    });
  }

  cambiarContrasenna(data: any, ref: DialogRef) {
    let formData: FormData = new FormData();
    formData.append('usuario', this.usuario.usuario);
    formData.append('id_usuario', this.usuario.id.toString());
    formData.append('pass_old', data.anterior);
    formData.append('new_password', data.nueva);
    this.perfilService
      .changePassword(formData)
      .pipe(take(1))
      .subscribe({
        next: (result) => {
          this.snackService.success({
            titulo: 'Notificación',
            texto: 'La contraseña ha sido modificada correctamente.',
          });
          this.cargando = false;
          ref.close();
          localStorage.removeItem('usuario');
          setTimeout(() => this.router.navigate(['inicio']), 200);
        },
        error: () => {
          this.cargando = false;
        },
      });
  }
}
