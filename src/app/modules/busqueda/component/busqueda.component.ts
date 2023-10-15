import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BuscarService } from '../services/busqueda.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.scss']
})
export class BusquedaComponent implements OnInit {
  busqueda: any[] = [];
  titulo: string = '';

  constructor(
    private buscarService: BuscarService
  ) { }

  ngOnInit(): void {
    this.loadProductos();

  }

  loadProductos() {
    this.busqueda = [];
    this.buscarService.searchProductos(this.titulo).subscribe({
      next: (response) => {
        response.result.forEach((element:any) => {
          this.busqueda.push({
            id: element.id,
            titulo: element.titulo,
            descripcion: element.descripcion,
            fecha: element.fecha,
            categoria: element.categoria,
            usos: element.usos,
            especificaciones: element.especificaciones,
            garantia: element.garantia,
            imagen: environment.url_backend + `pictures/${element.id}?tipo=productos`,
            tipo: 'productos'
          });
        })
        this.loadNoticias();
      }
    });
  }

  loadNoticias() {
    this.buscarService.searchNoticias(this.titulo).subscribe({
      next: (response) => {
        response.result.forEach((element:any) => {
          this.busqueda.push({
            id: element.id,
            titulo: element.titulo,
            descripcion: element.descripcion,
            fecha: element.fecha,
            tipo: 'noticias',
            imagen: element.fuente == 'ICEM' ? environment.url_backend + `pictures/${element.id}?tipo=noticias` : element.imagen,
          });
        });
        this.loadDesarrollos();
      }
    });
  }

  loadDesarrollos() {
    this.buscarService.searchDesarrollos(this.titulo).subscribe({
      next: (response) => {
        response.result.forEach((element:any) => {
          this.busqueda.push({
            id: element.id,
            titulo: element.titulo,
            descripcion: element.descripcion,
            fecha: element.fecha,
            imagen: environment.url_backend + `pictures/${element.id}?tipo=desarrollos`,
            tipo: 'desarrollos'
          });
        });
      }
    });
  }

  // verMas(item: any) {
  //   switch (item.tipo) {
  //     case 'productos':
  //       console.log('productos');
  //       this.storage.store('producto', item);
  //       this.router.navigate(['productos/']);
  //       break;
  //     case 'noticias':
  //       console.log('noticias');
  //       this.storage.store('noticia', item);
  //       this.router.navigate(['noticias/']);
  //       break;
  //     case 'desarrollos':
  //       console.log('desarrollos');
  //       this.storage.store('desarrollo', item);
  //       this.router.navigate(['nuevos/']);
  //       break;
  //   }
  // }

}
