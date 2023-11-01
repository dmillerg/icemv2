import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { SnackService } from 'src/app/core/components/snack/service/snack.service';
import { DatePipe, DecimalPipe } from '@angular/common';
import {
  Formulario,
  Opciones,
} from 'src/app/core/components/form-generico/model/formulario.model';
import { Table } from 'src/app/core/components/table-generico/model/table.model';
import { Producto } from 'src/app/modules/productos/model/producto';
import { Boton } from 'src/app/core/components/boton-generico/model/boton.model';
import { addDetalle } from 'src/app/shared/state/actions/detalle.actions';
import { environment } from 'src/environments/environment';
import { Validators } from '@angular/forms';
import { CatalogoService } from 'src/app/core/services/catalogo.service';
import { take } from 'rxjs';
import { Modal } from 'src/app/core/components/modal-generico/model/modal.model';
import { ModalGenericoComponent } from 'src/app/core/components/modal-generico/modal-generico.component';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss'],
})
export class ProductoComponent implements OnInit {
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

  botonMostrar: Boton[] = [
    {
      icono: 'bi bi-eye',
      tooltip: 'Mostrar formulario',
      funcion: (value) => this.mostrarFormulario(value),
    },
  ];

  botonesDetalle: Boton[] = [
    {
      icono: 'bi bi-pencil',
      tooltip: 'Editar',
      cargando: () => this.loadingEditar,
      funcion: () =>
        this.formulario!.form?.valid
          ? true
          : this.formulario!.form?.markAllAsTouched(),
    },
    {
      icono: 'bi bi-check',
      tooltip: 'Activar',
      // disabled: () => this.deshabilitarActivar,
      // funcion: () => this.activar(),
    },
    {
      icono: 'bi bi-trash',
      tooltip: 'Eliminar',
      funcion: (value) => {
        console.log(value);

        this.eliminar(value);
      },
    },
  ];

  categorias: Opciones[] = [];

  loading: boolean = false;
  loadingEditar: boolean = false;

  constructor(
    private adminService: AdminService,
    private store: Store,
    private dialog: MatDialog,
    private snackService: SnackService,
    private datePipe: DatePipe,
    private numberPipe: DecimalPipe,
    private catalogoService: CatalogoService
  ) {}

  ngOnInit(): void {
    this.obtenerProductos();
    this.obtenerCategorias();
  }

  obtenerProductos() {
    this.generarTabla();
    this.adminService.getProducto().subscribe((result) => {
      if (Array.isArray(result)) this.generarTabla(result);
      else this.generarTabla([]);
    });
  }

  obtenerCategorias() {
    this.catalogoService
      .obtenerCategorias()
      .pipe(take(1))
      .subscribe({
        next: (result) => {
          this.categorias = result.map((e) => {
            return {
              codigo: e.id.toString(),
              nombre: e.nombre,
            };
          });
        },
      });
  }

  generarTabla(values?: Producto[]) {
    this.tabla = {
      columnas: [
        {
          tipo: 'texto',
          nombre: 'Título',
          campo: 'titulo',
        },
        {
          tipo: 'fecha',
          nombre: 'Fecha',
          campo: 'fecha',
        },
        {
          tipo: 'texto',
          nombre: 'Categoría',
          campo: 'categoria',
        },
        {
          tipo: 'texto',
          nombre: 'Activo',
          campo: 'activo',
        },
        {
          tipo: 'numero',
          nombre: 'Disponibilidad',
          campo: 'disponibilidad',
        },
      ],
      values: values ?? [],
      cargando: !values,
      acciones: this.botones,
      accionesTexto: 'Acciones',
    };
  }

  seleccionado(item: Producto) {
    if (item) {
      this.formulario = undefined;
      this.adminService.setFormulario(this.formulario!);
      const producto: Producto = item;
      // this.deshabilitarActivar = item.activo!;
      const imagenes = producto.imagen
        .split(',')
        .map(
          (e) =>
            environment.url_backend +
            `pictures/${producto.id}?tipo=productos&name=${e}`
        );
      this.store.dispatch(
        addDetalle({
          detalle: {
            titulo: producto.titulo,
            imagen: imagenes.shift(),
            imagenes: imagenes,
            textos: [
              {
                nombre: 'fecha creación',
                valor: this.datePipe
                  .transform(producto.fecha, 'dd-MM-yyyy')!
                  .toString(),
              },
              {
                nombre: 'Precio',
                valor:
                  '$ ' +
                  this.numberPipe
                    .transform(producto.precio, '0.0-2')!
                    .toString(),
              },
              {
                nombre: 'Disponibilidad',
                valor: producto.disponibilidad.toString(),
              },
              {
                nombre: 'Descripción',
                valor: producto.descripcion,
              },
              {
                nombre: 'Categoría',
                valor: producto.categoria.toString(),
              },
              {
                nombre: 'Usos',
                valor: producto.usos,
              },
              {
                nombre: 'Especificaciones',
                valor: producto.especificaciones,
              },
              {
                nombre: 'Garantía',
                valor: producto.garantia,
              },
            ],
            botones: [...this.botonMostrar],
            data: producto,
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

  mostrarFormulario(producto?: Producto) {
    this.generarFormulario(producto);
    this.adminService.setFormulario(this.formulario!);
    this.store.dispatch(
      addDetalle({
        detalle: {
          titulo: 'Editar Producto',
          subtitulo: 'Puede agregar un máximo de 10 fotos por producto',
          botones: this.botonesDetalle,
          data: producto,
        },
      })
    );
  }

  generarFormulario(producto?: Producto) {
    this.formulario = {
      controles: [
        {
          tipo: 'text',
          nombre: 'Título',
          control: 'titulo',
          valor: producto ? producto.titulo : '',
          validator: [Validators.required],
        },
        {
          tipo: 'select',
          nombre: 'Categoría',
          control: 'categoria',
          valor: producto ? producto.categoria.toString() : '',
          opciones: this.categorias,
          validator: [Validators.required],
        },
        {
          tipo: 'number',
          nombre: 'Precio',
          control: 'precio',
          valor: producto ? producto.precio : 0,
          validator: [Validators.required, Validators.min(1)],
        },
        {
          tipo: 'number',
          nombre: 'Disponibilidad',
          control: 'disponibilidad',
          valor: producto ? producto.disponibilidad : 0,
          validator: [Validators.required],
        },
        {
          tipo: 'textarea',
          nombre: 'Descripción',
          control: 'descripcion',
          valor: producto ? producto.descripcion : '',
        },
        {
          tipo: 'textarea',
          nombre: 'Usos',
          control: 'usos',
          valor: producto ? producto.usos : '',
        },
        {
          tipo: 'textarea',
          nombre: 'Especificaciones',
          control: 'especificaciones',
          valor: producto ? producto.especificaciones : '',
        },
        {
          tipo: 'textarea',
          nombre: 'Garantía',
          control: 'garantia',
          valor: producto ? producto.garantia : '',
        },
        {
          tipo: 'text',
          nombre: 'ID',
          control: 'id',
          valor: producto ? producto.id : '',
        },
      ],
      columnas: [1, 1, 2, 1, 1, 1, 1],
      autofixed: true,
      imagen: true,
      maximoImagenes: 10,
      imagenes: producto
        ? producto.imagen
            .split(',')
            .map(
              (e) =>
                environment.url_backend +
                `pictures/${producto.id}?tipo=productos&name=${e}`
            )
        : [],
    };
  }

  eliminar(producto: Producto) {
    let ref: any;
    const modal: Modal = {
      texto: `Desea eliminar el producto "${producto.titulo}", esta acción no tiene vuelta atrás?`,
      botones: [
        {
          label: 'Aceptar',
          icono: 'bi bi-check',
          funcion: () => this.eliminarProducto(producto.id, ref),
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

  eliminarProducto(id: number, ref: DialogRef) {
    this.loading = true;
    this.adminService
      .deleteUsuarios(id)
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          this.loading = false;
          this.obtenerProductos();
          setTimeout(() => ref.close(), 300);
        },
        error: () => (this.loading = false),
      });
  }

  agregarEliminarProducto(acction: boolean) {
    const producto: Producto = this.formulario?.form?.getRawValue();
    this.formulario!.formDataImage!.append('id', producto.id.toString());
    this.formulario!.formDataImage!.append(
      'titulo',
      producto.titulo.toString()
    );
    this.formulario!.formDataImage!.append(
      'descripcion',
      producto.descripcion.toString()
    );
    this.formulario!.formDataImage!.append(
      'categoria',
      producto.categoria.toString()
    );
    this.formulario!.formDataImage!.append('usos', producto.usos.toString());
    this.formulario!.formDataImage!.append(
      'especificaciones',
      producto.especificaciones.toString()
    );
    this.formulario!.formDataImage!.append(
      'garantia',
      producto.garantia.toString()
    );
    this.formulario!.formDataImage!.append(
      'precio',
      producto.precio.toString()
    );
    this.formulario!.formDataImage!.append(
      'disponibilidad',
      producto.disponibilidad.toString()
    );
    if(this.formulario?.form?this.formulario?.form.valid:this.formulario?.form)
    this.formulario!.formDataImage!.append(
      'imagen',
      producto.imagen.toString()
    );
    this.adminService
      .addProducto(this.formulario?.formDataImage!)
      .pipe(take(1))
      .subscribe({
        next: (result) => {
          this.snackService.success({
            texto: 'producto actualizado correctamente.',
          });
        },
        error: (error) => {},
      });
  }
}
