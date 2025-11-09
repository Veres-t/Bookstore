// components/BookCarousel/BookCarousel.tsx
import React from 'react';
import styled from 'styled-components';
import { BookCardContainer } from '../../containers/BookCardContainer';
import type { Book } from '../../types';

export interface BookCarouselProps { // Добавляем export
  title: string;
  books: Book[];
}

export const BookCarousel: React.FC<BookCarouselProps> = ({ title, books }) => {
  return (
    <CarouselSection>
      <CarouselHeader>
        <CarouselTitle>{title}</CarouselTitle>
        <CarouselControls>
          <ControlButton>←</ControlButton>
          <ControlButton>→</ControlButton>
        </CarouselControls>
      </CarouselHeader>
      
      <CarouselContent>
        {books.slice(0, 3).map(book => (
          <BookCardContainer
            key={book.isbn13}
            book={book}
            variant="grid"
          />
        ))}
      </CarouselContent>
    </CarouselSection>
  );
};

const CarouselSection = styled.section`
  margin: 60px 0;
`;

const CarouselHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const CarouselTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #333;
`;

const CarouselControls = styled.div`
  display: flex;
  gap: 8px;
`;

const ControlButton = styled.button`
  width: 40px;
  height: 40px;
  border: 1px solid #e1e5e9;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background: #f8f9fa;
  }
`;

const CarouselContent = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;