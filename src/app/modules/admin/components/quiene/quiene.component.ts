import { Component, OnInit } from '@angular/core';
import { Boton } from 'src/app/core/components/boton-generico/model/boton.model';
import { Formulario } from 'src/app/core/components/form-generico/model/formulario.model';
import { Table } from 'src/app/core/components/table-generico/model/table.model';
import { AdminService } from '../../service/admin.service';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { SnackService } from 'src/app/core/components/snack/service/snack.service';
import { take } from 'rxjs';
import { Quienes } from 'src/app/modules/quienes/model/quienes';
import {
  addDetalle,
  deleteAllDetalle,
} from 'src/app/shared/state/actions/detalle.actions';
import { Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Modal } from 'src/app/core/components/modal-generico/model/modal.model';
import { ModalGenericoComponent } from 'src/app/core/components/modal-generico/modal-generico.component';
import { DialogRef } from '@angular/cdk/dialog';
import { Detalle } from 'src/app/core/components/detalle-generico/model/detalle.model';

@Component({
  selector: 'app-quiene',
  templateUrl: './quiene.component.html',
  styleUrls: ['./quiene.component.scss'],
})
export class QuieneComponent implements OnInit {
  formulario?: Formulario;
  tabla!: Table;

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
        this.formulario!.form?.valid
          ? this.agregarOEditar(true)
          : this.formulario!.form?.markAllAsTouched(),
    },
    {
      icono: 'bi bi-trash',
      tooltip: 'Eliminar',
      funcion: (value) => {
        this.eliminar(value);
      },
    },
  ];

  botonesAgregarActualizar: Boton[] = [
    {
      label: 'Agregar persona',
      icono: 'bi bi-plus',
      funcion: () => this.agregarQuienes(),
    },
    {
      label: 'Actualizar',
      icono: 'bi bi-arrow-clockwise',
      funcion: () => this.obtenerQuienes(),
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
    this.obtenerQuienes();
  }

  obtenerQuienes() {
    this.generarTabla([]);
    this.adminService
      .getQuienes()
      .pipe(take(1))
      .subscribe({
        next: (result) => {
          this.generarTabla(result);
        },
      });
  }

  generarTabla(values?: Quienes[]) {
    this.tabla = {
      columnas: [
        {
          tipo: 'texto',
          nombre: 'Nombre',
          campo: 'nombre',
        },
        {
          tipo: 'texto',
          nombre: 'Cargo',
          campo: 'cargo',
        },
        {
          tipo: 'texto',
          nombre: 'Orden',
          campo: 'orden',
        },
      ],
      values: values ?? [],
      cargando: !values,
      acciones: this.botones,
      accionesTexto: 'Acciones',
      textoVacio: 'No hay personas que gestionar',
    };
  }

  seleccionado(item: Quienes) {
    if (item) {
      this.generarFormulario(item);
      this.adminService.setFormulario(this.formulario!);
      const quienes: Quienes = item;
      this.store.dispatch(
        addDetalle({
          detalle: {
            titulo: 'Editar persona',
            botones: this.botonesDetalle,
            data: quienes,
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

  generarFormulario(item?: Quienes) {
    this.formulario = {
      controles: [
        {
          tipo: 'text',
          nombre: 'Nombre',
          control: 'nombre',
          valor: item ? item.nombre : '',
          validator: [Validators.required],
        },
        {
          tipo: 'text',
          nombre: 'Cargo',
          control: 'cargo',
          valor: item ? item.cargo : '',
          validator: [Validators.required],
        },
        {
          tipo: 'number',
          nombre: 'Orden',
          control: 'orden',
          valor: item ? item.orden : 1,
        },
        {
          tipo: 'text',
          nombre: 'ID',
          control: 'id',
          valor: item ? item.id : 1,
        },
      ],
      columnas: [1, 1, 1],
      imagen: {
        maximoImagenes: 1,
        imagenes: item
          ? [environment.url_backend + `pictures/${item.id}?tipo=quienes`]
          : [],
      },
    };
  }

  eliminar(quienes: Quienes) {
    let ref: any;
    const modal: Modal = {
      texto: `Desea eliminar "${quienes.nombre}", esta acción no tiene vuelta atrás?`,
      botones: [
        {
          label: 'Aceptar',
          icono: 'bi bi-check',
          funcion: () => this.eliminarQuienes(quienes.id, ref),
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

  eliminarQuienes(id: number, ref: DialogRef) {
    this.loading = true;
    this.adminService
      .deleteQuienes(id)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.loading = false;
          this.obtenerQuienes();
          this.store.dispatch(deleteAllDetalle());
          setTimeout(() => ref.close(), 300);
        },
        error: () => (this.loading = false),
      });
  }

  agregarQuienes() {
    this.generarFormulario();
    const detalle: Detalle = {
      titulo: 'Agregar nuevo desarrollo',
      subtitulo: 'Rellene todos los campos necesarios',
      botones: [
        {
          icono: 'bi bi-plus',
          tooltip: 'Agregar',
          cargando: () => this.loading,
          funcion: () =>
            this.formulario!.form?.valid
              ? this.agregarOEditar(false)
              : this.formulario!.form?.markAllAsTouched(),
        },
      ],
    };
    this.adminService.setFormulario(this.formulario!);
    this.store.dispatch(addDetalle({ detalle: detalle }));
  }

  agregarOEditar(accion: boolean) {
    this.loadingEditar = true;
    const data = this.formulario?.form?.getRawValue();
    const formData = this.formulario?.imagen?.formDataImage ?? new FormData();
    formData.append('id', data.id.toString());
    formData.append('nombre', data.nombre.toString());
    formData.append('cargo', data.cargo.toString());
    formData.append('orden', data.orden.toString());

    if (accion) {
      this.adminService.updateQuienes(formData, data.id).subscribe({
        next: () => {
          this.loadingEditar = false;
          this.obtenerQuienes();
          this.store.dispatch(deleteAllDetalle());
          this.snackService.success({
            texto: 'La persona se ha editado correctamente.',
          });
        },
        error: () => {
          this.loadingEditar = false;
        },
      });
    } else {
      this.adminService
        .addQuienes(formData)
        .pipe(take(1))
        .subscribe({
          next: () => {
            this.loadingEditar = false;
            this.obtenerQuienes();
            this.store.dispatch(deleteAllDetalle());
            this.snackService.success({
              texto: 'La persona se ha agregado correctamente.',
            });
          },
          error: () => {
            this.loadingEditar = false;
          },
        });
    }
  }
}
