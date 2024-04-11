import {
  combineReducers,
  configureStore,
  type Action,
  type ThunkDispatch,
} from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { useDispatch } from 'react-redux';
import type { NavigateFunction } from 'react-router-dom';
import { userReducer, userReducerPath } from '@entities/User';
import { movieApi } from '@entities/Movie';

export const createMainStore = (navigate: NavigateFunction) => {
  const store = configureStore({
    reducer: combineReducers({
      [movieApi.reducerPath]: movieApi.reducer,
      [userReducerPath]: userReducer,
    }),
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: {
            navigate,
          },
        },
      }).concat(movieApi.middleware),
  });
  setupListeners(store.dispatch);
  return store;
};

export type StateSchema = ReturnType<
  ReturnType<typeof createMainStore>['getState']
>;

export const useAppDispatch = () =>
  useDispatch<ThunkDispatch<StateSchema, any, Action<any>>>();
