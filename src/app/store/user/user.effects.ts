import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as UserActions from './user.actions';
import { UserService } from '../../services/user.service';
import { map, switchMap } from 'rxjs/operators';
import { orders } from '../../services/orders';
import * as OrderActions from '../order/order.actions';

export const loadUsers$ = createEffect(
  (actions$ = inject(Actions), userService = inject(UserService)) => {
    return actions$.pipe(
      ofType(UserActions.loadUsers),
      switchMap(() =>
        userService.getUsers().pipe(map((users) => UserActions.loadUsersSuccess({ users })))
      )
    );
  },
  { functional: true }
);

export const loadOrdersForSelectedUser$ = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(UserActions.selectUser),
      map((action) => {
        const userOrders = orders.filter((order) => order.userId === action.userId);
        return OrderActions.loadOrders({ orders: userOrders });
      })
    );
  },
  { functional: true }
);
