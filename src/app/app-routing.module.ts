import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  {
    path: 'inicio',
    loadChildren: () =>
      import('./modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'productos',
    loadChildren: () =>
      import('./modules/productos/productos.module').then(
        (m) => m.ProductosModule
      ),
  },
  {
    path: 'quienes-somos/:section',
    loadChildren: () =>
      import('./modules/quienes/quienes.module').then((m) => m.QuienesModule),
  },  
  {
    path: 'noticias',
    loadChildren: () =>
      import('./modules/noticias/noticias.module').then((m) => m.NoticiasModule),
  },  
  {
    path: 'nuevos-desarrollos',
    loadChildren: () =>
      import('./modules/desarrollo/desarrollo.module').then((m) => m.DesarrolloModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
