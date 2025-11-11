// containers/BookCardContainer.tsx
import React from 'react';
import { BookCard } from '../components/BookCard';
import { addToCart } from '../store/slices/cartSlice';
import { addToFavorites, removeFromFavorites } from '../store/slices/favoritesSlice';
import { isInFavorites } from '../store/selectors';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import type { Book } from '../types'; // ✅ Оставляем, но используем

interface BookCardContainerProps {
  book: Book; // ✅ Теперь используем тип Book
  variant?: 'grid' | 'list';
  showActions?: boolean;
}

export const BookCardContainer: React.FC<BookCardContainerProps> = ({ 
  book, 
  variant = 'grid',
  showActions = false 
}) => {
  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector((state) => 
    isInFavorites(state, book.isbn13)
  );

  const handleAddToCart = () => {
    dispatch(addToCart({ book }));
  };

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites({ isbn13: book.isbn13 }));
    } else {
      dispatch(addToFavorites({ book }));
    }
  };

  return (
    <BookCard
      book={book}
      variant={variant}
      onAddToCart={handleAddToCart}
      onAddToFavorites={handleToggleFavorite}
      showActions={showActions}
      isInFavorites={isFavorite}
    />
  );
};