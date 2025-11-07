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
}

const initialState: BooksState = {
  newReleases: [],
  searchResults: null,
  currentBook: null,
  loading: false,
  error: null,
  searchQuery: '',
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

    // Поиск книг
    searchBooksStart: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.error = null;
      state.searchQuery = action.payload;
    },
    searchBooksSuccess: (state, action: PayloadAction<BookSearchResult>) => {
      state.loading = false;
      state.searchResults = action.payload;
    },
    searchBooksFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Детали книги
    fetchBookDetailsStart: (state) => {
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
  fetchBookDetailsStart,
  fetchBookDetailsSuccess,
  fetchBookDetailsFailure,
  clearError,
} = booksSlice.actions;

export default booksSlice.reducer;