// store/slices/authSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { storage } from '../../helpers';
import type { User, LoginCredentials, RegisterCredentials } from '../../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  mode: 'signin' | 'signup';
  passwordChangeSuccess: boolean; //  для отслеживания успешной смены пароля
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  mode: 'signin',
  passwordChangeSuccess: false, 
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Вход
    signInStart: (state, action: PayloadAction<LoginCredentials>) => {
      state.loading = true;
      state.error = null;
      state.passwordChangeSuccess = false; // Сбрасываем при новом входе
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
      state.isAuthenticated = false;
      state.error = null;
      state.mode = 'signin';
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
      state.passwordChangeSuccess = false; //  Сбрасываем при выходе
      storage.remove('bookstore-user');
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

    //  ДЛЯ СМЕНЫ ПАРОЛЯ
    changePasswordStart: (state, action: PayloadAction<{
      currentPassword: string;
      newPassword: string;
    }>) => {
      state.loading = true;
      state.error = null;
      state.passwordChangeSuccess = false;
    },
    changePasswordSuccess: (state) => {
      state.loading = false;
      state.error = null;
      state.passwordChangeSuccess = true; // успех
    },
    changePasswordFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.passwordChangeSuccess = false;
    },

    // ДЛЯ СБРОСА СОСТОЯНИЯ СМЕНЫ ПАРОЛЯ
    clearPasswordChangeStatus: (state) => {
      state.passwordChangeSuccess = false;
      state.error = null;
    },

    switchAuthMode: (state, action: PayloadAction<'signin' | 'signup'>) => {
      state.mode = action.payload;
      state.error = null;
    },
    
    clearAuthError: (state) => {
      state.error = null;
    },

    // для загрузки пользователя при старте приложения
    loadUserFromStorage: (state) => {
      try {
        const user = storage.get('bookstore-user', null);
        if (user) {
          state.user = user;
          state.isAuthenticated = true;
        }
      } catch (error) {
        console.error('Error loading user from storage:', error);
      }
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
  changePasswordStart, 
  changePasswordSuccess, 
  changePasswordFailure, 
  clearPasswordChangeStatus, 
  switchAuthMode,
  clearAuthError,
  loadUserFromStorage, 
} = authSlice.actions;

export default authSlice.reducer;