import { createAction, props } from "@ngrx/store";
import { Usuario } from "src/app/core/models/usuario.model";

export const addUsuario = createAction(
    '[USUARIO COMPONENT] Agrega los datos del usuario autenticado',
    props<{ usuario: Usuario }>()
);

export const getUsuario = createAction(
    '[USUARIO COMPONENT] get all usuario',
    props<{ usuario: ReadonlyArray<Usuario> }>()
)

export const deleteUsuario = createAction(
    '[USUARIO COMPONENT] delete one usuario'
)

export const deleteAllUsuarios = createAction(
    '[USUARIO COMPONENT] delete all usuario')