import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './models/app.state.interface';
import { User } from './models/user.interface';
import * as UserActions from './store/user/user.actions';
import {
  selectAllUsers,
  selectSelectedUser,
  selectSelectedUserName,
} from './store/user/user.reducer';
import { UserForm } from './components/user-form/user-form';
import {
  selectOrdersForSelectedUser,
  selectSelectedUserNameAndOrderTotal,
} from './store/order/order.selectors';
import { UserOrders } from './components/user-orders/user-orders';
@Component({
  selector: 'root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [UserForm, UserOrders],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  private store: Store<AppState> = inject(Store<AppState>);
  users = this.store.selectSignal(selectAllUsers);
  selectedUser = this.store.selectSignal(selectSelectedUser);
  selectedUserName = this.store.selectSignal(selectSelectedUserName);

  selectedUserOrders = this.store.selectSignal(selectOrdersForSelectedUser);
  selectSelectedUserSummary = this.store.selectSignal(selectSelectedUserNameAndOrderTotal);

  showForm = signal(false);

  constructor() {
    this.store.dispatch(() => UserActions.loadUsers());
  }

  onUserSubmit(submittedUser: User) {
    if (this.users().some((user) => user.id === submittedUser.id)) {
      this.store.dispatch(
        UserActions.updateUser({ update: { id: submittedUser.id, changes: submittedUser } })
      );
    } else {
      this.store.dispatch(UserActions.addUser({ user: submittedUser }));
    }
    this.showForm.set(false);
  }

  onSelectUser(userId: number) {
    this.store.dispatch(UserActions.selectUser({ userId }));
  }

  toggleForm() {
    this.showForm.update((v) => !v);
  }

  deleteUser(id: number) {
    this.store.dispatch(UserActions.deleteUser({ id }));
  }

  onClearSelection() {
    this.store.dispatch(UserActions.selectUser({ userId: null }));
  }
}
