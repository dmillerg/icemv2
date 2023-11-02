import { Component, OnInit, OnDestroy } from '@angular/core';
import { Quienes } from '../../model/quienes';
import { QuienesService } from '../../services/quienes.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-quienes-somos',
  templateUrl: './quienes-somos.component.html',
  styleUrls: ['./quienes-somos.component.scss'],
})
export class QuienesSomosComponent implements OnInit, OnDestroy {
  integrantes: Quienes[] = [];
  sub$: Subscription = new Subscription();

  constructor(
    private quienesSomosService: QuienesService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.loadQuienes();
    this.obtenerRuta();
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }

  loadQuienes() {
    this.quienesSomosService.getQuienes().subscribe({
      next: (response) => {
        this.integrantes = response && response.length > 0 ? response : [];
      },
    });
  }

  obtenerRuta() {
    this.sub$ = this.route.params.subscribe((params) => {
      const section = params['section'];
      document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
    });
  }
}
