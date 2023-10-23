import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Boton } from './model/boton.model';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'

@Component({
  selector: 'app-boton-generico',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatProgressSpinnerModule],
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
