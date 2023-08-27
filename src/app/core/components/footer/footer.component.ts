import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfiguracionService } from '../../services/configuracion.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  fechaActual: string = '';

  constructor
    (
      private configuracionService: ConfiguracionService
    ) { }

  fechaActualizacion() {
    this.configuracionService.ultimaActualizacion().subscribe({
      next: (response) => { this.fechaActual = response[0].ultsession },
    })
  }

}
