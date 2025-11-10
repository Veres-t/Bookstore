// helpers/normalizers.ts
import type { Book, BookDetailsResponse } from '../types';

/**
 * Нормализует данные книги из API поиска/новых релизов
 */
export const normalizeBookFromSearch = (apiBook: any): Book => {
  return {
    isbn13: apiBook.isbn13 || '',
    title: apiBook.title || 'Untitled Book',
    subtitle: apiBook.subtitle || '', // ✅ Сохраняем subtitle
    authors: apiBook.authors || 'Unknown authors', // ⬅️ Возвращаем как было
    publisher: apiBook.publisher || 'Unknown publisher',
    pages: apiBook.pages || '',
    year: apiBook.year || '',
    rating: apiBook.rating || '',
    desc: apiBook.desc || '',
    price: apiBook.price || '$0.00',
    image: apiBook.image || '',
    url: apiBook.url || '',
  };
};

/**
 * Нормализует данные книги из API деталей
 */
export const normalizeBookFromDetails = (apiBook: BookDetailsResponse): Book => {
  return {
    isbn13: apiBook.isbn13 || '',
    title: apiBook.title || 'Untitled Book',
    subtitle: apiBook.subtitle || '', // ✅ Сохраняем subtitle
    authors: apiBook.authors || 'Unknown author', // ⬅️ Возвращаем как было
    publisher: apiBook.publisher || 'Unknown publisher',
    pages: apiBook.pages || '',
    year: apiBook.year || '',
    rating: apiBook.rating || '',
    desc: apiBook.desc || '',
    price: apiBook.price || '$0.00',
    image: apiBook.image || '',
    url: apiBook.url || '',
  };
};

/**
 * Унифицирует authors поле для сравнения
 */
export const normalizeAuthors = (authors: string | undefined): string => {
  if (!authors) return 'unknown';
  
  return authors
    .toLowerCase()
    .replace('unknown authors', 'unknown')
    .replace('unknown author', 'unknown')
    .trim();
};