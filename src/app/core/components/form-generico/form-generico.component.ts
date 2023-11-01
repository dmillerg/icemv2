import {
  Component,
  Input,
  HostListener,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  ReactiveFormsModule,
  FormControl,
  Validators,
} from '@angular/forms';
import { Control, Formulario } from './model/formulario.model';
import { BotonGenericoComponent } from '../boton-generico/boton-generico.component';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-form-generico',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BotonGenericoComponent,
    MatSelectModule,
  ],
  templateUrl: './form-generico.component.html',
  styleUrls: ['./form-generico.component.scss'],
})
export class FormGenericoComponent implements OnInit {
  @Input() formulario!: Formulario;
  @Output() emisor = new EventEmitter<FormGroup>();
  form: FormGroup = new FormGroup({});
  subscripciones$: any;
  column: any[] = [];
  max: number = 0;
  anchoPantalla: number = 0;

  ngOnInit(): void {
    this.obtenerForm(this.formulario);
  }

  obtenerForm(form: Formulario): void {
    this.formulario = form;
    let control = [...form.controles];
    const formGroup: FormGroup = new FormGroup({});

    this.formulario.controles.forEach((e) => {
      if (e)
        formGroup.addControl(
          e.control,
          new FormControl({ value: e.valor, disabled: e.disabled }, e.validator)
        );
      if (e!.change) {
        const sub = formGroup.get(e!.control)?.valueChanges.subscribe({
          next: (value: any) => {
            this.emit(e!.change!, value);
          },
        });
        this.subscripciones$.push({
          control: e?.control!,
          subscripcion: sub!,
        });
      }
    });
    this.formulario.columnas.forEach((e) => {
      let fila = [];
      for (let i = 0; i < e; i++) {
        if (control.length > 0) fila.push(control.shift());
      }

      if (this.max < e) this.max = e;
      this.column.push(fila);
    });
    this.form = formGroup;

    this.formulario.form! = formGroup;
    this.emisor.emit(formGroup);
  }

  emit(fun: Function, value: any) {
    fun(value);
  }

  visibilidad(control: string, visible: boolean) {
    return !(visible !== undefined && this.form.get(control)?.disabled);
  }

  obtenerTamanno(item: Control | null): string {
    let resultado: number = 0;
    if (item) {
      if (item.tipo === 'textarea') resultado = 100;
      else if (item.width) resultado = Number(item.width);
      else resultado = 100 / this.max;
    } else {
      resultado = 100 / this.max;
    }
    if (this.anchoPantalla <= 767) resultado = 100;
    return `${Math.round(resultado) - 0.4}%`;
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.anchoPantalla = window.innerWidth;
  }

  esRequerido(formcontrol: string, texto: string): string {
    return this.form.get(formcontrol)!.hasValidator(Validators.required)
      ? `${texto} *`
      : texto;
  }

  isValidField = (form: FormGroup, field: string): boolean => {
    return form.get(field)!.touched && !form.get(field)!.invalid;
  };

  isRequiered = (form: FormGroup, field: string) => {
    return form.get(field)?.hasValidator(Validators.required) ? '*' : '';
  };

  isPristinedField = (form: FormGroup, field: string): boolean => {
    return form.get(field)!.touched === false;
  };

  isEmail = (form: FormGroup, field: string): boolean => {
    return (
      form.get(field)!.hasValidator(Validators.email) &&
      form.get(field)!.hasError('email')
    );
  };

  error(form: FormGroup, field: string): string {
    const value = form.get(field)!.value;
    let mensajeError: string = '';
    if (form.get(field)!.touched) {
      if (
        form.get(field)!.hasValidator(Validators.email) &&
        form.get(field)!.hasError('email')
      ) {
        mensajeError = 'Introduzca una dirección de correo válida.';
      } else if (
        form.get(field)!.hasValidator(Validators.required) &&
        form.get(field)!.hasError('required')
      ) {
        mensajeError = `${field} es requerido`;
      }
      return mensajeError;
    } else return '';
  }
}
