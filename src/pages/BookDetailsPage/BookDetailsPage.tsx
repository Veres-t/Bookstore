// pages/BookDetailsPage/BookDetailsPage.tsx
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Heading, Button, Card, StarRating } from '../../components';
import { fetchBookDetailsStart } from '../../store/slices/booksSlice';
import { addToFavorites, removeFromFavorites } from '../../store/slices/favoritesSlice';
import { addToCart } from '../../store/slices/cartSlice';
import { getCurrentBook, getBooksLoading } from '../../store/selectors';
import { isInFavorites } from '../../store/selectors/favoritesSelectors';
import type { RootState } from '../../store';

export const BookDetailsPage: React.FC = () => {
  const { isbn13 } = useParams<{ isbn13: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const book = useSelector((state: RootState) => getCurrentBook(state));
  const loading = useSelector((state: RootState) => getBooksLoading(state));
  const isFavorite = useSelector((state: RootState) => 
    isbn13 ? isInFavorites(state, isbn13) : false
  );

  useEffect(() => {
    if (isbn13) {
      dispatch(fetchBookDetailsStart({ isbn13 }));
    }
  }, [dispatch, isbn13]);

  const handleAddToFavorites = () => {
    if (book) {
      if (isFavorite) {
        dispatch(removeFromFavorites({ isbn13: book.isbn13 }));
      } else {
        dispatch(addToFavorites({ book }));
      }
    }
  };

  const handleAddToCart = () => {
    if (book) {
      dispatch(addToCart({ book }));
    }
  };

  // Функция для обработки ошибки загрузки изображения
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://via.placeholder.com/300x400/cccccc/969696?text=No+Image';
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!book) {
    return <div>Book not found</div>;
  }

  return (
    <div>
      <Button variant="outline" onClick={() => navigate(-1)}>
        ← Back
      </Button>
      
      <Card padding="large">
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          <div style={{ flex: '0 0 300px' }}>
            <img 
              src={book.image || 'https://via.placeholder.com/300x400/cccccc/969696?text=No+Image'} 
              alt={book.title || 'Book cover'}
              style={{ width: '100%', height: 'auto' }}
              onError={handleImageError}
            />
          </div>
          
          <div style={{ flex: '1', minWidth: '300px' }}>
            <Heading level={1}>{book.title || 'Untitled Book'}</Heading>
            <Heading level={3}>{book.subtitle || ''}</Heading>
            
            <div style={{ margin: '16px 0' }}>
              <StarRating rating={Math.floor(parseFloat(book.rating ?? '0'))} />
              <span style={{ marginLeft: '8px' }}>
                {(book.rating && parseFloat(book.rating) > 0) ? `${book.rating}/5` : 'Not rated'}
              </span>
            </div>
            
            <p><strong>Authors:</strong> {book.authors || 'Unknown author'}</p>
            <p><strong>Publisher:</strong> {book.publisher || 'Unknown publisher'}</p>
            <p><strong>Year:</strong> {book.year || 'Unknown year'}</p>
            <p><strong>Pages:</strong> {book.pages || 'Unknown'}</p>
            
            <div style={{ margin: '24px 0' }}>
              <Heading level={2}>{book.price || '$0.00'}</Heading>
            </div>
            
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Button variant="primary" onClick={handleAddToCart}>
                Add to Cart
              </Button>
              <Button 
                variant={isFavorite ? 'secondary' : 'outline'} 
                onClick={handleAddToFavorites}
              >
                {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
              </Button>
            </div>
          </div>
        </div>
        
        <div style={{ marginTop: '32px' }}>
          <Heading level={2}>Description</Heading>
          <p>{book.desc || 'No description available for this book.'}</p>
        </div>
      </Card>
    </div>
  );
};