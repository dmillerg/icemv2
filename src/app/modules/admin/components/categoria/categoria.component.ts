import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { SnackService } from 'src/app/core/components/snack/service/snack.service';
import { CatalogoService } from 'src/app/core/services/catalogo.service';
import { Formulario } from 'src/app/core/components/form-generico/model/formulario.model';
import { Table } from 'src/app/core/components/table-generico/model/table.model';
import { Categoria } from 'src/app/core/models/categoria.model';
import { take } from 'rxjs';
import { Boton } from 'src/app/core/components/boton-generico/model/boton.model';
import { addDetalle, deleteAllDetalle } from 'src/app/shared/state/actions/detalle.actions';
import { Validators } from '@angular/forms';
import { DialogRef } from '@angular/cdk/dialog';
import { Modal } from 'src/app/core/components/modal-generico/model/modal.model';
import { ModalGenericoComponent } from 'src/app/core/components/modal-generico/modal-generico.component';
import { Detalle } from 'src/app/core/components/detalle-generico/model/detalle.model';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss'],
})
export class CategoriaComponent implements OnInit {
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
      label: 'Agregar categoría',
      icono: 'bi bi-plus',
      funcion: () => this.agregarCategoria(),
    },
    {
      label: 'Actualizar',
      icono: 'bi bi-arrow-clockwise',
      funcion: () => this.obtenerCategorias(),
    },
  ];

  loading: boolean = false;
  loadingEditar: boolean = false;

  constructor(
    private adminService: AdminService,
    private store: Store,
    private dialog: MatDialog,
    private snackService: SnackService,
    private catalogoService: CatalogoService
  ) {}

  ngOnInit(): void {
    this.obtenerCategorias();
  }

  obtenerCategorias() {
    this.generarTabla([]);
    this.catalogoService
      .obtenerCategorias()
      .pipe(take(1))
      .subscribe({
        next: (result) => {
          this.generarTabla(result);
        },
      });
  }

  generarTabla(values?: Categoria[]) {
    this.tabla = {
      columnas: [
        {
          tipo: 'texto',
          nombre: 'Nombre',
          campo: 'nombre',
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
      textoVacio: 'No hay categorias que gestionar',
    };
  }

  seleccionado(item: Categoria) {
    if (item) {
      this.generarFormulario(item);
      this.adminService.setFormulario(this.formulario!);
      const categoria: Categoria = item;
      this.store.dispatch(
        addDetalle({
          detalle: {
            titulo: 'Editar categoría',
            botones: this.botonesDetalle,
            data: categoria,
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

  generarFormulario(item?: Categoria) {
    this.formulario = {
      controles: [
        {
          tipo: 'text',
          nombre: 'Título',
          control: 'nombre',
          valor: item ? item.nombre : '',
          validator: [Validators.required],
        },
        {
          tipo: 'text',
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
    };
  }

  eliminar(categoria: Categoria) {
    let ref: any;
    const modal: Modal = {
      texto: `Desea eliminar la categoría "${categoria.nombre}", esta acción no tiene vuelta atrás?`,
      botones: [
        {
          label: 'Aceptar',
          icono: 'bi bi-check',
          funcion: () => this.eliminarCategoria(categoria.id, ref),
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

  eliminarCategoria(id: number, ref: DialogRef) {
    this.loading = true;
    this.adminService
      .deleteCategoria(id)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.loading = false;
          this.obtenerCategorias();
          setTimeout(() => ref.close(), 300);
        },
        error: () => (this.loading = false),
      });
  }

  agregarCategoria() {
    this.generarFormulario();
    const detalle: Detalle = {
      titulo: 'Agregar nueva categoría',
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
    let formData = new FormData();
    formData.append('id', data.id.toString());
    formData.append('nombre', data.nombre.toString());
    formData.append('descripcion', data.descripcion.toString());

    if (accion) {
      this.adminService.updateCategoria(formData, data.id).subscribe({
        next: () => {
          this.loadingEditar = false;
          this.obtenerCategorias();
          this.store.dispatch(deleteAllDetalle());
          this.snackService.success({
            texto: 'La categoría se ha editado correctamente.',
          });
        },
        error: () => {
          this.loadingEditar = false;
        },
      });
    } else {
      this.adminService
        .addCategoria(formData)
        .pipe(take(1))
        .subscribe({
          next: () => {
            this.loadingEditar = false;
            this.obtenerCategorias();
            this.snackService.success({
              texto: 'La categoría se ha agregado correctamente.',
            });
          },
          error: () => {
            this.loadingEditar = false;
          },
        });
    }
  }
}
