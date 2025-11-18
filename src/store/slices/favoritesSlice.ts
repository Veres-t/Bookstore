// store/slices/favoritesSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Book } from '../../types';

interface FavoritesState {
  items: Book[];
}

// Загрузка из localStorage
const loadFavoritesFromStorage = (): Book[] => {
  try {
    const favorites = localStorage.getItem('bookstore-favorites');
    return favorites ? JSON.parse(favorites) : [];
  } catch {
    return [];
  }
};

const initialState: FavoritesState = {
  items: loadFavoritesFromStorage(),
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    // Добавить в избранное 
    addToFavorites: (state, action: PayloadAction<{ book: Book }>) => {
      const existingItem = state.items.find(item => item.isbn13 === action.payload.book.isbn13);
      if (!existingItem) {
        state.items.push(action.payload.book);
        // Сохраняем в localStorage
        localStorage.setItem('bookstore-favorites', JSON.stringify(state.items));
      }
    },

    // Удалить из избранного 
    removeFromFavorites: (state, action: PayloadAction<{ isbn13: string }>) => {
      state.items = state.items.filter(item => item.isbn13 !== action.payload.isbn13);
      // Обновляем localStorage
      localStorage.setItem('bookstore-favorites', JSON.stringify(state.items));
    },

    // Очистить избранное
    clearFavorites: (state) => {
      state.items = [];
      localStorage.removeItem('bookstore-favorites');
    },
  },
});

export const {
  addToFavorites,
  removeFromFavorites,
  clearFavorites,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;