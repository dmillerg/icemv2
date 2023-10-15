import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Buscar } from '../model/buscar';

@Injectable({
  providedIn: 'root'
})
export class BuscarService {
  url: string = environment.url_backend + 'apis/';

  constructor(
    private http: HttpClient,
  ) {}

/**
   * Busca por un titulo los productos
   * @param titulo del producto a buscar
   * @returns
   */
searchProductos(titulo: any): Observable<Buscar> {
    let direccion = this.url + 'searchProductos/' + titulo;
    const headers = { 'content-type': 'application/json' };
    return this.http.get<Buscar>(direccion);
  }

  /**
   * Busca por un titulo las noticias
   * @param titulo de la noticias a buscar
   * @returns
   */
  searchNoticias(titulo: any): Observable<Buscar> {
    let direccion = this.url + 'searchNoticias/' + titulo;
    const headers = { 'content-type': 'application/json' };
    return this.http.get<Buscar>(direccion);
  }

  /**
   * Busca por un titulo los desarrollos
   * @param titulo del desarrollo a buscar
   * @returns
   */
  searchDesarrollos(titulo: any): Observable<Buscar> {
    let direccion = this.url + 'searchDesarrollos/' + titulo;
    const headers = { 'content-type': 'application/json' };
    return this.http.get<Buscar>(direccion);
  }
}