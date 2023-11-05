import { Component, OnInit } from '@angular/core';
import { Boton } from 'src/app/core/components/boton-generico/model/boton.model';
import { Formulario } from 'src/app/core/components/form-generico/model/formulario.model';
import { Table } from 'src/app/core/components/table-generico/model/table.model';
import { AdminService } from '../../service/admin.service';
import { Comentario } from '../../model/comentario.model';
import { take } from 'rxjs';
import { DialogRef } from '@angular/cdk/dialog';
import { MatDialog } from '@angular/material/dialog';
import { ModalGenericoComponent } from 'src/app/core/components/modal-generico/modal-generico.component';
import { Modal } from 'src/app/core/components/modal-generico/model/modal.model';
import { Validators } from '@angular/forms';
import { SnackService } from 'src/app/core/components/snack/service/snack.service';
import { Store } from '@ngrx/store';
import { addDetalle, deleteAllDetalle } from 'src/app/shared/state/actions/detalle.actions';

@Component({
  selector: 'app-comentario',
  templateUrl: './comentario.component.html',
  styleUrls: ['./comentario.component.scss']
})
export class ComentarioComponent implements OnInit {
  formulario?: Formulario;
  tabla!: Table;
  comentariosRespondidos: number = 0;
  comentariosSinResponder: number = 0;
  loading: boolean = false;
  loadingEditar: boolean = false;
  loadingActivar: boolean = false;

  botonActualizar: Boton[] = [
    {
      label: 'Actualizar',
      icono: 'bi bi-arrow-clockwise',
      funcion: () => this.obtenerComentarios()
    }
  ];

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

  botonesDetalle: Boton[] = [];


  botonMostrar: Boton[] = [
    {
      icono: 'bi bi-eye',
      tooltip: 'Mostrar formulario',
      funcion: (value) => this.mostrarFormulario(value),
    },
  ];

  // botoneresponder: Boton[] = [
  //   icono: 'bi bi-reply',
  //   class: ''
  // ]

  constructor(
    private adminService: AdminService,
    private dialog: MatDialog,
    private snackService: SnackService,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.obtenerComentarios();
  }

  generarTabla(values?: Comentario[]) {
    this.tabla = {
      columnas: [
        {
          tipo: 'texto',
          nombre: 'Alias',
          campo: 'alias'
        },
        {
          tipo: 'texto',
          nombre: 'Correo',
          campo: 'correo'
        },
        {
          tipo: 'boolean',
          nombre: 'Visto',
          campo: 'visto'
        },
        {
          tipo: 'numero',
          nombre: 'Respuestas',
          campo: 'cant_resp'
        }
      ],
      values: values ?? [],
      cargando: !values,
      acciones: this.botones,
      accionesTexto: 'Acciones',
      textoVacio: 'No hay comentarios que gestionar',
    };
  }

  obtenerComentarios() {
    this.generarTabla();
    this.adminService.getComentario().pipe(take(1)).subscribe({
      next: (result) => {
        this.comentariosRespondidos = result.filter((e) => e.cant_resp > 0).length;
        this.comentariosSinResponder = result.filter((e) => !e.cant_resp).length
        this.generarTabla(result.map(e => {
          e.visto = e.cant_resp > 0;
          return e;
        }));
      }
    })
  }

  seleccionado(item: Comentario) {
    this.generarBotonesDetalle();
    if (item) {
      this.formulario = undefined;
      const comentario: Comentario = item;

      this.store.dispatch(
        addDetalle({
          detalle: {
            titulo: 'Comentario',
            textos: [
              {
                nombre: 'alias',
                valor: comentario.alias
              },
              {
                nombre: 'correo',
                valor: comentario.correo
              },
              {
                nombre: 'comentario',
                valor: comentario.comentario
              }
            ],
            botones: [...this.botonMostrar],
            data: comentario,
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

  generarFormulario(comentario?: Comentario) {
    this.formulario = {
      controles: [
        {
          tipo: 'textarea',
          nombre: 'Respuesta comentario',
          control: 'respuesta',
          validator: [Validators.required],
        },
      ],
      columnas: [1],
      autofixed: true,
    }
  }

  generarBotonesDetalle() {
    this.botonesDetalle = [
      {
        icono: 'bi bi-reply',
        tooltip: 'Responder',
        cargando: () => this.loadingEditar,
        funcion: (value) => this.responderComentario(value)

      },
      {
        icono: 'bi bi-trash',
        tooltip: 'Eliminar',
        funcion: (value) => {
          this.eliminar(value);
        },
      },
    ];
  }

  responderComentario(value: Comentario) {
    this.loading = true;
    const data = this.formulario?.form?.getRawValue();
    const formData = new FormData

    formData.append('id', '-1');
    formData.append('id_post', value.id.toString());
    formData.append('alias', value.alias);
    formData.append('correo', value.correo.toString());
    formData.append('respuesta', data.respuesta.toString());

    this.adminService.addRespuestaComentario(formData).pipe(take(1)).subscribe({
      next: () => {
        this.loading = false;
        this.obtenerComentarios();
        this.snackService.success({
          texto: `La respuesta se ha enviado correctamente`
        });
        this.store.dispatch(deleteAllDetalle())
      },
      error: () => {
        this.loading = false;
      }
    })
  }

  mostrarFormulario(comentario?: Comentario) {
    this.generarBotonesDetalle();
    this.generarFormulario(comentario);
    this.adminService.setFormulario(this.formulario!);
    this.store.dispatch(
      addDetalle({
        detalle: {
          titulo: 'Responder Comentario',
          botones: this.botonesDetalle,
          data: comentario,
        },
      })
    );
  }


  eliminar(comentario: Comentario) {
    let ref: any;
    const modal: Modal = {
      texto: `¿Desea eliminar el comentario? Esta acción no tiene vuelta atrás`,
      botones: [
        {
          label: 'Aceptar',
          icono: 'bi bi-check',
          funcion: () => this.eliminarComentario(comentario.id, ref),
          cargando: () => this.loading,
        },
        {
          label: 'Cancelar', icono: 'bi bi-x', funcion: () => ref.close()
        }
      ],
      icono: 'bi bi-exclamation-diamond text-red-500',
    };
    ref = this.dialog.open(ModalGenericoComponent, {
      data: modal,
    });
  }

  eliminarComentario(id: number, ref: DialogRef) {
    this.loading = true;
    this.adminService.deleteComentario(id).pipe(take(1)).subscribe({
      next: () => {
        this.loading = false;
        this.obtenerComentarios();
        setTimeout(() => ref.close(), 300);
        this.store.dispatch(deleteAllDetalle())
      },
      error: () => (this.loading = false),
    });
  }

}