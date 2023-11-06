import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Collapse } from 'src/app/core/components/collapse/model/collapse.model';
import { Formulario } from 'src/app/core/components/form-generico/model/formulario.model';
import { matchPasswordValidator } from 'src/app/core/validators/match-password.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  formularioObligatorio!: Formulario;
  formularioOpcional!: Formulario;

  formObligatorio!: FormGroup;
  cargando: boolean = true;
  @Output() formObligatorioEmit = new EventEmitter<FormGroup>();
  @Output() formOpcionalEmit = new EventEmitter<FormGroup>();


  collapseObligatorio!: Collapse;
  collapseOpcional!: Collapse;

  ngOnInit(): void {
    this.crearFormularioObligatorio();
    this.crearFormularioOpcional();
  }

  rellenarCollapse() {
    this.collapseObligatorio = {
      id: 'obligatorio',
      nombre: 'Obligatorios *',
      formulario: this.formularioObligatorio,
      tipoContenedor: 'form',
    };
    this.collapseOpcional = {
      id: 'opcional',
      nombre: 'Opcional',
      formulario: this.formularioOpcional,
      tipoContenedor: 'form',
    };
  }

  crearFormularioObligatorio() {
    this.formularioObligatorio = {
      controles: [
        {
          tipo: 'text',
          control: 'usuario',
          nombre: 'Usuario',
          icono: 'bi bi-person',
          validator: [Validators.required],
        },
        {
          tipo: 'text',
          control: 'nombreApellido',
          nombre: 'Nombre y Apellidos',
          icono: 'bi bi-person',
          validator: [Validators.required],
        },
        {
          tipo: 'text',
          control: 'correo',
          nombre: 'Correo',
          icono: 'bi bi-envelope',
          validator: [Validators.required, Validators.email],
        },
        {
          tipo: 'password',
          control: 'password',
          nombre: 'Contraseña',
          icono: 'bi bi-lock',
          validator: [Validators.required],
        },
        {
          tipo: 'password',
          control: 'confirm',
          nombre: 'Confirmación de contraseña',
          icono: 'bi bi-lock',
          validator: [Validators.required,matchPasswordValidator],
        },
      ],
      columnas: [1, 1, 1, 1, 1],
      skeleton: false,
    };
    this.rellenarCollapse()

    setTimeout(() => {
      this.cargando = false;
      this.formObligatorioEmit.emit(this.formularioObligatorio.form);
    }, 500);
  }

  crearFormularioOpcional() {
    this.formularioOpcional = {
      controles: [
        {
          tipo: 'text',
          control: 'pais',
          nombre: 'País',
          icono: 'bi bi-flag',
        },
        {
          tipo: 'text',
          control: 'direccion',
          nombre: 'Dirección',
          icono: 'bi bi-geo-alt',
        },
        {
          tipo: 'text',
          control: 'teléfono',
          nombre: 'Teléfono',
          icono: 'bi bi-telephone',
        },
      ],
      columnas: [1, 1, 1, 1, 1],
      skeleton: false,
    };
    this.rellenarCollapse();

    setTimeout(() => {
      this.cargando = false;
      this.formOpcionalEmit.emit(this.formularioOpcional.form);
    }, 500);
  }
}
