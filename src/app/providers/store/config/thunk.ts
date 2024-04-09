import type { NavigateFunction } from 'react-router-dom';
import type { StateSchema } from './store';

export interface ThunkExtraArg {
  navigate: NavigateFunction;
}

export interface ThunkConfig<T> {
  rejectValue: T;
  extra: ThunkExtraArg;
  state: StateSchema;
}
