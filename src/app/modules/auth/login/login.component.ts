import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Formulario } from 'src/app/core/components/form-generico/model/formulario.model';
import { CatalogoService } from 'src/app/core/services/catalogo.service';
import { AuthService } from '../services/auth.service';
import { SnackService } from 'src/app/core/components/snack/service/snack.service';
import { take } from 'rxjs';
import { Usuario } from 'src/app/core/models/usuario.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  formulario!: Formulario;
  @Output() form = new EventEmitter<FormGroup>();
  loading: boolean = false;

  constructor(
    private catalogoService: CatalogoService,
    private authService: AuthService,
    private snackService: SnackService
  ) {
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
        {
          tipo: 'boton',
          control: 'Boton',
          nombre: 'boton',
          icono: 'bi bi-lock',
          botones: [
            {
              label: '¿Olvidaste tu contraseña?',
              class:
                'text-icem-700 dark:text-icem-100 bg-transparent py-2 px-2 rounded-full',
              cargando: () => this.loading,
              funcion: () => this.forgetPassword(),
            },
          ],
          placeholder: 'Escriba contraseña',
        },
      ],
      columnas: [1, 1, 1],
      skeleton: false,
    };
    setTimeout(() => this.form.emit(this.formulario.form), 500);
  }

  forgetPassword() {
    this.loading = true;
    const data = this.formulario.form?.getRawValue();
    if (data.usuario != '') {
      if (
        data.usuario.match(
          /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
        ) != null
      ) {
        this.authService
          .getUsuariosByEmail(data.usuario)
          .pipe(take(1))
          .subscribe({
            next: (result) => {
              this.sendEmailForgotPassword(result);
            },error:()=>this.loading=false
          });
      } else {
        this.authService
          .getUsuariosByUser(data.usuario)
          .pipe(take(1))
          .subscribe({
            next: (result) => {
              this.sendEmailForgotPassword(result);
            },error:()=>this.loading=false
          });
      }
    } else {
      this.snackService.error({
        texto:
          'debe rellenar el campo usuario o correo con alguno de estos elementos para poder saber quien es usted, luego presione sobre olvido su contraseña',
      });
    }
  }

  generarLink(id: any) {
    let result = '';
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-*';
    const l = chars.length;
    let cant = Math.floor(Math.random() * (30 - 20)) + 20;
    let replaces = 'Edd' + id + 'Dde';
    let place = Math.floor(Math.random() * (cant - 0)) + 0;
    for (let i = 0; i < cant; i++) {
      if (i == place) {
        result += replaces;
      }
      result += chars[Math.floor(Math.random() * (l - 0)) + 0];
    }
    return result;
  }

  sendEmailForgotPassword(user: Usuario) {
    let reset = this.generarLink(user.id);
    this.catalogoService
      .sendEmail(
        user.correo,
        'Contraseña olvidada por el usuario ' + user.usuario,
        `Hola ${user.usuario}, hemos notado que ha olvidado su contraseña, no hay de que preocuparse solo presione el botón a continuación para confirmar su identidad.`,
        `En caso de que el botón no funcionará solo siga el link: ${environment.url_page}#/inicio?reset=${reset}`,
        'reset',
        reset,
        `${environment.url_page}#/inicio?reset=${reset}`
      )
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.loading = false
          this.snackService.success({
            texto:
              'Se ha enviado un correo a su cuenta configurada. Por favor revise y sigas los pasos',
          });
        },error:()=>this.loading=false
      });
  }
}
