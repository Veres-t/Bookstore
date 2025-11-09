// containers/BookDetailsContainer.tsx
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BookDetails } from '../components/BookDetails';
import { fetchBookDetailsStart } from '../store/slices/booksSlice';
import { addToCart } from '../store/slices/cartSlice';
import { addToFavorites, removeFromFavorites } from '../store/slices/favoritesSlice';
import { getCurrentBook, getBooksLoading, getNewReleases } from '../store/selectors';
import { isInFavorites } from '../store/selectors/favoritesSelectors';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import type { Book } from '../types';

export const BookDetailsContainer: React.FC = () => {
  const { isbn13 } = useParams<{ isbn13: string }>();
  const dispatch = useAppDispatch();
  
  const book = useAppSelector(getCurrentBook);
  const loading = useAppSelector(getBooksLoading);
  const newReleases = useAppSelector(getNewReleases);
  const isFavorite = useAppSelector((state) => 
    isbn13 ? isInFavorites(state, isbn13) : false
  );

  useEffect(() => {
    if (isbn13) {
      dispatch(fetchBookDetailsStart({ isbn13 }));
    }
  }, [dispatch, isbn13]);

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

  // ✅ УПРОЩЕННАЯ логика похожих книг - теперь авторы одинаковые
  const findSimilarBooks = (currentBook: Book | null, allBooks: Book[]): Book[] => {
    if (!currentBook) return [];
    
    const scoredBooks = allBooks
      .filter(book => book.isbn13 !== currentBook.isbn13)
      .map(book => {
        let score = 0;
        
        // ✅ ПРЯМОЕ СРАВНЕНИЕ - теперь авторы одинаковые на обеих страницах
        if (book.authors && currentBook.authors && 
            book.authors === currentBook.authors) {
          score += 10;
        }
        
        // Тот же издатель  
        if (book.publisher && currentBook.publisher && 
            book.publisher === currentBook.publisher) {
          score += 5;
        }
        
        return { book, score };
      })
      .sort((a, b) => b.score - a.score)
      .map(item => item.book);

    return scoredBooks.slice(0, 6);
  };

  const similarBooks = findSimilarBooks(book, newReleases);

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