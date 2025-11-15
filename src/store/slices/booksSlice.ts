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
  currentSearchPage: number;
  hasMore: boolean;
  allSearchBooks: Book[]; // ✅ Все загруженные книги поиска
  loadedApiPages: number[]; // ✅ Какие страницы API уже загружены
}

const initialState: BooksState = {
  newReleases: [],
  searchResults: null,
  currentBook: null,
  loading: false,
  error: null,
  searchQuery: '',
  currentSearchPage: 1,
  hasMore: true,
  allSearchBooks: [], // ✅ Инициализируем
  loadedApiPages: [], // ✅ Инициализируем
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    // Новые релизы (без изменений)
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

    // Поиск книг - УМНОЕ КЭШИРОВАНИЕ
    searchBooksStart: (state, action: PayloadAction<{ query: string; page: number }>) => {
      state.loading = true;
      state.error = null;
      state.searchQuery = action.payload.query;
      
      // Если это первая страница, сбрасываем всё
      if (action.payload.page === 1) {
        state.allSearchBooks = [];
        state.loadedApiPages = [];
        state.searchResults = null;
        state.hasMore = true;
        state.currentSearchPage = 1;
      }
    },
    
    searchBooksSuccess: (state, action: PayloadAction<{ result: BookSearchResult; apiPage: number }>) => {
      state.loading = false;
      
      const { result, apiPage } = action.payload;
      const newBooks = result.books || [];
      
      // ✅ Добавляем книги в общий кэш (если их там еще нет)
      newBooks.forEach(book => {
        if (!state.allSearchBooks.some(b => b.isbn13 === book.isbn13)) {
          state.allSearchBooks.push(book);
        }
      });
      
      // ✅ Отмечаем страницу как загруженную
      if (!state.loadedApiPages.includes(apiPage)) {
        state.loadedApiPages.push(apiPage);
        state.loadedApiPages.sort((a, b) => a - b);
      }
      
      // ✅ Обновляем searchResults для информации о поиске
      if (!state.searchResults || apiPage === 1) {
        state.searchResults = result;
      }
      
      // ✅ Проверяем, есть ли еще страницы
      const totalResults = parseInt(result.total || '0');
      state.hasMore = state.allSearchBooks.length < totalResults;
    },

    searchBooksFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Сброс результатов поиска
    clearSearchResults: (state) => {
      state.searchResults = null;
      state.allSearchBooks = [];
      state.loadedApiPages = [];
      state.searchQuery = '';
      state.currentSearchPage = 1;
      state.hasMore = true;
    },

    // Установка текущей страницы UI
    setCurrentSearchPage: (state, action: PayloadAction<number>) => {
      state.currentSearchPage = action.payload;
    },

    // Детали книги (без изменений)
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
  clearSearchResults,
  setCurrentSearchPage, // ✅ Новый экшен
  fetchBookDetailsStart,
  fetchBookDetailsSuccess,
  fetchBookDetailsFailure,
  clearError,
} = booksSlice.actions;

export default booksSlice.reducer;