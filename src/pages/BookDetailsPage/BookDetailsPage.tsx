// pages/BookDetailsPage/BookDetailsPage.tsx
import React, { useState } from 'react';
import { BackButton, PageTitle } from '../../components';
import { Tabs } from '../../components/Tabs/Tabs';
import { SocialShare } from '../../components/SocialShare/SocialShare';
import { Newsletter } from '../../components/Newsletter/Newsletter';
import { BookCarousel } from '../../components/BookCarousel/BookCarousel'; 
import { BookDetails } from '../../components/BookDetails/BookDetails';
import { useBookDetails } from '../../hooks/useBookDetails';
import { decodeHtmlEntities } from '../../helpers';
import styled from 'styled-components';

export const BookDetailsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Description');
  
  const { book, loading, isFavorite, similarBooks, handleAddToCart, handleAddToFavorites } = useBookDetails();

  if (loading) {
    return (
      <Container>
        <LoadingMessage>Loading book details...</LoadingMessage>
      </Container>
    );
  }

  if (!book) {
    return (
      <Container>
        <ErrorMessage>Book not found</ErrorMessage>
      </Container>
    );
  }

  const decodedDescription = decodeHtmlEntities(book.desc || '');

  return (
    <Container>
      {/* Header with back button and title */}
      <HeaderSection>
        <BackButton />
        <PageTitle>{book.title}</PageTitle>
      </HeaderSection>

      {/* Main book content */}
      <BookDetails
        book={book}
        isFavorite={isFavorite}
        onAddToCart={handleAddToCart}
        onAddToFavorites={handleAddToFavorites}
      />

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

      {/* Newsletter */}
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


const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const HeaderSection = styled.div`
  margin-bottom: 32px;
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

const LoadingMessage = styled.div`
  text-align: center;
  padding: 60px 20px;
  font-size: 18px;
  color: #666;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 60px 20px;
  font-size: 18px;
  color: #c53030;
`;

export default BookDetailsPage;