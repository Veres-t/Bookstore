// store/sagas/booksSaga.ts
import { call, put, takeEvery } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { booksAPI } from '../../api';
import { ApiError } from '../../helpers';
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
import type { Book, BookSearchResult } from '../../types';

// Saga для новых релизов
function* fetchNewReleasesSaga(): Generator<any, void, any> {
  try {
    const books: Book[] = yield call(booksAPI.getNewReleases);
    yield put(fetchNewReleasesSuccess(books));
  } catch (error: any) {
    const errorMessage = error instanceof ApiError 
      ? error.message 
      : 'Failed to load new releases. Please try again.';
    yield put(fetchNewReleasesFailure(errorMessage));
  }
}

// Saga для поиска книг
function* searchBooksSaga(action: PayloadAction<{ query: string; page: number }>): Generator<any, void, any> {
  try {
    const result: BookSearchResult = yield call(
      booksAPI.searchBooks, 
      action.payload.query, 
      action.payload.page
    );
    yield put(searchBooksSuccess(result));
  } catch (error: any) {
    const errorMessage = error instanceof ApiError 
      ? error.message 
      : 'Search failed. Please try again.';
    yield put(searchBooksFailure(errorMessage));
  }
}

// Saga для деталей книги
function* fetchBookDetailsSaga(action: PayloadAction<{ isbn13: string }>): Generator<any, void, any> {
  try {
    const bookDetails = yield call(booksAPI.getBookDetails, action.payload.isbn13);
    
    // Преобразуем ответ API в нашу модель Book
    const book: Book = {
      isbn13: bookDetails.isbn13 || action.payload.isbn13,
      title: bookDetails.title || '',
      subtitle: bookDetails.subtitle || '',
      authors: bookDetails.authors || '',
      publisher: bookDetails.publisher || '',
      pages: bookDetails.pages || '',
      year: bookDetails.year || '',
      rating: bookDetails.rating || '',
      desc: bookDetails.desc || '',
      price: bookDetails.price || '',
      image: bookDetails.image || '',
      url: bookDetails.url || '',
    };

    yield put(fetchBookDetailsSuccess(book));
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