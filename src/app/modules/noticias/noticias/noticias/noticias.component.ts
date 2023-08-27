import { Component, OnInit } from '@angular/core';
import { Noticia } from '../../model/noticias';
import { Card } from 'src/app/core/models/card.model';
import { NoticiaService } from '../../services/noticia.service';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss']
})
export class NoticiasComponent implements OnInit{
  noticias_icem: Noticia[] = [];
  noticias_no_icem: Noticia[] = [];
  noticia!: Noticia[];
  noticia_filtro: string = '';
  noticiaCard: Card[] = [];

  constructor(
    private noticiaService: NoticiaService
  ){}

  ngOnInit(): void {
      
  }

  rellenarColumns() {
    this.noticias_icem = this.noticia.filter(e => e.fuente == 'ICEM');
    this.noticias_no_icem = this.noticia.filter(e => e.fuente != 'ICEM');
  }

  loadNoticia() {
    // this.searching = true;
    this.noticiaService.getNoticias(0, this.noticia_filtro).subscribe({
      next: (response) => {
      this.noticia = Array.isArray(response)? response : []
      this.rellenarColumns();
      // this.searching = false;
    }
    });
  }

  generateNoticiaCard(){
    this.noticiaCard = [
      {

      }
    ]
  }
}
