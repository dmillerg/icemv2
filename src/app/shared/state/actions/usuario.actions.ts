import { createAction, props } from "@ngrx/store";
import { Producto } from "src/app/modules/productos/model/producto";

export const addUsuario = createAction(
    '[USUARIO COMPONENT] add usuario',
    props<{ product: Producto }>()
);

export const getProduct = createAction(
    '[USUARIO COMPONENT] get all usuario',
    props<{ products: ReadonlyArray<Producto> }>()
)

export const deleteProduct = createAction(
    '[USUARIO COMPONENT] delete one usuario',
    props<{ product: Producto }>()
)

export const deleteAllProducts = createAction(
    '[USUARIO COMPONENT] delete all usuario')