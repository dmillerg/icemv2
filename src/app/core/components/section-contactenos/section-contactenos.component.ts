import { Component, OnInit } from '@angular/core';
import { Formulario } from 'src/app/core/components/form-generico/model/formulario.model';
import { FormGenericoComponent } from '../form-generico/form-generico.component';

@Component({
  selector: 'app-section-contactenos',
  templateUrl: './section-contactenos.component.html',
  imports: [FormGenericoComponent],
  styleUrls: ['./section-contactenos.component.scss'],
  standalone: true,
})
export class SectionContactenosComponent implements OnInit {
  formulario!: Formulario;

  ngOnInit(): void {
    this.generarFormulario();
  }

  generarFormulario() {
    this.formulario = {
      controles: [
        {
          tipo: 'text',
          nombre: 'Alias',
          control: 'alias',
          icono: 'bi bi-person',
        },
        {
          tipo: 'text',
          nombre: 'Correo',
          control: 'correo',
          icono: 'bi bi-envelope',
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
              class:
                'w-full bg-icem-500 hover:bg-icem-400 text-white duration-300 py-2 mt-2 rounded',
            },
          ],
        },
      ],
      columnas: [1, 1, 1, 1, 1],
    };
  }
}
