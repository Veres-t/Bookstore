// components/BookDetails/BookDetails.tsx
import React, { useState } from 'react';
import { Button, StarRating } from '../../components';
import { FavoriteButton } from '../FavoriteButton/FavoriteButton';
import { BookCarousel } from '../BookCarousel/BookCarousel';
import { formatPrice, formatRating } from '../../helpers';
import type { Book } from '../../types';
import styled from 'styled-components';

export interface BookDetailsProps {
  book: Book;
  isFavorite: boolean;
  onAddToCart: () => void;
  onAddToFavorites: () => void;
  similarBooks?: Book[];
}

export const BookDetails: React.FC<BookDetailsProps> = ({
  book,
  isFavorite,
  onAddToCart,
  onAddToFavorites,
  similarBooks = []
}) => {
  const [showMoreDetails, setShowMoreDetails] = useState(false);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://via.placeholder.com/400x500/cccccc/969696?text=No+Image';
  };

  const formattedPrice = formatPrice(book.price);
  const rating = formatRating(book.rating);

  return (
    <>
      <ContentSection>
        
        <ImageSection>
          <ImageContainer>
            <BookImage 
              src={book.image || 'https://via.placeholder.com/400x500/cccccc/969696?text=No+Image'} 
              alt={book.title || 'Book cover'}
              onError={handleImageError}
            />
            <FavoriteButtonContainer>
              <FavoriteButton 
                isFavorite={isFavorite}
                onClick={onAddToFavorites}
              />
            </FavoriteButtonContainer>
          </ImageContainer>
        </ImageSection>

        
        <DetailsSection>
          <PriceRatingRow>
            <Price>{formattedPrice}</Price>
            <StarRating rating={rating} size="large" />
          </PriceRatingRow>

          <DetailsGrid>
            <DetailLabel>Authors</DetailLabel>
            <DetailValue>{book.authors || 'Unknown author'}</DetailValue>

            <DetailLabel>Publisher</DetailLabel>
            <DetailValue>{book.publisher || 'Unknown publisher'}</DetailValue>

            <DetailLabel>Language</DetailLabel>
            <DetailValue>English</DetailValue>

            <DetailLabel>Format</DetailLabel>
            <DetailValue>Paper book / ebook (PDF)</DetailValue>
          </DetailsGrid>

          
          <MoreDetails onClick={() => setShowMoreDetails(!showMoreDetails)}>
            More details {showMoreDetails ? '↑' : '↓'}
          </MoreDetails>

          {showMoreDetails && (
            <AdditionalDetails>
              <DetailRow>
                <DetailLabel>Year:</DetailLabel>
                <DetailValue>{book.year || 'Unknown'}</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel>Pages:</DetailLabel>
                <DetailValue>{book.pages || 'Unknown'}</DetailValue>
              </DetailRow>
            </AdditionalDetails>
          )}

          
          <ActionButtons>
            <Button 
              variant="primary" 
              onClick={onAddToCart}
            >
              ADD TO CART
            </Button>
            <PreviewText>Preview book</PreviewText>
          </ActionButtons>
        </DetailsSection>
      </ContentSection>

      
      {similarBooks.length > 0 && (
        <SimilarBooksSection>
          <BookCarousel 
            title="SIMILAR BOOKS" 
            books={similarBooks} 
          />
        </SimilarBooksSection>
      )}
    </>
  );
};


const ContentSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  margin-bottom: 48px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 32px;
  }
`;

const SimilarBooksSection = styled.div`
  margin-top: 48px;
`;

const ImageSection = styled.div`
  display: flex;
  justify-content: center;
`;

const ImageContainer = styled.div`
  position: relative;
  max-width: 400px;
`;

const BookImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const FavoriteButtonContainer = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
`;

const DetailsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const PriceRatingRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Price = styled.span`
  font-size: 32px;
  font-weight: 700;
  color: #000;
`;

const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 16px;
  align-items: center;
`;

const DetailLabel = styled.span`
  font-weight: 600;
  color: #333;
`;

const DetailValue = styled.span`
  color: #666;
`;

const MoreDetails = styled.button`
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  text-align: left;
  padding: 0;
  font-size: 14px;
  
  &:hover {
    text-decoration: underline;
  }
`;

const AdditionalDetails = styled.div`
  margin-top: 16px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 4px;
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const PreviewText = styled.span`
  color: #007bff;
  text-align: center;
  cursor: pointer;
  font-size: 14px;
  
  &:hover {
    text-decoration: underline;
  }
`;

export default BookDetails;