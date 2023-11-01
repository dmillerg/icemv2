import { createAction, props } from '@ngrx/store';
import { Detalle } from 'src/app/core/components/detalle-generico/model/detalle.model';

export const addDetalle = createAction(
  '[DETALLE COMPONENT] Agrega los datos del detalle autenticado',
  props<{ detalle: Detalle }>()
);

export const getDetalle = createAction(
  '[DETALLE COMPONENT] get all detalle',
  props<{ detalle: Detalle }>()
);

export const deleteDetalle = createAction(
  '[DETALLE COMPONENT] delete one detalle'
);

export const deleteAllDetalle = createAction(
  '[DETALLE COMPONENT] delete all detalle'
);
