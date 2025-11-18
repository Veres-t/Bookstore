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

  // Определяем сколько книг показывать в зависимости от ширины экрана
  const getVisibleCount = () => {
    if (typeof window === 'undefined') return 3;
    
    if (window.innerWidth <= 480) return 1;
    if (window.innerWidth <= 768) return 2;
    return 3;
  };

  // Получаем книги для текущего слайда
  const getVisibleBooks = () => {
    const visibleCount = getVisibleCount();
    const visibleBooks = [];
    
    for (let i = 0; i < visibleCount; i++) {
      const index = (currentIndex + i) % books.length;
      visibleBooks.push(books[index]);
    }
    
    return visibleBooks;
  };

  if (books.length === 0) return null;

  const visibleBooks = getVisibleBooks();
  const visibleCount = getVisibleBooks().length;

  return (
    <CarouselSection>
      <CarouselHeader>
        <CarouselTitle>{title}</CarouselTitle>
        {books.length > visibleCount && (
          <CarouselControls>
            <ControlButton onClick={prevSlide} aria-label="Previous book">
              ←
            </ControlButton>
            <ControlButton onClick={nextSlide} aria-label="Next book">
              →
            </ControlButton>
          </CarouselControls>
        )}
      </CarouselHeader>
      
      <CarouselContent>
        <CarouselTrack $visibleCount={visibleCount}>
          {visibleBooks.map((book, index) => (
            <CarouselItem key={`${book.isbn13}-${index}`}>
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


const CarouselSection = styled.section`
  margin: 60px 0;
  padding: 0 20px;
  
  @media (max-width: 768px) {
    padding: 0 16px;
  }
  
  @media (max-width: 480px) {
    padding: 0 12px;
  }
`;

const CarouselHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
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
  overflow: visible;
  max-width: 1200px;
  margin: 0 auto;
`;

const CarouselTrack = styled.div<{ $visibleCount: number }>`
  display: grid;
  grid-template-columns: repeat(${props => props.$visibleCount}, 1fr);
  gap: 24px;
  align-items: stretch;
  
  /*  Планшет (768px) */
  @media (max-width: 768px) {
    gap: 20px;
  }
  
  /*  Мобильные (480px и меньше) */
  @media (max-width: 480px) {
    gap: 16px;
  }
`;

const CarouselItem = styled.div`
  display: flex;
  justify-content: center;
  
  
  & > div {
    height: 100%;
    width: 100%;
    min-width: 0; 
  }
`;

export default BookCarousel;