import { Component } from '@angular/core';
import { Card } from 'src/app/core/models/card.model';

@Component({
  selector: 'app-section-servicios',
  templateUrl: './section-servicios.component.html',
  styleUrls: ['./section-servicios.component.scss']
})
export class SectionServiciosComponent {
  cards: Card[] = [
    {
      titulo: 'Servicios',
      icono: 'bi bi-stack text-3xl',
      direccion: 'text-center',
      descripcion:
        'diseño y proyectos en 3D, de toldos, cortinas y mobiliario, parqueo, arrendamiento de teatros y almacenes.',
    },
    {
      titulo: 'Fabricamos',
      icono: 'bi bi-tools text-3xl',
      direccion: 'text-center',

      descripcion:
        'equipos médicos, instrumentos ortopédicos y ayudas técnicas, mobiliario clínico, gastronómicos y de oficina, y otros',
    },
    {
      titulo: 'Ofrecemos',
      icono: 'bi bi-people-fill text-3xl',
      direccion: 'text-center',

      descripcion:
        'reparacion y montaje de mobiliario, mantenimiento de todas nuestras producciones y varios servicios.',
    },
  ];
}
