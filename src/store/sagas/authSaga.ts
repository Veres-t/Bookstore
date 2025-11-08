// store/sagas/authSaga.ts
import { call, put, takeEvery } from 'redux-saga/effects';
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

// Mock функции для авторизации (заглушки)
const mockSignIn = (credentials: LoginCredentials): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (credentials.email === 'user@example.com' && credentials.password === 'password') {
        resolve({
          id: '1',
          name: 'Test User',
          email: credentials.email,
        });
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 1000);
  });
};

const mockSignUp = (credentials: RegisterCredentials): Promise<User> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: Date.now().toString(),
        name: credentials.name,
        email: credentials.email,
      });
    }, 1000);
  });
};

const mockResetPassword = (email: string): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Password reset email sent to: ${email}`);
      resolve();
    }, 1000);
  });
};

// Saga для входа
function* signInSaga(action: any): Generator<any, void, any> {
  try {
    const user: User = yield call(mockSignIn, action.payload);
    yield put(signInSuccess(user));
    localStorage.setItem('bookstore-user', JSON.stringify(user));
  } catch (error: any) {
    yield put(signInFailure(error.message || 'Unknown error'));
  }
}

// Saga для регистрации
function* signUpSaga(action: any): Generator<any, void, any> {
  try {
    const user: User = yield call(mockSignUp, action.payload);
    yield put(signUpSuccess(user));
    localStorage.setItem('bookstore-user', JSON.stringify(user));
  } catch (error: any) {
    yield put(signUpFailure(error.message || 'Unknown error'));
  }
}

// Saga для сброса пароля
function* resetPasswordSaga(action: any): Generator<any, void, any> {
  try {
    yield call(mockResetPassword, action.payload);
    yield put(resetPasswordSuccess());
  } catch (error: any) {
    yield put(resetPasswordFailure(error.message || 'Unknown error'));
  }
}

// Watcher saga
export function* watchAuthSaga(): Generator<any, void, any> {
  yield takeEvery(signInStart.type, signInSaga);
  yield takeEvery(signUpStart.type, signUpSaga);
  yield takeEvery(resetPasswordStart.type, resetPasswordSaga);
}