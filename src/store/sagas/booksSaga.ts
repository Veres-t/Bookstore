// store/sagas/booksSaga.ts

import { call, put, takeEvery } from 'redux-saga/effects';
import { booksAPI } from '../../api';
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

// Saga для новых релизов
function* fetchNewReleasesSaga(): Generator<any, void, any> {
  try {
    const books: Book[] = yield call(booksAPI.getNewReleases);
    yield put(fetchNewReleasesSuccess(books));
  } catch (error: any) {
    yield put(fetchNewReleasesFailure(error.message || 'Unknown error'));
  }
}

// Saga для поиска книг
function* searchBooksSaga(action: any): Generator<any, void, any> {
  try {
    const result: BookSearchResult = yield call(booksAPI.searchBooks, action.payload);
    yield put(searchBooksSuccess(result));
  } catch (error: any) {
    yield put(searchBooksFailure(error.message || 'Unknown error'));
  }
}

// Saga для деталей книги
function* fetchBookDetailsSaga(action: any): Generator<any, void, any> {
  try {
    const bookDetails: BookDetailsResponse = yield call(booksAPI.getBookDetails, action.payload);
    
    if (bookDetails.error) {
      throw new Error(bookDetails.error);
    }

    const book: Book = {
      isbn13: bookDetails.isbn13 || '',
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
    yield put(fetchBookDetailsFailure(error.message || 'Unknown error'));
  }
}

// Watcher saga
export function* watchBooksSaga(): Generator<any, void, any> {
  yield takeEvery(fetchNewReleasesStart.type, fetchNewReleasesSaga);
  yield takeEvery(searchBooksStart.type, searchBooksSaga);
  yield takeEvery(fetchBookDetailsStart.type, fetchBookDetailsSaga);
}