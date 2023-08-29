import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosComponent } from './productos/productos.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductosRoutingModule } from './productos-routing.module';
import { ProductoEspecificacionComponent } from 'src/app/core/components/producto-especificacion/producto-especificacion.component';
import { CardComponent } from 'src/app/core/components/card/card.component';

@NgModule({
  declarations: [ProductosComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProductosRoutingModule,
    ProductoEspecificacionComponent,
    CardComponent,
  ],
})
export class ProductosModule {}
