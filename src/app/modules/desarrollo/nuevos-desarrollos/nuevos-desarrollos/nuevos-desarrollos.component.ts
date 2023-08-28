import { Component, OnInit } from '@angular/core';
import { DesarrollosService } from '../../services/desarrollos.service';
import { Desarrollo } from '../../model/desarrollo';
import { Card } from 'src/app/core/models/card.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-nuevos-desarrollos',
  templateUrl: './nuevos-desarrollos.component.html',
  styleUrls: ['./nuevos-desarrollos.component.scss']
})
export class NuevosDesarrollosComponent implements OnInit {
  desarrollos: Desarrollo[] = [];
  desarrolloCard: Card[] = [];

  constructor(private nuevoDesarrolloService: DesarrollosService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.nuevoDesarrolloService.getDesarrollos().subscribe({
      next: (response) => {
        this.desarrollos = response&& response.length>0?response:[];;
        this.generateProductCard(this.desarrollos)
      }
    })
  }

  generateProductCard(desarrollo: Desarrollo[]){
    this.desarrolloCard = desarrollo.map((e: Desarrollo) => {
      return{
        titulo: e.titulo,
        descripcion: e.descripcion,
        imagen: environment.url_backend + `pictures/${e.id}?tipo=desarrollos`
      }
    })
  }
}


