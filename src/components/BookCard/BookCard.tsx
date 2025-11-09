// components/BookCard/BookCard.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { StarRating } from '../Rating';
import styled from 'styled-components';
import { formatPrice, formatRating, truncateText } from '../../helpers';
import type { Book } from '../../types';

export interface BookCardProps {
  book: Book;
  variant?: 'grid' | 'list';
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
    e.currentTarget.src = 'https://via.placeholder.com/250x350/007bff/ffffff?text=No+Image';
  };

  // Используем helpers для форматирования
  const formattedPrice = formatPrice(book.price);
  const rating = formatRating(book.rating);
  const truncatedTitle = truncateText(book.title || 'Untitled Book', 50);
  const truncatedSubtitle = truncateText(book.subtitle || '', 60); // ✅ Для subtitle
  const truncatedListTitle = truncateText(book.title || 'Untitled Book', 80);
  const truncatedListAuthors = truncateText(book.authors || 'Unknown author', 60);

  // Grid variant - для главной страницы
  if (variant === 'grid') {
    return (
      <GridCard>
        <BookImage 
          src={book.image || 'https://via.placeholder.com/250x350/007bff/ffffff?text=No+Image'} 
          alt={book.title || 'Book cover'}
          onError={handleImageError}
        />
        <BookInfo>
          <BookTitle to={`/books/${book.isbn13}`}>
            {truncatedTitle}
          </BookTitle>
          <BookSubtitle>{truncatedSubtitle}</BookSubtitle> {/* ✅ Показываем subtitle вместо authors */}
          <RatingPriceContainer>
            <BookPrice>{formattedPrice}</BookPrice>
            <StarRating rating={rating} size="medium" />
          </RatingPriceContainer>
        </BookInfo>
      </GridCard>
    );
  }

  // List variant - для поиска и избранного (оставляем authors)
  return (
    <ListCard>
      <ListContent>
        <ListImage 
          src={book.image || 'https://via.placeholder.com/150x200/007bff/ffffff?text=No+Image'} 
          alt={book.title || 'Book cover'}
          onError={handleImageError}
        />
        <ListInfo>
          <ListTitle to={`/books/${book.isbn13}`}>
            {truncatedListTitle}
          </ListTitle>
          <ListDetails>
            <strong>Authors:</strong> {truncatedListAuthors}
          </ListDetails>
          <ListDetails>
            <strong>Publisher:</strong> {book.publisher || 'Unknown publisher'}
          </ListDetails>
          <RatingContainer>
            <ListPrice>{formattedPrice}</ListPrice>
            <StarRating rating={rating} size="medium" />
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
  border-radius: 0;
  padding: 0;
  box-shadow: none;
  display: flex;
  flex-direction: column;
  height: 100%;
  border: none;
`;

const BookImage = styled.img`
  width: 100%;
  height: 280px;
  object-fit: contain;
  margin-bottom: 16px;
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
  padding: 25px;
`;

const BookInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 8px;
`;

const BookTitle = styled(Link)`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-decoration: none;
  margin-bottom: 4px;
  
  &:hover {
    color: #007bff;
  }
`;

const BookSubtitle = styled.p`
  font-size: 14px;
  color: #888;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
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
  font-weight: 700;
  color: #000000;
`;

// Styled components for List variant
const ListCard = styled.div`
  background: #fff;
  border-radius: 0;
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
  width: 120px;
  height: 160px;
  object-fit: contain;
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
  padding: 20px;
`;

const ListInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ListTitle = styled(Link)`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  text-decoration: none;
  margin-bottom: 4px;
  
  &:hover {
    color: #007bff;
  }
`;

const ListDetails = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 4px;
  line-height: 1.4;
`;

const RatingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
`;

const ListPrice = styled.span`
  font-size: 18px;
  font-weight: 700;
  color: #000000;
`;

const ListActions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 12px;
`;

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

export default BookCard;