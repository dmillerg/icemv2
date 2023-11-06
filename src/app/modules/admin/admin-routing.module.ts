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
import { RecogidaComponent } from './components/recogida/recogida.component';
import { VentaComponent } from './components/venta/venta.component';
import { PreguntaComponent } from './components/pregunta/pregunta.component';
import { ConfiguracionComponent } from './components/configuracion/configuracion.component';

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
        path: 'quienes',
        component: QuieneComponent,
      },
      {
        path: 'recogida',
        component: RecogidaComponent,
      },

      {
        path: 'pedido',
        component: PedidoComponent,
      },
      {
        path: 'configuracion',
        component: ConfiguracionComponent,
      },
      {
        path: 'venta',
        component: VentaComponent,
      },
      {
        path: 'pregunta',
        component: PreguntaComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
