import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { Formulario } from 'src/app/core/components/form-generico/model/formulario.model';
import { Table } from 'src/app/core/components/table-generico/model/table.model';
import { Boton } from 'src/app/core/components/boton-generico/model/boton.model';
import { Mensaje } from '../../model/pregunta.model';
import { take } from 'rxjs';
import { Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  addDetalle,
  deleteAllDetalle,
} from 'src/app/shared/state/actions/detalle.actions';
import { DialogRef } from '@angular/cdk/dialog';
import { MatDialog } from '@angular/material/dialog';
import { Modal } from 'src/app/core/components/modal-generico/model/modal.model';
import { ModalGenericoComponent } from 'src/app/core/components/modal-generico/modal-generico.component';
import { SnackService } from 'src/app/core/components/snack/service/snack.service';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.component.html',
  styleUrls: ['./pregunta.component.scss'],
})
export class PreguntaComponent implements OnInit {
  formulario?: Formulario;
  tabla!: Table;
  loading: boolean = false;
  loadingResponder: boolean = false;

  botonActualizar: Boton[] = [
    {
      label: 'Actualizar',
      icono: 'bi bi-arrow-clockwise',
      funcion: () => this.obtenerPreguntas(),
    },
  ];

  botones: Boton[] = [
    {
      icono: 'bi bi-reply',
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

  botonMostrar: Boton[] = [
    {
      icono: 'bi bi-eye',
      tooltip: 'Mostrar formulario',
      funcion: (value) => this.mostrarFormulario(value),
    },
  ];

  botonDetalle: Boton[] = [
    {
      icono: 'bi bi-reply',
      tooltip: 'Responder',
      cargando: () => this.loadingResponder,
      funcion: () => this.responderPregunta(),
    },
    {
      icono: 'bi bi-trash',
      tooltip: 'Eliminar',
      funcion: (value) => {
        this.eliminar(value);
      },
    },
  ];

  constructor(
    private adminService: AdminService,
    private store: Store,
    private dialog: MatDialog,
    private snackService: SnackService
  ) {}

  ngOnInit(): void {
    this.obtenerPreguntas();
  }

  obtenerPreguntas() {
    this.generarTabla([]);
    this.adminService
      .getMensajes()
      .pipe(take(1))
      .subscribe({
        next: (result) => {
          if (Array.isArray(result)) {
            this.generarTabla(result);
          }
        },
      });
  }

  responderPregunta() {
    this.loading = true;
    const data = this.formulario?.form?.getRawValue();
    const formData = new FormData();

    formData.append('pregunta', data.mensaje.toString());
    formData.append('respuesta', data.respuesta);

    this.adminService
      .updateMensaje(data.id, formData)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.loading = false;
          this.obtenerPreguntas();
          this.snackService.success({
            texto: `La respuesta se ha enviado correctamente`,
          });
          this.store.dispatch(deleteAllDetalle());
        },
        error: () => {
          this.loading = false;
        },
      });
  }

  seleccionado(item: Mensaje) {
    this.botonDetalle;
    if (item) {
      this.formulario = undefined;
      const pregunta: Mensaje = item;
      this.store.dispatch(
        addDetalle({
          detalle: {
            titulo: 'Pregunta',
            textos: [
              {
                nombre: 'usuario',
                valor: pregunta.alias,
              },
              {
                nombre: 'pregunta',
                valor: pregunta.mensaje,
              },
            ],
            botones: [...this.botonMostrar],
            data: pregunta,
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

  generarFormulario(pregunta?: Mensaje) {
    this.formulario = {
      controles: [
        {
          tipo: 'textarea',
          nombre: 'Respuesta pregunta',
          control: 'respuesta',
          validator: [Validators.required],
        },
        {
          tipo: 'textarea',
          nombre: 'Mensaje',
          control: 'mensaje',
          valor: pregunta ? pregunta.mensaje : '',
          validator: [Validators.required],
        },
        {
          tipo: 'text',
          nombre: 'ID',
          control: 'id',
          valor: pregunta ? pregunta.id : '',
          validator: [Validators.required],
        },
      ],
      columnas: [1],
      autofixed: true,
    };
  }

  mostrarFormulario(pregunta: Mensaje) {
    this.botonDetalle;
    this.generarFormulario(pregunta);
    this.adminService.setFormulario(this.formulario!);
    this.store.dispatch(
      addDetalle({
        detalle: {
          titulo: 'Responder Comentario',
          botones: this.botonDetalle,
          data: pregunta,
        },
      })
    );
  }

  eliminar(pregunta: Mensaje) {
    let ref: any;
    const modal: Modal = {
      texto: `¿Desea eliminar la pregunta? Esta acción no tiene vuelta atrás`,
      botones: [
        {
          label: 'Aceptar',
          icono: 'bi bi-check',
          funcion: () => this.eliminarPregunta(pregunta.id, ref),
          cargando: () => this.loading,
        },
        {
          label: 'Cancelar',
          icono: 'bi bi-x',
          funcion: () => ref.close(),
        },
      ],
      icono: 'bi bi-exclamation-diamond text-red-500',
    };
    ref = this.dialog.open(ModalGenericoComponent, {
      data: modal,
    });
  }

  eliminarPregunta(id: number, ref: DialogRef) {
    this.loading = true;
    this.adminService
      .deleteMensaje(id)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.loading = false;
          this.obtenerPreguntas();
          setTimeout(() => ref.close(), 300);
          this.store.dispatch(deleteAllDetalle());
        },
        error: () => (this.loading = false),
      });
  }

  generarTabla(values?: Mensaje[]) {
    this.tabla = {
      columnas: [
        {
          tipo: 'texto',
          nombre: 'Correo',
          campo: 'correo',
        },
        {
          tipo: 'texto',
          nombre: 'Pregunta',
          campo: 'mensaje',
        },
        {
          tipo: 'boolean',
          nombre: 'Visto',
          campo: 'visto',
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
      textoVacio: 'No hay preguntas que gestionar',
    };
  }
}
