import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
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
      import('./modules/noticias/noticias.module').then(
        (m) => m.NoticiasModule
      ),
  },
  {
    path: 'nuevos-desarrollos',
    loadChildren: () =>
      import('./modules/desarrollo/desarrollo.module').then(
        (m) => m.DesarrolloModule
      ),
  },
  {
    path: 'usuario',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/usuario/usuario.module').then((m) => m.UsuarioModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
