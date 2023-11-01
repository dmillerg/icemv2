import {
  Component,
  ViewChild,
  Output,
  Input,
  EventEmitter,
  OnDestroy,
  AfterViewInit,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { FormGenericoComponent } from '../form-generico/form-generico.component';
import { BotonGenericoComponent } from '../boton-generico/boton-generico.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subscription, distinctUntilChanged } from 'rxjs';
import { Detalle, TextoDetalle } from './model/detalle.model';
import { Store } from '@ngrx/store';
import { selectDetalle } from 'src/app/shared/state/selectors/detalle.selector';
import { Formulario } from '../form-generico/model/formulario.model';
import { AdminService } from 'src/app/modules/admin/service/admin.service';
import { MatDividerModule } from '@angular/material/divider';
import { Boton } from '../boton-generico/model/boton.model';

@Component({
  selector: 'app-detalle-generico',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    FormGenericoComponent,
    BotonGenericoComponent,
    MatDividerModule,
  ],
  templateUrl: './detalle-generico.component.html',
  styleUrls: ['./detalle-generico.component.scss'],
})
export class DetalleGenericoComponent
  implements OnDestroy, AfterViewInit, OnInit
{
  readonly breakpoint$ = this._breakpointObserver
    .observe([Breakpoints.Large, Breakpoints.Medium, Breakpoints.Small])
    .pipe(distinctUntilChanged());
  private breakpointSub!: Subscription;
  drawerMode: 'side' | 'over' = 'side';
  @ViewChild('drawer') drawer!: MatDrawer;
  @Output() draweSalida = new EventEmitter<MatDrawer>();
  formulario?: Formulario;
  detalle: Detalle = {};
  detalleSub$: Subscription = new Subscription();
  formularioSub$: Subscription = new Subscription();
  botonCerrar: Boton[]=[
    {
      icono: 'bi bi-x',
      class: 'w-6 h-6 rounded-full',
      funcion: ()=>this.drawer.close(),
    }
  ];

  constructor(
    private _breakpointObserver: BreakpointObserver,
    private store: Store,
    private adminService: AdminService
  ) {
    this.breakpointSub = this.breakpoint$.subscribe({
      next: () => this.breakpointChanged(),
    });
    this.formularioSub$ = adminService.getFormulario().subscribe({
      next: (value: any) => {
        this.formulario = undefined;
        setTimeout(() => {
          this.formulario = value;
        }, 200);
      },
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.detalleSub$ = this.store.select(selectDetalle).subscribe({
        next: (value) => {
          if (Object.keys(value).length > 0) {
            this.detalle = value;
            this.drawer.open();
          } else if (this.drawer.opened) {
            this.drawer.close();
          }
        },
      });
    }, 500);
  }

  ngAfterViewInit(): void {
    this.draweSalida.emit(this.drawer);
  }

  ngOnDestroy(): void {
    this.breakpointSub.unsubscribe();
    this.detalleSub$.unsubscribe();
    this.formularioSub$.unsubscribe();
  }

  private breakpointChanged() {
    if (this._breakpointObserver.isMatched(Breakpoints.Large)) {
      this.drawerMode = 'side';
    } else if (this._breakpointObserver.isMatched(Breakpoints.Medium)) {
      this.drawerMode = 'side';
    } else if (this._breakpointObserver.isMatched(Breakpoints.Small)) {
      this.drawerMode = 'over';
    } else if (this._breakpointObserver.isMatched(Breakpoints.XSmall)) {
      this.drawerMode = 'over';
    } else {
      this.drawerMode = 'over';
    }
  }

}
