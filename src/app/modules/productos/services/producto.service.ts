import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../model/producto';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Posts } from '../model/posts';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  url: string = environment.url_backend + 'apis/';

  constructor(private http: HttpClient) {}

  getProducto(
    limit: number = 0,
    categoria: number = -1,
    excluir: number = -1,
    activo: boolean = false
  ): Observable<Producto[]> {
    const headers = { 'content-type': 'application/json' };
    const params = {
      categoria: categoria,
      excluir: excluir,
      activo: activo,
    };
    let direccion = this.url + 'productos/' + limit.toString();
    return this.http.get<Producto[]>(direccion, {
      headers: headers,
      params: params,
    });
  }

  getPosts(id_producto: number = -1): Observable<Posts[]> {
    const headers = { 'content-type': 'application/json' };
    let direccion = this.url + 'posts/' + id_producto.toString();
    return this.http.get<Posts[]>(direccion, { headers: headers });
  }
}
