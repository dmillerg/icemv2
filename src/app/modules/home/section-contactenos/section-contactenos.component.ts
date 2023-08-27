import { Component, OnInit } from '@angular/core';
import { Formulario } from 'src/app/core/components/form-generico/model/formulario.model';

@Component({
  selector: 'app-section-contactenos',
  templateUrl: './section-contactenos.component.html',
  styleUrls: ['./section-contactenos.component.scss'],
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
      ],
      columnas: [1, 1, 1, 1],
    };
  }
}