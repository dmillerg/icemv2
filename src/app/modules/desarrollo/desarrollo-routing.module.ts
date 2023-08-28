import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NuevosDesarrollosComponent } from './nuevos-desarrollos/nuevos-desarrollos/nuevos-desarrollos.component';

const routes: Routes = [{ path: '', component: NuevosDesarrollosComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DesarrollosRoutingModule {}