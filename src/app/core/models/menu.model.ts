export interface MenuItem {
  nombre?: string;
  link?: string;
  codigo?: number;
  icono?: string;
  subitem?: MenuItem[];
  sm?:boolean;
  accion?:()=>void;
  ocultar?:()=>boolean;
  disaled?:()=>boolean;
}
