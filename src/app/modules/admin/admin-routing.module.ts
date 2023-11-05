import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminContainerComponent } from './components/admin-container/admin-container.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { ProductoComponent } from './components/producto/producto.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { DesarrolloComponent } from './components/desarrollo/desarrollo.component';
import { NoticiaComponent } from './components/noticia/noticia.component';
import { QuieneComponent } from './components/quiene/quiene.component';
import { PedidoComponent } from './components/pedido/pedido.component';
import { ComentarioComponent } from './components/comentario/comentario.component';

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
        component: NoticiaComponent,
      },
      {
        path: 'categoria',
        component: CategoriaComponent,
      },
      {
        path: 'desarrollo',
        component: DesarrolloComponent,
      },
      {
        path: 'comentario',
        component: ComentarioComponent,
      },
      {
        path: 'desarrollo',
        component: ProductoComponent,
      },
      {
        path: 'quiene',
        component: QuieneComponent,
      },
      {
        path: 'recogida',
        component: ProductoComponent,
      },

      {
        path: 'pedido',
        component: PedidoComponent,
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
