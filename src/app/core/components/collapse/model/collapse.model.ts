import { Formulario } from '../../form-generico/model/formulario.model';

export interface Collapse {
  id: string;
  nombre: string;
  texto?: string;
  textoVacio?: string;
  formulario?: Formulario;
  tipoContenedor: tipoContenedor;
}

export type tipoContenedor = 'texto' | 'form';
