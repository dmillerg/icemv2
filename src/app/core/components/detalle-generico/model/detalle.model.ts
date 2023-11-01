import { Boton } from '../../boton-generico/model/boton.model';
import { Formulario } from '../../form-generico/model/formulario.model';

export interface Detalle {
  imagen?: string;
  imagenes?: string[];
  textos?: TextoDetalle[];
  botones?: Boton[];
  titulo?: string;
  subtitulo?: string;
  descripcion?: string;
  data?: any;
}

export interface TextoDetalle {
  nombre: string;
  valor: string;
  icono?: string;
}
