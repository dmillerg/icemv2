import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { AdminContainerComponent } from './components/admin-container/admin-container.component';
import { AdminRoutingModule } from './admin-routing.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { ProductoComponent } from './components/producto/producto.component';
import { TableGenericoComponent } from 'src/app/core/components/table-generico/table-generico.component';
import { FormGenericoComponent } from 'src/app/core/components/form-generico/form-generico.component';
import { DetalleGenericoComponent } from 'src/app/core/components/detalle-generico/detalle-generico.component';
import { BotonGenericoComponent } from 'src/app/core/components/boton-generico/boton-generico.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { DesarrolloComponent } from './components/desarrollo/desarrollo.component';
import { NoticiaComponent } from './components/noticia/noticia.component';

@NgModule({
  declarations: [AdminContainerComponent, UsuarioComponent, ProductoComponent, CategoriaComponent, DesarrolloComponent, NoticiaComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatTabsModule,
    MatSidenavModule,
    TableGenericoComponent,
    FormGenericoComponent,
    DetalleGenericoComponent,
    BotonGenericoComponent,
  ],
  providers: [DatePipe, DecimalPipe],
})
export class AdminModule {}
