import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
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

@NgModule({
  declarations: [AdminContainerComponent, UsuarioComponent, ProductoComponent],
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
  providers: [DatePipe],
})
export class AdminModule {}
