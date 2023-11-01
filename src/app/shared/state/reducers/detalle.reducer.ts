import { createReducer, on } from "@ngrx/store";
import { Detalle } from "src/app/core/components/detalle-generico/model/detalle.model";
import { addDetalle, deleteAllDetalle, getDetalle } from "../actions/detalle.actions";

export const initialState: Detalle = {}

export const detalleReducer = createReducer(
    initialState,
    on(addDetalle, (estadoViejo, { detalle }) => {
        return detalle
    }),
    on(getDetalle, (oldState, { detalle }) => {
        return detalle
    }),
    // on(eliminarCarrito, (oldState, { carrito }) => {
    //     return oldState.filter(e => e.producto.id != carrito.producto.id);
    // }),
    on(deleteAllDetalle, ()=> {
        return {};
    })
)