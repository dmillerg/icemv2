import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Formulario } from 'src/app/core/components/form-generico/model/formulario.model';
import { Usuario } from 'src/app/core/models/usuario.model';
import { environment } from 'src/environments/environment';
import { Producto } from '../../productos/model/producto';

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
      activo: activo
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
    formData.append('token', JSON.parse(localStorage.getItem('usuario')!).token);
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
    formData.append('token', JSON.parse(localStorage.getItem('usuario')!).token);
    let direccion = this.url + 'saveProducto';
    return this.http.post(direccion, formData);
  }
}
