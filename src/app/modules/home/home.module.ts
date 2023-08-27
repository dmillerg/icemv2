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
import { SectionContactenosComponent } from './section-contactenos/section-contactenos.component';
import { FormGenericoComponent } from 'src/app/core/components/form-generico/form-generico.component';



@NgModule({
  declarations: [
    HomeComponent,
    SectionServiciosComponent,
    SectionProductosComponent,
    SectionDesarrolloComponent,
    SectionCatalogoComponent,
    SectionContactenosComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    CardComponent,
    BotonGenericoComponent,
    FormGenericoComponent,
  ]
})
export class HomeModule { }
