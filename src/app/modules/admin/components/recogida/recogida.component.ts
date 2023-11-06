import { Component, OnInit } from '@angular/core';
import { Boton } from 'src/app/core/components/boton-generico/model/boton.model';
import { Formulario } from 'src/app/core/components/form-generico/model/formulario.model';
import { Table } from 'src/app/core/components/table-generico/model/table.model';
import { AdminService } from '../../service/admin.service';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { SnackService } from 'src/app/core/components/snack/service/snack.service';
import { take } from 'rxjs';
import { Recogida } from '../../model/recogida.model';
import {
  addDetalle,
  deleteAllDetalle,
} from 'src/app/shared/state/actions/detalle.actions';
import { Validators } from '@angular/forms';
import { Modal } from 'src/app/core/components/modal-generico/model/modal.model';
import { ModalGenericoComponent } from 'src/app/core/components/modal-generico/modal-generico.component';
import { DialogRef } from '@angular/cdk/dialog';
import { Detalle } from 'src/app/core/components/detalle-generico/model/detalle.model';

@Component({
  selector: 'app-recogida',
  templateUrl: './recogida.component.html',
  styleUrls: ['./recogida.component.scss'],
})
export class RecogidaComponent implements OnInit {
  formulario?: Formulario;
  tabla!: Table;
  scrappingLoop: boolean = false;

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
      icono: 'bi bi-check',
      tooltip: 'Editar',
      cargando: () => this.loadingEditar,
      funcion: () =>
        this.formulario!.form?.valid
          ? this.agregarOEditar(true)
          : this.formulario!.form?.markAllAsTouched(),
    },
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
      icono: 'bi bi-check2-circle',
      tooltip: 'Probar',
      cargando: () => this.loadingPrueba,
      funcion: () =>
        this.formulario!.form?.valid
          ? this.probarRecogida()
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
      label: 'Agregar sitio de recogida',
      icono: 'bi bi-plus',
      funcion: () => this.agregarQuienes(),
    },
    {
      label: 'Actualizar',
      icono: 'bi bi-arrow-clockwise',
      funcion: () => this.obtenerQuienes(),
    },
    {
      label: this.scrappingLoop ? 'Iniciar recogida' : 'Detener recogida',
      tooltip:
        (this.scrappingLoop ? 'Activa' : 'Desactiva') +
        ' una recogida de noticias automática de los sitios previamente configurados, en un intervalo configurado.',
      icono: this.scrappingLoop ? 'bi bi-play-circle' : 'bi bi-stop-circle',
      funcion: () => this.obtenerScrappingLoop(),
    },
  ];

  loading: boolean = false;
  loadingEditar: boolean = false;
  loadingPrueba: boolean = false;
  loadingScrap: boolean = false;

  constructor(
    private adminService: AdminService,
    private store: Store,
    private dialog: MatDialog,
    private snackService: SnackService
  ) {}

  ngOnInit(): void {
    this.obtenerQuienes();
    this.obtenerScrappingLoop();
    this.generarBotonesSuperiores();
  }

  obtenerQuienes() {
    this.generarTabla([]);
    this.adminService
      .getScraps()
      .pipe(take(1))
      .subscribe({
        next: (result) => {
          this.generarTabla(result);
        },
      });
  }

  generarBotonDetalle(activar: boolean) {
    this.botonesDetalle = [
      {
        icono: activar ? 'bi bi-check' : 'bi bi-x',
        tooltip: activar ? 'Activar' : 'Desactivar',
        cargando: () => this.loadingEditar,
        funcion: () =>
          this.formulario!.form?.valid
            ? this.agregarOEditar(true, true)
            : this.formulario!.form?.markAllAsTouched(),
      },
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
        icono: 'bi bi-check2-circle',
        tooltip: 'Probar',
        cargando: () => this.loadingPrueba,
        funcion: () =>
          this.formulario!.form?.valid
            ? this.probarRecogida()
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
  }

  generarTabla(values?: Recogida[]) {
    this.tabla = {
      columnas: [
        {
          tipo: 'texto',
          nombre: 'Fuente',
          campo: 'fuente',
        },
        {
          tipo: 'imagen',
          nombre: 'Logo',
          campo: 'logo',
        },
        {
          tipo: 'boolean',
          nombre: 'Activo',
          campo: 'activo',
        },
      ],
      values: values ?? [],
      cargando: !values,
      acciones: this.botones,
      accionesTexto: 'Acciones',
      textoVacio: 'No hay sitios de donde recopilar noticias',
    };
  }

  seleccionado(item: Recogida) {
    if (item) {
      this.generarFormulario(item);
      this.adminService.setFormulario(this.formulario!);
      const recogida: Recogida = item;
      this.generarBotonDetalle(!recogida.activo);
      this.store.dispatch(
        addDetalle({
          detalle: {
            titulo: 'Editar recogida',
            botones: this.botonesDetalle,
            data: recogida,
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

  generarFormulario(item?: Recogida) {
    this.formulario = {
      controles: [
        {
          tipo: 'text',
          nombre: 'Contenedor',
          control: 'contenedor',
          valor: item ? item.contenedor : '',
          validator: [Validators.required],
        },
        {
          tipo: 'text',
          nombre: 'Título',
          control: 'titulo',
          valor: item ? item.titulo : '',
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
          nombre: 'Fecha',
          control: 'fecha',
          valor: item ? item.fecha : '',
          validator: [Validators.required],
        },
        {
          tipo: 'text',
          nombre: 'Imagen selector',
          control: 'imagenSelector',
          valor: item ? item.imagen_selector : '',
          validator: [Validators.required],
        },
        {
          tipo: 'text',
          nombre: 'Imagen attr',
          control: 'imagenAttr',
          valor: item ? item.imagen_attr : '',
          validator: [Validators.required],
        },
        {
          tipo: 'text',
          nombre: 'Enlace selector',
          control: 'enlaceSelector',
          valor: item ? item.enlace_selector : '',
          validator: [Validators.required],
        },
        {
          tipo: 'text',
          nombre: 'Enlace attr',
          control: 'enlaceAttr',
          valor: item ? item.enlace_attr : '',
          validator: [Validators.required],
        },
        {
          tipo: 'text',
          nombre: 'URL',
          control: 'url',
          valor: item ? item.url : '',
          validator: [Validators.required],
        },
        {
          tipo: 'text',
          nombre: 'Fuente',
          control: 'fuente',
          valor: item ? item.fuente : '',
          validator: [Validators.required],
        },
        {
          tipo: 'text',
          nombre: 'Logo',
          control: 'logo',
          valor: item ? item.logo : '',
          validator: [Validators.required],
        },
        {
          tipo: 'text',
          nombre: 'ID',
          control: 'id',
          valor: item ? item.id : '',
        },
        {
          tipo: 'text',
          nombre: 'Activo',
          control: 'activo',
          valor: item ? item.activo : '',
        },
      ],
      columnas: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    };
  }

  eliminar(recogida: Recogida) {
    let ref: any;
    const modal: Modal = {
      texto: `Desea eliminar "${recogida.fuente}", esta acción no tiene vuelta atrás?`,
      botones: [
        {
          label: 'Aceptar',
          icono: 'bi bi-check',
          funcion: () => this.eliminarRecogida(recogida.id, ref),
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

  eliminarRecogida(id: number, ref: DialogRef) {
    this.loading = true;
    this.adminService
      .deleteScrap(id)
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
      titulo: 'Agregar nuevo sitio de recogidad de noticias',
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
        {
          icono: 'bi bi-check2-circle',
          tooltip: 'Probar',
          cargando: () => this.loadingPrueba,
          funcion: () =>
            this.formulario!.form?.valid
              ? this.probarRecogida()
              : this.formulario!.form?.markAllAsTouched(),
        },
      ],
    };
    this.adminService.setFormulario(this.formulario!);
    this.store.dispatch(addDetalle({ detalle: detalle }));
  }

  agregarOEditar(accion: boolean, activar?: boolean) {
    this.loadingEditar = true;
    const data = this.formulario?.form?.getRawValue();
    const formData = this.formulario?.imagen?.formDataImage ?? new FormData();
    formData.append('id', data.id.toString());
    formData.append('contenedor', data.contenedor.toString());
    formData.append('titulo', data.titulo.toString());
    formData.append('fecha', data.fecha.toString());
    formData.append('descripcion', data.descripcion.toString());
    formData.append('enlace_selector', data.enlaceSelector.toString());
    formData.append('enlace_attr', data.enlaceAttr.toString());
    formData.append('imagen_selector', data.imagenSelector.toString());
    formData.append('imagen_attr', data.imagenAttr.toString());
    formData.append('url', data.url.toString());
    formData.append('fuente', data.fuente.toString());
    formData.append('logo', data.logo.toString());
    formData.append(
      'activo',
      (activar ? !data.activo : data.activo).toString()
    );

    if (accion) {
      this.adminService.updateScrap(formData, data.id).subscribe({
        next: () => {
          this.loadingEditar = false;
          this.obtenerQuienes();
          this.store.dispatch(deleteAllDetalle());
          this.snackService.success({
            texto: 'El sitio se ha editado correctamente.',
          });
        },
        error: () => {
          this.loadingEditar = false;
        },
      });
    } else {
      this.adminService
        .addScrap(formData)
        .pipe(take(1))
        .subscribe({
          next: () => {
            this.loadingEditar = false;
            this.obtenerQuienes();
            this.store.dispatch(deleteAllDetalle());
            this.snackService.success({
              texto: 'El sitio se ha agregado correctamente.',
            });
          },
          error: () => {
            this.loadingEditar = false;
          },
        });
    }
  }

  probarRecogida() {
    this.loadingPrueba = true;
    const data = this.formulario?.form!.getRawValue();
    let formData = new FormData();
    formData.append('id', data.id.toString());
    formData.append('contenedor', data.contenedor.toString());
    formData.append('titulo', data.titulo.toString());
    formData.append('fecha', data.fecha.toString());
    formData.append('descripcion', data.descripcion.toString());
    formData.append('enlace_selector', data.enlaceSelector.toString());
    formData.append('enlace_attr', data.enlaceAttr.toString());
    formData.append('imagen_selector', data.imagenSelector.toString());
    formData.append('imagen_attr', data.imagenAttr.toString());
    formData.append('url', data.url.toString());
    formData.append('fuente', data.fuente.toString());
    formData.append('logo', data.logo.toString());

    this.adminService
      .probarScrap(-1, formData)
      .pipe(take(1))
      .subscribe({
        next: (result) => {
          this.loadingPrueba = false;
          if (result.length > 0) {
            let ref: any;
            const modal: Modal = {
              titulo: result[0].titulo,
              subtitulo: result[0].fecha,
              texto: result[0].descripcion,
              botones: [
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
          } else {
            this.snackService.error({
              titulo: 'Error de recogida',
              texto:
                'Ha ocurrido un error al intentar recoger los datos del sitio. Revise que todos los datos introducidos esten correctos y que el sitio del que desea recoger este activo.',
            });
          }
        },
      });
  }

  obtenerScrappingLoop() {
    this.adminService
      .obtenerScrappingLoop()
      .pipe(take(1))
      .subscribe({
        next: (result) => {
          this.scrappingLoop = result;

          this.generarBotonesSuperiores();
        },
      });
  }

  generarBotonesSuperiores() {
    this.botonesAgregarActualizar = [
      {
        label: 'Agregar sitio de recogida',
        icono: 'bi bi-plus',
        funcion: () => this.agregarQuienes(),
      },
      {
        label: 'Actualizar',
        icono: 'bi bi-arrow-clockwise',
        funcion: () => this.obtenerQuienes(),
      },
      {
        label: this.scrappingLoop ? 'Iniciar recogida' : 'Detener recogida',
        tooltip:
          (this.scrappingLoop ? 'Activa' : 'Desactiva') +
          ' una recogida de noticias automática de los sitios previamente configurados, en un intervalo configurado.',
        icono: this.scrappingLoop ? 'bi bi-play-circle' : 'bi bi-stop-circle',
        funcion: () => this.iniciarDetenerScrapping(),
      },
    ];
  }

  iniciarDetenerScrapping() {
    this.loadingScrap = true;
    if (this.scrappingLoop) {
      this.adminService
        .IniciarScrap()
        .pipe(take(1))
        .subscribe({
          next: (result) => {
            this.loadingScrap = false;
            this.scrappingLoop = false;
            this.snackService.success({
              texto: 'Se ha iniciado la búsqueda automática.',
            });
            this.generarBotonesSuperiores();
          },
        });
    } else {
      this.adminService.DetenerScrap().subscribe((result) => {
        this.snackService.success({
          texto: 'La búsqueda automática se ha detenido.',
        });
        this.loadingScrap = false;
        this.scrappingLoop = true;
        this.generarBotonesSuperiores();
      });
    }
  }
}
