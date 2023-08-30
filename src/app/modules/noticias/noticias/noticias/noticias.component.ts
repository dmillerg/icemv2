import { Component, OnInit, OnDestroy } from '@angular/core';
import { Noticia } from '../../model/noticias';
import { Card } from 'src/app/core/models/card.model';
import { NoticiaService } from '../../services/noticia.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss']
})
export class NoticiasComponent implements OnInit, OnDestroy {
  noticias_icem: Noticia[] = [];
  noticias_no_icem: Noticia[] = [];
  noticia!: Noticia[];
  noticia_filtro: string = '';
  noticiaCard: Card[] = [];
  noticia_no_icem_copy: Noticia[] = [];
  sub$: Subscription = new Subscription();

  constructor(
    private noticiaService: NoticiaService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadNoticias()
    this.obtenerRuta();
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
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

  obtenerRuta() {
    this.sub$ = this.route.params.subscribe((params) => {
      const section = +params['section'];
      console.log(params);
      
      console.log(section);
      
      // document.getElementById(section)
    });
  }
}
