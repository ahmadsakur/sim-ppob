import { createSelector } from '@reduxjs/toolkit';
import { AuthState } from './authSlice';

const selectAuthState = (state: { auth: AuthState }) => state.auth;

export const selectUser = createSelector(
  selectAuthState,
  (auth) => auth.user
);

export const selectToken = createSelector(
  selectAuthState,
  (auth) => auth.token
);

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (auth) => auth.isAuthenticated
);
