import { createReducer, on } from "@ngrx/store";
import { addProduct, deleteAllProducts, getProduct } from "../actions/producto.action";
import { Producto } from "src/app/modules/productos/model/producto";

export const initialState: ReadonlyArray<Producto> = []

export const productReducer = createReducer(
    initialState,
    on(addProduct, (estadoViejo, { product }) => {
        return [...estadoViejo, ...[product]]
    }),
    on(getProduct, (oldState, { products }) => {
        return [...oldState, ...products]
    }),
    // on(eliminarCarrito, (oldState, { carrito }) => {
    //     return oldState.filter(e => e.producto.id != carrito.producto.id);
    // }),
    on(deleteAllProducts, ()=> {
        return [];
    })
)