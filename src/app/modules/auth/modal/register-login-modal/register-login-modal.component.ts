import { Component, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Boton } from 'src/app/core/components/boton-generico/model/boton.model';
import { Formulario } from 'src/app/core/components/form-generico/model/formulario.model';
import { AuthService } from '../../services/auth.service';
import { take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SnackService } from 'src/app/core/components/snack/service/snack.service';
import { Store } from '@ngrx/store';
import { addUsuario } from 'src/app/shared/state/actions/usuario.actions';
import { Usuario } from 'src/app/core/models/usuario.model';

@Component({
  selector: 'app-register-login-modal',
  templateUrl: './register-login-modal.component.html',
  styleUrls: ['./register-login-modal.component.scss'],
})
export class RegisterLoginModalComponent {
  formulario?: Formulario;
  botones: Boton[] = [];
  titulo: string = '';
  subtitulo: string = '';
  login: boolean = false;
  formLogin!: FormGroup;
  formObligatorio!: FormGroup;
  formOpcional!: FormGroup;
  cargando: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<RegisterLoginModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authService: AuthService,
    private snackService: SnackService,
    private store: Store
  ) {
    this.obtenerDatos();
  }

  obtenerDatos() {
    this.titulo = this.data.titulo;
    this.subtitulo = this.data.subtitulo;
    this.login = this.data.titulo !== 'Registrarse';
    this.generarBotones();
  }

  generarBotones() {
    this.botones = [
      {
        icono: 'bi bi-check',
        label: 'Aceptar',
        funcion: () => this.aceptar(),
        cargando: () => this.cargando,
      },
      { icono: 'bi bi-x', label: 'Cancelar', funcion: () => this.close() },
    ];
  }

  close(data?: any) {
    this.dialogRef.close(data);
  }

  aceptar() {
    if (this.login) this.loginUsuario();
    else this.registrarUsuario();
  }

  loginUsuario() {
    if (this.formLogin.valid) {
      this.cargando = true;
      const login = this.formLogin.getRawValue();
      const formData = new FormData();
      formData.append('usuario', login.usuario);
      formData.append('password', login.password);
      formData.append('recordar', 'true');
      this.authService
        .login(formData)
        .pipe(take(1))
        .subscribe({
          next: (result) => {
            this.cargando = false;
            this.snackService.success({
              titulo: 'Notificación',
              texto: 'Usuario autenticado satisfactoriamente.',
            });
            const user: Usuario = {
              id: result.usuario[0].id,
              usuario: result.usuario[0].usuario,
              nombre: result.usuario[0].nombre,
              fecha: result.usuario[0].fecha,
              correo: result.usuario[0].correo,
              pais: result.usuario[0].pais,
              direccion: result.usuario[0].direccion,
              telefono: result.usuario[0].telefono,
              rol: result.usuario[0].rol,
              token: result.token,
            };
            localStorage.setItem('usuario', JSON.stringify(user));
            this.store.dispatch(addUsuario({ usuario: user }));

            setTimeout(() => {
              this.close(user);
            }, 500);
          },
          error: () => (this.cargando = false),
        });
    } else {
      this.formLogin.markAllAsTouched();
    }
  }

  registrarUsuario() {
    if (this.formObligatorio.valid) {
      this.cargando = true;
      const registerObligatorio = this.formObligatorio.getRawValue();
      const registerOpcional = this.formOpcional.getRawValue();
      const formData = new FormData();
      formData.append('usuario', registerObligatorio.usuario);
      formData.append('nombre', registerObligatorio.nombreApellido);
      formData.append('password', registerObligatorio.password);
      formData.append('correo', registerObligatorio.correo);
      formData.append('pais', registerOpcional.pais);
      formData.append('direccion', registerOpcional.direccion);
      formData.append('telefono', registerOpcional.telefono);
      formData.append('rol', 'usuario');
      this.authService
        .addUsuarios(formData)
        .pipe(take(1))
        .subscribe({
          next: (result) => {
            this.cargando = false;
            let link = this.generarLink(result.result.insertId);
            this.sendEmailActivacion(
              link,
              registerObligatorio.correo,
              registerObligatorio.usuario
            );
          },
        });
    } else {
      this.formObligatorio.markAllAsTouched();
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
    console.log(result);
    return result;
  }

  sendEmailActivacion(link: string, correo: string, usuario: string) {
    this.authService
      .sendEmail(
        correo,
        'Activación de la cuenta de usuario',
        `Hola ${usuario}, estamos encantados de recibir a un nuevo cliente en nuestra empresa. Para confirmar la activación de su cuenta por favor presione el botón que se le presenta debajo. Esperamos su visita pronto!!.`,
        'Si usted no es el que pidió la activación de la cuenta simplemente borre este correo, no se preocupe su correo no podrá ser usado sin su autorización.',
        'link',
        link,
        `${environment.url_page}/#/inicio?link=${link}`
      )
      .pipe(take(1))
      .subscribe({
        next: (result) => {
          this.snackService.success({
            texto:
              'Se le ha enviado un correo a su dirección de correo por favor verifiquelo.',
          });
          this.close();
        },
      });
  }
}
