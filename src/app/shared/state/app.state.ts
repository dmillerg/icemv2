import { ActionReducerMap } from "@ngrx/store";
import { productReducer } from "./reducers/producto.reducer";
import { Producto } from "src/app/modules/productos/model/producto";

export interface AppState {
    product: ReadonlyArray<Producto>;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
    product: productReducer,
}
