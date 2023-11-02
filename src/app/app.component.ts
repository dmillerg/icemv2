import { Component,ViewChild,ViewContainerRef , TemplateRef} from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalService } from './core/components/modal/modal.service';
import { ProductosComponent } from './modules/productos/productos/productos.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'icem';
}



