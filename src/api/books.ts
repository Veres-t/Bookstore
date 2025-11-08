// api/books.ts
import { API_ENDPOINTS } from './config';
import { fetchWithErrorHandling, ApiError } from '../helpers';
import type { Book, BookSearchResult, NewReleasesResponse, BookDetailsResponse } from '../types';

export const booksAPI = {
  // Получить новые релизы
  async getNewReleases(): Promise<Book[]> {
    try {
      const data: NewReleasesResponse = await fetchWithErrorHandling<NewReleasesResponse>(
        API_ENDPOINTS.NEW_RELEASES
      );
      return data.books || [];
    } catch (error) {
      console.error('Error fetching new releases:', error);
      throw new ApiError(
        error instanceof Error ? error.message : 'Failed to fetch new releases'
      );
    }
  },

  // Поиск книг
  async searchBooks(query: string, page: number = 1): Promise<BookSearchResult> {
    try {
      if (!query.trim()) {
        throw new ApiError('Search query cannot be empty');
      }

      const data: BookSearchResult = await fetchWithErrorHandling<BookSearchResult>(
        API_ENDPOINTS.SEARCH(query, page)
      );
      return data;
    } catch (error) {
      console.error('Error searching books:', error);
      throw new ApiError(
        error instanceof Error ? error.message : 'Failed to search books'
      );
    }
  },

  // Получить детали книги
  async getBookDetails(isbn13: string): Promise<BookDetailsResponse> {
    try {
      if (!isbn13) {
        throw new ApiError('ISBN13 is required');
      }

      const data: BookDetailsResponse = await fetchWithErrorHandling<BookDetailsResponse>(
        API_ENDPOINTS.BOOK_DETAILS(isbn13)
      );
      
      if (data.error === '0' && !data.title) {
        throw new ApiError('Book not found');
      }

      return data;
    } catch (error) {
      console.error('Error fetching book details:', error);
      throw new ApiError(
        error instanceof Error ? error.message : 'Failed to fetch book details'
      );
    }
  },
};