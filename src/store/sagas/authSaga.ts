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
  changePasswordStart, 
  changePasswordSuccess, 
  changePasswordFailure, 
} from '../slices/authSlice';
import type { User, LoginCredentials, RegisterCredentials } from '../../types';

// Функция для получения пользователей из localStorage
const getUsers = (): Array<{email: string, password: string, user: User}> => {
  const storedUsers = storage.get('bookstore-users', []);
  
  // Если в localStorage нет пользователей, используем демо-пользователей
  if (storedUsers.length === 0) {
    return [
      { 
        email: 'user@example.com', 
        password: 'password', 
        user: { id: '1', name: 'Test User', email: 'user@example.com' } 
      },
      { 
        email: 'admin@example.com', 
        password: 'admin123', 
        user: { id: '2', name: 'Admin User', email: 'admin@example.com' } 
      }
    ];
  }
  
  return storedUsers;
};

// Регистрация теперь сохраняет пользователя
const mockSignUp = async (credentials: RegisterCredentials): Promise<User> => {
  await delay(1000);
  
  // Валидация пароля
  if (credentials.password !== credentials.confirmPassword) {
    throw new ApiError('Passwords do not match');
  }
  
  if (credentials.password.length < 6) {
    throw new ApiError('Password must be at least 6 characters long');
  }
  
  const users = getUsers();
  
  // Проверяем, есть ли уже пользователь с таким email
  if (users.some(u => u.email === credentials.email)) {
    throw new ApiError('User with this email already exists');
  }
  
  const newUser: User = {
    id: Date.now().toString(),
    name: credentials.name,
    email: credentials.email,
  };
  
  // СОХРАНЯЕМ нового пользователя с паролем
  const newUsers = [...users, {
    email: credentials.email,
    password: credentials.password, // сохраняем пароль
    user: newUser
  }];
  
  // Сохраняем обновленный список в localStorage
  storage.set('bookstore-users', newUsers);
  
  return newUser;
};

// Вход проверяет всех пользователей из localStorage
const mockSignIn = async (credentials: LoginCredentials): Promise<User> => {
  await delay(1000);
  
  const users = getUsers();
  
  // Ищем пользователя с совпадающими email и password
  const user = users.find(u => 
    u.email === credentials.email && u.password === credentials.password
  );
  
  if (!user) {
    throw new ApiError('Invalid email or password');
  }
  
  return user.user;
};

// ФУНКЦИЯ ДЛЯ СМЕНЫ ПАРОЛЯ
const mockChangePassword = async (data: {
  currentPassword: string;
  newPassword: string;
}, currentUser: User): Promise<void> => {
  await delay(1000);
  
  const users = getUsers();
  
  // Находим текущего пользователя
  const userIndex = users.findIndex(u => u.email === currentUser.email);
  
  if (userIndex === -1) {
    throw new ApiError('User not found');
  }
  
  // Проверяем текущий пароль
  if (users[userIndex].password !== data.currentPassword) {
    throw new ApiError('Current password is incorrect');
  }
  
  // Валидация нового пароля
  if (data.newPassword.length < 6) {
    throw new ApiError('New password must be at least 6 characters long');
  }
  
  // Обновляем пароль
  users[userIndex].password = data.newPassword;
  
  // Сохраняем обновленный список
  storage.set('bookstore-users', users);
  
  console.log(`Password changed successfully for: ${currentUser.email}`);
};

// Saga для сброса пароля 
const mockResetPassword = async (email: string): Promise<void> => {
  await delay(1000);
  
  if (!email) {
    throw new ApiError('Email is required');
  }

  const users = getUsers();
  const userExists = users.some(u => u.email === email);
  
  if (!userExists) {
    throw new ApiError('User with this email not found');
  }
  
  console.log(`Password reset email sent to: ${email}`);
};

// Saga для входа
function* signInSaga(action: PayloadAction<LoginCredentials>): Generator<any, void, any> {
  try {
    const user: User = yield call(mockSignIn, action.payload);
    yield put(signInSuccess(user));
    storage.set('bookstore-user', user); // Сохраняем текущего пользователя
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

// SAGA ДЛЯ СМЕНЫ ПАРОЛЯ
function* changePasswordSaga(action: PayloadAction<{
  currentPassword: string;
  newPassword: string;
}>): Generator<any, void, any> {
  try {
    const currentUser = storage.get('bookstore-user', null);
    if (!currentUser) {
      throw new ApiError('User not authenticated');
    }
    
    yield call(mockChangePassword, action.payload, currentUser);
    yield put(changePasswordSuccess());
  } catch (error: any) {
    const errorMessage = error instanceof ApiError 
      ? error.message 
      : 'Password change failed. Please try again.';
    yield put(changePasswordFailure(errorMessage));
  }
}

// Watcher saga
export function* watchAuthSaga(): Generator<any, void, any> {
  yield takeEvery(signInStart.type, signInSaga);
  yield takeEvery(signUpStart.type, signUpSaga);
  yield takeEvery(resetPasswordStart.type, resetPasswordSaga);
  yield takeEvery(changePasswordStart.type, changePasswordSaga); 
}