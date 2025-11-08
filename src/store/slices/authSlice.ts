// store/slices/authSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { User, LoginCredentials, RegisterCredentials } from '../../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  mode: 'signin' | 'signup'; // Добавляем режим
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  mode: 'signin',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Вход
    signInStart: (state, action: PayloadAction<LoginCredentials>) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    signInFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },

    // Регистрация
    signUpStart: (state, action: PayloadAction<RegisterCredentials>) => {
      state.loading = true;
      state.error = null;
    },
    signUpSuccess: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    signUpFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Выход
    signOut: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },

    // Сброс пароля
    resetPasswordStart: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.error = null;
    },
    resetPasswordSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    resetPasswordFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // ⭐ ДОБАВЛЯЕМ НОВЫЕ ЭКШЕНЫ ⭐
    switchAuthMode: (state, action: PayloadAction<'signin' | 'signup'>) => {
      state.mode = action.payload;
      state.error = null; // Очищаем ошибки при переключении
    },
    
    clearAuthError: (state) => {
      state.error = null;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  signUpStart,
  signUpSuccess,
  signUpFailure,
  signOut,
  resetPasswordStart,
  resetPasswordSuccess,
  resetPasswordFailure,
  switchAuthMode, // ⭐ ЭКСПОРТИРУЕМ
  clearAuthError, // ⭐ ЭКСПОРТИРУЕМ
} = authSlice.actions;

export default authSlice.reducer;