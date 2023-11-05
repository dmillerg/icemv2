export interface Comentario {
    id: number;
    alias: string;
    correo: string;
    comentario: string;
    fecha: string;
    id_producto: number;
    cant_resp: number;
    calificacion: number;
    visto?:boolean;
}

export interface Respuesta {
    id: number;
    respuesta: string;
    fecha: string;
    id_post: number;
}