// pages/SearchPage/SearchPage.tsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, Link } from 'react-router-dom';
import { Heading, Button, Input, Card, StarRating } from '../../components';
import { searchBooksStart } from '../../store/slices/booksSlice';
import { getSearchResults, getBooksLoading, getSearchQuery } from '../../store/selectors';
import type { RootState } from '../../store';

export const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  
  const dispatch = useDispatch();
  const searchResults = useSelector((state: RootState) => getSearchResults(state));
  const loading = useSelector((state: RootState) => getBooksLoading(state));
  const currentQuery = useSelector((state: RootState) => getSearchQuery(state));

  useEffect(() => {
    const urlQuery = searchParams.get('q');
    if (urlQuery && urlQuery !== currentQuery) {
      dispatch(searchBooksStart({ query: urlQuery }));
    }
  }, [searchParams, dispatch, currentQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchParams({ q: query });
      dispatch(searchBooksStart({ query }));
    }
  };

  // Функция для обработки ошибки загрузки изображения
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://via.placeholder.com/100x120/cccccc/969696?text=No+Image';
  };

  return (
    <div>
      <Heading level={1}>Search Books</Heading>
      
      <form onSubmit={handleSearch} style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Input
            placeholder="Search for books..."
            value={query}
            onChange={setQuery}
          />
          <Button type="submit" variant="primary">
            Search
          </Button>
        </div>
      </form>

      {loading && <div>Searching...</div>}
      
      {searchResults && (
        <div>
          <p>Found {searchResults.total} results for "{currentQuery}"</p>
          
          <div style={{ display: 'grid', gap: '16px' }}>
            {searchResults.books.map(book => (
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
                      <Link to={`/books/${book.isbn13}`}>{book.title || 'Untitled Book'}</Link>
                    </Heading>
                    <p>{book.subtitle || ''}</p>
                    <p><strong>Authors:</strong> {book.authors || 'Unknown author'}</p>
                    <p><strong>Year:</strong> {book.year || 'Unknown year'}</p>
                    <StarRating rating={Math.floor(parseFloat(book.rating ?? '0'))} />
                    <div style={{ marginTop: '12px' }}>
                      <Heading level={4}>{book.price || '$0.00'}</Heading>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};