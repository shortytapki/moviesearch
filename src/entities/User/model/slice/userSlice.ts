import { createSlice } from '@reduxjs/toolkit';
import { loginByUsername, register } from '@features/authenticateUser';
import { MOVIE_SEARCH_USER } from '@shared/consts';
import type { User } from '../types/user';

export interface UserSchema extends User {
  isLoggingIn: boolean;
  error?: string;
  _initialized: boolean;
}

const initialState: UserSchema = {
  username: '',
  isLoggingIn: false,
  error: undefined,
  _initialized: false,
};

const userSlice = createSlice({
  initialState,
  reducers: {
    init: (state) => {
      const user = localStorage.getItem(MOVIE_SEARCH_USER);
      if (user) {
        state.username = JSON.parse(user);
      }
      state._initialized = true;
    },
    logout: (state) => {
      state.username = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginByUsername.pending, (state) => {
        state.error = undefined;
        state.isLoggingIn = true;
      })
      .addCase(loginByUsername.fulfilled, (state, action) => {
        state.isLoggingIn = false;
        state.username = action.payload.username;
        state.error = undefined;
      })
      .addCase(loginByUsername.rejected, (state, action) => {
        state.isLoggingIn = false;
        state.error = action.payload;
      })
      .addCase(register.pending, (state) => {
        state.error = undefined;
        state.isLoggingIn = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoggingIn = false;
        state.username = action.payload.username;
        state.error = undefined;
      })
      .addCase(register.rejected, (state, action) => {
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
