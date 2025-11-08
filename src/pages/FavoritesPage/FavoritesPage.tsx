// pages/FavoritesPage/FavoritesPage.tsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Heading, Button, Card, StarRating } from '../../components';
import { removeFromFavorites, clearFavorites } from '../../store/slices/favoritesSlice';
import { addToCart } from '../../store/slices/cartSlice';
import { getFavoritesItems } from '../../store/selectors';
import type { RootState } from '../../store';
import type { Book } from '../../types';

export const FavoritesPage: React.FC = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => getFavoritesItems(state));

  const handleRemoveFromFavorites = (isbn13: string) => {
    dispatch(removeFromFavorites({ isbn13 }));
  };

  const handleAddToCart = (book: Book) => {
    dispatch(addToCart({ book }));
  };

  const handleClearFavorites = () => {
    dispatch(clearFavorites());
  };

  // Функция для обработки ошибки загрузки изображения
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://via.placeholder.com/100x120/cccccc/969696?text=No+Image';
  };

  if (favorites.length === 0) {
    return (
      <div>
        <Heading level={1}>Favorites</Heading>
        <Card padding="large">
          <p>No favorite books yet.</p>
          <Link to="/">
            <Button variant="primary">Discover Books</Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Heading level={1}>Favorites ({favorites.length})</Heading>
        <Button variant="outline" onClick={handleClearFavorites}>
          Clear All
        </Button>
      </div>

      <div style={{ display: 'grid', gap: '16px' }}>
        {favorites.map(book => (
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
                <p><strong>Price:</strong> {book.price || '$0.00'}</p>
                <StarRating rating={Math.floor(parseFloat(book.rating ?? '0'))} />
                
                <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
                  <Button 
                    variant="primary" 
                    onClick={() => handleAddToCart(book)}
                  >
                    Add to Cart
                  </Button>
                  <Button 
                    variant="secondary" 
                    onClick={() => handleRemoveFromFavorites(book.isbn13)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};