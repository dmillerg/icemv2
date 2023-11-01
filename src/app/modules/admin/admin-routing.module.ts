import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminContainerComponent } from './components/admin-container/admin-container.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { ProductoComponent } from './components/producto/producto.component';

const routes: Routes = [
  {
    path: '',
    component: AdminContainerComponent,
    children: [
      {
        path: '',
        redirectTo: 'usuario',
        pathMatch: 'full',
      },
      {
        path: 'usuario',
        component: UsuarioComponent,
      },
      {
        path: 'producto',
        component: ProductoComponent,
      },
      {
        path: 'noticia',
        component: ProductoComponent,
      },
      {
        path: 'categoria',
        component: ProductoComponent,
      },
      {
        path: 'desarrollo',
        component: ProductoComponent,
      },
      {
        path: 'comentario',
        component: ProductoComponent,
      },
      {
        path: 'desarrollo',
        component: ProductoComponent,
      },
      {
        path: 'quienes',
        component: ProductoComponent,
      },
      {
        path: 'recogida',
        component: ProductoComponent,
      },

      {
        path: 'pedidos',
        component: ProductoComponent,
      },
      {
        path: 'configuracion',
        component: ProductoComponent,
      },
      {
        path: 'venta',
        component: ProductoComponent,
      },
      {
        path: 'pregunta',
        component: ProductoComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
