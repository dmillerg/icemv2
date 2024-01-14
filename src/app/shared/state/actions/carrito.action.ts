import { createAction, props } from "@ngrx/store";
import { Carrito } from "src/app/core/models/carrito.model";

export const addCarrito = createAction(
    '[CARRITO COMPONENT] add carrito',
    props<{ carritos: Carrito }>()
);

export const getCarrito = createAction(
    '[CARRITO COMPONENT] get all carrito',
    props<{ carritos: ReadonlyArray<Carrito> }>()
)

export const deleteCarrito = createAction(
    '[CARRITO COMPONENT] delete one carrito',
    props<{ carrito: Carrito }>()
)

export const deleteAllCarrito = createAction(
    '[CARRITO COMPONENT] delete all carrito')