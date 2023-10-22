import { Component, Inject, OnInit, ViewContainerRef } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { MenuItem } from '../../models/menu.model';
import { CatalogoService } from '../../services/catalogo.service';
import { take } from 'rxjs';
import { MenuGenericoComponent } from '../menu-generico/menu-generico.component';
import { scaleAnimation } from 'src/app/animations';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RegisterLoginModalComponent } from 'src/app/modules/auth/modal/register-login-modal/register-login-modal.component';
import { Modal } from '../modal-generico/model/modal.model';
import { ModalGenericoComponent } from '../modal-generico/modal-generico.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MenuGenericoComponent,
    ReactiveFormsModule,
    MatDialogModule,
  ],
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
  entry!: ViewContainerRef;

  menusm: MenuItem[] = [];
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

  menu2: MenuItem[] = [];
  form: FormGroup = new FormGroup({});

  constructor(
    private catalogoService: CatalogoService,
    private router: Router,
    public dialog: MatDialog,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    this.generarMenu();
    this.obtenerCategorias();
    this.tema = localStorage.getItem('tema');
    if (this.tema === 'dark') {
      document.documentElement.classList.add('dark');
      this.document.body.classList.add('dark-theme');
      this.document.body.classList.remove('light-theme');
      this.tema = 'light';
    } else {
      document.documentElement.classList.remove('dark');
      this.document.body.classList.remove('dark-theme');
      this.document.body.classList.add('light-theme');
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
      this.document.body.classList.add('dark-theme');
      this.document.body.classList.remove('light-theme');
      this.tema = 'light';
    } else {
      document.documentElement.classList.remove('dark');
      this.document.body.classList.remove('dark-theme');
      this.document.body.classList.add('light-theme');
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

  loginOrRegister(titulo: string, subtitulo: string) {
    const dialogRef = this.dialog.open(RegisterLoginModalComponent, {
      data: { titulo: titulo, subtitulo: subtitulo },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.generarMenu();
    });
  }

  generarMenu() {
    const usuario = localStorage.getItem('usuario')
      ? JSON.parse(localStorage.getItem('usuario')!)
      : undefined;
    this.dataUsuario = usuario;
    const menuUsuario: MenuItem[] = [
      {
        nombre: 'acceder',
        icono: 'bi bi-person-circle',
        ocultar: this.dataUsuario !== undefined,
        accion: () => {
          this.loginOrRegister(
            'Inicio de sesión',
            'Introdusca su usuario y contraseña'
          );
        },
      },
      {
        nombre: 'registrarse',
        icono: 'bi bi-person-add',
        ocultar: this.dataUsuario !== undefined,
        accion: () => {
          this.loginOrRegister(
            'Registrarse',
            'Registrese en nuestra pagina para poder acceder a las opciones de compra'
          );
        },
      },
      {
        nombre: 'perfil',
        icono: 'bi bi-person-vcard',
        accion: () => {
          this.router.navigate([`quienes-somos/objetivo`]);
        },
        ocultar: this.dataUsuario === undefined,
      },
      {
        nombre: 'administrar',
        icono: 'bi bi-kanban',
        accion: () => {
          this.router.navigate([`quienes-somos/objetivo`]);
        },
        ocultar: this.dataUsuario === undefined,
      },
      {
        nombre: 'cerrar sesión',
        icono: 'bi bi-box-arrow-right',
        accion: () => {
          localStorage.removeItem('usuario');
          this.generarMenu();
        },
        ocultar: this.dataUsuario === undefined,
      },
    ];
    this.menu2 = [
      {
        nombre: usuario ? usuario.usuario : 'acceder/registrarse',
        icono: 'bi bi-person',
        subitem: [...menuUsuario],
      },
      { icono: this.iconoTema, accion: () => this.cambiarTema() },
      { icono: 'bi bi-cart', ocultar: this.dataUsuario !== undefined },
    ];

    this.menusm = [
      {
        icono: 'bi bi-person',
        sm: true,
        subitem: [...menuUsuario],
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
  }

  test() {
    const modal: Modal = {
      botones: [{ icono: 'bi bi-x', label: 'Cerrar' }],
      titulo: 'Titulo',
      // subtitulo: 'Subtitulo',
      texto:
        'Esto es un modal de confirmacion del modal generico sdas asd asjd asd asnd asnd asd asda sd asd asd ',
    };
    this.dialog.open(ModalGenericoComponent, {
      data: modal,
    });
  }
}
