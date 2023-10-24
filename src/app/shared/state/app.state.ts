import { ActionReducerMap } from "@ngrx/store";
import { productReducer } from "./reducers/producto.reducer";
import { Producto } from "src/app/modules/productos/model/producto";
import { Usuario } from "src/app/core/models/usuario.model";
import { usuarioReducer } from "./reducers/usuario.reducer";

export interface AppState {
    product: ReadonlyArray<Producto>;
    usuario: ReadonlyArray<Usuario>;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
    product: productReducer,
    usuario: usuarioReducer
}
