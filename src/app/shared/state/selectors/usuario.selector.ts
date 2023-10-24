import { createFeatureSelector } from "@ngrx/store";
import { Usuario } from "src/app/core/models/usuario.model";

export const selectUsuario = createFeatureSelector<ReadonlyArray<Usuario>>('usuario');