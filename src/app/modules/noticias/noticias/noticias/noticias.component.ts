import { Component, OnInit } from '@angular/core';
import { Noticia } from '../../model/noticias';
import { Card } from 'src/app/core/models/card.model';
import { NoticiaService } from '../../services/noticia.service';
import { environment } from 'src/environments/environment';
import { NoticiaFuentePipe } from 'src/app/core/pipes/noticias/noticias.pipe.spec';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss']
})
export class NoticiasComponent implements OnInit {
  noticias_icem: Noticia[] = [];
  noticias_no_icem: Noticia[] = [];
  noticia!: Noticia[];
  noticia_filtro: string = '';
  noticiaCard: Card[] = [];
  noticia_no_icem_copy: Noticia[] = []

  constructor(
    private noticiaService: NoticiaService,
    private noticiaPipe: NoticiaFuentePipe,
  ) { }

  ngOnInit(): void {
    this.loadNoticias()
  }

  rellenarColumns() {
    this.noticias_icem = this.noticia.filter(e => e.fuente == 'ICEM');
    this.noticias_no_icem = this.noticia.filter(e => e.fuente != 'ICEM');
    this.generateNoticiaCard(this.noticias_no_icem);
    this.noticiasIcem(this.noticias_icem);
  }

  loadNoticias() {
    // this.searching = true;
    this.noticiaService.getNoticias(0, this.noticia_filtro).subscribe({
      next: (response) => {
        this.noticia = Array.isArray(response) ? response : []
        this.rellenarColumns();
        // this.searching = false;
      }
    });
  }

  filtrarNoticias() {
    this.noticia_no_icem_copy = this.noticias_no_icem.filter((e) => e.fuente.toLocaleLowerCase().indexOf(this.noticia_filtro) > -1 || e.titulo.toLocaleLowerCase().indexOf(this.noticia_filtro) > -1)
    this.generateNoticiaCard(this.noticia_no_icem_copy)
  }

  noticiasIcem(noticias: Noticia[]) {
    this.noticias_icem = noticias.map((e: Noticia) => {
      return {
        ...e,
        imagen: environment.url_backend + `pictures/${e.id}?tipo=noticias`,

      }
    })
  }

  generateNoticiaCard(noticias: Noticia[]) {
    this.noticiaCard = noticias.map((e: Noticia) => {
      return {
        titulo: e.titulo,
        descripcion: e.descripcion,
        imagen: e.imagen,
        classDescripcion: 'line-clamp-3',
        botones: [{
          label: 'Visitar',
          funcion: () => {
            window.open(e.enlace, '_blank');
          }
        }]
        // imagen: environment.url_backend + `pictures/${e.id}?tipo=noticias`
      }
    })
  }
}
