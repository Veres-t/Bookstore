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

  // ✅ УМНАЯ логика похожих книг по заголовкам и подзаголовкам
  const findSimilarBooks = (currentBook: Book | null, allBooks: Book[]): Book[] => {
    if (!currentBook) return [];
    
    const scoredBooks = allBooks
      .filter(book => book.isbn13 !== currentBook.isbn13)
      .map(book => {
        let score = 0;
        
        // ✅ Сравниваем по ключевым словам в ЗАГОЛОВКЕ
        const currentTitle = (currentBook.title || '').toLowerCase();
        const bookTitle = (book.title || '').toLowerCase();
        
        const currentWords = currentTitle.split(/\s+/).filter(word => word.length > 3);
        const bookWords = bookTitle.split(/\s+/).filter(word => word.length > 3);
        
        // Считаем общие значимые слова
        const commonWords = currentWords.filter(word => bookWords.includes(word));
        score += commonWords.length * 3;
        
        // ✅ Сравниваем по SUBTITLE (если есть)
        const currentSubtitle = (currentBook.subtitle || '').toLowerCase();
        const bookSubtitle = (book.subtitle || '').toLowerCase();
        
        if (currentSubtitle && bookSubtitle) {
          const currentSubWords = currentSubtitle.split(/\s+/).filter(word => word.length > 3);
          const bookSubWords = bookSubtitle.split(/\s+/).filter(word => word.length > 3);
          
          const commonSubWords = currentSubWords.filter(word => bookSubWords.includes(word));
          score += commonSubWords.length * 2;
        }
        
        // Бонус за полное совпадение ключевых слов
        const keyPhrases = ['beginner', 'programming', 'development', 'web', 'mobile', 'android', 'ios', 'cloud', 'security', 'data', 'machine learning', 'ai'];
        keyPhrases.forEach(phrase => {
          if (currentTitle.includes(phrase) && bookTitle.includes(phrase)) {
            score += 2;
          }
          if (currentSubtitle.includes(phrase) && bookSubtitle.includes(phrase)) {
            score += 2;
          }
        });
        
        return { book, score };
      })
      .sort((a, b) => b.score - a.score) // Сортируем по релевантности
      .map(item => item.book);

    // Всегда возвращаем 6 книг
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