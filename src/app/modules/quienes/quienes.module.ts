import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuienesSomosComponent } from './quienes-somos/quienes-somos/quienes-somos.component';
import { QuienesSomosItemComponent } from './quienes-somos/quienes-somos-item/quienes-somos-item.component';
import { QuienesRoutingModule } from './quienes-routing.module';
import { SectionContactenosComponent } from 'src/app/core/components/section-contactenos/section-contactenos.component';



@NgModule({
  declarations: [
    QuienesSomosComponent,
    QuienesSomosItemComponent,
  ],
  imports: [
    CommonModule,
    QuienesRoutingModule,
    SectionContactenosComponent
  ]
})
export class QuienesModule { }
