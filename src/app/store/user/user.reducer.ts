import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import * as UserActions from './user.actions';
import { User } from '../../models/user.interface';

export interface UsersState extends EntityState<User> {
  selectedUserId: number | null;
}

export const adapter = createEntityAdapter<User>();

export const initialState: UsersState = adapter.getInitialState({
  selectedUserId: null,
});

export const usersFeature = createFeature({
  name: 'users',
  reducer: createReducer(
    initialState,
    on(UserActions.addUser, (state, { user }) => adapter.addOne(user, state)),
    on(UserActions.updateUser, (state, { update }) => adapter.updateOne(update, state)),
    on(UserActions.deleteUser, (state, { id }) => adapter.removeOne(id, state)),
    on(UserActions.loadUsersSuccess, (state, { users }) => adapter.setAll(users, state)),
    on(UserActions.selectUser, (state, { userId }) => {
      if (state.selectedUserId === userId) return { ...state, selectedUserId: null };
      return {
        ...state,
        selectedUserId: userId,
      };
    })
  ),
  extraSelectors: ({ selectUsersState, selectSelectedUserId, selectEntities }) => ({
    ...adapter.getSelectors(selectUsersState),

    selectSelectedUser: createSelector(
      selectEntities,
      selectSelectedUserId,
      (entities, selectedId) => (selectedId ? entities[selectedId] ?? null : null)
    ),
    selectSelectedUserName: createSelector(
      selectEntities,
      selectSelectedUserId,
      (entities, selectedId) => (selectedId ? entities[selectedId]?.name ?? null : null)
    ),
  }),
});

export const {
  selectAll: selectAllUsers,
  selectEntities: selectUserEntities,
  selectSelectedUserId,
  selectSelectedUser,
  selectSelectedUserName,
} = usersFeature;
