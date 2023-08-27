import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem } from '../../models/menu.model';
import { CatalogoService } from '../../services/catalogo.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  menu: MenuItem[] = [
    {
      nombre: 'Inicio',
      link: '',
      icono: 'bi bi-house',
      subitem: [
        { nombre: 'Inicio', link: '', icono: 'fa fa-users' },
        { nombre: 'Inicio', link: '', icono: 'fa fa-users' },
      ],
    },
    { nombre: 'Productos', link: '', icono: 'bi bi-box-seam' },
    {
      nombre: 'Quienes somos',
      link: '',
      icono: 'bi bi-people',
      subitem: [
        {
          nombre: 'Misión',
          icono: 'bi bi-people',
          link: '',
        },
        { nombre: 'Visión', icono: 'bi bi-people', link: '' },
        { nombre: 'Objetivo', icono: 'bi bi-people', link: '' },
        { nombre: 'Miembros del equipo', icono: 'bi bi-people', link: '' },
        { nombre: 'Actividades', icono: 'bi bi-people', link: '' },
      ],
    },
    { nombre: 'Noticias', link: '', icono: 'bi bi-newspaper' },
    { nombre: 'Nuevos desarrollos', link: '', icono: 'bi bi-building-gear' },
  ];

  iconoTema: 'bi bi-moon-stars'| 'bi bi-sun' = 'bi bi-moon-stars';

  menu2: MenuItem[] = [
    {nombre: 'acceder/registrarse', icono: 'bi bi-person', subitem: [
      {nombre: 'acceder', icono: 'bi bi-person-circle'},
      {nombre: 'registrarse', icono: 'bi bi-person-add'},
    ]},
    {icono: this.iconoTema}
  ];

  tema: string | null = '';

  constructor(private catalogoService: CatalogoService) {}

  ngOnInit(): void {
    this.obtenerCategorias();
    this.tema = localStorage.getItem('tema');
    if (this.tema === 'dark') {
      document.documentElement.classList.add('dark');
      this.tema = 'light';
    } else {
      document.documentElement.classList.remove('dark');
      this.tema = 'dark';
    }
    this.iconoTema = this.tema === 'dark'?'bi bi-sun':'bi bi-moon-stars';
    this.menu2[1].icono = this.iconoTema;
  }

  cambiarTema() {
    if (this.tema === 'dark') {
      document.documentElement.classList.add('dark');
      this.tema = 'light';
    } else {
      document.documentElement.classList.remove('dark');
      this.tema = 'dark';
    }
    this.iconoTema = this.tema === 'dark'?'bi bi-sun':'bi bi-moon-stars';
    this.menu2[1].icono = this.iconoTema;
    localStorage.setItem('tema', this.tema === 'dark' ? 'light' : 'dark');
  }

  emit(fun?: Function) {
    if (fun) fun();
  }

  obtenerCategorias() {
    this.catalogoService
      .obtenerCategorias()
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          const menu = [
            { nombre: 'Todos', icono: this.menu[1].icono, link: '' },
            ...response.map((e) => {
              return {
                nombre: e.nombre,
                icono: this.menu[1].icono,
                link: '',
              };
            }),
          ];
          this.menu[1].subitem = menu;
        },
      });
  }
}
