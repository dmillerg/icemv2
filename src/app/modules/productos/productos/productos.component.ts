import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { take } from 'rxjs';
import { ProductoService } from '../services/producto.service';
import { Producto } from '../model/producto';
import { Card } from 'src/app/core/models/card.model';
import { CatalogoService } from 'src/app/core/services/catalogo.service';
import { Categoria } from 'src/app/core/models/categoria.model';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
})
export class ProductosComponent implements OnInit {
  producto?: Producto;
  productos: Producto[] = [];
  productosCard: Card[] = [];
  categorias: Categoria[] = [];
  categoria?: Categoria;

  constructor(
    private productoService: ProductoService,
    private catalogoService: CatalogoService
  ) {}

  ngOnInit(): void {
    this.loadCategorias();
  }

  obtenerProducto() {
    this.productoService
      .getProducto()
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          this.productos = response.map((e: Producto) =>
            this.obtenerImagenes(e)
          );
          this.producto = this.productos.shift();
          this.generarProductosCard();
        },
      });
  }

  generarProductosCard() {
    this.productosCard = this.productos.map((e: Producto, i: number) => {
      return {
        titulo: e.titulo,
        descripcion: e.descripcion,
        fecha: new Date(e.fecha),
        imagen: e.imagen,
        precio: `${e.precio}`,
        classTitulo: 'line-clamp-2 text-icem-500 dark:text-white',
        classDescripcion: 'line-clamp-3',
        botones: [
          {
            icono: 'bi bi-check',
            label: 'Ver mas',
            class:
              'w-full bg-icem-500 hover:bg-icem-400 text-white duration-300 py-2 mt-2 rounded',
            funcion: () => {
              this.categoria = this.categorias.filter(
                (cat) => cat.id === e.categoria
              )[0];
              const prod = this.producto;
              this.producto = e;
              this.productos[i]=prod!;
              this.generarProductosCard();
            },
          },
        ],
      };
    });
  }

  obtenerImagenes(producto: Producto) {
    let imagen: string = '';
    let imagenes: string[] = [];
    producto.imagen.split(',').forEach((e, i) => {
      if (i === 0) {
        imagen =
          environment.url_backend + `pictures/${producto!.id}?tipo=productos`;
      } else {
        imagenes!.push(
          environment.url_backend +
            `pictures/${producto!.id}?tipo=productos&name=${e}`
        );
      }
    });
    producto.imagen = imagen;
    producto.imagenes = imagenes;
    return producto;
  }

  loadCategorias() {
    this.catalogoService.obtenerCategorias().subscribe((result) => {
      this.categorias.push({
        id: -1,
        nombre: 'Todos',
        descripcion: 'Esta categoría contiene a todos los productos',
      });
      this.categorias = [...result];
      this.categoria = result[0];
      this.obtenerProducto();
      // this.rellenarCategorias();
    });
  }
}
