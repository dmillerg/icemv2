import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem } from '../../models/menu.model';
import { CatalogoService } from '../../services/catalogo.service';
import { take } from 'rxjs';
import { MenuGenericoComponent } from '../menu-generico/menu-generico.component';
import { scaleAnimation } from 'src/app/animations';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MenuGenericoComponent, ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [scaleAnimation],
})
export class HeaderComponent implements OnInit {
  iconoTema: 'bi bi-moon-stars' | 'bi bi-sun' = 'bi bi-moon-stars';
  temaNombre: 'Modo oscuro' | 'Modo claro' = 'Modo oscuro';
  tema: string | null = '';
  buscar: boolean = false;
  dataUsuario: Usuario | null = null;

  menusm: MenuItem[] = [
    {
      icono: 'bi bi-person',
      sm: true,
      subitem: [
        {
          nombre: 'acceder',
          icono: 'bi bi-person-circle',
          accion: () => {
            this.router.navigate([`quienes-somos/objetivo`]);
          },
        },
        {
          nombre: 'registrarse',
          icono: 'bi bi-person-add',
          accion: () => {
            this.router.navigate([`quienes-somos/objetivo`]);
          },
        },
      ],
    },
    {
      sm: true,
      icono: 'bi bi-three-dots-vertical',
      subitem: [
        {
          nombre: 'Inicio',
          icono: 'bi bi-house',
          accion: () => {
            this.router.navigate([`inicio`]);
          },
        },
        {
          nombre: 'Productos',
          icono: 'bi bi-box-seam',
          sm: true,
          accion: () => {
            this.router.navigate([`productos/undefined`]);
          },
        },
        {
          nombre: 'Quienes somos',
          icono: 'bi bi-people',
          sm: true,
          accion: () => {
            this.router.navigate([`quienes-somos/undefined`]);
          },
          // subitem: [
          //   {
          //     nombre: 'Misión',
          //     icono: 'bi bi-people',
          //     link: '',
          //   },
          //   { nombre: 'Visión', icono: 'bi bi-people', link: '' },
          //   { nombre: 'Objetivo', icono: 'bi bi-people', link: '' },
          //   { nombre: 'Miembros del equipo', icono: 'bi bi-people', link: '' },
          //   { nombre: 'Actividades', icono: 'bi bi-people', link: '' },
          // ],
        },
        {
          nombre: 'Noticias',
          icono: 'bi bi-newspaper',
          sm: true,

          accion: () => {
            this.router.navigate([`noticias`]);
          },
        },
        {
          nombre: 'Nuevos desarrollos',
          icono: 'bi bi-building-gear',
          sm: true,
          accion: () => {
            this.router.navigate([`nuevos-desarrollos`]);
          },
        },
        {
          nombre: 'Buscar',
          icono: 'bi bi-search',
          sm: true,
          accion: () => (this.buscar = !this.buscar),
        },
        {
          nombre: 'Modo oscuro',
          icono: this.iconoTema,
          sm: true,
          accion: () => this.cambiarTema(),
        },
      ],
    },
  ];

  menu: MenuItem[] = [
    {
      nombre: 'Inicio',
      icono: 'bi bi-house',
      accion: () => {
        this.router.navigate([`inicio`]);
      },
    },
    {
      nombre: 'Productos',
      icono: 'bi bi-box-seam',
      accion: () => {
        this.router.navigate([`productos/-1`]);
      },
    },
    {
      nombre: 'Quienes somos',
      icono: 'bi bi-people',
      accion: () => {
        this.router.navigate([`quienes-somos/undefined`]);
      },
      subitem: [
        {
          nombre: 'Misión',
          icono: 'bi bi-people',
          accion: () => {
            this.router.navigate([`quienes-somos/mision`]);
          },
        },
        {
          nombre: 'Visión',
          icono: 'bi bi-people',
          accion: () => {
            this.router.navigate([`quienes-somos/vision`]);
          },
        },
        {
          nombre: 'Objetivo',
          icono: 'bi bi-people',
          accion: () => {
            this.router.navigate([`quienes-somos/objetivo`]);
          },
        },
        {
          nombre: 'Miembros del equipo',
          icono: 'bi bi-people',
          accion: () => {
            this.router.navigate([`quienes-somos/miembros`]);
          },
        },
        {
          nombre: 'Actividades',
          icono: 'bi bi-people',
          accion: () => {
            this.router.navigate([`quienes-somos/actividades`]);
          },
        },
      ],
    },
    {
      nombre: 'Noticias',
      icono: 'bi bi-newspaper',
      accion: () => {
        this.router.navigate([`noticias`]);
      },
    },
    {
      nombre: 'Nuevos desarrollos',
      icono: 'bi bi-building-gear',
      accion: () => {
        this.router.navigate([`nuevos-desarrollos`]);
      },
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
        {
          nombre: 'perfil',
          icono: 'bi bi-person-vcard',
          accion: () => {
            this.router.navigate([`quienes-somos/objetivo`]);
          },
          ocultar: () => this.dataUsuario != null,
        },
        {
          nombre: 'administrar',
          icono: 'bi bi-kanban',
          accion: () => {
            this.router.navigate([`quienes-somos/objetivo`]);
          },
          ocultar: () => this.dataUsuario != null,
        },
        {
          nombre: 'cerrar sesión',
          icono: 'bi bi-box-arrow-right',
          accion: () => {
            this.router.navigate([`quienes-somos/objetivo`]);
          },
          ocultar: () => this.dataUsuario != null,
        },
      ],
    },
    { icono: this.iconoTema, accion: () => this.cambiarTema() },
    { icono: 'bi bi-cart' },
  ];
  form: FormGroup = new FormGroup({});

  constructor(
    private catalogoService: CatalogoService,
    private router: Router
  ) {}

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
