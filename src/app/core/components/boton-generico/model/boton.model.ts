export interface Boton {
  icono?: string;
  label?: string;
  color?: string;
  class?: string;
  tooltip?:string;
  funcion?: (valor?: any) => void;
  disabled?: () => boolean;
  ocultar?: () => boolean;
  cargando?: () => boolean;
}
