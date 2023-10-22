import { Boton } from '../../boton-generico/model/boton.model';
import { Collapse } from '../../collapse/model/collapse.model';
import { Formulario } from '../../form-generico/model/formulario.model';

export interface Modal {
  titulo?: string;
  subtitulo?: string;
  formulario?: Formulario;
  collapse?: Collapse;
  texto?: string;
  botones: Boton[];
}
