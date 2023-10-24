import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';
import { Configuracion } from '../models/configuracion.model';

@Injectable({
  providedIn: 'root',
})
export class ConfiguracionService {
  url: string = environment.url_backend + 'apis/';

  constructor(private http: HttpClient) {}

  /**
   * obtiene la ultima fecha de actualizacion
   * @returns
   */
  ultimaActualizacion(): Observable<Usuario[]> {
    let direccion = this.url + 'fechaultima';
    return this.http.get<Usuario[]>(direccion);
  }

  /**
   * obtiene si el token aun es válido
   * @returns
   */
  checkToken(): Observable<string> {
    let direccion = this.url + 'checktoken';
    return this.http.get<string>(direccion, {
      params: { token: JSON.parse(localStorage.getItem('usuario')!).token },
    });
  }

/**
 * Obtener una configuracion por nombre
 * @param nombre de la configuracion
 * @returns 
 */
  getConfiguracion(nombre: string): Observable<Configuracion> {
    let direccion = this.url + 'configuracion';
    return this.http.get<Configuracion>(direccion, {
      params: {
        nombre: nombre,
      },
    });
  }
}
