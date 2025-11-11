// hooks/useSimilarBooks.ts
import { useMemo } from 'react';
import type { Book } from '../types';

interface UseSimilarBooksProps {
  sourceBooks: Book[]; // Книги, для которых ищем похожие
  allBooks: Book[]; // Все доступные книги для поиска
  maxResults?: number;
}

export const useSimilarBooks = ({
  sourceBooks,
  allBooks,
  maxResults = 6
}: UseSimilarBooksProps): Book[] => {
  return useMemo(() => {
    if (sourceBooks.length === 0 || allBooks.length === 0) return [];

    // Берем все книги, исключая те, что уже в sourceBooks
    const availableBooks = allBooks.filter(
      book => !sourceBooks.some(sourceBook => sourceBook.isbn13 === book.isbn13)
    );

    // Если sourceBooks - одна книга, используем логику для одной книги
    if (sourceBooks.length === 1) {
      return findSimilarForSingleBook(sourceBooks[0], availableBooks, maxResults);
    }

    // Если sourceBooks - несколько книг, используем логику для коллекции
    return findSimilarForBookCollection(sourceBooks, availableBooks, maxResults);
  }, [sourceBooks, allBooks, maxResults]);
};

// Логика для одной книги (как в BookDetails)
const findSimilarForSingleBook = (sourceBook: Book, availableBooks: Book[], maxResults: number): Book[] => {
  const scoredBooks = availableBooks.map(book => {
    let score = 0;
    
    // Сравниваем по ключевым словам в ЗАГОЛОВКЕ
    const sourceTitle = (sourceBook.title || '').toLowerCase();
    const bookTitle = (book.title || '').toLowerCase();
    
    const sourceWords = sourceTitle.split(/\s+/).filter(word => word.length > 3);
    const bookWords = bookTitle.split(/\s+/).filter(word => word.length > 3);
    
    // Считаем общие значимые слова
    const commonWords = sourceWords.filter(word => bookWords.includes(word));
    score += commonWords.length * 3;
    
    // Сравниваем по SUBTITLE
    const sourceSubtitle = (sourceBook.subtitle || '').toLowerCase();
    const bookSubtitle = (book.subtitle || '').toLowerCase();
    
    if (sourceSubtitle && bookSubtitle) {
      const sourceSubWords = sourceSubtitle.split(/\s+/).filter(word => word.length > 3);
      const bookSubWords = bookSubtitle.split(/\s+/).filter(word => word.length > 3);
      
      const commonSubWords = sourceSubWords.filter(word => bookSubWords.includes(word));
      score += commonSubWords.length * 2;
    }
    
    // Бонус за полное совпадение ключевых слов
    const keyPhrases = ['beginner', 'programming', 'development', 'web', 'mobile', 'android', 'ios', 'cloud', 'security', 'data', 'machine learning', 'ai'];
    keyPhrases.forEach(phrase => {
      if (sourceTitle.includes(phrase) && bookTitle.includes(phrase)) {
        score += 2;
      }
      if (sourceSubtitle.includes(phrase) && bookSubtitle.includes(phrase)) {
        score += 2;
      }
    });
    
    return { book, score };
  });
  
  return scoredBooks
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults)
    .map(item => item.book);
};

// Логика для коллекции книг (как в Favorites)
const findSimilarForBookCollection = (sourceBooks: Book[], availableBooks: Book[], maxResults: number): Book[] => {
  // Находим самые популярные авторы среди sourceBooks
  const authorCount: Record<string, number> = {};
  sourceBooks.forEach(book => {
    const authors = book.authors?.split(',') || ['Unknown'];
    authors.forEach(author => {
      authorCount[author.trim()] = (authorCount[author.trim()] || 0) + 1;
    });
  });
  
  const scoredBooks = availableBooks.map(book => {
    let score = 0;
    
    // Очки за общих авторов
    const bookAuthors = book.authors?.split(',') || [];
    bookAuthors.forEach(author => {
      score += authorCount[author.trim()] || 0;
    });
    
    // Очки за похожие ключевые слова в заголовке
    const sourceTitles = sourceBooks.map(sourceBook => sourceBook.title?.toLowerCase() || '');
    const bookTitle = (book.title || '').toLowerCase();
    
    sourceTitles.forEach(sourceTitle => {
      const commonWords = sourceTitle.split(' ')
        .filter(word => word.length > 3)
        .filter(word => bookTitle.includes(word));
      score += commonWords.length;
    });
    
    // Случайный элемент для разнообразия
    score += Math.random() * 0.5;
    
    return { book, score };
  });
  
  return scoredBooks
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults)
    .map(item => item.book);
};