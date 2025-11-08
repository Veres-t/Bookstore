// pages/HomePage/HomePage.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Heading, Card, StarRating } from '../../components';
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
      <Heading level={1}>NEW RELEASES BOOKS</Heading>
      
      <BooksGrid>
        {newReleases.slice(0, 12).map(book => (
          <BookCard key={book.isbn13} padding="medium">
            <BookImage 
              src={book.image || 'https://via.placeholder.com/200x250/cccccc/969696?text=No+Image'} 
              alt={book.title}
              onError={(e) => {
                e.currentTarget.src = 'https://via.placeholder.com/200x250/cccccc/969696?text=No+Image';
              }}
            />
            <BookInfo>
              <BookTitle to={`/books/${book.isbn13}`}>
                {book.title || 'Untitled Book'}
              </BookTitle>
              <BookSubtitle>{book.subtitle || ''}</BookSubtitle>
              <BookAuthors>{book.authors || 'Unknown authors'}</BookAuthors>
              <RatingPriceContainer>
                <StarRating rating={Math.floor(parseFloat(book.rating ?? '0'))} />
                <BookPrice>{book.price || '$0.00'}</BookPrice>
              </RatingPriceContainer>
            </BookInfo>
          </BookCard>
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

// Styled components
const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Loading = styled.div`
  text-align: center;
  padding: 40px;
  font-size: 18px;
`;

const BooksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin: 24px 0;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const BookCard = styled(Card)`
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }
`;

const BookImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 12px;
`;

const BookInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const BookTitle = styled(Link)`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  &:hover {
    color: #007bff;
  }
`;

const BookSubtitle = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const BookAuthors = styled.p`
  font-size: 14px;
  color: #888;
  margin-bottom: 12px;
  font-style: italic;
`;

const RatingPriceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
`;

const BookPrice = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: #007bff;
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
    border-color: ${props => props.$active ? '#0056b3' : '#007bff'};
  }
`;