import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Boton } from 'src/app/core/components/boton-generico/model/boton.model';

@Component({
  selector: 'app-section-desarrollo',
  templateUrl: './section-desarrollo.component.html',
  styleUrls: ['./section-desarrollo.component.scss'],
})
export class SectionDesarrolloComponent {
  constructor(private router: Router) {}

  botones: Boton[] = [
    {
      icono: 'bi bi-check',
      label: 'Ver mas',
      funcion: () => {
        this.router.navigate(['nuevos-desarrollos']);
      },
    },
  ];
}
