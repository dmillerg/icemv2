import { createReducer, on } from "@ngrx/store";
import { Carrito } from "src/app/core/models/carrito.model";
import { addCarrito, deleteAllCarrito, deleteCarrito, getCarrito } from "../actions/carrito.action";

export const initialState: ReadonlyArray<Carrito> = []

export const carritoReducer = createReducer(
    initialState,
    on(addCarrito, (estadoViejo, { carritos }) => {
        let cont = 0;
        if (estadoViejo.filter(e => e.producto_id == carritos.producto_id).length > 0) {
            estadoViejo.filter(e => {
                if (e.producto_id == carritos.producto_id) {
                    cont = e.cantidad!
                }
            });
        }
        const nuevoCarrito = {
            id: carritos.id,
            user_id: carritos.user_id,
            cantidad: cont + Number(carritos.cantidad),
            producto_id: carritos.producto_id,
            precio: carritos.precio,
            fecha: carritos.fecha,
        }
        return [...estadoViejo.filter(e => e.producto_id !== carritos.producto_id), ...[nuevoCarrito]]
    }),
    on(getCarrito, (oldState, { carritos }) => {
        return [...oldState, ...carritos]
    }),
    on(deleteCarrito, (oldState, { carrito }) => {
        return oldState.filter(e => e.producto_id != carrito.producto_id);
    }),
    on(deleteAllCarrito, ()=> {
        return [];
    })
)