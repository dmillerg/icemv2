import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Boton } from './model/boton.model';

@Component({
  selector: 'app-boton-generico',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './boton-generico.component.html',
  styleUrls: ['./boton-generico.component.scss'],
})
export class BotonGenericoComponent {
  @Input() botones: Boton[] = [];
  @Input() value: any;

  emit(fun: Function) {
    fun(this.value);
  }
}
