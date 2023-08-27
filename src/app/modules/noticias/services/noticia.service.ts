import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Noticia } from '../model/noticias';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NoticiaService {

  url: string = environment.url_backend + 'apis/';

  constructor(
    private http: HttpClient,
  ) { }

   /**
   * Obtener las noticias en base de datos
   * @param limit cantidad de noticias a devolver
   * @returns
   */
   getNoticias(limit: number = 0, search: string = ''): Observable<Noticia[]> {
    console.log('ee');

    const headers = { 'content-type': 'application/json' };
    let direccion = this.url + 'noticias/' + limit.toString();
    return this.http.get<Noticia[]>(direccion, { headers: headers, params: { search: search } });
  }

  /**
   * Actualiza la noticia
   * @param formData datos actualizados de la noticia
   * @param id id de la noticia a actualizar
   * @returns
   */
  // updateNoticia(formData, id) {
  //   const headers = { 'content-type': 'application/json' };
  //   formData.append('token', this.storage.retrieve('usuario').token);
  //   let direccion = this.url + 'noticias/' + id;
  //   return this.http.post(direccion, formData);
  // }

  /**
   * Guarda una nueva noticia
   * @param formData datos de la noticia
   * @returns
   */
  // addNoticia(formData) {
  //   const headers = { 'content-type': 'application/json' };
  //   formData.append('token', this.storage.retrieve('usuario').token);
  //   let direccion = this.url + 'saveNoticia';
  //   return this.http.post(direccion, formData);
  // }

  /**
   * Elimina una noticia
   * @param id noticia a eliminar
   * @returns
   */
  // deleteNoticia(id) {
  //   let direccion = this.url + 'deleteNoticia/' + id.toString();
  //   const headers = { 'content-type': 'application/json' };
  //   const params = {
  //     token: this.storage.retrieve('usuario').token,
  //   };
  //   return this.http.delete(direccion, { headers: headers, params: params });
  // }

  /**
   * Obtener foto de una noticia
   * @param id id de la noticia
   * @returns
   */
  getNoticiaFoto(id: any) {
    let direccion = this.url + 'noticiaFoto/' + id.toString();
    return this.http.get(direccion);
  }
}
