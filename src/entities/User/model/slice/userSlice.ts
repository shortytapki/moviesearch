import { createSlice } from '@reduxjs/toolkit';
import type { User } from '../types/user';
import { loginByUsername } from '@features/authenticateUser/api/authenticateUser';

export interface UserSchema {
  user?: User;
  isLoggingIn: boolean;
  error?: string;
}

const initialState: UserSchema = {
  user: undefined,
  isLoggingIn: false,
  error: undefined,
};

const userSlice = createSlice({
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginByUsername.pending, (state) => {
        state.error = undefined;
        state.isLoggingIn = true;
      })
      .addCase(loginByUsername.fulfilled, (state, action) => {
        state.isLoggingIn = false;
        state.user = action.payload;
        state.error = undefined;
      })
      .addCase(loginByUsername.rejected, (state, action) => {
        state.isLoggingIn = false;
        state.error = action.payload;
      });
  },
  name: 'user',
});

export const {
  actions: userActions,
  reducer: userReducer,
  reducerPath: userReducerPath,
} = userSlice;
