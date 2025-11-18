// store/selectors/booksSelectors.ts
import type { RootState } from '../index';

export const getNewReleases = (state: RootState) => state.books.newReleases;
export const getSearchResults = (state: RootState) => state.books.searchResults;
export const getCurrentBook = (state: RootState) => state.books.currentBook;
export const getBooksLoading = (state: RootState) => state.books.loading;
export const getBooksError = (state: RootState) => state.books.error;
export const getSearchQuery = (state: RootState) => state.books.searchQuery;
export const getCurrentSearchPage = (state: RootState) => state.books.currentSearchPage;
export const getHasMoreBooks = (state: RootState) => state.books.hasMore;

// Селектор для всех загруженных книг поиска
export const getAllSearchBooks = (state: RootState) => state.books.allSearchBooks;

//  Селектор для загруженных страниц API
export const getLoadedApiPages = (state: RootState) => state.books.loadedApiPages;

// Селектор для общего количества найденных книг
export const getTotalSearchResults = (state: RootState) => 
  state.books.searchResults ? parseInt(state.books.searchResults.total || '0') : 0;

export const getBookDetails = (state: RootState) => state.books.currentBook;
export const getBookLoading = (state: RootState) => state.books.loading;