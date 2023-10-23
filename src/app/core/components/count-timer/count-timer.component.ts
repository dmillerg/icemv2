import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountTimerService } from './service/count-timer.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-count-timer',
  standalone: true,
  imports: [CommonModule],
  providers: [CountTimerService],
  templateUrl: './count-timer.component.html',
  styleUrls: ['./count-timer.component.scss'],
})
export class CountTimerComponent implements OnInit, OnDestroy {
  @Input() fechaEntrada!: Date;
  @Output() finalizo = new EventEmitter<any>();
  tiempo: { hora: number; minuto: number; segundo: number } = {
    hora: 0,
    minuto: 0,
    segundo: 0,
  };
  intervalo: any;

  constructor(private countTimerService: CountTimerService) {}

  ngOnInit(): void {
    this.cargarTiempoRestante();
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalo);
  }

  cargarTiempoRestante() {
    let date = this.fechaEntrada;
    let fecha: string =
      date.getFullYear().toString() +
      '-' +
      (date.getMonth() + 1 < 10
        ? '0' + (date.getMonth() + 1)
        : date.getMonth() + 1
      ).toString() +
      '-' +
      (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()).toString();
    let hora: string =
      (date.getHours() < 10
        ? '0' + date.getHours()
        : date.getHours()
      ).toString() +
      ':' +
      (date.getMinutes() < 10
        ? '0' + date.getMinutes()
        : date.getMinutes()
      ).toString() +
      ':' +
      (date.getSeconds() < 10
        ? '0' + date.getSeconds()
        : date.getSeconds()
      ).toString();
    let formData = new FormData();
    formData.append('fecha', fecha + ' ' + hora);
    this.countTimerService
      .getTiempoRestanteCarrito(formData)
      .pipe(take(1))
      .subscribe({
        next: (result) => {
          this.tiempo.hora = result.hora;
          this.tiempo.minuto = result.minuto;
          this.tiempo.segundo = result.segundo;

          this.intervalo = setInterval(() => {
            this.disminuirSec();
          }, 1000);
        },
      });
  }

  disminuirSec() {
    if (
      this.tiempo.hora <= 0 &&
      this.tiempo.minuto <= 0 &&
      this.tiempo.segundo <= 0
    ) {
      clearInterval(this.intervalo);
      this.finalizo.emit();
    } else {
      if (this.tiempo.segundo == 0) {
        this.tiempo.segundo = 59;
        this.disminuirMin();
      } else {
        this.tiempo.segundo--;
      }
    }
  }

  disminuirMin() {
    if (this.tiempo.minuto == 0) {
      this.tiempo.minuto = 59;
      this.disminuirHr();
    } else {
      this.tiempo.minuto--;
    }
  }

  disminuirHr() {
    if (this.tiempo.hora > 0) {
      this.tiempo.hora--;
    }
  }
}
