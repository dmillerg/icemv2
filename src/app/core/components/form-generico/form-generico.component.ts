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
  FormBuilder,
} from '@angular/forms';
import { Control, Formulario } from './model/formulario.model';
import { BotonGenericoComponent } from '../boton-generico/boton-generico.component';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { Boton } from '../boton-generico/model/boton.model';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { matchPasswordValidator } from '../../validators/match-password.validator';
import { reglasPasswordValidator } from '../../validators/reglas-password.validator';

@Component({
  selector: 'app-form-generico',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BotonGenericoComponent,
    MatSelectModule,
    MatRippleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
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
  error_cantidad_img: string = '';
  uploadFiles: any;
  botonEliminar: Boton[] = [
    {
      icono: 'bi bi-x',
      class: 'w-4 h-4 rounded-full bg-icem-500 text-white',
      funcion: (value) => this.eliminarFoto(value),
    },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.obtenerForm(this.formulario);
  }

  obtenerForm(form: Formulario): void {
    this.formulario = form;
    let control = [...form.controles];
    const formGroup: FormGroup = this.fb.group({});

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
    // formGroup.setValidators(this.formulario.validator!)
    // if(this.formulario.validator){
    //   this.formulario.validator.forEach(e=>{
    //     formGroup.setValidators(e)
    //   })
    // }
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
      }else if (
        (form.get(field)?.hasValidator(matchPasswordValidator) ||
          form.get(field)?.hasValidator(reglasPasswordValidator)) &&
        form.get(field)!.invalid
      ) {
        const err: any = form.get(field)!.errors!;
        mensajeError = err.message;
      }
      return mensajeError;
    } else return '';
  }

  fileEvent(fileInput: any) {
    // this.imagenes = []
    let files = (<HTMLInputElement>fileInput.target).files;
    if (this.formulario.imagen?.maximoImagenes === 1) {
      this.error_cantidad_img = '';
      const reader = new FileReader();
      reader.onload = () => {
        this.formulario.imagen!.imagenes = [reader.result as string].map(
          (e) => e
        );
      };
      reader.readAsDataURL(files![0]);
      this.formulario.imagen.formDataImage = new FormData();
      this.formulario.imagen!.formDataImage!.append(
        'foto',
        files![0],
        files![0].name
      );
    } else if (
      this.formulario.imagen!.imagenes!.length <=
        this.formulario.imagen!.maximoImagenes! &&
      this.formulario.imagen!.imagenes!.length + files!.length <=
        this.formulario.imagen!.maximoImagenes!
    ) {
      this.error_cantidad_img = '';
      for (let i = 0; i < files!.length; i++) {
        let file = files![i];
        //  console.log(fileInput);
        this.uploadFiles = fileInput.target.files;
        this.formulario.imagen!.formDataImage = new FormData();
        if (this.uploadFiles != undefined) {
          for (let i = 0; i < this.uploadFiles.length; i++) {
            this.formulario.imagen!.formDataImage!.append(
              'foto',
              this.uploadFiles[i],
              this.uploadFiles[i].name
            );
          }
        }
        const reader = new FileReader();
        reader.onload = () => {
          this.formulario.imagen!.imagenes!.push(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    } else {
      this.error_cantidad_img = `El máximo de imagenes por producto es de ${
        this.formulario.imagen!.maximoImagenes
      }`;
    }
  }

  eliminarFoto(name: string) {
    console.log(name);

    let nombre = name.substring(name.indexOf('=') + 1, name.length);
    console.log(name);
    if (!this.formulario.imagen?.imagenesEliminadas) {
      this.formulario.imagen!.imagenesEliminadas = [];
    }
    // if (this.producto.imagen.split(',').filter((e) => e == nombre).length > 0) {
    //   let i = this.producto.imagen.split(',').indexOf(nombre);
    //   this.producto.imagen = this.producto.imagen.split(',').splice(i).toString();
    // }
    this.formulario.imagen?.imagenesEliminadas!.push(nombre);
    this.formulario.imagen!.imagenes = this.formulario.imagen!.imagenes!.filter(
      (e) => e !== name
    );
  }
}
