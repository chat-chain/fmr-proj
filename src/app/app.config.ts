import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { usersFeature } from './store/user/user.reducer';
import { loadUsers$, loadOrdersForSelectedUser$ } from './store/user/user.effects';
import { ordersReducer } from './store/order/order.reducer';
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideStore({ orders: ordersReducer }),
    provideState(usersFeature),
    provideEffects({ loadUsers$, loadOrdersForSelectedUserEffect: loadOrdersForSelectedUser$ }),
  ],
};
