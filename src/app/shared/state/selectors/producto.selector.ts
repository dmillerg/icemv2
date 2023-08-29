import { createFeatureSelector } from "@ngrx/store";
import { Producto } from "src/app/modules/productos/model/producto";

export const selectProduct = createFeatureSelector<ReadonlyArray<Producto>>('product');