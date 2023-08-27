import { Boton } from "../components/boton-generico/model/boton.model";

export interface Card{
    titulo?: string;
    descripcion?: string;
    fecha?: Date;
    imagen?: string;
    precio?: string;
    icono?: string;
    direccion?: string;
    classTitulo?: string;
    classDescripcion?: string;
    botones?: Boton[];
    alerta?: string;
}