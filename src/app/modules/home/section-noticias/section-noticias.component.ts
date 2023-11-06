import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/core/models/card.model';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { CatalogoService } from 'src/app/core/services/catalogo.service';
import { Noticia } from '../../noticias/model/noticias';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-section-noticias',
  templateUrl: './section-noticias.component.html',
  styleUrls: ['./section-noticias.component.scss']
})
export class SectionNoticiasComponent implements OnInit {
  noticia: any

  constructor(
    private catalogoService: CatalogoService,
    private router: Router) { }

  ngOnInit(): void {
    this.obtenerNoticiaReciente();
  }

  obtenerNoticiaReciente(){
    this.catalogoService.cargaNoticias().pipe(take(1)).subscribe({
      next: (result) => {
        if(result.length > 0){
          this.noticia = result[0];
          this.noticia.logo = this.noticia.logo == '' ? 'assets/icon-icem-gray.png' : this.noticia.logo;
          result[0].imagen.includes('http') ? result[0].imagen : this.cargarImagen(result[0]);
        }
      }
    })
  }

  cargarImagen(e: Noticia) {
    this.noticia.imagen = environment.url_backend + `pictures/${e.id}?tipo=noticias`
  }

}
