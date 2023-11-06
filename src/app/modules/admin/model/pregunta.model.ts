export interface Mensaje {
    id: number;
    alias: string;
    correo: string;
    asunto: string;
    mensaje: string;
    fecha:string;
    visto: boolean;
}