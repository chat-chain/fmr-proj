import { createAction, props } from '@ngrx/store';
import { Order } from '../../models/order.interface';

export const loadOrders = createAction('[Order] Load Orders', props<{ orders: Order[] }>());
