import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem } from '../../models/menu.model';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MatRippleModule } from '@angular/material/core';

@Component({
  selector: 'app-menu-generico',
  standalone: true,
  imports: [CommonModule, AppRoutingModule, MatRippleModule],
  templateUrl: './menu-generico.component.html',
  styleUrls: ['./menu-generico.component.scss'],
})
export class MenuGenericoComponent {
  @Input() menu: MenuItem[] = [];

  emit(fun?: Function) {
    if (fun) fun();
  }
}
