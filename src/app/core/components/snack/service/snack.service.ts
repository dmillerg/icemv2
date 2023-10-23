import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { SnackComponent } from '../snack.component';
import { Snack } from '../model/snack.model';

@Injectable({
  providedIn: 'root',
})
export class SnackService {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds = 5;

  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar(data: Snack) {
    this._snackBar.openFromComponent(SnackComponent, {
      data: data,
      duration: this.durationInSeconds * 1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  success(data: Snack){
    data.icono = 'bi bi-check bg-green-500 rounded-full'
    this._snackBar.openFromComponent(SnackComponent, {
      data: data,
      duration: this.durationInSeconds * 1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  error(data: Snack){
    data.icono = 'bi bi-x bg-red-500 rounded-full'
    this._snackBar.openFromComponent(SnackComponent, {
      data: data,
      duration: this.durationInSeconds * 1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
