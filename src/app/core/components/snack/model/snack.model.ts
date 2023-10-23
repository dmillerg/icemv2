import { Boton } from "../../boton-generico/model/boton.model";

export interface Snack{
    titulo?: string;
    subtitulo?: string;
    texto?: string;
    icono?: string;
    botones?: Boton[];
}