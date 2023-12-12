import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { AdminService } from '../../service/admin.service';
import { MatDialog } from '@angular/material/dialog';
import { SnackService } from 'src/app/core/components/snack/service/snack.service';
import { Formulario } from 'src/app/core/components/form-generico/model/formulario.model';
import { Table } from 'src/app/core/components/table-generico/model/table.model';
import { Boton } from 'src/app/core/components/boton-generico/model/boton.model';
import { Store } from '@ngrx/store';
import { Desarrollo } from 'src/app/modules/desarrollo/model/desarrollo';
import {
  addDetalle,
  deleteAllDetalle,
} from 'src/app/shared/state/actions/detalle.actions';
import { Validators } from '@angular/forms';
import { Modal } from 'src/app/core/components/modal-generico/model/modal.model';
import { ModalGenericoComponent } from 'src/app/core/components/modal-generico/modal-generico.component';
import { DialogRef } from '@angular/cdk/dialog';
import { Detalle } from 'src/app/core/components/detalle-generico/model/detalle.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-desarrollo',
  templateUrl: './desarrollo.component.html',
  styleUrls: ['./desarrollo.component.scss'],
})
export class DesarrolloComponent implements OnInit {
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
      label: 'Agregar nuevo desarrollo',
      icono: 'bi bi-plus',
      funcion: () => this.agregarDesarrollo(),
    },
    {
      label: 'Actualizar',
      icono: 'bi bi-arrow-clockwise',
      funcion: () => this.obtenerDesarrollos(),
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
    this.obtenerDesarrollos();
  }

  obtenerDesarrollos() {
    this.generarTabla([]);
    this.adminService
      .getDesarrollos()
      .pipe(take(1))
      .subscribe({
        next: (result) => {
          this.generarTabla(result);
        },
      });
  }

  generarTabla(values?: Desarrollo[]) {
    this.tabla = {
      columnas: [
        {
          tipo: 'texto',
          nombre: 'Título',
          campo: 'titulo',
        },
        {
          tipo: 'texto',
          nombre: 'Descripción',
          campo: 'descripcion',
        },
      ],
      values: values ?? [],
      cargando: !values,
      acciones: this.botones,
      accionesTexto: 'Acciones',
      textoVacio: 'No hay desarrollos que gestionar',
    };
  }

  seleccionado(item: Desarrollo) {
    if (item) {
      this.generarFormulario(item);
      this.adminService.setFormulario(this.formulario!);
      const desarrollo: Desarrollo = item;
      this.store.dispatch(
        addDetalle({
          detalle: {
            titulo: 'Editar desarrollo',
            botones: this.botonesDetalle,
            data: desarrollo,
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

  generarFormulario(item?: Desarrollo) {
    this.formulario = {
      controles: [
        {
          tipo: 'text',
          nombre: 'Título',
          control: 'titulo',
          valor: item ? item.titulo : '',
          validator: [Validators.required],
        },
        {
          tipo: 'textarea',
          nombre: 'Descripción',
          control: 'descripcion',
          valor: item ? item.descripcion : '',
          validator: [Validators.required],
        },
        {
          tipo: 'text',
          nombre: 'id',
          control: 'id',
          valor: item ? item.id : '',
        },
      ],
      columnas: [1, 1],
      imagen: {
        maximoImagenes: 1,
        imagenes: item
          ? [environment.url_backend + `pictures/${item.id}?tipo=desarrollos`]
          : [],
      },
    };
  }

  eliminar(desarrollo: Desarrollo) {
    let ref: any;
    const modal: Modal = {
      texto: `Desea eliminar "${desarrollo.titulo}", esta acción no tiene vuelta atrás?`,
      botones: [
        {
          label: 'Aceptar',
          icono: 'bi bi-check',
          funcion: () => this.eliminarDesarrollo(desarrollo.id, ref),
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

  eliminarDesarrollo(id: number, ref: DialogRef) {
    this.loading = true;
    this.adminService
      .deleteDesarrollo(id)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.loading = false;
          this.obtenerDesarrollos();
          this.store.dispatch(deleteAllDetalle());
          setTimeout(() => ref.close(), 300);
        },
        error: () => (this.loading = false),
      });
  }

  agregarDesarrollo() {
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
    console.log(formData);
    
    formData.append('id', data.id.toString());
    formData.append('titulo', data.titulo.toString());
    formData.append('descripcion', data.descripcion.toString());

    if (accion) {
      this.adminService.updateDesarrollo(formData, data.id).subscribe({
        next: () => {
          this.loadingEditar = false;
          this.obtenerDesarrollos();
          this.store.dispatch(deleteAllDetalle());
          this.snackService.success({
            texto: 'El desarrollo se ha editado correctamente.',
          });
        },
        error: () => {
          this.loadingEditar = false;
        },
      });
    } else {
      this.adminService
        .addDesarrollos(formData)
        .pipe(take(1))
        .subscribe({
          next: () => {
            this.loadingEditar = false;
            this.obtenerDesarrollos();
            this.store.dispatch(deleteAllDetalle());
            this.snackService.success({
              texto: 'El desarrollo se ha agregado correctamente.',
            });
          },
          error: () => {
            this.loadingEditar = false;
          },
        });
    }
  }
}
