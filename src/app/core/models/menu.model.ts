export interface MenuItem {
  nombre: string;
  link: string;
  codigo?: number;
  icono?: string;
  subitem?: MenuItem[];
}
