import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class ContactoService {
  url: string = environment.url_backend + 'apis/';

  constructor(private http: HttpClient) {}

   /**
   * Agrega un mensaje
   * @param formData datos del mensaje del usuario
   * @returns 
   */
   addMensaje(formData: FormData) {
    let direccion = this.url + 'mensajes'
    return this.http.post(direccion, formData);
  }
}
