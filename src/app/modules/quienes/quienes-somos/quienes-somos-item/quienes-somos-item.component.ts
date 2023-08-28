import { Component, Input, OnInit } from '@angular/core';
import { Quienes } from '../../model/quienes';
import { QuienesService } from '../../services/quienes.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-quienes-somos-item',
  templateUrl: './quienes-somos-item.component.html',
  styleUrls: ['./quienes-somos-item.component.scss']
})
export class QuienesSomosItemComponent implements OnInit {

  @Input() quienes!: Quienes;
  src: string = '';

  constructor(private quienesSomosService: QuienesService) { }

  ngOnInit(): void {
  this.src = environment.url_backend+`pictures/${this.quienes.id}?tipo=quienes`
  }
}
