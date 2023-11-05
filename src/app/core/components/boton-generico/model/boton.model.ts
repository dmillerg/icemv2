export interface Boton {
  icono?: string;
  label?: string;
  color?: string;
  class?: string;
  tooltip?:string;
  funcion?: (valor?: any) => void;
  disabled?: (valor?: any) => boolean;
  ocultar?: () => boolean;
  cargando?: () => boolean;
}
