import { Component, OnInit } from '@angular/core';
import { Boton } from 'src/app/core/components/boton-generico/model/boton.model';
import { Formulario } from 'src/app/core/components/form-generico/model/formulario.model';
import { Table } from 'src/app/core/components/table-generico/model/table.model';
import { Venta } from '../../model/venta.model';
import { AdminService } from '../../service/admin.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.scss']
})
export class VentaComponent implements OnInit {
  formulario?: Formulario;
  tabla!: Table
  loading: boolean = false;
  loadingResponder: boolean = false;

  botonActualizarGenerarReporte: Boton[] = [
    {
      label: 'Actualizar',
      icono: 'bi bi-arrow-clockwise',
      funcion: () => this.obtenerVentas()
    },
    {
      label: 'Generar Reporte',
      icono: 'bi bi-journal-text',
      funcion: (values) => this.generarReporte(-1, '', -1)
    }
  ];

  constructor(
    private adminService: AdminService,

  ) { }

  ngOnInit(): void {
    this.obtenerVentas()
  }

  obtenerVentas() {
    this.generarTabla();
    this.adminService.getVentas().pipe(take(1)).subscribe({
      next: (result) => {
        this.generarTabla(result);
      }
    })
  }

  generarReporte(user_id: number, fecha: string, producto_id: number) {
    this.adminService.generarReportes(user_id, fecha, producto_id).pipe(take(1)).subscribe({
      next: (result) => {
        console.log(result);

        let filename = result.headers.get('content-disposition')?.split(';')[1].split('=')[1];
        let blob: Blob = result.body as Blob;
        let a = document.createElement('a');
        a.download = 'ventas.xlsx';
        a.href = window.URL.createObjectURL(blob)
        a.target = "_blank"
        a.click();
        this.adminService.deleteFile('ventas.xlsx').pipe(take(1)).subscribe()
      }
    })
  }

  generarTabla(values?: Venta[]) {
    this.tabla = {
      columnas: [
        {
          tipo: 'texto',
          nombre: 'Usuario',
          campo: 'usuario'
        },
        {
          tipo: 'texto',
          nombre: 'Nombre Producto',
          campo: 'producto_name',
        },
        {
          tipo: 'texto',
          nombre: 'Cantidad Producto',
          campo: 'cantidad'
        },
        {
          tipo: 'texto',
          nombre: 'Fecha',
          campo: 'fecha'
        }
      ],
      values: values ?? [],
      cargando: !values,
      textoVacio: 'No hay comentarios que gestionar',
    };
  }

}
