import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { CardComponent } from 'src/app/core/components/card/card.component';
import { SectionServiciosComponent } from './section-servicios/section-servicios.component';
import { SectionProductosComponent } from './section-productos/section-productos.component';
import { SectionDesarrolloComponent } from './section-desarrollo/section-desarrollo.component';
import { BotonGenericoComponent } from 'src/app/core/components/boton-generico/boton-generico.component';
import { SectionCatalogoComponent } from './section-catalogo/section-catalogo.component';



@NgModule({
  declarations: [
    HomeComponent,
    SectionServiciosComponent,
    SectionProductosComponent,
    SectionDesarrolloComponent,
    SectionCatalogoComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    CardComponent,
    BotonGenericoComponent,
  ]
})
export class HomeModule { }
