import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_SNACK_BAR_DATA, MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Snack } from './model/snack.model';
import { Boton } from '../boton-generico/model/boton.model';
import { BotonGenericoComponent } from '../boton-generico/boton-generico.component';

@Component({
  selector: 'app-snack',
  standalone: true,
  imports: [CommonModule, MatSnackBarModule, BotonGenericoComponent],
  templateUrl: './snack.component.html',
  styleUrls: ['./snack.component.scss']
})
export class SnackComponent {
  boton: Boton[]=[{
    icono: 'bi bi-x',
    class: 'p-2 rounded-full dark:text-gray-900 text-gray-300',
    funcion:()=>this.close()
  }]
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: Snack,private snackBar: MatSnackBar){}

  close(): void {
    this.snackBar.dismiss();
  }
}
