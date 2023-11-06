import { Component, OnInit } from '@angular/core';
import { Boton } from 'src/app/core/components/boton-generico/model/boton.model';
import { Formulario } from 'src/app/core/components/form-generico/model/formulario.model';
import { Table } from 'src/app/core/components/table-generico/model/table.model';
import { AdminService } from '../../service/admin.service';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { SnackService } from 'src/app/core/components/snack/service/snack.service';
import { take } from 'rxjs';
import { Pedido } from 'src/app/core/models/pedido.model';
import {
  addDetalle,
  deleteAllDetalle,
} from 'src/app/shared/state/actions/detalle.actions';
import { Validators } from '@angular/forms';
import { Modal } from 'src/app/core/components/modal-generico/model/modal.model';
import { ModalGenericoComponent } from 'src/app/core/components/modal-generico/modal-generico.component';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss'],
})
export class PedidoComponent implements OnInit {
  formulario?: Formulario;
  tabla!: Table;

  botones: Boton[] = [
    {
      icono: 'bi bi-basket',
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

  botonesAgregarActualizar: Boton[] = [
    {
      label: 'Actualizar',
      icono: 'bi bi-arrow-clockwise',
      funcion: () => this.obtenerPedidos(),
    },
  ];

  loading: boolean = false;
  loadingEditar: boolean = false;

  constructor(
    private adminService: AdminService,
    private store: Store,
    private dialog: MatDialog,
    private snackService: SnackService
  ) {}

  ngOnInit(): void {
    this.obtenerPedidos();
  }

  obtenerPedidos() {
    this.generarTabla([]);
    this.adminService
      .getPedidos()
      .pipe(take(1))
      .subscribe({
        next: (result) => {
          this.generarTabla(result);
        },
      });
  }

  generarTabla(values?: Pedido[]) {
    this.tabla = {
      columnas: [
        {
          tipo: 'texto',
          nombre: 'Usuario',
          campo: 'usuario',
        },
        {
          tipo: 'texto',
          nombre: 'Producto',
          campo: 'producto',
        },
        {
          tipo: 'numero',
          nombre: 'Cantidad',
          campo: 'cantidad',
        },
        {
          tipo: 'texto',
          nombre: 'Estado',
          campo: 'estado',
        },
        {
          tipo: 'fecha',
          nombre: 'Fecha',
          campo: 'fecha',
        },
      ],
      values: values ?? [],
      cargando: !values,
      acciones: this.botones,
      accionesTexto: 'Acciones',
      textoVacio: 'No hay pedidos que gestionar',
    };
  }

  seleccionado(item: Pedido) {
    if (item) {
      this.generarFormulario(item);
      this.adminService.setFormulario(this.formulario!);
      const pedido: Pedido = item;
      this.store.dispatch(
        addDetalle({
          detalle: {
            titulo: 'Procesar el pedido',
            subtitulo:
              'Informe al usuario que su pedido cambiando el estado de su pedido o simplemente finalicelo.',
            botones: [
              {
                icono: 'bi bi-check',
                tooltip: 'Modificar estado',
                cargando: () => this.loading,
                disabled: () => item.estado === 'finalizado',
                funcion: () => {
                  this.aplicarCambio();
                },
              },
              {
                icono: 'bi bi-trash',
                tooltip: 'Eliminar',
                funcion: (value) => {
                  this.eliminar(value);
                },
              },
            ],
            data: pedido,
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

  generarFormulario(item?: Pedido) {
    this.formulario = {
      controles: [
        {
          tipo: 'select',
          nombre: 'Estado',
          control: 'estado',
          valor: item ? item.estado : '',
          opciones: [
            { codigo: 'reservado', nombre: 'Reservado' },
            { codigo: 'espera', nombre: 'En espera' },
            { codigo: 'finalizado', nombre: 'Finalizado' },
          ],
          validator: [Validators.required],
        },
        {
          tipo: 'text',
          nombre: 'ID',
          control: 'id',
          valor: item ? item.id : 1,
        },
      ],
      columnas: [1],
    };
  }

  eliminar(pedidos: Pedido) {
    let ref: any;
    const modal: Modal = {
      texto: `Desea eliminar el pedido, esta acción no tiene vuelta atrás?`,
      botones: [
        {
          label: 'Aceptar',
          icono: 'bi bi-check',
          funcion: () => this.eliminarPedido(pedidos.id, ref),
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

  eliminarPedido(id: number, ref: DialogRef) {
    this.loading = true;
    this.adminService
      .deletePedido(id)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.loading = false;
          this.obtenerPedidos();
          this.snackService.success({
            texto: 'Pedido eliminado exitosamente.',
          });
          this.store.dispatch(deleteAllDetalle());
          setTimeout(() => ref.close(), 300);
        },
        error: () => (this.loading = false),
      });
  }

  aplicarCambio() {
    this.loading = true;
    const data = this.formulario?.form?.getRawValue();
    const formData: FormData = new FormData();
    formData.append('estado', data.estado);
    this.adminService
      .cambiarEstadoPedido(formData, data.id)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.loading = false;
          this.snackService.success({
            texto: `El estado del pedido ha cambiado a ${data.estado}`,
          });
          this.obtenerPedidos();
          this.store.dispatch(deleteAllDetalle());
        },
        error: () => {
          this.loading = false;
        },
      });
  }
}
