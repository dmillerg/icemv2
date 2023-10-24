import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from 'src/app/core/models/login.model';
import { Usuario } from 'src/app/core/models/usuario.model';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import {
  addUsuario,
  deleteUsuario,
} from 'src/app/shared/state/actions/usuario.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url: string = environment.url_backend + 'apis/';

  constructor(private http: HttpClient, private store: Store) {}

  /**
   * Loguea a un usuario
   * @param formData usuario y contraseña del usuario que se intenta autenticar
   * @returns
   */
  login(formData: FormData): Observable<Login> {
    let direccion = this.url + 'login';
    return this.http.post<Login>(direccion, formData);
  }

  /**
   * desloguea a un usuario
   * @param id de usuario que se desautentica
   * @returns
   */
  logout() {
    let direccion =
      this.url + 'logout/' + JSON.parse(localStorage.getItem('usuario')!).id;
    localStorage.removeItem('usuario');
    this.store.dispatch(deleteUsuario());
    return this.http.post(direccion, {});
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

  isLogging(): boolean {
    if (localStorage.getItem('usuario')) {
      const usuario: Usuario = JSON.parse(localStorage.getItem('usuario')!);
      this.store.dispatch(addUsuario({ usuario: usuario }));
      return true;
    } else return false;
  }
}
