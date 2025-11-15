// pages/SearchPage/SearchPage.tsx
import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Button, Card, Pagination, PageTitle } from '../../components';
import { BookCardContainer } from '../../containers/BookCardContainer';
import { searchBooksStart, clearSearchResults } from '../../store/slices/booksSlice';
import { 
  getSearchResults, 
  getBooksLoading, 
  getSearchQuery, 
  getBooksError
} from '../../store/selectors';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { validateSearchQuery } from '../../helpers';
import styled from 'styled-components';

export const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [localQuery, setLocalQuery] = useState(searchParams.get('q') || '');
  const [currentPage, setCurrentPage] = useState(1);
  
  const dispatch = useAppDispatch();
  const searchResults = useAppSelector(getSearchResults);
  const loading = useAppSelector(getBooksLoading);
  const currentQuery = useAppSelector(getSearchQuery);
  const error = useAppSelector(getBooksError);

  // Получаем поисковый запрос из URL
  const urlQuery = searchParams.get('q') || '';

  // Все книги из поиска
  const allBooks = searchResults?.books || [];

  useEffect(() => {
    if (urlQuery && urlQuery !== currentQuery) {
      setCurrentPage(1);
      setLocalQuery(urlQuery);
      
      // ОЧИЩАЕМ предыдущие результаты перед новым поиском
      dispatch(clearSearchResults());
      
      // Загружаем первую страницу чтобы узнать общее количество
      dispatch(searchBooksStart({ query: urlQuery, page: 1 }));
    }
  }, [urlQuery, dispatch, currentQuery]);

  // После загрузки первой страницы, загружаем ВСЕ остальные страницы ПАРАЛЛЕЛЬНО
  useEffect(() => {
    if (searchResults && searchResults.page === 1) {
      const totalResults = parseInt(searchResults.total);
      const apiBooksPerPage = 10; // API возвращает по 10 книг на страницу
      const totalPages = Math.ceil(totalResults / apiBooksPerPage);

      // Загружаем ВСЕ остальные страницы ПАРАЛЛЕЛЬНО
      for (let page = 2; page <= totalPages; page++) {
        dispatch(searchBooksStart({ query: urlQuery, page }));
      }
    }
  }, [searchResults, urlQuery, dispatch]);

  // Клиентская пагинация: 12 книг на страницу
  const booksPerPage = 12;
  const resultsCount = searchResults ? parseInt(searchResults.total) : 0;
  
  // ВАЖНО: используем ОБЩЕЕ количество книг из API для пагинации
  const totalPages = Math.ceil(resultsCount / booksPerPage);
  
  // Книги для текущей страницы
  const currentBooks = useMemo(() => {
    const startIndex = (currentPage - 1) * booksPerPage;
    const endIndex = startIndex + booksPerPage;
    return allBooks.slice(startIndex, endIndex);
  }, [allBooks, currentPage]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateSearchQuery(localQuery)) {
      return;
    }

    setCurrentPage(1);
    setSearchParams({ q: localQuery });
    
    // ОЧИЩАЕМ предыдущие результаты перед новым поиском
    dispatch(clearSearchResults());
    
    // Загружаем первую страницу
    dispatch(searchBooksStart({ query: localQuery, page: 1 }));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Форматируем заголовок
  const pageTitle = urlQuery 
    ? `'${urlQuery}' SEARCH RESULTS` 
    : 'SEARCH BOOKS';

  return (
    <Container>
      {/* Динамический заголовок */}
      <PageTitle>{pageTitle}</PageTitle>

      {/* Строка с количеством результатов */}
      {searchResults && (
        <ResultsInfo>
          Found {resultsCount} {resultsCount === 1 ? 'book' : 'books'}
          {urlQuery && ` for "${urlQuery}"`}
        </ResultsInfo>
      )}

      {/* Поисковая строка с подсказками - ТОЛЬКО НА МОБИЛЬНЫХ */}
      <MobileSearchSection>
        <SearchForm onSubmit={handleSearch}>
          <SearchContainer>
            <SearchInput
              type="text"
              placeholder="Search for books..."
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
            />
            <SearchButton type="submit" variant="primary">
              Search
            </SearchButton>
          </SearchContainer>
        </SearchForm>
      </MobileSearchSection>

      {/* Состояния загрузки и ошибок */}
      {loading && <LoadingMessage>Searching...</LoadingMessage>}
      
      {error && (
        <ErrorCard padding="medium">
          <ErrorText>{error}</ErrorText>
        </ErrorCard>
      )}

      {/* Результаты поиска в grid как в HomePage */}
      {searchResults && allBooks.length > 0 && (
        <ResultsSection>
          <BooksGrid>
            {currentBooks.map(book => (
              <BookCardContainer
                key={book.isbn13}
                book={book}
                variant="grid"
                showActions={false}
              />
            ))}
          </BooksGrid>

          {/* Пагинация - показываем СРАЗУ на основе общего количества книг */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </ResultsSection>
      )}

      {/* Пустые состояния */}
      {searchResults && allBooks.length === 0 && !loading && urlQuery && (
        <EmptyCard padding="large">
          <EmptyTitle>No books found</EmptyTitle>
          <EmptyText>Try adjusting your search terms or browse our new releases.</EmptyText>
          <Link to="/">
            <Button variant="primary">Browse New Releases</Button>
          </Link>
        </EmptyCard>
      )}

      {!searchResults && !loading && !error && !urlQuery && (
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

const ResultsInfo = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 24px;
  font-weight: 500;
`;

// Поисковая строка показывается ТОЛЬКО на мобильных
const MobileSearchSection = styled.div`
  margin-bottom: 32px;
  
  @media (min-width: 769px) {
    display: none;
  }
`;

const SearchForm = styled.form`
  width: 100%;
`;

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  gap: 12px;
  max-width: 600px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SearchInput = styled.input`
  padding: 12px 16px;
  border: 2px solid #e1e5e9;
  border-radius: 4px;
  font-size: 16px;
  flex: 1;
  width: 100%;
  
  &:focus {
    outline: none;
    border-color: #000000;
  }
  
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const SearchButton = styled(Button)`
  white-space: nowrap;
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 20px;
  font-size: 16px;
  color: #666;
`;

const ErrorCard = styled(Card)`
  margin-bottom: 24px;
  background: #fff5f5;
  border: 1px solid #fed7d7;
`;

const ErrorText = styled.div`
  color: #c53030;
  text-align: center;
`;

const ResultsSection = styled.div`
  margin-top: 32px;
`;

const BooksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 40px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const EmptyCard = styled(Card)`
  text-align: center;
  padding: 60px 40px;
  margin-top: 40px;
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
  margin-bottom: 24px;
`;

const StartCard = styled(Card)`
  text-align: center;
  padding: 60px 40px;
  margin-top: 40px;
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