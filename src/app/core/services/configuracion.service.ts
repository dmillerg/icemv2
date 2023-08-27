import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionService {
  url: string = environment.url_backend + 'apis/';

  constructor
  (
    private http: HttpClient,
  ) { }

    /**
   * obtiene la ultima fecha de actualizacion
   * @returns 
   */
    ultimaActualizacion(): Observable<Usuario[]> {
      let direccion = this.url + 'fechaultima';
      return this.http.get<Usuario[]>(direccion);
    }
}
