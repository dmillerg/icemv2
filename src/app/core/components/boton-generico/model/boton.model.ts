export interface Boton {
  icono?: string;
  label?: string;
  color?: string;
  class?: string;
  funcion?: (value?: any) => void;
  disabled?: () => boolean;
  ocultar?: () => boolean;
  cargando?: () => boolean;
  // icono?: string;
}
