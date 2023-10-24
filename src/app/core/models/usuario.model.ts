export interface Usuario {
    id: number;
    usuario: string;
    password?: string;
    nombre: string;
    fecha: string;
    ultsession?: string;
    correo: string;
    pais?: string;
    direccion?: string;
    telefono?: string;
    rol?: string;
    activo?: boolean;
    cant_visitas?: number;
    ultima_compra_id?: number;
    online?: boolean;
    token?: string;
  }