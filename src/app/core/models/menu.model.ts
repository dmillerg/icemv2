export interface MenuItem {
  nombre?: string;
  link?: string;
  codigo?: number;
  icono?: string;
  subitem?: MenuItem[];
  accion?:()=>void;
  ocultar?:()=>boolean;
  disaled?:()=>boolean;
}
