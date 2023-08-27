import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/core/models/card.model';
import { ProductoService } from '../../productos/services/producto.service';
import { Producto } from '../../productos/model/producto';
import { environment } from 'src/environments/environment';
import { Boton } from '../../../core/components/boton-generico/model/boton.model';


@Component({
  selector: 'app-section-productos',
  templateUrl: './section-productos.component.html',
  styleUrls: ['./section-productos.component.scss'],
})
export class SectionProductosComponent implements OnInit {
  cards: Card[] = [];
  productos_recientes: any[] = [];

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.obtenerProducto();
  }

  obtenerProducto() {
    this.productoService.getProducto(4, -1, -1, true).subscribe((result) => {
      console.log(result);

      if (result.length > 0) {
        var direccion = false;
        var cont = 1;
        result.forEach((item) => {
          if (item.activo) {
            this.productos_recientes.push({
              id: item.id,
              titulo: item.titulo,
              descripcion: item.descripcion,
              imagen: item.imagen,
              fecha: item.fecha,
              categoria: item.categoria,
              usos: item.usos,
              especificaciones: item.especificaciones,
              garantia: item.garantia,
              precio: item.precio,
              disponibilidad: item.disponibilidad,
              direccion: direccion,
              cont: cont,
            });
            this.cargarDatos();
            direccion = !direccion;
            cont++;
          }
        });
      } else this.productos_recientes = [];
    });
  }

  cargarDatos() {
    this.cards = this.productos_recientes.map((e: Producto) => {
      return {
        titulo: e.titulo,
        descripcion: e.descripcion,
        fecha: new Date(e.fecha),
        precio: `${e.precio}`,
        imagen: environment.url_backend+`pictures/${e.id}?tipo=productos`,
        classTitulo: 'line-clamp-2 text-icem-500 dark:text-white',
        classDescripcion: 'line-clamp-3',
        botones: [
          {icono: 'bi bi-check', label: 'Ver mas', class: 'w-full'}
        ]
      };
    });
  }
}
