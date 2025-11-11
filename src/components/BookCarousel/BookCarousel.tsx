// components/BookCarousel/BookCarousel.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { BookCardContainer } from '../../containers/BookCardContainer';
import type { Book } from '../../types';

export interface BookCarouselProps {
  title: string;
  books: Book[];
}

export const BookCarousel: React.FC<BookCarouselProps> = ({ title, books }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === books.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? books.length - 1 : prevIndex - 1
    );
  };

  // Определяем какие книги показывать (текущая + 2 соседние)
  const getVisibleBooks = () => {
    const visibleBooks = [];
    
    // Всегда показываем 3 книги: предыдущую, текущую и следующую
    for (let i = -1; i <= 1; i++) {
      const index = (currentIndex + i + books.length) % books.length;
      visibleBooks.push(books[index]);
    }
    
    return visibleBooks;
  };

  if (books.length === 0) return null;

  const visibleBooks = getVisibleBooks();

  return (
    <CarouselSection>
      <CarouselHeader>
        <CarouselTitle>{title}</CarouselTitle>
        <CarouselControls>
          <ControlButton onClick={prevSlide} aria-label="Previous book">
            ←
          </ControlButton>
          <ControlButton onClick={nextSlide} aria-label="Next book">
            →
          </ControlButton>
        </CarouselControls>
      </CarouselHeader>
      
      <CarouselContent>
        <CarouselTrack>
          {visibleBooks.map((book, index) => (
            <CarouselItem 
              key={`${book.isbn13}-${index}`}
              $isActive={index === 1} // Центральная книга активная
            >
              <BookCardContainer
                book={book}
                variant="grid"
              />
            </CarouselItem>
          ))}
        </CarouselTrack>
      </CarouselContent>
    </CarouselSection>
  );
};

// Styled components
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
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  transition: all 0.2s ease;
  
  &:hover {
    background: #f8f9fa;
    border-color: #007bff;
    color: #007bff;
  }
`;

const CarouselContent = styled.div`
  overflow: hidden;
`;

const CarouselTrack = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  align-items: start;
  
  @media (max-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
    
    /* На мобильных показываем только активную книгу */
    & > *:not(:nth-child(2)) {
      display: none;
    }
  }
`;

const CarouselItem = styled.div<{ $isActive: boolean }>`
  display: flex;
  justify-content: center;
  transition: all 0.3s ease;
  
  /* Можно добавить эффекты для активной книги */
  ${props => props.$isActive && `
    transform: scale(1.05);
  `}
  
  @media (max-width: 768px) {
    transform: none !important;
  }
`;

export default BookCarousel;