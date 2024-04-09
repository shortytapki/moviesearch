import type { ThunkConfig } from '@app/providers/store/config/thunk';
import type { User } from '@entities/User';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RoutePaths } from '@shared/config/routeConfig';
import { MOVIE_SEARCH_USER } from '@shared/consts/consts';

export const loginByUsername = createAsyncThunk<
  User,
  User,
  ThunkConfig<string>
>('feature/loginByUsernam', async (body, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;
  try {
    const response = await fetch(AUTH_SERVER_URL + '/login', {
      body: JSON.stringify(body),
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) return rejectWithValue('Неверный логин или пароль');
    const user: User = await response.json();
    localStorage.setItem(MOVIE_SEARCH_USER, JSON.stringify(user.username));
    extra.navigate(RoutePaths.main);
    return user;
  } catch (e) {
    return rejectWithValue('Ошибка на сервере, попробуйте попытку позже.');
  }
});
