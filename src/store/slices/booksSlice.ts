// store/slices/booksSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Book, BookSearchResult } from '../../types';

interface BooksState {
  newReleases: Book[];
  searchResults: BookSearchResult | null;
  currentBook: Book | null;
  loading: boolean;
  error: string | null;
  searchQuery: string;
  currentSearchPage: number; // Добавляем для отслеживания текущей страницы
}

const initialState: BooksState = {
  newReleases: [],
  searchResults: null,
  currentBook: null,
  loading: false,
  error: null,
  searchQuery: '',
  currentSearchPage: 1,
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    // Новые релизы
    fetchNewReleasesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchNewReleasesSuccess: (state, action: PayloadAction<Book[]>) => {
      state.loading = false;
      state.newReleases = action.payload;
    },
    fetchNewReleasesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Поиск книг - ОБНОВЛЕНО для накопления результатов
    searchBooksStart: (state, action: PayloadAction<{ query: string; page: number }>) => {
      state.loading = true;
      state.error = null;
      state.searchQuery = action.payload.query;
      state.currentSearchPage = action.payload.page;
      
      // Если это первая страница, сбрасываем результаты
      if (action.payload.page === 1) {
        state.searchResults = null;
      }
    },
    
    searchBooksSuccess: (state, action: PayloadAction<BookSearchResult>) => {
      state.loading = false;
      
      if (!state.searchResults || state.currentSearchPage === 1) {
        // Первая страница - устанавливаем новые результаты
        state.searchResults = action.payload;
      } else {
        // Последующие страницы - добавляем книги к существующим
        state.searchResults = {
          ...action.payload,
          books: [...state.searchResults.books, ...action.payload.books]
        };
      }
    },

    searchBooksFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Сброс результатов поиска
    clearSearchResults: (state) => {
      state.searchResults = null;
      state.searchQuery = '';
      state.currentSearchPage = 1;
    },

    // Детали книги
    fetchBookDetailsStart: (state, action: PayloadAction<{ isbn13: string }>) => {
      state.loading = true;
      state.error = null;
    },
    fetchBookDetailsSuccess: (state, action: PayloadAction<Book>) => {
      state.loading = false;
      state.currentBook = action.payload;
    },
    fetchBookDetailsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Очистка ошибок
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  fetchNewReleasesStart,
  fetchNewReleasesSuccess,
  fetchNewReleasesFailure,
  searchBooksStart,
  searchBooksSuccess,
  searchBooksFailure,
  clearSearchResults,
  fetchBookDetailsStart,
  fetchBookDetailsSuccess,
  fetchBookDetailsFailure,
  clearError,
} = booksSlice.actions;

export default booksSlice.reducer;