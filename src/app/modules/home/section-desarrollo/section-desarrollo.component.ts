import { Component } from '@angular/core';
import { Boton } from 'src/app/core/models/boton.model';

@Component({
  selector: 'app-section-desarrollo',
  templateUrl: './section-desarrollo.component.html',
  styleUrls: ['./section-desarrollo.component.scss']
})
export class SectionDesarrolloComponent {

  botones: Boton[] =[
    {
      icono: 'bi bi-check',
      label: 'Ver mas'
    }
  ]
}
