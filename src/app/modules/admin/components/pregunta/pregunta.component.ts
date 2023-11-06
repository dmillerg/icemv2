import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { Formulario } from 'src/app/core/components/form-generico/model/formulario.model';
import { Table } from 'src/app/core/components/table-generico/model/table.model';
import { Boton } from 'src/app/core/components/boton-generico/model/boton.model';
import { Mensaje } from '../../model/pregunta.model';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.component.html',
  styleUrls: ['./pregunta.component.scss']
})
export class PreguntaComponent implements OnInit{
  formulario?: Formulario;
  tabla!: Table;
  loading: boolean = false
  loadingResponder: boolean = false;

  botonActualizar: Boton[] = [
    {
      label: 'Actualizar',
      icono: 'bi bi-arrow-clockwise',
      funcion: () => this.obtenerPreguntas()
    }
  ];

  botones: Boton[] = [
    {
      icono: 'bi bi-pencil',
      class:
        'p-2 rounded h-fit hover:border dark:border-icem-500 text-icem-500 dark:text-gray-100 flex justify-center items-center',
      funcion: (value) => {
        this.seleccionado(value);
      },
    },
    {
      icono: 'bi bi-trash',
      class:
        'p-2 rounded h-fit hover:shadow-md text-icem-500 dark:text-gray-100 flex justify-center items-center',
      funcion: (value) => this.eliminar(value),
    },
  ];

  constructor(
    private adminService: AdminService
  ){}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  obtenerPreguntas(){

  }

  responderPregunta(){}

  seleccionado(v: any){}
  eliminar(e:any){}

  // generarTabla(values?: Mensaje){
  //   this.tabla = {
  //     columnas: [
  //       {
  //         tipo: 'texto',
  //         nombre: 'Correo',
  //         campo: 'correo'
  //       },
  //       {
  //         tipo: 'texto',
  //         nombre: 'Pregunta',
  //         campo: 'comentario'
  //       },
  //       {
  //         tipo: 'boolean',
  //         nombre: 'Visto',
  //         campo: 'visto'
  //       },
  //       {
  //         tipo:'texto',
  //         nombre: 'Fecha',
  //         campo: 'fecha'
  //       }
  //     ],
  //     // values: values ?? [],
  //     cargando: !values,
  //     acciones: this.botones,
  //     accionesTexto: 'Acciones',
  //     textoVacio: 'No hay comentarios que gestionar',
  //   };
  // }

}
