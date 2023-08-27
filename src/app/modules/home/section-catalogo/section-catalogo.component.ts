import { Component } from '@angular/core';
import { Boton } from 'src/app/core/components/boton-generico/model/boton.model';

@Component({
  selector: 'app-section-catalogo',
  templateUrl: './section-catalogo.component.html',
  styleUrls: ['./section-catalogo.component.scss']
})
export class SectionCatalogoComponent {
botones: Boton[]=[
  {
    icono: 'bi bi-check',
    label: 'Ver cátalogo'
  }
];
}
