// api/config.ts
const BASE_URL = 'https://api.itbook.store/1.0';

export const API_ENDPOINTS = {
  NEW_RELEASES: `${BASE_URL}/new`,
  SEARCH: (query: string, page: number = 1) => `${BASE_URL}/search/${query}?page=${page}`,
  BOOK_DETAILS: (isbn13: string) => `${BASE_URL}/books/${isbn13}`,
};