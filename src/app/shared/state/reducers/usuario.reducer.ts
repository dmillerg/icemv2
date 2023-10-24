import { createReducer, on } from "@ngrx/store";
import { addUsuario, deleteUsuario, getUsuario } from "../actions/usuario.actions";
import { Usuario } from "src/app/core/models/usuario.model";

export const initialState: ReadonlyArray<Usuario> = []

export const usuarioReducer = createReducer(
    initialState,
    on(addUsuario, (estadoViejo, { usuario }) => {
        return [usuario]
    }),
    on(getUsuario, (oldState, { usuario }) => {
        return usuario
    }),
    // // on(eliminarCarrito, (oldState, { carrito }) => {
    // //     return oldState.filter(e => e.producto.id != carrito.producto.id);
    // // }),
    on(deleteUsuario, ()=> {
        return [];
    })
)