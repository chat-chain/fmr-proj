import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { User } from '../../models/user.interface';
import { Order } from '../../models/order.interface';
@Component({
  selector: 'user-orders',
  templateUrl: './user-orders.html',
  styleUrl: './user-orders.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserOrders {
  selectedUser = input.required<User>();

  selectedUserOrders = input.required<Order[]>();

  selectSelectedUserSummary = input.required<{
    name: string;
    total: number;
  }>();

  resetSelectedUser = output<void>();

  unsetUser() {
    this.resetSelectedUser.emit();
  }
}
