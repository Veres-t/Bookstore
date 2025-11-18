// src/__tests__/components/BookCard.test.tsx
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { BookCard } from '../../components/BookCard';
import type { Book } from '../../types';

const mockBook: Book = {
  isbn13: '123',
  title: 'Test Book Title',
  authors: 'Test Author Name',
  price: '$10.00',
  image: 'test-image.jpg',
  rating: '4.5'
};

const mockStore = configureStore({
  reducer: {
    books: () => ({
      newReleases: [],
      searchResults: null,
      currentBook: null,
      loading: false,
      error: null,
      searchQuery: '',
      currentSearchPage: 1,
      hasMore: true,
      allSearchBooks: [],
      loadedApiPages: []
    }),
    auth: () => ({
      user: null,
      isAuthenticated: false,
      loading: false,
      error: null,
      mode: 'signin',
      passwordChangeSuccess: false
    }),
    cart: () => ({ items: [] }),
    favorites: () => ({ items: [] })
  }
});

describe('BookCard Component', () => {
  // Отображение информации о книге
  it('should render book information correctly in grid variant', () => {
    render(
      <BrowserRouter>
        <Provider store={mockStore}>
          <BookCard book={mockBook} variant="grid" />
        </Provider>
      </BrowserRouter>
    );

    
    expect(screen.getByText('Test Book Title')).toBeInTheDocument();
    expect(screen.getByText('$10.00')).toBeInTheDocument();
    
  });

  //  Ссылка на детали книги
  it('should have correct link to book details page', () => {
    render(
      <BrowserRouter>
        <Provider store={mockStore}>
          <BookCard book={mockBook} variant="grid" />
        </Provider>
      </BrowserRouter>
    );

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/books/123');
  });
});