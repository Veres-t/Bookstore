// components/BookDetails/BookDetails.tsx
import React, { useState } from 'react';
import { Heading, Button, StarRating } from '../../components';
import { BackButton } from '../BackButton/BackButton';
import { FavoriteButton } from '../FavoriteButton/FavoriteButton';
import { Tabs } from '../Tabs/Tabs';
import { SocialShare } from '../SocialShare/SocialShare';
import { BookCarousel } from '../BookCarousel/BookCarousel';
import { Newsletter } from '../Newsletter/Newsletter';
import { formatPrice, formatRating, decodeHtmlEntities } from '../../helpers';
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
  const [activeTab, setActiveTab] = useState('Description');
  const [showMoreDetails, setShowMoreDetails] = useState(false);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://via.placeholder.com/400x500/cccccc/969696?text=No+Image';
  };

  const formattedPrice = formatPrice(book.price);
  const rating = formatRating(book.rating);
  
  // Декодируем description
  const decodedDescription = decodeHtmlEntities(book.desc || '');

  return (
    <Container>
      {/* Header with back button and title */}
      <HeaderSection>
        <BackButton />
        <BookTitle level={1}>{book.title}</BookTitle>
      </HeaderSection>

      {/* Main content */}
      <ContentSection>
        {/* Left: Book image with favorite button */}
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

        {/* Right: Book details */}
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

          {/* More details accordion */}
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
              <DetailRow>
                <DetailLabel>ISBN13:</DetailLabel>
                <DetailValue>{book.isbn13}</DetailValue>
              </DetailRow>
            </AdditionalDetails>
          )}

          {/* Action buttons */}
          <ActionButtons>
            {/* ✅ Используем Button без переопределения стилей */}
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

      {/* Tabs section */}
      <TabsSection>
        <Tabs 
          tabs={['Description', 'Authors', 'Reviews']} 
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        
        <TabContent>
          {activeTab === 'Description' && (
            <Description>{decodedDescription || 'No description available.'}</Description>
          )}
          {activeTab === 'Authors' && (
            <AuthorsInfo>{book.authors || 'No author information available.'}</AuthorsInfo>
          )}
          {activeTab === 'Reviews' && (
            <ReviewsInfo>No reviews yet.</ReviewsInfo>
          )}
        </TabContent>
      </TabsSection>

      {/* Social share */}
      <SocialShare />

      {/* Newsletter after social icons */}
      <Newsletter />

      {/* Similar books carousel */}
      {similarBooks.length > 0 && (
        <BookCarousel 
          title="SIMILAR BOOKS" 
          books={similarBooks} 
        />
      )}
    </Container>
  );
};

// Styled components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const HeaderSection = styled.div`
  margin-bottom: 32px;
`;

const BookTitle = styled(Heading)`
  font-size: 32px;
  margin-top: 16px;
  
  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

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

// ✅ Убираем AddToCartButton styled component

const PreviewText = styled.span`
  color: #007bff;
  text-align: center;
  cursor: pointer;
  font-size: 14px;
  
  &:hover {
    text-decoration: underline;
  }
`;

const TabsSection = styled.div`
  margin: 48px 0;
`;

const TabContent = styled.div`
  padding: 24px 0;
`;

const Description = styled.p`
  line-height: 1.6;
  color: #333;
  white-space: pre-line;
  max-height: 400px;
  overflow-y: auto;
  padding-right: 12px;
  margin: 0;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
  }
  
  scrollbar-width: thin;
  scrollbar-color: #c1c1c1 #f1f1f1;
`;

const AuthorsInfo = styled.p`
  line-height: 1.6;
  color: #333;
`;

const ReviewsInfo = styled.p`
  line-height: 1.6;
  color: #333;
`;

export default BookDetails;