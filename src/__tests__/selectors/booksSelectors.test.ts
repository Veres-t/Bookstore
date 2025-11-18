// src/__tests__/selectors/booksSelectors.test.ts
import { getNewReleases, getBooksLoading } from '../../store/selectors';

import type { RootState } from '../../store';

const mockState: RootState = {
  books: {
    newReleases: [
      { 
        isbn13: '123', 
        title: 'Test Book 1', 
        price: '$10.00',
        authors: 'Author 1'
      }
    ],
    searchResults: null,
    currentBook: null,
    loading: true,
    error: null,
    searchQuery: '',
    currentSearchPage: 1,
    hasMore: true,
    allSearchBooks: [],
    loadedApiPages: []
  },
  auth: { 
    user: null, 
    isAuthenticated: false, 
    loading: false, 
    error: null,
    mode: 'signin',
    passwordChangeSuccess: false
  },
  cart: { items: [] },
  favorites: { items: [] }
};

describe('books selectors', () => {
  it('getNewReleases should return all new release books', () => {
    const selected = getNewReleases(mockState);
    expect(selected).toHaveLength(1);
    expect(selected[0].title).toBe('Test Book 1');
  });

  it('getBooksLoading should return loading state', () => {
    const loading = getBooksLoading(mockState);
    expect(loading).toBe(true);
  });
});