import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Desarrollo } from '../model/desarrollo';

@Injectable({
  providedIn: 'root'
})
export class DesarrollosService {

  url: string = environment.url_backend + 'apis/';

  constructor(
    private http: HttpClient,
  ) { }

  /**
   * Obtener los desarrollos en base de datos
   * @param limit cantidad de desarrollos a devolver
   * @returns
   */
  getDesarrollos(limit: number = 0): Observable<Desarrollo[]> {
    const headers = { 'content-type': 'application/json' };
    let direccion = this.url + 'desarrollos/' + limit.toString();
    return this.http.get<Desarrollo[]>(direccion, { headers: headers });
  }

  // /**
  //  * Actualiza el desarrollo
  //  * @param formData datos actualizados del desarrollo
  //  * @param id id del desarrollo a actualizar
  //  * @returns
  //  */
  // updateDesarrollo(formData, id) {
  //   const headers = { 'content-type': 'application/json' };
  //   formData.append('token', this.storage.retrieve('usuario').token);
  //   let direccion = this.url + 'desarrollos/' + id;
  //   return this.http.post(direccion, formData);
  // }

  // /**
  //  * Guarda una nuevo desarrollo
  //  * @param formData datos del desarrollo
  //  * @returns
  //  */
  // addDesarrollos(formData) {
  //   const headers = { 'content-type': 'application/json' };
  //   formData.append('token', this.storage.retrieve('usuario').token);
  //   let direccion = this.url + 'saveDesarrollo';
  //   return this.http.post(direccion, formData);
  // }

  // /**
  //  * Elimina un desarrollo
  //  * @param id desarrollo a eliminar
  //  * @returns
  //  */
  // deleteDesarrollo(id) {
  //   let direccion = this.url + 'deleteDesarrollo/' + id.toString();
  //   const headers = { 'content-type': 'application/json' };
  //   const params = {
  //     token: this.storage.retrieve('usuario').token,
  //   };
  //   return this.http.delete(direccion, { headers: headers, params: params });
  // }

  // /**
  //  * Obtener foto de un desarrollo
  //  * @param id id del desarrollo
  //  * @returns
  //  */
  // getDesarrolloFoto(id) {
  //   let direccion = this.url + 'desarrolloFoto/' + id.toString();
  //   return this.http.get(direccion);
  // }
}
