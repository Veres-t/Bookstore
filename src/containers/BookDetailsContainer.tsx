// containers/BookDetailsContainer.tsx
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BookDetails } from '../components/BookDetails';
import { fetchBookDetailsStart } from '../store/slices/booksSlice';
import { addToCart } from '../store/slices/cartSlice';
import { addToFavorites, removeFromFavorites } from '../store/slices/favoritesSlice';
import { getCurrentBook, getBooksLoading } from '../store/selectors';
import { isInFavorites } from '../store/selectors/favoritesSelectors';
import { useAppDispatch, useAppSelector } from '../store/hooks';

export const BookDetailsContainer: React.FC = () => {
  const { isbn13 } = useParams<{ isbn13: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const book = useAppSelector(getCurrentBook);
  const loading = useAppSelector(getBooksLoading);
  const isFavorite = useAppSelector((state) => 
    isbn13 ? isInFavorites(state, isbn13) : false
  );

  useEffect(() => {
    if (isbn13) {
      dispatch(fetchBookDetailsStart({ isbn13 }));
    }
  }, [dispatch, isbn13]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleAddToFavorites = () => {
    if (book) {
      if (isFavorite) {
        dispatch(removeFromFavorites({ isbn13: book.isbn13 }));
      } else {
        dispatch(addToFavorites({ book }));
      }
    }
  };

  const handleAddToCart = () => {
    if (book) {
      dispatch(addToCart({ book }));
    }
  };

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
      onBack={handleBack}
      onAddToCart={handleAddToCart}
      onAddToFavorites={handleAddToFavorites}
    />
  );
};