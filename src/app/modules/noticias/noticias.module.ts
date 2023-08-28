import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoticiasComponent } from './noticias/noticias/noticias.component';
import { NoticiasRoutingModule } from './noticias-routing.module';
import { CardComponent } from 'src/app/core/components/card/card.component';
import { FormsModule } from '@angular/forms';
import { NoticiaFuentePipe } from 'src/app/core/pipes/noticias/noticias.pipe.spec';



@NgModule({
  declarations: [
    NoticiasComponent
  ],
  imports: [
    CommonModule,
    NoticiasRoutingModule,
    CardComponent,
    FormsModule,
  ],
  providers: [
    NoticiaFuentePipe
  ]

})
export class NoticiasModule { }
