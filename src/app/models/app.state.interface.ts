import { Order } from './order.interface';
import { User } from './user.interface';

export interface AppState {
  users: {
    entities: { [id: number]: User };
    selectedUserId: number | null;
  };
  orders: {
    entities: { [id: number]: Order };
  };
}
