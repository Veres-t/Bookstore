// api/books.ts
import { API_ENDPOINTS } from './config';
import type { Book, BookSearchResult, NewReleasesResponse, BookDetailsResponse } from '../types';

export const booksAPI = {
  // Получить новые релизы
  async getNewReleases(): Promise<Book[]> {
    try {
      const response = await fetch(API_ENDPOINTS.NEW_RELEASES);
      if (!response.ok) throw new Error('Failed to fetch new releases');
      
      const data: NewReleasesResponse = await response.json();
      return data.books || [];
    } catch (error) {
      console.error('Error fetching new releases:', error);
      throw error;
    }
  },

  // Поиск книг
  async searchBooks(query: string, page: number = 1): Promise<BookSearchResult> {
    try {
      const response = await fetch(API_ENDPOINTS.SEARCH(query, page));
      if (!response.ok) throw new Error('Failed to search books');
      
      const data: BookSearchResult = await response.json();
      return data;
    } catch (error) {
      console.error('Error searching books:', error);
      throw error;
    }
  },

  // Получить детали книги
  async getBookDetails(isbn13: string): Promise<BookDetailsResponse> {
    try {
      const response = await fetch(API_ENDPOINTS.BOOK_DETAILS(isbn13));
      if (!response.ok) throw new Error('Failed to fetch book details');
      
      const data: BookDetailsResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching book details:', error);
      throw error;
    }
  },
};