import { createFeatureSelector } from "@ngrx/store";
import { Detalle } from "src/app/core/components/detalle-generico/model/detalle.model";

export const selectDetalle = createFeatureSelector<Detalle>('detalle');