import { Component, OnInit } from '@angular/core';
import { Boton } from 'src/app/core/components/boton-generico/model/boton.model';
import { Formulario } from 'src/app/core/components/form-generico/model/formulario.model';
import { Table } from 'src/app/core/components/table-generico/model/table.model';
import { AdminService } from '../../service/admin.service';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { SnackService } from 'src/app/core/components/snack/service/snack.service';
import { take } from 'rxjs';
import { Noticia } from 'src/app/modules/noticias/model/noticias';
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
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {
  formulario?: Formulario;
  tabla!: Table;

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
      label: 'Agregar noticia',
      icono: 'bi bi-plus',
      funcion: () => this.agregarNoticia(),
    },
    {
      label: 'Actualizar',
      icono: 'bi bi-arrow-clockwise',
      funcion: () => this.obtenerNoticias(),
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
    this.obtenerNoticias();
  }

  obtenerNoticias() {
    this.generarTabla([]);
    this.adminService
      .getNoticias()
      .pipe(take(1))
      .subscribe({
        next: (result) => {
          if (Array.isArray(result)) {
            this.generarTabla(
              result.map((e) => {
                e.fecha = e.fecha === '0000-00-00 00:00:00' ? '' : e.fecha;
                e.logo =
                  e.logo !== 'undefined'
                    ? e.logo
                    : 'assets/logos/icon-icem-gray.png';
                return e;
              })
            );
          }
        },
      });
  }

  generarTabla(values?: Noticia[]) {
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
        { tipo: 'imagen', nombre: 'Fuente', campo: 'logo' },
        {
          tipo: 'fecha',
          nombre: 'Fecha',
          campo: 'fecha',
        },
      ],
      values: values ?? [],
      cargando: !values,
      acciones: [
        {
          icono: 'bi bi-search',
          class:
            'p-2 rounded h-fit hover:border dark:border-icem-500 text-icem-500 dark:text-gray-100 flex justify-center items-center',
          funcion: (value) => {
            this.seleccionado(value);
          },
        },
      ],
      accionesTexto: 'Acciones',
      textoVacio: 'No hay noticias que gestionar',
    };
  }

  seleccionado(item: Noticia) {
    if (item) {
      this.generarFormulario(item);
      this.adminService.setFormulario(this.formulario!);
      const noticia: Noticia = item;
      this.store.dispatch(
        addDetalle({
          detalle: {
            titulo: 'Editar noticia',
            botones: this.botonesDetalle,
            data: noticia,
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

  generarFormulario(item?: Noticia) {
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
          nombre: 'Fuente',
          control: 'fuente',
          disabled: true,
          valor: item ? item.fuente : 'ICEM',
          validator: [Validators.required],
        },
        {
          tipo: 'date',
          nombre: 'Fecha',
          control: 'fecha',
          valor: item ? item.fecha : '',
          validator: [Validators.required],
        },
        {
          tipo: 'text',
          nombre: 'id',
          control: 'id',
          valor: item ? item.id : '',
        },
      ],
      columnas: [1, 1, 1, 1],
      imagen: {
        maximoImagenes: 1,
        imagenes: item
          ? [
              item.fuente === 'ICEM'
                ? environment.url_backend + `pictures/${item.id}?tipo=noticias`
                : item.imagen,
            ]
          : [],
      },
    };
  }

  eliminar(noticia: Noticia) {
    let ref: any;
    const modal: Modal = {
      texto: `Desea eliminar "${noticia.titulo}", esta acción no tiene vuelta atrás?`,
      botones: [
        {
          label: 'Aceptar',
          icono: 'bi bi-check',
          funcion: () => this.eliminarNoticia(noticia.id, ref),
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

  eliminarNoticia(id: number, ref: DialogRef) {
    this.loading = true;
    this.adminService
      .deleteNoticia(id)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.loading = false;
          this.obtenerNoticias();
          this.store.dispatch(deleteAllDetalle());
          setTimeout(() => ref.close(), 300);
        },
        error: () => (this.loading = false),
      });
  }

  agregarNoticia() {
    this.generarFormulario();
    const detalle: Detalle = {
      titulo: 'Agregar Noticia',
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
    formData.append('titulo', data.titulo.toString());
    formData.append('descripcion', data.descripcion.toString());
    formData.append('fuente', data.fuente.toString());
    formData.append('fecha', data.fecha.toString());

    if (accion) {
      this.adminService.updateNoticia(formData, data.id).subscribe({
        next: () => {
          this.loadingEditar = false;
          this.obtenerNoticias();
          this.store.dispatch(deleteAllDetalle());
          this.snackService.success({
            texto: 'La noticia se ha editado correctamente.',
          });
        },
        error: () => {
          this.loadingEditar = false;
        },
      });
    } else {
      this.adminService
        .addNoticia(formData)
        .pipe(take(1))
        .subscribe({
          next: () => {
            this.loadingEditar = false;
            this.obtenerNoticias();
            this.store.dispatch(deleteAllDetalle());
            this.snackService.success({
              texto: 'La noticia se ha agregado correctamente.',
            });
          },
          error: () => {
            this.loadingEditar = false;
          },
        });
    }
  }
}
