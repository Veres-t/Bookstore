// store/sagas/authSaga.ts
import { call, put, takeEvery } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { storage, delay, ApiError } from '../../helpers';
import {
  signInStart,
  signInSuccess,
  signInFailure,
  signUpStart,
  signUpSuccess,
  signUpFailure,
  resetPasswordStart,
  resetPasswordSuccess,
  resetPasswordFailure,
} from '../slices/authSlice';
import type { User, LoginCredentials, RegisterCredentials } from '../../types';

// Mock функции для авторизации с улучшенной обработкой ошибок
const mockSignIn = async (credentials: LoginCredentials): Promise<User> => {
  await delay(1000); // Имитация загрузки
  
  // Демо данные для тестирования
  const demoUsers = [
    { email: 'user@example.com', password: 'password', user: { id: '1', name: 'Test User', email: 'user@example.com' } },
    { email: 'admin@example.com', password: 'admin123', user: { id: '2', name: 'Admin User', email: 'admin@example.com' } }
  ];
  
  const user = demoUsers.find(u => 
    u.email === credentials.email && u.password === credentials.password
  );
  
  if (!user) {
    throw new ApiError('Invalid email or password');
  }
  
  return user.user;
};

const mockSignUp = async (credentials: RegisterCredentials): Promise<User> => {
  await delay(1000);
  
  // Валидация пароля
  if (credentials.password !== credentials.confirmPassword) {
    throw new ApiError('Passwords do not match');
  }
  
  if (credentials.password.length < 6) {
    throw new ApiError('Password must be at least 6 characters long');
  }
  
  return {
    id: Date.now().toString(),
    name: credentials.name,
    email: credentials.email,
  };
};

const mockResetPassword = async (email: string): Promise<void> => {
  await delay(1000);
  
  if (!email) {
    throw new ApiError('Email is required');
  }
  
  console.log(`Password reset email sent to: ${email}`);
};

// Saga для входа
function* signInSaga(action: PayloadAction<LoginCredentials>): Generator<any, void, any> {
  try {
    const user: User = yield call(mockSignIn, action.payload);
    yield put(signInSuccess(user));
    storage.set('bookstore-user', user);
  } catch (error: any) {
    const errorMessage = error instanceof ApiError 
      ? error.message 
      : 'Sign in failed. Please try again.';
    yield put(signInFailure(errorMessage));
  }
}

// Saga для регистрации
function* signUpSaga(action: PayloadAction<RegisterCredentials>): Generator<any, void, any> {
  try {
    const user: User = yield call(mockSignUp, action.payload);
    yield put(signUpSuccess(user));
    storage.set('bookstore-user', user);
  } catch (error: any) {
    const errorMessage = error instanceof ApiError 
      ? error.message 
      : 'Sign up failed. Please try again.';
    yield put(signUpFailure(errorMessage));
  }
}

// Saga для сброса пароля
function* resetPasswordSaga(action: PayloadAction<string>): Generator<any, void, any> {
  try {
    yield call(mockResetPassword, action.payload);
    yield put(resetPasswordSuccess());
  } catch (error: any) {
    const errorMessage = error instanceof ApiError 
      ? error.message 
      : 'Password reset failed. Please try again.';
    yield put(resetPasswordFailure(errorMessage));
  }
}

// Watcher saga
export function* watchAuthSaga(): Generator<any, void, any> {
  yield takeEvery(signInStart.type, signInSaga);
  yield takeEvery(signUpStart.type, signUpSaga);
  yield takeEvery(resetPasswordStart.type, resetPasswordSaga);
}