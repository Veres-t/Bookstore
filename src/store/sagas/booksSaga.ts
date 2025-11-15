// store/sagas/booksSaga.ts
import { call, put, takeEvery } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { booksAPI } from '../../api';
import { ApiError, normalizeBookFromSearch, normalizeBookFromDetails } from '../../helpers';
import {
  fetchNewReleasesStart,
  fetchNewReleasesSuccess,
  fetchNewReleasesFailure,
  searchBooksStart,
  searchBooksSuccess,
  searchBooksFailure,
  fetchBookDetailsStart,
  fetchBookDetailsSuccess,
  fetchBookDetailsFailure,
} from '../slices/booksSlice';
import type { Book, BookSearchResult, BookDetailsResponse } from '../../types';

// Saga для новых релизов (без изменений)
function* fetchNewReleasesSaga(): Generator<any, void, any> {
  try {
    const books: any[] = yield call(booksAPI.getNewReleases);
    const normalizedBooks: Book[] = books.map(normalizeBookFromSearch);
    yield put(fetchNewReleasesSuccess(normalizedBooks));
  } catch (error: any) {
    const errorMessage = error instanceof ApiError 
      ? error.message 
      : 'Failed to load new releases. Please try again.';
    yield put(fetchNewReleasesFailure(errorMessage));
  }
}

// Saga для поиска книг - ОБНОВЛЯЕМ ДЛЯ КЭШИРОВАНИЯ
function* searchBooksSaga(action: PayloadAction<{ query: string; page: number }>): Generator<any, void, any> {
  try {
    const result: BookSearchResult = yield call(
      booksAPI.searchBooks, 
      action.payload.query, 
      action.payload.page
    );
    
    // ✅ Нормализуем книги из поиска
    const normalizedBooks = result.books.map(normalizeBookFromSearch);
    const normalizedResult: BookSearchResult = {
      ...result,
      books: normalizedBooks
    };
    
    // ✅ Передаем в success номер страницы API
    yield put(searchBooksSuccess({ 
      result: normalizedResult, 
      apiPage: action.payload.page 
    }));
  } catch (error: any) {
    const errorMessage = error instanceof ApiError 
      ? error.message 
      : 'Search failed. Please try again.';
    yield put(searchBooksFailure(errorMessage));
  }
}

// Saga для деталей книги (без изменений)
function* fetchBookDetailsSaga(action: PayloadAction<{ isbn13: string }>): Generator<any, void, any> {
  try {
    const bookDetails: BookDetailsResponse = yield call(booksAPI.getBookDetails, action.payload.isbn13);
    const normalizedBook: Book = normalizeBookFromDetails(bookDetails);
    yield put(fetchBookDetailsSuccess(normalizedBook));
  } catch (error: any) {
    const errorMessage = error instanceof ApiError 
      ? error.message 
      : 'Failed to load book details. Please try again.';
    yield put(fetchBookDetailsFailure(errorMessage));
  }
}

// Watcher saga
export function* watchBooksSaga(): Generator<any, void, any> {
  yield takeEvery(fetchNewReleasesStart.type, fetchNewReleasesSaga);
  yield takeEvery(searchBooksStart.type, searchBooksSaga);
  yield takeEvery(fetchBookDetailsStart.type, fetchBookDetailsSaga);
}