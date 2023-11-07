import { createReducer, on } from "@ngrx/store";
import { Carrito } from "src/app/core/models/carrito.model";
import { addCarrito, deleteAllCarrito, getCarrito } from "../actions/carrito.action";

export const initialState: Carrito = {}

export const carritoReducer = createReducer(
    initialState,
    // on(addCarrito, (estadoViejo, { carritos}) => {
    //     return [...estadoViejo, ...[carritos]]
    // }),
    // on(getCarrito, (oldState, { carritos }) => {
    //     return [...oldState, ...carritos]
    // }),
    // // on(eliminarCarrito, (oldState, { carrito }) => {
    // //     return oldState.filter(e => e.producto.id != carrito.producto.id);
    // // }),
    // on(deleteAllCarrito, ()=> {
    //     return [];
    // })
)