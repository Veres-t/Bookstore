// pages/SearchPage/SearchPage.tsx
import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Button, Input, Card, StarRating, Pagination, PageTitle } from '../../components'; // ✅ Добавляем PageTitle
import { searchBooksStart } from '../../store/slices/booksSlice';
import { getSearchResults, getBooksLoading, getSearchQuery, getBooksError } from '../../store/selectors';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { validateSearchQuery, formatRating, formatPrice, truncateText } from '../../helpers';
import styled from 'styled-components';

export const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [currentPage, setCurrentPage] = useState(1);
  const [localError, setLocalError] = useState('');
  
  const dispatch = useAppDispatch();
  const searchResults = useAppSelector(getSearchResults);
  const loading = useAppSelector(getBooksLoading);
  const currentQuery = useAppSelector(getSearchQuery);
  const error = useAppSelector(getBooksError);

  useEffect(() => {
    const urlQuery = searchParams.get('q');
    const urlPage = parseInt(searchParams.get('page') || '1');
    
    if (urlQuery && urlQuery !== currentQuery) {
      setCurrentPage(urlPage);
      dispatch(searchBooksStart({ query: urlQuery, page: urlPage }));
    }
  }, [searchParams, dispatch, currentQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');
    
    if (!validateSearchQuery(query)) {
      setLocalError('Please enter at least 2 characters for search');
      return;
    }

    setCurrentPage(1);
    setSearchParams({ q: query, page: '1' });
    dispatch(searchBooksStart({ query, page: 1 }));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSearchParams({ q: query, page: page.toString() });
    dispatch(searchBooksStart({ query, page }));
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://via.placeholder.com/100x120/cccccc/969696?text=No+Image';
  };

  const totalPages = searchResults ? Math.ceil(parseInt(searchResults.total) / 10) : 0;

  return (
    <Container>
      {/* ✅ Используем PageTitle вместо Heading */}
      <PageTitle>Search Books</PageTitle>
      
      <SearchForm onSubmit={handleSearch}>
        <SearchRow>
          <Input
            placeholder="Search for books..."
            value={query}
            onChange={setQuery}
            error={localError}
          />
          <Button type="submit" variant="primary">
            Search
          </Button>
        </SearchRow>
        {localError && <ErrorMessage>{localError}</ErrorMessage>}
      </SearchForm>

      {loading && <LoadingMessage>Searching...</LoadingMessage>}
      {error && (
        <ErrorCard padding="medium">
          <ErrorText>{error}</ErrorText>
        </ErrorCard>
      )}
      
      {searchResults && (
        <ResultsSection>
          <ResultsInfo>Found {searchResults.total} results for "{currentQuery}"</ResultsInfo>
          
          <BooksList>
            {searchResults.books.map(book => {
              const formattedPrice = formatPrice(book.price);
              const rating = formatRating(book.rating);
              const truncatedTitle = truncateText(book.title || 'Untitled Book', 80);
              const truncatedSubtitle = truncateText(book.subtitle || '', 100);
              const truncatedAuthors = truncateText(book.authors || 'Unknown author', 60);

              return (
                <BookCard key={book.isbn13} padding="medium">
                  <BookContent>
                    <BookImage 
                      src={book.image || 'https://via.placeholder.com/100x120/cccccc/969696?text=No+Image'} 
                      alt={book.title || 'Book cover'}
                      onError={handleImageError}
                    />
                    <BookInfo>
                      <BookTitle to={`/books/${book.isbn13}`}>{truncatedTitle}</BookTitle>
                      {book.subtitle && <BookSubtitle>{truncatedSubtitle}</BookSubtitle>}
                      <BookDetail><strong>Authors:</strong> {truncatedAuthors}</BookDetail>
                      <BookDetail><strong>Year:</strong> {book.year || 'Unknown year'}</BookDetail>
                      <StarRating rating={rating} />
                      <BookPrice>{formattedPrice}</BookPrice>
                    </BookInfo>
                  </BookContent>
                </BookCard>
              );
            })}
          </BooksList>

          {searchResults.books.length === 0 && !loading && (
            <EmptyCard padding="large">
              <EmptyTitle>No books found</EmptyTitle>
              <EmptyText>Try adjusting your search terms or browse our new releases.</EmptyText>
            </EmptyCard>
          )}

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </ResultsSection>
      )}

      {!searchResults && !loading && !error && (
        <StartCard padding="large">
          <StartTitle>Start Searching</StartTitle>
          <StartText>Enter a book title, author, or keyword to find books in our store.</StartText>
        </StartCard>
      )}
    </Container>
  );
};

// Styled components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  width: 100%;
`;

const SearchForm = styled.form`
  margin-bottom: 24px;
`;

const SearchRow = styled.div`
  display: flex;
  gap: 12px;
  
  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 8px;
  font-size: 14px;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 20px;
  font-size: 16px;
  color: #666;
`;

const ErrorCard = styled(Card)`
  margin-bottom: 16px;
  background: #fff5f5;
  border: 1px solid #fed7d7;
`;

const ErrorText = styled.div`
  color: #c53030;
  text-align: center;
`;

const ResultsSection = styled.div`
  margin-top: 24px;
`;

const ResultsInfo = styled.p`
  margin-bottom: 16px;
  font-size: 16px;
  color: #666;
`;

const BooksList = styled.div`
  display: grid;
  gap: 16px;
  margin-bottom: 24px;
`;

const BookCard = styled(Card)`
  margin-bottom: 0;
`;

const BookContent = styled.div`
  display: flex;
  gap: 16px;
  align-items: flex-start;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
  }
`;

const BookImage = styled.img`
  width: 100px;
  height: auto;
  border-radius: 4px;
  
  @media (max-width: 768px) {
    width: 80px;
  }
`;

const BookInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const BookTitle = styled(Link)`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  text-decoration: none;
  line-height: 1.3;
  
  &:hover {
    color: #007bff;
  }
`;

const BookSubtitle = styled.p`
  color: #666;
  font-style: italic;
  margin: 0;
  line-height: 1.4;
`;

const BookDetail = styled.p`
  color: #666;
  margin: 0;
  line-height: 1.4;
  font-size: 14px;
`;

const BookPrice = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #000000;
  margin-top: 8px;
`;

const EmptyCard = styled(Card)`
  text-align: center;
  padding: 40px;
`;

const EmptyTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
`;

const EmptyText = styled.p`
  color: #666;
  line-height: 1.5;
`;

const StartCard = styled(Card)`
  text-align: center;
  padding: 40px;
`;

const StartTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
`;

const StartText = styled.p`
  color: #666;
  line-height: 1.5;
`;

export default SearchPage;