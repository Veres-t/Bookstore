// pages/HomePage/HomePage.tsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination } from '../../components';
import { BookCardContainer } from '../../containers/BookCardContainer';
import { Newsletter } from '../../components/Newsletter/Newsletter'; // ✅ Импортируем компонент
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
    console.log('Changing to page:', page);
  };

  if (loading) {
    return <Loading>Loading...</Loading>;
  }

  return (
    <Container>
      <PageTitle>NEW RELEASES BOOKS</PageTitle>
      
      <BooksGrid>
        {newReleases.slice(0, 12).map(book => (
          <BookCardContainer
            key={book.isbn13}
            book={book}
            variant="grid"
            showActions={false}
          />
        ))}
      </BooksGrid>

      <Divider />

      <Pagination
        currentPage={currentPage}
        totalPages={6}
        onPageChange={handlePageChange}
      />

      {/* ✅ Заменяем на переиспользуемый компонент Newsletter */}
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

const PageTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 32px;
  text-align: left;
  
  @media (max-width: 768px) {
    font-size: 20px;
    margin-bottom: 24px;
  }
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