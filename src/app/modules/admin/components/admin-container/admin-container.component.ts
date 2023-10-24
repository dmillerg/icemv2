import { Component, ViewChild, OnDestroy } from '@angular/core';
import { Tab } from '../../model/tab.model';
import { MatTabGroup } from '@angular/material/tabs';
import { MatDrawer } from '@angular/material/sidenav';
import { Formulario } from 'src/app/core/components/form-generico/model/formulario.model';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subscription, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-admin-container',
  templateUrl: './admin-container.component.html',
  styleUrls: ['./admin-container.component.scss'],
})
export class AdminContainerComponent implements OnDestroy {
  @ViewChild('tabGroup', { static: false }) tab!: MatTabGroup;
  @ViewChild('drawer') drawer!: MatDrawer;
  formulario!: Formulario;
  seleccionado: number = 0;

  readonly breakpoint$ = this._breakpointObserver
    .observe([Breakpoints.Large, Breakpoints.Medium, Breakpoints.Small])
    .pipe(distinctUntilChanged());
  private breakpointSub!: Subscription;
  drawerMode: 'side' | 'over' = 'side';

  tabs: Tab[] = [
    { nombre: 'Usuarios', icono: 'bi bi-person' },
    { nombre: 'Productos' },
    { nombre: 'Noticias' },
    { nombre: 'Categorías' },
    { nombre: 'Desarrollos' },
    { nombre: 'Comentarios' },
    { nombre: 'Quienes' },
    { nombre: 'Recogida' },
    { nombre: 'Pedidos' },
    { nombre: 'Configuración' },
    { nombre: 'Ventas' },
    { nombre: 'Preguntas' },
    { nombre: 'Cerrar sesión' },
  ];

  showFiller: boolean = false;

  constructor(private _breakpointObserver: BreakpointObserver) {
    this.breakpointSub = this.breakpoint$.subscribe({
      next: () => this.breakpointChanged(),
    });
  }

  ngOnDestroy(): void {
    this.breakpointSub.unsubscribe();
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

  OnSeleccion(item?: Formulario) {
    if (item) {
      this.drawer.open();
      this.formulario = item;
    } else this.drawer.close();
  }
}
