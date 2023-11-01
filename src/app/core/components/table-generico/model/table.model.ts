import { Boton } from '../../boton-generico/model/boton.model';

export interface Table {
  columnas: Columnas[];
  values: any[];
  textoVacio?: string;
  botonVacio?: Boton[];
  cargando?: boolean;
  acciones?: Boton[];
  accionesTexto?: string;
}

export interface Columnas {
  nombre: string;
  campo: string;
  tipo: TipoCol;
}

export type TipoCol =
  | 'precio'
  | 'texto'
  | 'numero'
  | 'fecha'
  | 'imagen'
  | 'boolean';
