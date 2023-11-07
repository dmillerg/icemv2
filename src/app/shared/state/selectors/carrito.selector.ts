import { createFeatureSelector } from "@ngrx/store";
import { Carrito } from "src/app/core/models/carrito.model";

export const selectCarrito = createFeatureSelector<ReadonlyArray<Carrito>>('carrito');