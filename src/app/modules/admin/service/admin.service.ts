import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Formulario } from 'src/app/core/components/form-generico/model/formulario.model';
import { Usuario } from 'src/app/core/models/usuario.model';
import { environment } from 'src/environments/environment';
import { Producto } from '../../productos/model/producto';
import { Desarrollo } from '../../desarrollo/model/desarrollo';
import { Noticia } from '../../noticias/model/noticias';
import { Quienes } from '../../quienes/model/quienes';
import { Pedido } from 'src/app/core/models/pedido.model';
import { Comentario } from '../model/comentario.model';
import { Recogida } from '../model/recogida.model';
import { Mensaje } from '../model/pregunta.model';
import { Venta } from '../model/venta.model';
import { Configuracion } from 'src/app/core/models/configuracion.model';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  url: string = environment.url_backend + 'apis/';
  private formulario$ = new EventEmitter<Formulario | undefined>();

  constructor(private http: HttpClient) {}

  setFormulario(formulario: Formulario) {
    this.formulario$.next(formulario);
  }

  getFormulario() {
    return this.formulario$;
  }

  /**
   * Obtener los usuarios en base de datos
   * @param limit cantidad de usuarios a devolver
   * @returns
   */
  getUsuarios(limit: number = 0): Observable<Usuario[]> {
    const headers = { 'content-type': 'application/json' };
    let direccion = this.url + 'usuarios/' + limit.toString();
    return this.http.get<Usuario[]>(direccion, { headers: headers });
  }

  /**
   * Verifica que el usuario este online
   * @param id del usuario
   * @returns
   */
  getUserOnlineByID(id: number): Observable<any> {
    let direccion = this.url + 'useronline/' + id.toString();
    const headers = { 'content-type': 'application/json' };
    return this.http.get(direccion);
  }

  /**
   * Elimina un usuario
   * @param id usuario a eliminar
   * @returns
   */
  deleteUsuarios(id: number) {
    let direccion = this.url + 'deleteUsuario/' + id.toString();
    const headers = { 'content-type': 'application/json' };
    const params = {
      token: JSON.parse(localStorage.getItem('usuario')!).token,
    };
    return this.http.delete(direccion, { headers: headers, params: params });
  }

  /**
   * Actualiza el usuarios
   * @param formData datos actualizados del usuarios
   * @param id id del usuarios a actualizar
   * @returns
   */
  updateUsuarioWithOutPass(formData: FormData, id: number) {
    const headers = { 'content-type': 'application/json' };
    formData.append(
      'token',
      JSON.parse(localStorage.getItem('usuario')!).token
    );
    let direccion = this.url + 'usuario/' + id;
    return this.http.post(direccion, formData);
  }

  /**
   * Activa la cuenta de un usuario
   * @param id del usuario
   * @returns
   */
  activarUsuario(id: number) {
    let direccion = this.url + 'activarUsuario/' + id.toString();
    return this.http.get<any>(direccion);
  }

  /**
   * Resetea la contrasenna siendo admin ded un usuario
   * @param formData datos para reiniciar la contrase;a
   * @returns
   */
  adminResetPassword(formData: FormData) {
    formData.append(
      'token',
      JSON.parse(localStorage.getItem('usuario')!).token
    );
    let direccion = this.url + 'adminreset/';
    return this.http.post(direccion, formData);
  }

  /**
   * Guarda una nuevo usuarios
   * @param formData datos del usuarios
   * @returns
   */
  addUsuarios(formData: FormData) {
    const headers = { 'content-type': 'application/json' };
    let direccion = this.url + 'saveUsuario';
    return this.http.post<any>(direccion, formData);
  }

  /**
   * Obtener los productos en base de datos
   * @param limit cantidad de productos a devolver
   * @returns
   */
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

  /**
   * Actualiza el producto
   * @param formData datos actualizados del producto
   * @param id id del producto a actualizar
   * @returns
   */
  updateProducto(formData: FormData, id: number) {
    const headers = { 'content-type': 'application/json' };
    formData.append(
      'token',
      JSON.parse(localStorage.getItem('usuario')!).token
    );
    let direccion = this.url + 'productos/' + id;
    return this.http.post(direccion, formData);
  }

  /**
   * Guarda un nuevo producto
   * @param formData datos del producto
   * @returns
   */
  addProducto(formData: FormData) {
    const headers = { 'content-type': 'application/json' };
    formData.append(
      'token',
      JSON.parse(localStorage.getItem('usuario')!).token
    );
    let direccion = this.url + 'saveProducto';
    return this.http.post(direccion, formData);
  }

  /**
   * Activa o desactiva el producto para mostrar a la venta
   * @param id del producto
   * @param activo estado del producto
   * @returns
   */
  activarProducto(id: number = -1, activo: boolean = false) {
    let direccion = this.url + 'activarproducto/' + id.toString();
    const headers = { 'content-type': 'application/json' };
    const params = {
      token: JSON.parse(localStorage.getItem('usuario')!).token,
      activo: activo,
    };
    return this.http.get(direccion, { headers: headers, params: params });
  }

  /**
   * Elimina un producto
   * @param id producto a eliminar
   * @returns
   */
  deleteProducto(id: number) {
    let direccion = this.url + 'deleteProducto/' + id.toString();
    const headers = { 'content-type': 'application/json' };
    const params = {
      token: JSON.parse(localStorage.getItem('usuario')!).token,
    };
    return this.http.delete(direccion, { headers: headers, params: params });
  }

  /**
   * Elimina una categoria
   * @param id categoria a eliminar
   * @returns
   */
  deleteCategoria(id: number) {
    let direccion = this.url + 'deleteCategoria/' + id.toString();
    const headers = { 'content-type': 'application/json' };
    const params = {
      token: JSON.parse(localStorage.getItem('usuario')!).token,
    };
    return this.http.delete(direccion, { headers: headers, params: params });
  }

  /**
   * Actualiza la categoria
   * @param formData datos actualizados de la categoria
   * @param id id de la categoria a actualizar
   * @returns
   */
  updateCategoria(formData: FormData, id: number) {
    const headers = { 'content-type': 'application/json' };
    formData.append(
      'token',
      JSON.parse(localStorage.getItem('usuario')!).token
    );
    let direccion = this.url + 'categorias/' + id;
    return this.http.post(direccion, formData);
  }

  /**
   * Guarda una nueva categoria
   * @param formData datos de la categoria
   * @returns
   */
  addCategoria(formData: FormData) {
    const headers = { 'content-type': 'application/json' };
    formData.append(
      'token',
      JSON.parse(localStorage.getItem('usuario')!).token
    );
    let direccion = this.url + 'saveCategoria';
    return this.http.post(direccion, formData);
  }

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

  /**
   * Actualiza el desarrollo
   * @param formData datos actualizados del desarrollo
   * @param id id del desarrollo a actualizar
   * @returns
   */
  updateDesarrollo(formData: FormData, id: number) {
    const headers = { 'content-type': 'application/json' };
    formData.append(
      'token',
      JSON.parse(localStorage.getItem('usuario')!).token
    );
    let direccion = this.url + 'desarrollos/' + id;
    return this.http.post(direccion, formData);
  }

  /**
   * Guarda una nuevo desarrollo
   * @param formData datos del desarrollo
   * @returns
   */
  addDesarrollos(formData: FormData) {
    const headers = { 'content-type': 'application/json' };
    formData.append(
      'token',
      JSON.parse(localStorage.getItem('usuario')!).token
    );
    let direccion = this.url + 'saveDesarrollo';
    return this.http.post(direccion, formData);
  }

  /**
   * Elimina un desarrollo
   * @param id desarrollo a eliminar
   * @returns
   */
  deleteDesarrollo(id: number) {
    let direccion = this.url + 'deleteDesarrollo/' + id.toString();
    const headers = { 'content-type': 'application/json' };
    const params = {
      token: JSON.parse(localStorage.getItem('usuario')!).token,
    };
    return this.http.delete(direccion, { headers: headers, params: params });
  }

  /**
   * Obtener las noticias en base de datos
   * @param limit cantidad de noticias a devolver
   * @returns
   */
  getNoticias(limit: number = 0, search: string = ''): Observable<Noticia[]> {
    const headers = { 'content-type': 'application/json' };
    let direccion = this.url + 'noticias/' + limit.toString();
    return this.http.get<Noticia[]>(direccion, {
      headers: headers,
      params: { search: search },
    });
  }

  /**
   * Actualiza la noticia
   * @param formData datos actualizados de la noticia
   * @param id id de la noticia a actualizar
   * @returns
   */
  updateNoticia(formData: FormData, id: number) {
    const headers = { 'content-type': 'application/json' };
    formData.append(
      'token',
      JSON.parse(localStorage.getItem('usuario')!).token
    );
    let direccion = this.url + 'noticias/' + id;
    return this.http.post(direccion, formData);
  }

  /**
   * Guarda una nueva noticia
   * @param formData datos de la noticia
   * @returns
   */
  addNoticia(formData: FormData) {
    const headers = { 'content-type': 'application/json' };
    formData.append(
      'token',
      JSON.parse(localStorage.getItem('usuario')!).token
    );
    let direccion = this.url + 'saveNoticia';
    return this.http.post(direccion, formData);
  }

  /**
   * Elimina una noticia
   * @param id noticia a eliminar
   * @returns
   */
  deleteNoticia(id: number) {
    let direccion = this.url + 'deleteNoticia/' + id.toString();
    const headers = { 'content-type': 'application/json' };
    const params = {
      token: JSON.parse(localStorage.getItem('usuario')!).token,
    };
    return this.http.delete(direccion, { headers: headers, params: params });
  }

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
  updateQuienes(formData: FormData, id: number) {
    const headers = { 'content-type': 'application/json' };
    formData.append(
      'token',
      JSON.parse(localStorage.getItem('usuario')!).token
    );
    let direccion = this.url + 'quienes/' + id;
    return this.http.post(direccion, formData);
  }

  /**
   * Guarda una nueva persona
   * @param formData datos de la persona
   * @returns
   */
  addQuienes(formData: FormData) {
    const headers = { 'content-type': 'application/json' };
    formData.append(
      'token',
      JSON.parse(localStorage.getItem('usuario')!).token
    );
    let direccion = this.url + 'saveQuienes';
    return this.http.post(direccion, formData);
  }

  /**
   * Elimina una persona
   * @param id persona a eliminar
   * @returns
   */
  deleteQuienes(id: number = -1) {
    let direccion = this.url + 'deleteQuienes/' + id.toString();
    const headers = { 'content-type': 'application/json' };
    const params = {
      token: JSON.parse(localStorage.getItem('usuario')!).token,
    };
    return this.http.delete(direccion, { headers: headers, params: params });
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
    return this.http.get<Pedido[]>(direccion, {
      headers: headers,
      params: params,
    });
  }

  /**
   * Agrega un pedido
   * @param formData datos de un pedido
   * @returns
   */
  addPedido(formData: FormData) {
    formData.append(
      'token',
      JSON.parse(localStorage.getItem('usuario')!).token
    );
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
    formData.append(
      'token',
      JSON.parse(localStorage.getItem('usuario')!).token
    );
    let direccion = this.url + 'cambiarestadopedidos/' + id_pedido;
    return this.http.put(direccion, formData);
  }

  //comentario services

  /**
   * Obtener los comentario en base de datos
   * @param id_producto cantidad de comentario a devolver
   * @returns
   */
  getComentario(id_producto: number = -1): Observable<Comentario[]> {
    const headers = { 'content-type': 'application/json' };
    let direccion = this.url + 'posts/' + id_producto.toString();
    return this.http.get<Comentario[]>(direccion, { headers: headers });
  }

  /**
   * Obtiene un comentario por un id
   * @param idComentario del comentario a obtener
   * @returns
   */
  getComentarioByID(idComentario: number = -1): Observable<Comentario> {
    const headers = { 'content-type': 'application/json' };
    let direccion = this.url + 'postsByID/' + idComentario.toString();
    return this.http.get<Comentario>(direccion, { headers: headers });
  }

  /**
   * Elimina un comentario
   * @param id comentario a eliminar
   * @returns
   */
  deleteComentario(id: number = -1) {
    let direccion = this.url + 'deletePosts/' + id.toString();
    const headers = { 'content-type': 'application/json' };
    const params = {
      token: JSON.parse(localStorage.getItem('usuario')!).token,
    };
    return this.http.delete(direccion, { headers: headers, params: params });
  }

  /**
   * Guarda una nueva respuesta
   * @param formData datos de la respuesta
   * @returns
   */
  addRespuestaComentario(formData: any) {
    const headers = { 'content-type': 'application/json' };
    formData.append(
      'token',
      JSON.parse(localStorage.getItem('usuario')!).token
    );
    let direccion = this.url + 'saveRespuesta';
    return this.http.post(direccion, formData);
  }

  /**
   * Obtener los scraps en base de datos
   * @param limit cantidad de scraps a devolver
   * @returns
   */
  getScraps(limit: number = 0): Observable<Recogida[]> {
    const headers = { 'content-type': 'application/json' };
    let direccion = this.url + 'scrap/' + limit.toString();
    return this.http.get<Recogida[]>(direccion, { headers: headers });
  }

  /**
   * Actualiza el scrap
   * @param formData datos actualizados del scrap
   * @param id id del scrap a actualizar
   * @returns
   */
  updateScrap(formData: FormData, id: number) {
    const headers = { 'content-type': 'application/json' };
    formData.append('token', JSON.parse(localStorage.getItem('usuario')!).token);
    let direccion = this.url + 'scrap/' + id;
    return this.http.post(direccion, formData);
  }

  /**
   * Guarda una nuevo scrap
   * @param formData datos del scrap
   * @returns
   */
  addScrap(formData: FormData) {
    const headers = { 'content-type': 'application/json' };
    formData.append('token', JSON.parse(localStorage.getItem('usuario')!).token);
    let direccion = this.url + 'saveScrap';
    return this.http.post(direccion, formData);
  }

  /**
   * Elimina un scrap
   * @param id scrap a eliminar
   * @returns
   */
  deleteScrap(id: number = -1) {
    let direccion = this.url + 'deleteScrap/' + id.toString();
    const headers = { 'content-type': 'application/json' };
    const params = {
      token: JSON.parse(localStorage.getItem('usuario')!).token,
    };
    return this.http.delete(direccion, { headers: headers, params: params });
  }

  /**
  * Prueba un scrap para ver si devuelve correctamente
  * @param id scrap a probar
  * @returns
  */
  probarScrap(id: number = -1, formData: FormData): Observable<any[]> {
    let direccion = this.url + 'probarScrap/' + id.toString();
    formData.append('token', JSON.parse(localStorage.getItem('usuario')!).token);
    const headers = { 'content-type': 'application/json' };
    return this.http.post<any[]>(direccion, formData);
  }


  //**Ventas */
  /**
     * Obtiene todas las ventas
     * @returns 
     */
  getVentas(id_user: number = -1, fecha: string = '', producto_id: number = -1): Observable<Venta[]> {
    let direccion = this.url + 'ventas';
    const headers = { 'content-type': 'application/json' };
    const params = {
      id_user: id_user,
      fecha: fecha.toString(),
      producto_id: producto_id,
      token: JSON.parse(localStorage.getItem('usuario')!).token,
    };
    return this.http.get<Venta[]>(direccion, { headers: headers, params: params });
  }

  /**
     * genera un excel con el reporte
     * @param user_id id del usuario
     * @param fecha fecha de la venta
     * @param producto_id id del producto
     * @param name nombre del archiivo a devolver
     * @returns 
     */
  generarReportes(
    user_id: number = -1,
    fecha: string = '',
    producto_id: number = -1,
    name: string = ''
  ): Observable<any> {
    let direccion = this.url + 'reportes';
    const headers = { 'content-type': 'application/json' };

    const params = {
      user_id: user_id,
      fecha: fecha,
      producto_id: producto_id,
      token: JSON.parse(localStorage.getItem('usuario')!).token,
    };
    return this.http.get(direccion, { headers: headers, params: params, observe: 'response', responseType: 'blob' });
  }

  /**
   * Eliminar el archivo descargado
   * @param name del archivo
   * @returns 
   */
  deleteFile(name: string = '') {
    let direccion = this.url + 'reportes';
    const headers = { 'content-type': 'application/json' };
    const params = {
      name: name,
      token: JSON.parse(localStorage.getItem('usuario')!).token,
    };
    return this.http.delete(direccion, { headers: headers, params: params });
  }

  //**Pregunta */
  /**
   * Agrega un mensaje
   * @param formData datos del mensaje del usuario
   * @returns 
   */
  addMensaje(formData: FormData) {
    let direccion = this.url + 'mensajes'
    return this.http.post(direccion, formData);
  }

  /**
   * Devuelve todos los mensajes 
   * @returns 
   */
  getMensajes(): Observable<Mensaje[]> {
    let direccion = this.url + 'mensajes'
    const headers = { 'content-type': 'application/json' };
    return this.http.get<Mensaje[]>(direccion, { headers: headers, params: { token: JSON.parse(localStorage.getItem('usuario')!).token, } });
  }

  /**
   * Actualiza un mensaje
   * @param id del mensaje
   * @param formData datos
   * @returns 
   */
  updateMensaje(id: number = -1, formData: FormData) {
    formData.append('token', JSON.parse(localStorage.getItem('usuario')!).token);
    let direccion = this.url + 'mensajes/' + id.toString();
    return this.http.put(direccion, formData);
  }

  /**
   * Elimina un mensaje por su id
   * @param id del mensaje
   * @returns 
   */
  deleteMensaje(id: number) {
    let direccion = this.url + 'mensajes/' + id.toString();
    const headers = { 'content-type': 'application/json' };
    const params = {
      token: JSON.parse(localStorage.getItem('usuario')!).token,
    };
    return this.http.delete(direccion, { headers: headers, params: params });
  }

  /**
   * Obtiene todas las configuraciones de la pagina
   * @returns 
   */
  getConfiguraciones(): Observable<Configuracion[]> {
    let direccion = this.url + 'configuraciones';
    return this.http.get<Configuracion[]>(direccion);
  }

  /**
   * Obtiene los datos de una configuracion
   * @param formData nombre de la configuracion a buscar
   * @returns 
   */
  getConfiguracion(nombre: string): Observable<Configuracion> {
    // formData.append('token', this.storage.retrieve('usuario').token);
    let direccion = this.url + 'configuracion'
    return this.http.get<Configuracion>(direccion, { params: { nombre: nombre } });
  }

  /**
   * Guarda los cambios en las configuraciones
   * @param formData configuraciones nuevas
   * @returns 
   */
  saveConfigs(formData: FormData) {
    formData.append('token', JSON.parse(localStorage.getItem('usuario')!).token);
    let direccion = this.url + 'configuraciones/'
    return this.http.post<any>(direccion, formData);
  }

  /**
   * Obtiene si esta corriendo el intervalo de scrap
   * @returns 
   */
  obtenerScrappingLoop(): Observable<boolean>{
    const direccion = this.url + 'scraploop'
    return this.http.get<boolean>(direccion);
  }

  /**
   * Inicia la busqueda de scrapp
   * @returns 
   */
  IniciarScrap() {
    let direccion = this.url + 'iniciarScrap' ;
    return this.http.get(direccion);
  }

  /**
   * Detiene el scrap para que no siga buscando
   * @returns 
   */
  DetenerScrap() {
    let direccion = this.url + 'detenerScrap';
    return this.http.get(direccion);
  }

  /**
   * da un reporte de todo lo que maneja el administrador
   * @returns 
   */
   reporteAdmin() {
    let direccion = this.url + 'reporteAdmin';
    return this.http.get(direccion);
  }
}
