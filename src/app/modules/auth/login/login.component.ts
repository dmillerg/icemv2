import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Formulario } from 'src/app/core/components/form-generico/model/formulario.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  formulario!: Formulario;
  @Output() form = new EventEmitter<FormGroup>();

  constructor() {
    this.crearFormulario();
  }

  crearFormulario() {
    this.formulario = {
      controles: [
        {
          tipo: 'text',
          control: 'usuario',
          nombre: 'Usuario',
          icono: 'bi bi-person',
          placeholder: 'Escriba usuario o correo',
          validator: [Validators.required],
        },
        {
          tipo: 'password',
          control: 'password',
          nombre: 'Contraseña',
          icono: 'bi bi-lock',
          placeholder: 'Escriba contraseña',
          validator: [Validators.required],
        },
      ],
      columnas: [1, 1],
      skeleton: false,
    };
    setTimeout(() => this.form.emit(this.formulario.form), 500);
  }
}
