// pages/SearchPage/SearchPage.tsx
import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Button, Card, Pagination, PageTitle } from '../../components';
import { BookCardContainer } from '../../containers/BookCardContainer';
import { searchBooksStart, clearSearchResults, setCurrentSearchPage } from '../../store/slices/booksSlice';
import { 
  getSearchResults, 
  getBooksLoading, 
  getBooksError,
  getAllSearchBooks,
  getLoadedApiPages,
  getTotalSearchResults,
  getCurrentSearchPage
} from '../../store/selectors';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { validateSearchQuery } from '../../helpers';
import styled from 'styled-components';

export const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [localQuery, setLocalQuery] = useState(searchParams.get('q') || '');
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  
  const dispatch = useAppDispatch();
  const searchResults = useAppSelector(getSearchResults);
  const loading = useAppSelector(getBooksLoading);
  const error = useAppSelector(getBooksError);
  const allBooks = useAppSelector(getAllSearchBooks);
  const loadedApiPages = useAppSelector(getLoadedApiPages);
  const totalResults = useAppSelector(getTotalSearchResults);
  const currentPage = useAppSelector(getCurrentSearchPage);

  const urlQuery = searchParams.get('q') || '';

  // ✅ Константы
  const BOOKS_PER_PAGE = 12;
  const API_BOOKS_PER_PAGE = 10;
  
  // ✅ Ограничения API
  const MAX_API_RESULTS = 1000;
  const MAX_API_PAGES = 100;

  // ✅ Эффективное количество результатов (ограниченное API)
  const effectiveTotalResults = Math.min(totalResults, MAX_API_RESULTS);
  
  // ✅ Рассчитываем общее количество страниц UI
  const totalUIPages = Math.ceil(effectiveTotalResults / BOOKS_PER_PAGE);

  // ✅ Книги для текущей страницы UI
  const currentBooks = useMemo(() => {
    const startIndex = (currentPage - 1) * BOOKS_PER_PAGE;
    const endIndex = Math.min(startIndex + BOOKS_PER_PAGE, effectiveTotalResults);
    
    return allBooks.slice(startIndex, endIndex);
  }, [allBooks, currentPage, effectiveTotalResults]);

  // ✅ ПРОСТАЯ ФУНКЦИЯ ДЛЯ ПЕРВОГО ПОИСКА - всегда загружаем страницы 1 и 2
  const getInitialApiPages = () => [1, 2];

  // ✅ ПРАВИЛЬНЫЙ РАСЧЕТ ДЛЯ ПОСЛЕДНЕЙ СТРАНИЦЫ С ОГРАНИЧЕНИЯМИ API
  const getRequiredApiPages = (uiPage: number) => {
    if (effectiveTotalResults === 0) return [];
    
    const startIndex = (uiPage - 1) * BOOKS_PER_PAGE;
    const endIndex = Math.min(startIndex + BOOKS_PER_PAGE, effectiveTotalResults);
    
    const startApiPage = Math.floor(startIndex / API_BOOKS_PER_PAGE) + 1;
    const endApiPage = Math.ceil(endIndex / API_BOOKS_PER_PAGE);
    
    // ✅ Ограничиваем максимальным количеством API страниц
    const maxApiPages = Math.min(Math.ceil(effectiveTotalResults / API_BOOKS_PER_PAGE), MAX_API_PAGES);
    const actualEndApiPage = Math.min(endApiPage, maxApiPages);
    
    // ✅ Проверяем валидность страниц
    if (startApiPage > maxApiPages) {
      return [];
    }
    
    const pages = new Set<number>();
    for (let apiPage = startApiPage; apiPage <= actualEndApiPage; apiPage++) {
      pages.add(apiPage);
    }
    
    return Array.from(pages).sort((a, b) => a - b);
  };

  // ✅ ПРОСТОЙ ЭФФЕКТ ДЛЯ ПОИСКА
  useEffect(() => {
    if (urlQuery && urlQuery.trim()) {
      setLocalQuery(urlQuery);
      dispatch(clearSearchResults());
      dispatch(setCurrentSearchPage(1));
      
      // ✅ ВСЕГДА загружаем страницы 1 и 2 для нового поиска
      const requiredPages = getInitialApiPages();
      requiredPages.forEach(apiPage => {
        dispatch(searchBooksStart({ query: urlQuery, page: apiPage }));
      });
    }
  }, [urlQuery, dispatch]);

  // ✅ ЭФФЕКТ ДЛЯ СМЕНЫ СТРАНИЦ - ЗАГРУЖАЕМ ВСЕ СТРАНИЦЫ ДО НУЖНОЙ (С ОГРАНИЧЕНИЕМ)
  useEffect(() => {
    if (urlQuery && urlQuery.trim() && currentPage > 0 && effectiveTotalResults > 0) {
      const requiredPages = getRequiredApiPages(currentPage);
      
      if (requiredPages.length === 0) {
        return;
      }
      
      // ✅ Показываем индикатор загрузки для быстрого перехода на последнюю страницу
      if (currentPage === totalUIPages) {
        setIsLoadingPage(true);
      }
      
      // ✅ ЗАГРУЖАЕМ ВСЕ СТРАНИЦЫ ОТ 1 ДО МАКСИМАЛЬНОЙ НУЖНОЙ (С ОГРАНИЧЕНИЕМ)
      const maxRequiredPage = Math.max(...requiredPages);
      const MAX_LOADABLE_PAGES = 100;
      
      const actualMaxPage = Math.min(maxRequiredPage, MAX_LOADABLE_PAGES);
      const pagesToLoad = [];
      
      for (let apiPage = 1; apiPage <= actualMaxPage; apiPage++) {
        if (!loadedApiPages.includes(apiPage)) {
          pagesToLoad.push(apiPage);
        }
      }
      
      // ✅ Ограничиваем одновременную загрузку (чтобы не перегружать API)
      const pagesToLoadNow = pagesToLoad.slice(0, 5);
      
      if (pagesToLoadNow.length > 0) {
        pagesToLoadNow.forEach(apiPage => {
          dispatch(searchBooksStart({ query: urlQuery, page: apiPage }));
        });
      } else {
        // Если все страницы уже загружены, скрываем индикатор
        setIsLoadingPage(false);
      }
    }
  }, [currentPage, urlQuery, dispatch, loadedApiPages, effectiveTotalResults, totalUIPages]);

  // ✅ Скрываем индикатор загрузки когда данные загружены
  useEffect(() => {
    if (!loading && currentBooks.length > 0) {
      setIsLoadingPage(false);
    }
  }, [loading, currentBooks.length]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateSearchQuery(localQuery)) {
      return;
    }

    setSearchParams({ q: localQuery });
  };

  const handlePageChange = (page: number) => {
    if (page > totalUIPages) {
      return;
    }
    
    dispatch(setCurrentSearchPage(page));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const pageTitle = urlQuery 
    ? `'${urlQuery}' SEARCH RESULTS` 
    : 'SEARCH BOOKS';

  return (
    <Container>
      {/* ✅ ПОИСКОВАЯ СТРОКА НА СТРАНИЦЕ ПОИСКА - СКРЫВАЕМ НА ДЕСКТОПЕ (769px+) */}
      <MobileSearchSection>
        <SearchForm onSubmit={handleSearch}>
          <SearchContainer>
            <SearchInput
              type="text"
              placeholder="Search for books..."
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSearch(e);
                }
              }}
            />
            <SearchButton type="submit" variant="primary">
              Search
            </SearchButton>
          </SearchContainer>
        </SearchForm>
      </MobileSearchSection>

      <PageTitle>{pageTitle}</PageTitle>

      {searchResults && (
        <ResultsContainer>
          Found {totalResults} {totalResults === 1 ? 'book' : 'books'}
          {urlQuery && ` for "${urlQuery}"`}
          {totalUIPages > 0 && ` • Page ${currentPage} of ${totalUIPages}`}
        </ResultsContainer>
      )}

      {/* Состояния загрузки и ошибок */}
      {(loading || isLoadingPage) && currentBooks.length === 0 && (
        <LoadingMessage>
          <Spinner />
          Searching...
        </LoadingMessage>
      )}
      
      {error && (
        <ErrorCard padding="medium">
          <ErrorText>{error}</ErrorText>
        </ErrorCard>
      )}

      {/* Индикатор загрузки для последней страницы */}
      {isLoadingPage && currentBooks.length > 0 && (
        <LoadingMoreMessage>
          <Spinner />
          Loading final books...
        </LoadingMoreMessage>
      )}

      {/* Результаты поиска */}
      {searchResults && currentBooks.length > 0 && (
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

          {totalUIPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalUIPages}
              onPageChange={handlePageChange}
            />
          )}

          {/* Сообщение о последней странице (только когда все загружено) */}
          {currentPage === totalUIPages && !isLoadingPage && (
            <EndOfResultsMessage>
              You've reached the end of the results
            </EndOfResultsMessage>
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

// ✅ Стили для поисковой строки на странице поиска - СКРЫВАЕМ НА ДЕСКТОПЕ
const MobileSearchSection = styled.div`
  display: block;
  margin-bottom: 32px;
  
  /* Скрываем на десктопе (769px и выше) */
  @media (min-width: 769px) {
    display: none;
  }
`;

const SearchForm = styled.form`
  width: 100%;
`;

const SearchContainer = styled.div`
  display: flex;
  gap: 12px;
  max-width: 600px;
  margin: 0 auto;
  
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
    margin-bottom: 8px;
  }
`;

const SearchButton = styled(Button)`
  white-space: nowrap;
  min-width: 100px;
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ResultsContainer = styled.div`
  font-size: 16px;
  color: #666;
  margin-bottom: 24px;
  font-weight: 500;
`;

const Spinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid #f3f3f3;
  border-top: 2px solid #000000;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: 10px;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoadingMoreMessage = styled.div`
  text-align: center;
  padding: 20px;
  font-size: 16px;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8f9fa;
  border-radius: 4px;
  margin: 20px 0;
`;

const EndOfResultsMessage = styled.div`
  text-align: center;
  padding: 20px;
  font-size: 16px;
  color: #666;
  font-style: italic;
  margin-top: 40px;
  border-top: 1px solid #e1e5e9;
  padding-top: 30px;
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