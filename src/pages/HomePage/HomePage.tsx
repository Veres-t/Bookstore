// pages/HomePage/HomePage.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Heading, BookCard } from '../../components';
import { fetchNewReleasesStart } from '../../store/slices/booksSlice';
import { getNewReleases, getBooksLoading } from '../../store/selectors';
import type { RootState } from '../../store';
import styled from 'styled-components';

export const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const newReleases = useSelector((state: RootState) => getNewReleases(state));
  const loading = useSelector((state: RootState) => getBooksLoading(state));

  useEffect(() => {
    dispatch(fetchNewReleasesStart());
  }, [dispatch]);

  if (loading) {
    return <Loading>Loading...</Loading>;
  }

  return (
    <Container>
      <PageTitle>NEW RELEASES BOOKS</PageTitle>
      
      <BooksGrid>
        {newReleases.slice(0, 12).map(book => (
          <BookCard
            key={book.isbn13}
            book={book}
            variant="grid"
            showActions={false} // Пока уберем кнопки действий
          />
        ))}
      </BooksGrid>

      <PaginationContainer>
        <PageButton $active={true}>1</PageButton>
        <PageButton>2</PageButton>
        <PageButton>3</PageButton>
        <PageButton>→</PageButton>
      </PaginationContainer>
    </Container>
  );
};

// Styled components (остаются без изменений)
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

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 32px;
`;

const PageButton = styled.button<{ $active?: boolean }>`
  padding: 8px 16px;
  border: 1px solid ${props => props.$active ? '#007bff' : '#ddd'};
  background-color: ${props => props.$active ? '#007bff' : 'white'};
  color: ${props => props.$active ? 'white' : '#333'};
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: ${props => props.$active ? '#0056b3' : '#f8f9fa'};
  }
`;