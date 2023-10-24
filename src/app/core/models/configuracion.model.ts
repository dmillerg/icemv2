export interface Configuracion {
  id?: number;
  nombre?: string;
  descripcion?: string;
  config?: any;
  tipo?: TipoConfiguracion
}

export type TipoConfiguracion = 'BOOLEAN' | 'STRING' | 'NUMBER' | 'DATE'