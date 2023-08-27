import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from '../../models/card.model';
import { BotonGenericoComponent } from '../boton-generico/boton-generico.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, BotonGenericoComponent],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() card: Card[] = [];

  esHoy(date?: Date): boolean {
    if (date) {
      const hoy = new Date();
      return (
        hoy.getFullYear() === date.getFullYear() &&
        hoy.getMonth() === date.getMonth() &&
        hoy.getDate() === date.getDate()
      );
    } else {
      return false;
    }
  }
}
