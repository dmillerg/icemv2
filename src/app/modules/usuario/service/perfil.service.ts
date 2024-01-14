import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Carrito } from 'src/app/core/models/carrito.model';
import { Pedido } from 'src/app/core/models/pedido.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PerfilService {
  url: string = environment.url_backend + 'apis/';

  constructor(private http: HttpClient) {}

  /**
   * Calcula el tiempo transcurrido desde una fecha hasta la actualidad
   * @param fecha hasta la cual calcular el tiempo
   * @returns
   */
  calcularTiempo(fecha: string = '') {
    let date = new Date(fecha);
    let resultDate =
      date.getFullYear() +
      '/' +
      (date.getMonth() + 1) +
      '/' +
      date.getDate() +
      ' ' +
      date.getHours() +
      ':' +
      date.getMinutes() +
      ':' +
      date.getSeconds();
    let direccion = this.url + 'all';
    let query = `SELECT TIMESTAMPDIFF(DAY,'${resultDate}',NOW()) as tiempo`;
    return this.http.post<any>(direccion, {
      query: query,
      token: JSON.parse(localStorage.getItem('usuario')!).token,
    });
  }

  // /**
  //  * Obtiene todos los pedidos de los usuarios
  //  * @param user_id id del usuario
  //  * @returns 
  //  */
  // getPedidos(user_id: number = -1): Observable<Pedido[]> {
  //   let direccion = this.url + 'pedidos/' + user_id;
  //   const headers = { 'content-type': 'application/json' };
  //   const params = {
  //     token: JSON.parse(localStorage.getItem('usuario')!).token,
  //   };
  //   return this.http.get<Pedido[]>(direccion, { headers: headers, params: params });
  // }

  /**
   * Devuelve todos los productos en el carrito
   * @param user_id del usuario autenticado
   * @returns 
   */
  getCarrito(user_id: number = -1): Observable<Carrito[]> {
    let direccion = this.url + 'carrito/' + user_id;
    const headers = { 'content-type': 'application/json' };
    const params = {
      token: JSON.parse(localStorage.getItem('usuario')!).token,
    };
    return this.http.get<Carrito[]>(direccion, { headers: headers, params: params });
  }

   /**
  * Actualiza el usuarios
  * @param formData datos actualizados del usuarios
  * @param id id del usuarios a actualizar
  * @returns
  */
   updateUsuarioWithOutPass(formData: FormData, id: number) {
    const headers = { 'content-type': 'application/json' };
    formData.append('token', JSON.parse(localStorage.getItem('usuario')!).token);
    let direccion = this.url + 'usuario/' + id;
    return this.http.post(direccion, formData);
  }

  /**
   * Permite a un usuario cambiar la contrasenna 
   * @param formData datos para la nueva contrasenna
   * @returns 
   */
  changePassword(formData: FormData): Observable<any> {
    formData.append('token', JSON.parse(localStorage.getItem('usuario')!).token);
    let direccion = this.url + 'changepass/'
    return this.http.post<any>(direccion, formData);
  }

  /**
   * Obtiene todos los pedidos de los usuarios
   * @param user_id id del usuario
   * @returns 
   */
  getPedidos(user_id: number = -1): Observable<Pedido[]> {
    let direccion = this.url + 'pedidos/' + user_id;
    const headers = { 'content-type': 'application/json' };
    const params = {
      token: JSON.parse(localStorage.getItem('usuario')!).token,
    };
    return this.http.get<Pedido[]>(direccion, { headers: headers, params: params });
  }

  /**
   * Agrega un pedido
   * @param formData datos de un pedido
   * @returns 
   */
  addPedido(formData: FormData) {
    formData.append('token', JSON.parse(localStorage.getItem('usuario')!).token);
    let direccion = this.url + 'pedidos';
    return this.http.post(direccion, formData);
  }

  /**
 * Elimina un pedido
 * @param id pedido a eliminar
 * @returns
 */
  deletePedido(id: number = -1) {
    let direccion = this.url + 'pedidos/' + id.toString();
    const headers = { 'content-type': 'application/json' };
    const params = {
      token: JSON.parse(localStorage.getItem('usuario')!).token,
    };
    return this.http.delete(direccion, { headers: headers, params: params });
  }

  /**
   * Cambia el estado actula del pedido
   * @param formData Estado del pedido
   * @param id_pedido del pedido
   * @returns 
   */
  cambiarEstadoPedido(formData: FormData, id_pedido: number = -1) {
    formData.append('token', JSON.parse(localStorage.getItem('usuario')!).token);
    let direccion = this.url + 'cambiarestadopedidos/' + id_pedido;
    return this.http.put(direccion, formData);
  }
}
