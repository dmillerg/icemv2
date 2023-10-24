import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Table } from 'src/app/core/components/table-generico/model/table.model';
import { Usuario } from 'src/app/core/models/usuario.model';
import { AdminService } from '../../service/admin.service';
import { take } from 'rxjs';
import { Formulario } from 'src/app/core/components/form-generico/model/formulario.model';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss'],
})
export class UsuarioComponent implements OnInit {
  tabla!: Table;
  @Output() detalle = new EventEmitter<Formulario>();
  formulario!: Formulario;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.obtenerUsuario();
  }

  generarTabla(values?: Usuario[]) {
    this.tabla = {
      columnas: [
        { tipo: 'texto', nombre: 'usuario', campo: 'usuario' },
        { tipo: 'texto', nombre: 'Nombre', campo: 'nombre' },
        { tipo: 'fecha', nombre: 'Fecha', campo: 'fecha' },
        {
          tipo: 'numero',
          nombre: 'Cantidad de visitas',
          campo: 'cant_visitas',
        },
        { tipo: 'boolean', nombre: 'Activo', campo: 'activo' },
        { tipo: 'boolean', nombre: 'En línea', campo: 'online' },
      ],
      values: values ?? [],
      cargando: !values,
    };
  }

  obtenerUsuario() {
    this.generarTabla();
    this.adminService
      .getUsuarios()
      .pipe(take(1))
      .subscribe({
        next: (result) => {
          setTimeout(() => {
            if (result.length > 0) {
              this.generarTabla(result);
            } else this.generarTabla([]);
          }, 2000);
        },
      });
  }

  seleccionado(item: Set<any>) {
    if (item.size > 0) {
      this.generarFormulario(item.values().next().value);
      setTimeout(() => {
        this.detalle.emit(this.formulario);
      }, 200);
    }
    this.detalle.emit();
  }

  generarFormulario(item: Usuario) {
    this.formulario = {
      controles: [
        {
          tipo: 'text',
          nombre: 'Usuario',
          control: 'usuario',
          valor: item.usuario,
          icono: 'bi bi-person',
        },
        {
          tipo: 'text',
          nombre: 'Nombre',
          control: 'nombre',
          valor: item.nombre,
          icono: 'bi bi-person',
        },
      ],
      columnas: [1, 1, 1],
    };
  }
}
