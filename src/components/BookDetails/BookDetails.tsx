// components/BookDetails/BookDetails.tsx
import React from 'react';
import { Heading, Button, Card, StarRating } from '../../components';
import { formatPrice, formatRating } from '../../helpers';
import type { Book } from '../../types';

export interface BookDetailsProps {
  book: Book;
  isFavorite: boolean;
  onBack: () => void;
  onAddToCart: () => void;
  onAddToFavorites: () => void;
}

export const BookDetails: React.FC<BookDetailsProps> = ({
  book,
  isFavorite,
  onBack,
  onAddToCart,
  onAddToFavorites
}) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://via.placeholder.com/300x400/cccccc/969696?text=No+Image';
  };

  // Используем helpers для форматирования
  const formattedPrice = formatPrice(book.price);
  const rating = formatRating(book.rating);

  return (
    <div>
      <Button variant="outline" onClick={onBack}>
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
              <StarRating rating={rating} />
              <span style={{ marginLeft: '8px' }}>
                {(book.rating && parseFloat(book.rating) > 0) ? `${book.rating}/5` : 'Not rated'}
              </span>
            </div>
            
            <p><strong>Authors:</strong> {book.authors || 'Unknown author'}</p>
            <p><strong>Publisher:</strong> {book.publisher || 'Unknown publisher'}</p>
            <p><strong>Year:</strong> {book.year || 'Unknown year'}</p>
            <p><strong>Pages:</strong> {book.pages || 'Unknown'}</p>
            
            <div style={{ margin: '24px 0' }}>
              <Heading level={2}>{formattedPrice}</Heading>
            </div>
            
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Button variant="primary" onClick={onAddToCart}>
                Add to Cart
              </Button>
              <Button 
                variant={isFavorite ? 'secondary' : 'outline'} 
                onClick={onAddToFavorites}
              >
                {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
              </Button>
            </div>
          </div>
        </div>
        
        <div style={{ marginTop: '32px' }}>
          <Heading level={2}>Description</Heading>
          <p style={{ lineHeight: '1.6', whiteSpace: 'pre-line' }}>
            {book.desc || 'No description available for this book.'}
          </p>
        </div>
      </Card>
    </div>
  );
};