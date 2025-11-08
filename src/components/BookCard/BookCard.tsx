// components/BookCard/BookCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { StarRating } from '../Rating';
import styled from 'styled-components';
import type { Book } from '../../types';

export interface BookCardProps {
  book: Book;
  variant?: 'grid' | 'list'; // grid - для главной, list - для поиска/избранного
  onAddToCart?: () => void;
  onAddToFavorites?: () => void;
  showActions?: boolean;
  isInFavorites?: boolean;
}

export const BookCard: React.FC<BookCardProps> = ({ 
  book, 
  variant = 'grid',
  onAddToCart,
  onAddToFavorites,
  showActions = false,
  isInFavorites = false
}) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://via.placeholder.com/200x250/cccccc/969696?text=No+Image';
  };

  if (variant === 'grid') {
    return (
      <GridCard>
        <BookImage 
          src={book.image || 'https://via.placeholder.com/200x250/cccccc/969696?text=No+Image'} 
          alt={book.title || 'Book cover'}
          onError={handleImageError}
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
      </GridCard>
    );
  }

  // variant === 'list' (для поиска и избранного)
  return (
    <ListCard>
      <ListContent>
        <ListImage 
          src={book.image || 'https://via.placeholder.com/100x120/cccccc/969696?text=No+Image'} 
          alt={book.title || 'Book cover'}
          onError={handleImageError}
        />
        <ListInfo>
          <ListTitle to={`/books/${book.isbn13}`}>
            {book.title || 'Untitled Book'}
          </ListTitle>
          <ListSubtitle>{book.subtitle || ''}</ListSubtitle>
          <ListDetails>
            <strong>Authors:</strong> {book.authors || 'Unknown author'}
          </ListDetails>
          <ListDetails>
            <strong>Year:</strong> {book.year || 'Unknown year'}
          </ListDetails>
          <RatingContainer>
            <StarRating rating={Math.floor(parseFloat(book.rating ?? '0'))} />
            <ListPrice>{book.price || '$0.00'}</ListPrice>
          </RatingContainer>
          
          {showActions && (
            <ListActions>
              <ActionButton onClick={onAddToCart}>
                Add to Cart
              </ActionButton>
              <ActionButton 
                onClick={onAddToFavorites}
                $isFavorite={isInFavorites}
              >
                {isInFavorites ? 'Remove from Favorites' : 'Add to Favorites'}
              </ActionButton>
            </ListActions>
          )}
        </ListInfo>
      </ListContent>
    </ListCard>
  );
};

// Styled components for Grid variant
const GridCard = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
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
  margin-bottom: 6px;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-decoration: none;
  
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
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
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

// Styled components for List variant
const ListCard = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
`;

const ListContent = styled.div`
  display: flex;
  gap: 16px;
  align-items: flex-start;
`;

const ListImage = styled.img`
  width: 100px;
  height: 120px;
  object-fit: cover;
  border-radius: 4px;
`;

const ListInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ListTitle = styled(Link)`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
  text-decoration: none;
  
  &:hover {
    color: #007bff;
  }
`;

const ListSubtitle = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
`;

const ListDetails = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 4px;
`;

const RatingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
`;

const ListPrice = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: #007bff;
`;

const ListActions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 12px;
`;

// Common styles for action buttons
const ActionButton = styled.button<{ $isFavorite?: boolean }>`
  padding: 8px 12px;
  border: 1px solid ${props => props.$isFavorite ? '#dc3545' : '#007bff'};
  background-color: ${props => props.$isFavorite ? '#dc3545' : '#007bff'};
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  
  &:hover {
    background-color: ${props => props.$isFavorite ? '#c82333' : '#0056b3'};
  }
`;