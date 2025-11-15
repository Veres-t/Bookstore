// store/selectors/booksSelectors.ts
import type { RootState } from '../index';

export const getNewReleases = (state: RootState) => state.books.newReleases;
export const getSearchResults = (state: RootState) => state.books.searchResults;
export const getCurrentBook = (state: RootState) => state.books.currentBook;
export const getBooksLoading = (state: RootState) => state.books.loading;
export const getBooksError = (state: RootState) => state.books.error;
export const getSearchQuery = (state: RootState) => state.books.searchQuery;

// Новый селектор для получения всех загруженных книг поиска
export const getAllSearchBooks = (state: RootState) => 
  state.books.searchResults?.books || [];

// Новый селектор для получения текущей страницы поиска
export const getCurrentSearchPage = (state: RootState) => 
  state.books.currentSearchPage;

// Добавляем селекторы для отдельных полей
export const getBookDetails = (state: RootState) => state.books.currentBook;
export const getBookLoading = (state: RootState) => state.books.loading;