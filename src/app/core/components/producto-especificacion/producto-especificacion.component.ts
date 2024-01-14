import { Component, Input, OnInit } from '@angular/core';
import { Producto } from '../../../modules/productos/model/producto';
import { ProductoService } from '../../../modules/productos/services/producto.service';
import { Observable, take } from 'rxjs';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CollapseComponent } from '../collapse/collapse.component';
import { Collapse } from '../collapse/model/collapse.model';
import { Store } from '@ngrx/store';
import { selectUsuario } from 'src/app/shared/state/selectors/usuario.selector';
import { ConfiguracionService } from '../../services/configuracion.service';
import { addCarrito } from 'src/app/shared/state/actions/carrito.action';

interface Estrellas {
  cantidad: number;
  promedio?: number;
  numero: number;
}

@Component({
  selector: 'app-producto-especificacion',
  templateUrl: './producto-especificacion.component.html',
  styleUrls: ['./producto-especificacion.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CollapseComponent],
})
export class ProductoEspecificacionComponent implements OnInit {
  @Input() producto?: Producto;
  @Input() categoria?: string;
  allEstrellas = 0;
  promedio = 0;
  form!: FormGroup;
  estrellas: Estrellas[] = [];
  collapseEspecificaciones!: Collapse;
  collapseUsos!: Collapse;
  collapseGarantias!: Collapse;
  usuario$: Observable<any> = new Observable();

  constructor(
    private productoService: ProductoService,
    private fb: FormBuilder,
    private store: Store,
    private configuracionService: ConfiguracionService
  ) {
    this.usuario$ = store.select(selectUsuario);
  }

  ngOnInit(): void {
    this.rellenarCollapses();
    this.loadPost();
    this.form = this.fb.group({
      cantidad: [
        { value: 0, disabled: true },
        [
          Validators.required,
          Validators.min(0),
          Validators.max(this.producto!.disponibilidad),
        ],
      ],
    });
  }

  rellenarCollapses() {
    this.collapseEspecificaciones = {
      id: 'Especificaciones',
      nombre: 'Especificaciones',
      textoVacio: 'No hay especificaciones definidas',
      texto: this.producto!.especificaciones,
      tipoContenedor: 'texto',
    };
    this.collapseUsos = {
      id: 'Usos',
      nombre: 'Usos',
      textoVacio: 'No hay usos definidas',
      texto: this.producto!.usos,
      tipoContenedor: 'texto',
    };
    this.collapseGarantias = {
      id: 'Garantía',
      nombre: 'Garantía',
      textoVacio: 'No hay garantía definidas',
      texto: this.producto!.garantia,
      tipoContenedor: 'texto',
    };
  }

  cambiarVista(position: number) {
    if (this.producto!.imagen != this.producto!.imagenes![position]) {
      let medio = this.producto!.imagen;
      this.producto!.imagen = this.producto!.imagenes![position];
      this.producto!.imagenes![position] = medio;
    }
  }

  loadPost() {
    this.estrellas = [];
    this.allEstrellas = 0;
    this.promedio = 0;

    this.productoService
      .getPosts(this.producto!.id)
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          if (response.length > 0) {
            this.estrellas.push({
              cantidad: response.filter((e) => e.calificacion == 5).length,
              numero: 5,
            });
            this.estrellas.push({
              cantidad: response.filter((e) => e.calificacion == 4).length,
              numero: 4,
            });
            this.estrellas.push({
              cantidad: response.filter((e) => e.calificacion == 3).length,
              numero: 3,
            });
            this.estrellas.push({
              cantidad: response.filter((e) => e.calificacion == 2).length,
              numero: 2,
            });
            this.estrellas.push({
              cantidad: response.filter((e) => e.calificacion == 1).length,
              numero: 1,
            });

            this.allEstrellas = response.length;
            this.promedio =
              Math.round(
                ((this.estrellas[0].cantidad * 5 +
                  this.estrellas[1].cantidad * 4 +
                  this.estrellas[2].cantidad * 3 +
                  this.estrellas[3].cantidad * 2 +
                  this.estrellas[4].cantidad * 1) /
                  this.allEstrellas) *
                  10
              ) / 10;
            this.estrellas.forEach((e) => {
              e.promedio = isNaN((e.cantidad / this.allEstrellas) * 100)
                ? 100
                : (e.cantidad / this.allEstrellas) * 100;
            });
          } else {
            this.estrellas = [
              { numero: 5, cantidad: 0 },
              { numero: 4, cantidad: 0 },
              { numero: 3, cantidad: 0 },
              { numero: 2, cantidad: 0 },
              { numero: 1, cantidad: 0 },
            ];
          }
        },
      });
  }

  agregarQuitar(accion: boolean) {
    const cantidad = this.form.getRawValue().cantidad;
    if (
      (accion && this.producto!.disponibilidad > cantidad) ||
      (!accion && cantidad > 0)
    )
      this.form.get('cantidad')?.setValue(accion ? cantidad + 1 : cantidad - 1);
  }

  agregarCarrito() {
    let formData = new FormData();
    formData.append('user_id', JSON.parse(localStorage.getItem('usuario')!).id);
    formData.append('producto_id', this.producto!.id.toString());
    formData.append('cantidad', this.form.get('cantidad')?.value.toString());
    formData.append('precio', this.producto!.precio.toString());
    this.configuracionService
      .addCarrito(formData)
      .pipe(take(1))
      .subscribe({
        next: (result: any) => {
          this.producto!.disponibilidad -= this.form.get('cantidad')?.value;
          this.store.dispatch(
            addCarrito({
              carritos: {
                id: result.insertId,
                producto_id: this.producto?.id,
                cantidad: this.form.get('cantidad')?.value,
                precio: this.producto!.precio.toString(),
                user_id: JSON.parse(localStorage.getItem('usuario')!).id,
                fecha: new Date(),
              },
            })
          );

          // this.loadEspecification();
          // this.configuracionService
          //   .getCarrito(JSON.parse(localStorage.getItem('usuario')!).id)
          //   .pipe(take(1))
          //   .subscribe((result) => {
          //   });
        },
      });
  }
}
