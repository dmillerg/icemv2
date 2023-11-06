import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { Store } from '@ngrx/store';
import { Formulario } from 'src/app/core/components/form-generico/model/formulario.model';
import { Table } from 'src/app/core/components/table-generico/model/table.model';
import { Boton } from 'src/app/core/components/boton-generico/model/boton.model';
import { AdminService } from '../../service/admin.service';
import { MatDialog } from '@angular/material/dialog';
import { SnackService } from 'src/app/core/components/snack/service/snack.service';
import {
  addDetalle,
  deleteAllDetalle,
} from 'src/app/shared/state/actions/detalle.actions';
import { Validators } from '@angular/forms';
import { Configuracion } from 'src/app/core/models/configuracion.model';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss'],
})
export class ConfiguracionComponent implements OnInit {
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
  ];

  botonesDetalle: Boton[] = [
    {
      icono: 'bi bi-pencil',
      tooltip: 'Editar',
      cargando: () => this.loadingEditar,
      funcion: () =>
        this.formulario!.form?.valid
          ? this.editar()
          : this.formulario!.form?.markAllAsTouched(),
    },
  ];

  botonesAgregarActualizar: Boton[] = [
    {
      label: 'Actualizar',
      icono: 'bi bi-arrow-clockwise',
      funcion: () => this.obtenerConfiguraciones(),
    },
  ];

  loading: boolean = false;
  loadingEditar: boolean = false;

  constructor(
    private adminService: AdminService,
    private store: Store,
    private snackService: SnackService
  ) {}

  ngOnInit(): void {
    this.obtenerConfiguraciones();
  }

  obtenerConfiguraciones() {
    this.generarTabla([]);
    this.adminService
      .getConfiguraciones()
      .pipe(take(1))
      .subscribe({
        next: (result) => {
          this.generarTabla(
            result.map((e) => {
              e.config = e.config / 60000;
              return e;
            })
          );
        },
      });
  }

  generarTabla(values?: Configuracion[]) {
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
        {
          tipo: 'texto',
          nombre: 'Configuración',
          campo: 'config',
        },
      ],
      values: values ?? [],
      cargando: !values,
      acciones: this.botones,
      accionesTexto: 'Acciones',
      textoVacio: 'No hay configuraciones que gestionar',
    };
  }

  seleccionado(item: Configuracion) {
    if (item) {
      this.generarFormulario(item);
      this.adminService.setFormulario(this.formulario!);
      const configuracion: Configuracion = item;
      this.store.dispatch(
        addDetalle({
          detalle: {
            titulo: 'Modificar configuración',
            subtitulo:
              'Tenga en cuenta que el valor que establece esta representado en minutos.',
            botones: this.botonesDetalle,
            data: configuracion,
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

  generarFormulario(item: Configuracion) {
    this.formulario = {
      controles: [
        {
          tipo: 'text',
          nombre: 'Nombre',
          control: 'nombre',
          disabled: true,
          valor: item.nombre,
          validator: [Validators.required],
        },
        {
          tipo: 'textarea',
          nombre: 'Descripción',
          control: 'descripcion',
          disabled: true,
          valor: item.descripcion,
          validator: [Validators.required],
        },
        {
          tipo: 'number',
          nombre: 'Configuración',
          control: 'config',
          valor: item.config,
          validator: [Validators.required],
        },
        {
          tipo: 'text',
          nombre: 'id',
          control: 'id',
          valor: item ? item.id : '',
        },
      ],
      columnas: [1, 1, 1],
    };
  }

  editar() {
    this.loadingEditar = true;
    const data = this.formulario?.form?.getRawValue();
    const formData = this.formulario?.imagen?.formDataImage ?? new FormData();
    formData.append('id', data.id.toString());
    formData.append('nombre', data.nombre.toString());
    formData.append('descripcion', data.descripcion.toString());
    formData.append('config', data.config.toString());

    this.adminService.saveConfigs(formData).subscribe({
      next: () => {
        this.loadingEditar = false;
        this.obtenerConfiguraciones();
        this.store.dispatch(deleteAllDetalle());
        this.snackService.success({
          texto: 'La configuración se ha editado correctamente.',
        });
      },
      error: () => {
        this.loadingEditar = false;
      },
    });
  }
}
