import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Listado, MenuItem } from '../../models/menu.model';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MatRippleModule } from '@angular/material/core';
import { CountTimerComponent } from '../count-timer/count-timer.component';
import { Router } from '@angular/router';
import { ConfiguracionService } from '../../services/configuracion.service';
import { take } from 'rxjs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Store } from '@ngrx/store';
import { deleteCarrito } from 'src/app/shared/state/actions/carrito.action';
import { Carrito } from '../../models/carrito.model';

@Component({
  selector: 'app-menu-generico',
  standalone: true,
  imports: [
    CommonModule,
    AppRoutingModule,
    MatRippleModule,
    MatTooltipModule,
    CountTimerComponent,
  ],
  templateUrl: './menu-generico.component.html',
  styleUrls: ['./menu-generico.component.scss'],
})
export class MenuGenericoComponent {
  @Input() menu: MenuItem[] = [];

  constructor(
    private router: Router,
    private configuracioService: ConfiguracionService,
    private store: Store,
  ) {}

  emit(fun?: Function) {
    if (fun) fun();
  }

  reservar() {
    this.router.navigate(['usuario']);
  }

  finalizo(listado: Listado[]) {
    this.bajarCarrito(listado as Carrito[]);
  }

  bajarCarrito(carrito: Carrito[]) {
    carrito.forEach((e) => {
      this.configuracioService
        .deleteCarrito(e.id)
        .pipe(take(1))
        .subscribe({
          next: (response) => {
            this.store.dispatch(deleteCarrito({carrito:e}))
          },
        });
    });
  }
}
