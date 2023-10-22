import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Boton } from './model/boton.model';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-boton-generico',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './boton-generico.component.html',
  styleUrls: ['./boton-generico.component.scss'],
})
export class BotonGenericoComponent {
  @Input() botones: Boton[] = [];
  @Input() value: any;

  emit(fun?: Function) {
    if (fun) fun(this.value);
  }
}
