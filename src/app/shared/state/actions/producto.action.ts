import { createAction, props } from "@ngrx/store";
import { Producto } from "src/app/modules/productos/model/producto";

export const addProduct = createAction(
    '[PRODUCTO COMPONENT] add product',
    props<{ product: Producto }>()
);

export const getProduct = createAction(
    '[PRODUCTO COMPONENT] get all product',
    props<{ products: ReadonlyArray<Producto> }>()
)

export const deleteProduct = createAction(
    '[PRODUCTO COMPONENT] delete one product',
    props<{ product: Producto }>()
)

export const deleteAllProducts = createAction(
    '[PRODUCTO COMPONENT] delete all product')