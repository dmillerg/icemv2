import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class CountTimerService {
  url: string = environment.url_backend + 'apis/';

  constructor(private http: HttpClient) {}

  /**
   * Devuelve el tiempo restante del carrito
   * @param formData fecha de creado el carrito
   * @returns
   */
  getTiempoRestanteCarrito(formData: FormData): Observable<any> {
    formData.append(
      'token',
      JSON.parse(localStorage.getItem('usuario')!).token
    );
    let direccion = this.url + 'carritotimerestante/';
    return this.http.post<any>(direccion, formData);
  }
}
