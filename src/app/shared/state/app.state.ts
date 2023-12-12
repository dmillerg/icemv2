import { ActionReducerMap } from '@ngrx/store';
import { productReducer } from './reducers/producto.reducer';
import { Producto } from 'src/app/modules/productos/model/producto';
import { Usuario } from 'src/app/core/models/usuario.model';
import { usuarioReducer } from './reducers/usuario.reducer';
import { Detalle } from 'src/app/core/components/detalle-generico/model/detalle.model';
import { detalleReducer } from './reducers/detalle.reducer';
import { Carrito } from 'src/app/core/models/carrito.model';
import { carritoReducer } from './reducers/carrito.reducer';

export interface AppState {
  product: ReadonlyArray<Producto>;
  usuario: ReadonlyArray<Usuario>;
  detalle: Detalle;
  carrito: ReadonlyArray<Carrito>;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  product: productReducer,
  usuario: usuarioReducer,
  detalle: detalleReducer,
  carrito: carritoReducer,
};
