import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfiguracionService } from '../../services/configuracion.service';
import { Boton } from '../boton-generico/model/boton.model';
import { BotonGenericoComponent } from '../boton-generico/boton-generico.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, BotonGenericoComponent],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit{
  fechaActual: string = '';
  botones:Boton[] = []

  constructor
    (
      private configuracionService: ConfiguracionService
    ) { }

  ngOnInit(){
    this.generateBotonSocialMedia(),
    this.fechaActualizacion()
  }

  fechaActualizacion() {
    this.configuracionService.ultimaActualizacion().subscribe({
      next: (response) => { this.fechaActual = response[0].ultsession },
    })
  }

  generateBotonSocialMedia(){
    this.botones = [
      {
      icono: 'bi bi-facebook',
      class: 'text-blue-500 bg-transparent text-xl'
    },
    {
      icono: 'bi bi-google',
      class: 'text-green-600 bg-transparent text-xl'
    }
  ]

  }

}
