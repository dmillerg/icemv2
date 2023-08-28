export interface Producto {
  id: number;
  titulo: string;
  descripcion: string;
  imagen: string;
  imagenes?: string[];
  fecha: string;
  categoria: number;
  usos: string;
  especificaciones: string;
  garantia: string;
  ficha: string;
  precio: number;
  disponibilidad: number;
  activo: boolean;
  direccion: boolean;
  cont: number;
}
