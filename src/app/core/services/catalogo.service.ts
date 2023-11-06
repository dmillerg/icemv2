import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from '../models/categoria.model';

@Injectable({
  providedIn: 'root',
})
export class CatalogoService {
  url: string = environment.url_backend + 'apis/';

  constructor(private http: HttpClient) {}

  /**
   * Obtener las categorias de un producto
   * @returns
   */
  obtenerCategorias(): Observable<Categoria[]> {
    let direccion = this.url + 'categorias/';
    return this.http.get<Categoria[]>(direccion);
  }

  /**
   * Obtener noticias de scrapping
   * @returns
   */
  cargaNoticias(): Observable<any[]> {
    let direccion = this.url + 'scrapping';
    return this.http.get<any[]>(direccion);
  }

  /**
   * Envia un correo desde la cuenta oficial de ICEM
   * @param correo del remitente
   * @param asunto del correo
   * @param mensaje del correo
   * @param infoadd algo mas que se quiera agregar
   * @param tipo de correo ejemplo: reset o link
   * @param link del correo
   * @param url a redireccionar
   * @returns
   */
  sendEmail(
    correo: string,
    asunto: string = '',
    mensaje: string = '',
    infoadd: string = '',
    tipo: string = '',
    link: string = '',
    url: string = ''
  ) {
    let direccion = this.url + 'send';
    const formData = new FormData();
    formData.append('correo', correo);
    formData.append('asunto', asunto);
    formData.append('mensaje', mensaje);
    formData.append('infoadd', infoadd);
    formData.append('tipo', tipo);
    formData.append('link', link);
    formData.append('url', url);
    return this.http.post(direccion, formData);
  }

  /**
   * comprueba que el link es valido y existe
   * @param link a comprobar
   * @returns
   */
  checkLinks(link: string = '') {
    let direccion = this.url + 'links/';
    return this.http.post<any>(direccion, { link: link });
  }
}
