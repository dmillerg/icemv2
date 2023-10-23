import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilComponent } from './components/perfil/perfil.component';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { BotonGenericoComponent } from 'src/app/core/components/boton-generico/boton-generico.component';
import { MatDividerModule } from '@angular/material/divider';
import { TableGenericoComponent } from 'src/app/core/components/table-generico/table-generico.component';
import { CountTimerComponent } from 'src/app/core/components/count-timer/count-timer.component';



@NgModule({
  declarations: [
    PerfilComponent
  ],
  imports: [
    UsuarioRoutingModule,
    CommonModule,
    BotonGenericoComponent,
    MatDividerModule,
    TableGenericoComponent,
    CountTimerComponent
  ]
})
export class UsuarioModule { }
