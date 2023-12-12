export interface MenuItem {
  nombre?: string;
  codigo?: number;
  icono?: string;
  subitem?: MenuItem[];
  listado?: Listado[];
  sm?: boolean;
  accion?: () => void;
  ocultar?: boolean;
  disaled?: () => boolean;
}

export interface Listado{
  id?: number;
  nombre: string;
  descripcion?: string;
  precio?: number;
  cantidad?: number;
  imagen?: string;
  fecha?: Date;
}
