// store/sagas/booksSaga.ts
import { call, put, takeEvery, all } from 'redux-saga/effects'; // ✅ Добавляем all
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

// Saga для новых релизов
function* fetchNewReleasesSaga(): Generator<any, void, any> {
  try {
    const books: any[] = yield call(booksAPI.getNewReleases);
    
    // ✅ ЗАПРАШИВАЕМ ДЕТАЛИ ДЛЯ КАЖДОЙ КНИГИ чтобы получить авторов
    const booksWithDetails: Book[] = yield all(
      books.map(book => 
        call(function* () {
          try {
            // Запрашиваем детали книги чтобы получить автора
            const details: BookDetailsResponse = yield call(
              booksAPI.getBookDetails, 
              book.isbn13
            );
            
            // ✅ Используем данные из ДЕТАЛЕЙ (где есть автор)
            return {
              isbn13: details.isbn13 || book.isbn13,
              title: details.title || book.title,
              subtitle: details.subtitle || book.subtitle,
              authors: details.authors || 'Unknown', // ← ТЕПЕРЬ РЕАЛЬНЫЙ АВТОР!
              publisher: details.publisher || book.publisher,
              pages: details.pages || book.pages,
              year: details.year || book.year,
              rating: details.rating || book.rating,
              desc: details.desc || book.desc,
              price: details.price || book.price,
              image: details.image || book.image,
              url: details.url || book.url,
            };
          } catch (error) {
            // Если ошибка, используем базовые данные
            console.warn(`Failed to fetch details for ${book.isbn13}:`, error);
            return normalizeBookFromSearch(book);
          }
        })
      )
    );
    
    yield put(fetchNewReleasesSuccess(booksWithDetails));
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
    
    // ✅ Нормализуем книги из поиска
    const normalizedBooks = result.books.map(normalizeBookFromSearch);
    const normalizedResult: BookSearchResult = {
      ...result,
      books: normalizedBooks
    };
    
    yield put(searchBooksSuccess(normalizedResult));
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
    const bookDetails: BookDetailsResponse = yield call(booksAPI.getBookDetails, action.payload.isbn13);
    const normalizedBook: Book = normalizeBookFromDetails(bookDetails); // ✅ Нормализуем
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