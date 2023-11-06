import { Component, ViewChild, OnDestroy } from '@angular/core';
import { Tab } from '../../model/tab.model';
import { MatTabGroup } from '@angular/material/tabs';
import { MatDrawer } from '@angular/material/sidenav';
import { Formulario } from 'src/app/core/components/form-generico/model/formulario.model';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subscription, distinctUntilChanged } from 'rxjs';
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationStart,
  Router,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { deleteAllDetalle } from 'src/app/shared/state/actions/detalle.actions';

@Component({
  selector: 'app-admin-container',
  templateUrl: './admin-container.component.html',
  styleUrls: ['./admin-container.component.scss'],
})
export class AdminContainerComponent {
  seleccionado: number = 0;

  tabs: Tab[] = [
    { nombre: 'Usuarios', icono: 'bi bi-person', ruta: 'usuario' },
    { nombre: 'Productos', ruta: 'producto' },
    { nombre: 'Noticias', ruta: 'noticia' },
    { nombre: 'Categorías', ruta: 'categoria' },
    { nombre: 'Desarrollos', ruta: 'desarrollo' },
    { nombre: 'Comentarios', ruta: 'comentario' },
    { nombre: 'Quienes', ruta: 'quienes' },
    { nombre: 'Recogida', ruta: 'recogida' },
    { nombre: 'Pedidos', ruta: 'pedido' },
    { nombre: 'Configuración', ruta: 'configuracion' },
    { nombre: 'Ventas', ruta: 'venta' },
    { nombre: 'Preguntas', ruta: 'pregunta' },
  ];
  rutaSub$: Subscription = new Subscription();

  constructor(private router: Router,private store: Store) {
    this.obtenerRuta();
  }

  obtenerRuta() {
    this.rutaSub$ = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const ruta = event.url.split('/').pop();
        this.tabs.forEach((e, i) => {
          if (e.ruta === ruta) this.seleccionado = i;
        });
      }
    });
  }

  seleccionaTab(tab: number) {
    this.store.dispatch(deleteAllDetalle());
    this.seleccionado = tab;
    this.router.navigate(['admin/' + this.tabs[tab].ruta]);
  }
}
