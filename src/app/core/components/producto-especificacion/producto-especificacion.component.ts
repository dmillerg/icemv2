import { Component, Input, OnInit } from '@angular/core';
import { Producto } from '../../../modules/productos/model/producto';
import { ProductoService } from '../../../modules/productos/services/producto.service';
import { take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommonModule } from '@angular/common';

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
  imports: [CommonModule]
})
export class ProductoEspecificacionComponent implements OnInit {
  @Input() producto?: Producto;
  allEstrellas = 0;
  promedio = 0;

  estrellas: Estrellas[] = [];

  constructor(private productoService: ProductoService) {}
  ngOnInit(): void {
    this.obtenerProducto();
  }

  obtenerProducto() {
    this.productoService
      .getProducto()
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          const prod = response[0];
          let imagen: string = '';
          let imagenes: string[] = [];
          prod.imagen.split(',').forEach((e, i) => {
            if (i === 0) {
              imagen =
                environment.url_backend + `pictures/${prod!.id}?tipo=productos`;
            } else {
              imagenes!.push(
                environment.url_backend +
                  `pictures/${prod!.id}?tipo=productos&name=${e}`
              );
            }
          });
          this.producto = prod;
          this.loadPost();
          this.producto.imagen = imagen;
          this.producto.imagenes = imagenes;
        },
      });
  }

  collapse(id: string) {
    let collap = document.getElementById(id.toString());
    collap!.classList.toggle('active');
    let content = document.getElementById(id + 'content');
    content!.classList.toggle('active');
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
          }
        },
      });
  }
}
