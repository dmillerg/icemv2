import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Formulario } from '../form-generico/model/formulario.model';
import { FormGenericoComponent } from '../form-generico/form-generico.component';
import { Collapse } from './model/collapse.model';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-collapse',
  standalone: true,
  imports: [CommonModule, FormGenericoComponent],
  templateUrl: './collapse.component.html',
  styleUrls: ['./collapse.component.scss'],
})
export class CollapseComponent implements OnInit, OnDestroy {
  @Input() collapseItem!: Collapse;
  @Input() abierto: boolean = false;

  erroSub: Subscription = new Subscription();
  error: boolean = false;
  ngOnInit(): void {
    setTimeout(() => {
      if (this.abierto) this.collapse();
      if (this.collapseItem.formulario)
        this.erroSub =
          this.collapseItem.formulario!.form!.valueChanges.subscribe({
            next: () => {
              this.error =
                this.collapseItem.formulario!.form!.touched &&
                this.collapseItem.formulario!.form!.invalid;
            },
          });
    }, 200);
  }

  ngOnDestroy(): void {
    this.erroSub.unsubscribe();
  }

  collapse() {
    let collap = document.getElementById(this.collapseItem.id.toString());
    collap!.classList.toggle('active');
    let content = document.getElementById(this.collapseItem.id + 'content');
    content!.classList.toggle('active');
  }
}
