import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from '@angular/cdk/dialog';
import { FormGenericoComponent } from '../form-generico/form-generico.component';
import { CollapseComponent } from '../collapse/collapse.component';
import { MatDividerModule } from '@angular/material/divider';
import { BotonGenericoComponent } from '../boton-generico/boton-generico.component';
import { Modal } from './model/modal.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-generico',
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    FormGenericoComponent,
    CollapseComponent,
    MatDividerModule,
    BotonGenericoComponent,
  ],
  templateUrl: './modal-generico.component.html',
  styleUrls: ['./modal-generico.component.scss'],
})
export class ModalGenericoComponent {
  modal!: Modal;

  constructor(
    public dialogRef: MatDialogRef<ModalGenericoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Modal
  ) {
    this.modal = data;
  }
}
