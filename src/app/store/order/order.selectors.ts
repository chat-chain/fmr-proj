import { createSelector } from '@ngrx/store';
import { AppState } from '../../models/app.state.interface';
import { selectSelectedUserId, selectSelectedUserName } from '../user/user.reducer';

export const selectOrderEntities = (state: AppState) => state.orders.entities;

export const selectAllOrders = createSelector(selectOrderEntities, (entities) =>
  Object.values(entities)
);

export const selectOrdersForSelectedUser = createSelector(
  selectAllOrders,
  selectSelectedUserId,
  (orders, userId) => orders.filter((order) => order.userId === userId)
);

export const selectTotalForSelectedUser = createSelector(selectOrdersForSelectedUser, (orders) =>
  orders.reduce((sum, order) => sum + order.total, 0)
);

export const selectSelectedUserNameAndOrderTotal = createSelector(
  selectSelectedUserName,
  selectTotalForSelectedUser,
  (name, total) => {
    if (!name) return null;
    return {
      name,
      total,
    };
  }
);
