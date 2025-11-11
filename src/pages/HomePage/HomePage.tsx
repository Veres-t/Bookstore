// pages/HomePage/HomePage.tsx
import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination, PageTitle } from '../../components';
import { BookCardContainer } from '../../containers/BookCardContainer';
import { Newsletter } from '../../components/Newsletter/Newsletter';
import { fetchNewReleasesStart } from '../../store/slices/booksSlice';
import { getNewReleases, getBooksLoading } from '../../store/selectors';
import type { RootState } from '../../store';
import styled from 'styled-components';

export const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const newReleases = useSelector((state: RootState) => getNewReleases(state));
  const loading = useSelector((state: RootState) => getBooksLoading(state));
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchNewReleasesStart());
  }, [dispatch]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // ✅ БЕСКОНЕЧНАЯ ПАГИНАЦИЯ - ВСЕГДА 6 СТРАНИЦ
  const totalPages = 6;

  // ✅ СЛУЧАЙНОЕ ПЕРЕМЕШИВАНИЕ КНИГ ДЛЯ КАЖДОЙ СТРАНИЦЫ (12 КНИГ НА СТРАНИЦУ)
  const getCurrentPageBooks = useMemo(() => {
    const booksPerPage = 12; // ← ВОЗВРАЩАЕМ 12 КНИГ НА СТРАНИЦУ
    
    return () => {
      if (newReleases.length === 0) return [];
      
      // Если книг меньше чем на одну страницу, возвращаем все что есть
      if (newReleases.length <= booksPerPage) {
        return newReleases;
      }
      
      // Создаем уникальное случайное seed для каждой страницы
      const seed = currentPage * 12345;
      const shuffledBooks = [...newReleases].sort((a, b) => {
        // Используем ISBN для детерминированного перемешивания
        const hashA = a.isbn13.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const hashB = b.isbn13.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        return (hashA + seed) % newReleases.length - (hashB + seed) % newReleases.length;
      });
      
      // Берем книги для текущей страницы
      const startIndex = ((currentPage - 1) * booksPerPage) % shuffledBooks.length;
      const books = [];
      
      for (let i = 0; i < booksPerPage; i++) {
        const bookIndex = (startIndex + i) % shuffledBooks.length;
        books.push(shuffledBooks[bookIndex]);
      }
      
      return books;
    };
  }, [newReleases, currentPage]);

  if (loading) {
    return <Loading>Loading...</Loading>;
  }

  const currentBooks = getCurrentPageBooks();

  return (
    <Container>
      <PageTitle>NEW RELEASES BOOKS</PageTitle>
      
      <BooksGrid>
        {currentBooks.map(book => (
          <BookCardContainer
            key={`${book.isbn13}-page-${currentPage}`}
            book={book}
            variant="grid"
            showActions={false}
          />
        ))}
      </BooksGrid>

      <Divider />

      {/* ✅ ВСЕГДА 6 СТРАНИЦ ДЛЯ БЕСКОНЕЧНОСТИ */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      <Newsletter />
    </Container>
  );
};

// Styled components
const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const Loading = styled.div`
  text-align: center;
  padding: 40px;
  font-size: 18px;
`;

const BooksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 40px;
  
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const Divider = styled.div`
  height: 1px;
  background-color: #e1e5e9;
  margin: 40px 0;
  width: 100%;
`;

export default HomePage;