import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from '../models/categoria.model';

@Injectable({
  providedIn: 'root'
})
export class CatalogoService {
  url: string = environment.url_backend + 'apis/';

  constructor(
    private http: HttpClient,
  ) {}

  
  /**
   * Obtener las categorias de un producto
   * @returns
   */
  obtenerCategorias(): Observable<Categoria[]> {
    let direccion = this.url + 'categorias/';
    return this.http.get<Categoria[]>(direccion);
  }
}
