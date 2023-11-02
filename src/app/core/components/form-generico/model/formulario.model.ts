import { FormGroup } from '@angular/forms';
import { Boton } from '../../boton-generico/model/boton.model';
export interface Formulario {
  controles: Control[];
  columnas: number[];
  autofixed?: boolean;
  skeleton?: boolean;
  form?: FormGroup;
}

export interface Control {
  tipo: Tipos;
  nombre: string;
  control: string;
  placeholder?: string;
  change?: (value?: any) => void;
  minimo?: string;
  maximo?: string;
  valor?: any;
  opciones?: any[];
  disabled?: boolean;
  width?: string;
  validator?: any[];
  icono?: string;
  botones?: Boton[];
  tiposPassword?: TiposPassword;
}

export type TiposPassword = 'text' | 'password';

export type Tipos =
  | 'text'
  | 'number'
  | 'select'
  | 'date'
  | 'textarea'
  | 'password'
  | 'boton';
