import { props, createAction } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { User } from '../../models/user.interface';

export const loadUsers = createAction('[User/API] Load Users');

export const loadUsersSuccess = createAction(
  '[User/API] Load Users Success',
  props<{ users: User[] }>()
);

export const addUser = createAction('[User/API] Add User', props<{ user: User }>());

export const updateUser = createAction('[User/API] Update User', props<{ update: Update<User> }>());

export const deleteUser = createAction('[User/API] Delete User', props<{ id: number }>());

export const selectUser = createAction(
  '[User Page] Select User',
  props<{ userId: number | null }>()
);
