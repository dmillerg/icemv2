import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Boton } from 'src/app/core/components/boton-generico/model/boton.model';
import { Formulario } from 'src/app/core/components/form-generico/model/formulario.model';

@Component({
  selector: 'app-register-login-modal',
  templateUrl: './register-login-modal.component.html',
  styleUrls: ['./register-login-modal.component.scss'],
})
export class RegisterLoginModalComponent {
  formulario?: Formulario;
  botones: Boton[]=[];
  titulo: string = '';
  subtitulo: string = '';
  login: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<RegisterLoginModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.obtenerDatos();
  }

  obtenerDatos() {
    this.formulario = this.data.formulario;
    this.botones = this.data.botones;
    this.titulo = this.data.titulo;
    this.subtitulo = this.data.subtitulo;
    this.login = this.data.titulo !== 'Registrarse';
  }

  close() {
    this.dialogRef.close();
  }
}
