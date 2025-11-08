// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import booksSlice from './slices/booksSlice';
import authSlice from './slices/authSlice';
import favoritesSlice from './slices/favoritesSlice';
import cartSlice from './slices/cartSlice';

import rootSaga from './sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    books: booksSlice,
    auth: authSlice,
    favorites: favoritesSlice,
    cart: cartSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Экспортируем типы для использования в компонентах
export type { Book } from '../types';
export type { CartItem } from './slices/cartSlice';