import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoticiasComponent } from './noticias/noticias/noticias.component';
import { NoticiasRoutingModule } from './noticias-routing.module';
import { CardComponent } from 'src/app/core/components/card/card.component';



@NgModule({
  declarations: [
    NoticiasComponent
  ],
  imports: [
    CommonModule,
    NoticiasRoutingModule,
    CardComponent,
  ]
})
export class NoticiasModule { }
