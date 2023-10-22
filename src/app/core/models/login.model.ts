import { Usuario } from "./usuario.model";

export interface Login {
  message: string,
  status: number,
  usuario: Usuario[],
  token: string,
}