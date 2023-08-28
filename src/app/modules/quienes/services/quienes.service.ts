import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Quienes } from '../model/quienes';

@Injectable({
  providedIn: 'root'
})
export class QuienesService {
  url: string = environment.url_backend + 'apis/';

  constructor(
    private http: HttpClient,
  ) { }

  /**
   * Obtener las personas en base de datos
   * @param limit cantidad de personas a devolver
   * @returns
   */
  getQuienes(limit: number = 0): Observable<Quienes[]> {
    const headers = { 'content-type': 'application/json' };
    let direccion = this.url + 'quienes/' + limit.toString();
    return this.http.get<Quienes[]>(direccion, { headers: headers });
  }

  /**
   * Actualiza la persona
   * @param formData datos actualizados de la persona
   * @param id id de la persona a actualizar
   * @returns
   */
  // updateQuienes(formData, id) {
  //   const headers = { 'content-type': 'application/json' };
  //   formData.append('token', this.storage.retrieve('usuario').token);
  //   let direccion = this.url + 'quienes/' + id;
  //   return this.http.post(direccion, formData);
  // }

  /**
   * Guarda una nueva persona
   * @param formData datos de la persona
   * @returns
   */
  // addQuienes(formData) {
  //   const headers = { 'content-type': 'application/json' };
  //   formData.append('token', this.storage.retrieve('usuario').token);
  //   let direccion = this.url + 'saveQuienes';
  //   return this.http.post(direccion, formData);
  // }

  /**
   * Elimina una persona
   * @param id persona a eliminar
   * @returns
   */
  // deleteQuienes(id: number = -1) {
  //   let direccion = this.url + 'deleteQuienes/' + id.toString();
  //   const headers = { 'content-type': 'application/json' };
  //   const params = {
  //     token: this.storage.retrieve('usuario').token,
  //   };
  //   return this.http.delete(direccion, { headers: headers, params: params });
  // }

  /**
   * Obtiene la foto de la persona
   * @param id persona en la db
   * @returns
   */
  getQuienesFoto(id: any) {
    let direccion = this.url + 'quienFoto/' + id.toString();
    return this.http.get(direccion);
  }
}
