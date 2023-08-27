import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem } from '../../models/menu.model';
import { CatalogoService } from '../../services/catalogo.service';
import { take } from 'rxjs';
import { MenuGenericoComponent } from '../menu-generico/menu-generico.component';
import { scaleAnimation } from 'src/app/animations';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MenuGenericoComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [scaleAnimation],
})
export class HeaderComponent implements OnInit {
  iconoTema: 'bi bi-moon-stars' | 'bi bi-sun' = 'bi bi-moon-stars';
  temaNombre: 'Modo oscuro' | 'Modo claro' = 'Modo oscuro';
  tema: string | null = '';
  buscar: boolean = false;

  menusm: MenuItem[] = [
    {
      icono: 'bi bi-person',
      subitem: [
        { nombre: 'acceder', icono: 'bi bi-person-circle' },
        { nombre: 'registrarse', icono: 'bi bi-person-add' },
      ],
    },
    {
      icono: 'bi bi-three-dots-vertical',
      subitem: [
        {
          nombre: 'Inicio',
          link: 'inicio',
          icono: 'bi bi-house',
        },
        { nombre: 'Productos', link: 'productos', icono: 'bi bi-box-seam' },
        {
          nombre: 'Quienes somos',
          link: 'quienes',
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
        { nombre: 'Noticias', link: 'noticias', icono: 'bi bi-newspaper' },
        {
          nombre: 'Nuevos desarrollos',
          link: 'nuevos',
          icono: 'bi bi-building-gear',
        },
        {
          nombre: 'Buscar',
          icono: 'bi bi-search',
          accion: () => (this.buscar = !this.buscar),
        },
        {
          nombre: 'Modo oscuro',
          icono: this.iconoTema,
          accion: () => this.cambiarTema(),
        },
      ],
    },
  ];

  menu: MenuItem[] = [
    {
      nombre: 'Inicio',
      link: 'inicio',
      icono: 'bi bi-house',
    },
    { nombre: 'Productos', link: 'productos', icono: 'bi bi-box-seam' },
    {
      nombre: 'Quienes somos',
      link: 'quienes',
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
    { nombre: 'Noticias', link: 'noticias', icono: 'bi bi-newspaper' },
    {
      nombre: 'Nuevos desarrollos',
      link: 'nuevos',
      icono: 'bi bi-building-gear',
    },
    {
      nombre: 'Buscar',
      icono: 'bi bi-search',
      accion: () => (this.buscar = !this.buscar),
    },
  ];

  menu2: MenuItem[] = [
    {
      nombre: 'acceder/registrarse',
      icono: 'bi bi-person',
      subitem: [
        { nombre: 'acceder', icono: 'bi bi-person-circle' },
        { nombre: 'registrarse', icono: 'bi bi-person-add' },
      ],
    },
    { icono: this.iconoTema, accion: () => this.cambiarTema() },
  ];

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
    this.iconoTema = this.tema === 'dark' ? 'bi bi-moon-stars' : 'bi bi-sun';
    this.temaNombre = this.tema === 'dark' ? 'Modo oscuro' : 'Modo claro';
    this.menu2[1].icono = this.iconoTema;
    this.menusm[1].subitem![6].nombre = this.temaNombre;
    this.menusm[1].subitem![6].icono = this.iconoTema;

  }

  cambiarTema() {
    if (this.tema === 'dark') {
      document.documentElement.classList.add('dark');
      this.tema = 'light';
    } else {
      document.documentElement.classList.remove('dark');
      this.tema = 'dark';
    }
    this.temaNombre = this.tema === 'dark' ? 'Modo oscuro' : 'Modo claro';
    this.iconoTema = this.tema === 'dark' ? 'bi bi-moon-stars' : 'bi bi-sun';
    this.menu2[1].icono = this.iconoTema;
    this.menusm[1].subitem![6].nombre = this.temaNombre;
    this.menusm[1].subitem![6].icono = this.iconoTema;

    localStorage.setItem('tema', this.tema === 'dark' ? 'light' : 'dark');
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
