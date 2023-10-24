import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminContainerComponent } from './components/admin-container/admin-container.component';
import { AdminRoutingModule } from './admin-routing.module';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSidenavModule} from '@angular/material/sidenav';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { ProductoComponent } from './producto/producto.component';
import { TableGenericoComponent } from 'src/app/core/components/table-generico/table-generico.component';
import { FormGenericoComponent } from 'src/app/core/components/form-generico/form-generico.component';

@NgModule({
  declarations: [
    AdminContainerComponent,
    UsuarioComponent,
    ProductoComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatTabsModule,
    MatSidenavModule,
    TableGenericoComponent,
    FormGenericoComponent,
  ]
})
export class AdminModule { }
