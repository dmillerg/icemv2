import { Component, OnInit, OnDestroy } from '@angular/core';
import { Formulario } from 'src/app/core/components/form-generico/model/formulario.model';
import { FormGenericoComponent } from '../form-generico/form-generico.component';
import { Validators } from '@angular/forms';
import { ContactoService } from '../../services/contacto.service';
import { take } from 'rxjs';
import { SnackService } from '../snack/service/snack.service';
import { Store } from '@ngrx/store';
import { selectUsuario } from 'src/app/shared/state/selectors/usuario.selector';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-section-contactenos',
  templateUrl: './section-contactenos.component.html',
  imports: [FormGenericoComponent],
  providers: [ContactoService],
  styleUrls: ['./section-contactenos.component.scss'],
  standalone: true,
})
export class SectionContactenosComponent implements OnInit, OnDestroy {
  formulario!: Formulario;
  cargando: boolean = false;
  usuario$: any;

  constructor(
    private contactoService: ContactoService,
    private snackService: SnackService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.generarFormulario();
    setTimeout(() => {
      this.usuario$ = this.store.select(selectUsuario).subscribe({
        next: (usuario) => {
          this.rellenarFormAutomatico(usuario);
        },
      });
    }, 100);
  }

  ngOnDestroy(): void {
    this.usuario$.unsubscribe();
  }

  rellenarFormAutomatico(usuario: ReadonlyArray<Usuario>) {
    if (!usuario) {
      this.formulario.form?.get('alias')?.enable();
      this.formulario.form?.get('correo')?.enable();
    } else if (usuario?.length > 0) {
      const user: Usuario = usuario[0];
      this.formulario.form?.get('alias')?.setValue(user.usuario);
      this.formulario.form?.get('alias')?.disable();
      this.formulario.form?.get('correo')?.setValue(user.correo);
      this.formulario.form?.get('correo')?.disable();
    }
  }

  generarFormulario() {
    this.formulario = {
      controles: [
        {
          tipo: 'text',
          nombre: 'Alias',
          control: 'alias',
          icono: 'bi bi-person',
          validator: [Validators.required],
        },
        {
          tipo: 'text',
          nombre: 'Correo',
          control: 'correo',
          icono: 'bi bi-envelope',
          validator: [Validators.required, Validators.email],
        },
        {
          tipo: 'text',
          nombre: 'Asunto',
          control: 'asunto',
          icono: 'bi bi-inbox',
        },
        {
          tipo: 'textarea',
          nombre: 'Mensaje',
          control: 'mensaje',
          icono: 'bi bi-chat-dots',
        },

        {
          tipo: 'boton',
          nombre: '',
          control: 'mensaje1',
          icono: 'bi bi-chat-dots',
          botones: [
            {
              icono: 'bi bi-check',
              label: 'Ver mas',
              cargando: () => this.cargando,
              funcion: () => {
                this.enviarComentario();
              },
              class:
                'border-none w-full px-4 py-3 my-1 bg-icem-500 dark:bg-icem-300 hover:bg-icem-400 dark:hover:bg-icem-200 duration-300 text-white rounded',
            },
          ],
        },
      ],
      columnas: [1, 1, 1, 1, 1],
    };
  }

  enviarComentario() {
    if (this.formulario.form?.valid) {
      this.cargando = true;
      this.enviarMensaje();
    } else {
      this.formulario.form?.markAllAsTouched();
    }
  }

  enviarMensaje() {
    const data = this.formulario.form!.getRawValue();
    let formData = new FormData();
    formData.append('alias', data.alias);
    formData.append('correo', data.correo);
    formData.append('asunto', data.asunto);
    formData.append('mensaje', data.mensaje);
    this.contactoService
      .addMensaje(formData)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.cargando = false;
          this.snackService.success({
            titulo: 'Mensaje enviado',
            texto:
              'Su mensaje fue enviado satisfactoriamente, en breve recibirá respuesta.',
          });
          this.formulario.form?.reset();
          this.rellenarFormAutomatico([JSON.parse(localStorage.getItem('usuario')!)])
        },
      });
  }
}
