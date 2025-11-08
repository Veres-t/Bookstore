// pages/SearchPage/SearchPage.tsx
import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Heading, Button, Input, Card, StarRating, Pagination } from '../../components';
import { searchBooksStart } from '../../store/slices/booksSlice';
import { getSearchResults, getBooksLoading, getSearchQuery, getBooksError } from '../../store/selectors';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { validateSearchQuery, formatRating, formatPrice, truncateText } from '../../helpers';

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

  // Функция для обработки ошибки загрузки изображения
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://via.placeholder.com/100x120/cccccc/969696?text=No+Image';
  };

  const totalPages = searchResults ? Math.ceil(parseInt(searchResults.total) / 10) : 0;

  return (
    <div>
      <Heading level={1}>Search Books</Heading>
      
      <form onSubmit={handleSearch} style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Input
            placeholder="Search for books..."
            value={query}
            onChange={setQuery}
            error={localError}
          />
          <Button type="submit" variant="primary">
            Search
          </Button>
        </div>
        {localError && <div style={{ color: 'red', marginTop: '8px' }}>{localError}</div>}
      </form>

      {loading && <div>Searching...</div>}
      {error && (
        <Card 
          padding="medium" 
          style={{ 
            marginBottom: '16px', 
            background: '#fff5f5', 
            border: '1px solid #fed7d7' 
          }}
        >
          <div style={{ color: '#c53030', textAlign: 'center' }}>
            {error}
          </div>
        </Card>
      )}
      
      {searchResults && (
        <div>
          <p>Found {searchResults.total} results for "{currentQuery}"</p>
          
          <div style={{ display: 'grid', gap: '16px' }}>
            {searchResults.books.map(book => {
              // Используем helpers для форматирования
              const formattedPrice = formatPrice(book.price);
              const rating = formatRating(book.rating);
              const truncatedTitle = truncateText(book.title || 'Untitled Book', 80);
              const truncatedSubtitle = truncateText(book.subtitle || '', 100);
              const truncatedAuthors = truncateText(book.authors || 'Unknown author', 60);

              return (
                <Card key={book.isbn13} padding="medium">
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <img 
                      src={book.image || 'https://via.placeholder.com/100x120/cccccc/969696?text=No+Image'} 
                      alt={book.title || 'Book cover'}
                      style={{ width: '100px', height: 'auto' }}
                      onError={handleImageError}
                    />
                    <div style={{ flex: 1 }}>
                      <Heading level={3}>
                        <Link to={`/books/${book.isbn13}`}>{truncatedTitle}</Link>
                      </Heading>
                      {book.subtitle && <p style={{ color: '#666', fontStyle: 'italic' }}>{truncatedSubtitle}</p>}
                      <p><strong>Authors:</strong> {truncatedAuthors}</p>
                      <p><strong>Year:</strong> {book.year || 'Unknown year'}</p>
                      <StarRating rating={rating} />
                      <div style={{ marginTop: '12px' }}>
                        <Heading level={4}>{formattedPrice}</Heading>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {searchResults.books.length === 0 && !loading && (
            <Card padding="large" style={{ textAlign: 'center' }}>
              <Heading level={3}>No books found</Heading>
              <p>Try adjusting your search terms or browse our new releases.</p>
            </Card>
          )}

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      )}

      {!searchResults && !loading && !error && (
        <Card padding="large" style={{ textAlign: 'center' }}>
          <Heading level={3}>Start Searching</Heading>
          <p>Enter a book title, author, or keyword to find books in our store.</p>
        </Card>
      )}
    </div>
  );
};