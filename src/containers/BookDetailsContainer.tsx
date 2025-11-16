// containers/BookDetailsContainer.tsx
import React from 'react';
import { BookDetails } from '../components/BookDetails/BookDetails';
import { useBookDetails } from '../hooks/useBookDetails';

export const BookDetailsContainer: React.FC = () => {
  const { book, loading, isFavorite, similarBooks, handleAddToCart, handleAddToFavorites } = useBookDetails();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!book) {
    return <div>Book not found</div>;
  }

  return (
    <BookDetails
      book={book}
      isFavorite={isFavorite}
      onAddToCart={handleAddToCart}
      onAddToFavorites={handleAddToFavorites}
      similarBooks={similarBooks}
    />
  );
};