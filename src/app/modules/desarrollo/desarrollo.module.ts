import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NuevosDesarrollosComponent } from './nuevos-desarrollos/nuevos-desarrollos/nuevos-desarrollos.component';
import { DesarrollosRoutingModule } from './desarrollo-routing.module';
import { CardComponent } from 'src/app/core/components/card/card.component';



@NgModule({
  declarations: [
    NuevosDesarrollosComponent
  ],
  imports: [
    CommonModule,
    DesarrollosRoutingModule,
    CardComponent,

  ]
})
export class DesarrolloModule { }
