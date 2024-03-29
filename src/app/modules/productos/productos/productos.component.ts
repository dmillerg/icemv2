import { Component, OnDestroy, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Subscription, take } from 'rxjs';
import { ProductoService } from '../services/producto.service';
import { Producto } from '../model/producto';
import { Card } from 'src/app/core/models/card.model';
import { CatalogoService } from 'src/app/core/services/catalogo.service';
import { Categoria } from 'src/app/core/models/categoria.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
})
export class ProductosComponent implements OnInit, OnDestroy {
  producto?: Producto;
  productos: Producto[] = [];
  productosCard: Card[] = [];
  categorias: Categoria[] = [];
  categoria?: Categoria;
  categoriaId: number = -1;
  sub$: Subscription = new Subscription();

  constructor(
    private productoService: ProductoService,
    private catalogoService: CatalogoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCategorias();
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }

  obtenerProducto() {
    this.productoService
      .getProducto()
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          this.productos = response
            .filter((e) => e.activo)
            .map((e: Producto) => this.obtenerImagenes(e));
          this.producto = this.productos.shift();

          this.generarProductosCard();
          this.obtenerRuta();
        },
      });
  }

  generarProductosCard() {
    console.log(this.categoriaId);

    this.productosCard = this.productos
      .filter((e) =>
        this.categoriaId !== -1 ? e.categoria === this.categoriaId : true
      )
      .map((e: Producto, i: number) => {
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
              label: 'Ver más',
              class:
                'w-full bg-icem-500 hover:bg-icem-400 text-white duration-300 py-2 mt-2 rounded daaniel',
              funcion: () => {
                this.router.navigate([`productos/${e.id}`]);
              },
            },
          ],
        };
      });
  }

  cambiarEspecificacion(i: number, e?: Producto) {
    if (e) {
      this.categoria = this.categorias.filter(
        (cat) => cat.id === e.categoria
      )[0];
      const prod = this.producto;
      this.producto = e;
      this.productos[i] = prod!;
      this.generarProductosCard();
    } else {
      this.producto = e;
      this.generarProductosCard();
    }
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
    });
  }

  obtenerRuta() {
    this.sub$ = this.route.params.subscribe((params: any) => {
      const id = +params['id'];
      const parametros = params.parametros;
      console.log(parametros);

      const prod =
        id !== -1
          ? this.productos.filter((e) => e.id === id)[0]
          : parametros
          ? this.productos.filter(
              (e) => e.categoria === JSON.parse(parametros).categoria
            )[0]
          : undefined;
      this.categoriaId = parametros ? JSON.parse(parametros).categoria : -1;
      if (prod) {
        this.cambiarEspecificacion(this.productos.indexOf(prod), prod);
      }
    });
  }

  cambiarCategoria(categoria?: Categoria) {
    if (categoria) {
      this.router.navigate([
        'productos/-1',
        {
          parametros: JSON.stringify({
            categoria: categoria.id,
          }),
        },
      ]);
    } else {
      this.router.navigate(['productos/-1']);
    }
  }
}
