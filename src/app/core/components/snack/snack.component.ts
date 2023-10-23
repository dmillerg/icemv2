import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_SNACK_BAR_DATA, MatSnackBarModule } from '@angular/material/snack-bar';
import { Snack } from './model/snack.model';

@Component({
  selector: 'app-snack',
  standalone: true,
  imports: [CommonModule, MatSnackBarModule],
  templateUrl: './snack.component.html',
  styleUrls: ['./snack.component.scss']
})
export class SnackComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: Snack){}
}
