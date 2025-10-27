// src/app/store/order.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as OrderActions from './order.actions';
import { Order } from '../../models/order.interface';

export interface OrdersState {
  entities: { [id: number]: Order };
}

export const initialState: OrdersState = {
  entities: {},
};

export const ordersReducer = createReducer(
  initialState,
  on(OrderActions.loadOrders, (state, { orders }) => {
    const entities = { ...state.entities };
    orders.forEach((order) => (entities[order.id] = order));
    return { entities };
  })
);
