// components/Pagination/Pagination.tsx
import React from 'react';
import styled from 'styled-components';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className
}) => {
  if (totalPages <= 1) return null;

  const pages = [];
  const showPages = 5; // Сколько страниц показывать
  
  let startPage = Math.max(1, currentPage - Math.floor(showPages / 2));
  let endPage = Math.min(totalPages, startPage + showPages - 1);
  
  if (endPage - startPage + 1 < showPages) {
    startPage = Math.max(1, endPage - showPages + 1);
  }

  // Кнопка "Назад"
  if (currentPage > 1) {
    pages.push(
      <PageButton
        key="prev"
        onClick={() => onPageChange(currentPage - 1)}
      >
        ←
      </PageButton>
    );
  }

  // Первая страница
  if (startPage > 1) {
    pages.push(
      <PageButton
        key={1}
        onClick={() => onPageChange(1)}
      >
        1
      </PageButton>
    );
    if (startPage > 2) {
      pages.push(<Ellipsis key="start-ellipsis">...</Ellipsis>);
    }
  }

  // Основные страницы
  for (let i = startPage; i <= endPage; i++) {
    pages.push(
      <PageButton
        key={i}
        $active={i === currentPage}
        onClick={() => onPageChange(i)}
      >
        {i}
      </PageButton>
    );
  }

  // Последняя страница
  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      pages.push(<Ellipsis key="end-ellipsis">...</Ellipsis>);
    }
    pages.push(
      <PageButton
        key={totalPages}
        onClick={() => onPageChange(totalPages)}
      >
        {totalPages}
      </PageButton>
    );
  }

  // Кнопка "Вперед"
  if (currentPage < totalPages) {
    pages.push(
      <PageButton
        key="next"
        onClick={() => onPageChange(currentPage + 1)}
      >
        →
      </PageButton>
    );
  }

  return (
    <PaginationContainer className={className}>
      {pages}
    </PaginationContainer>
  );
};

// Styled components
const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 24px;
  flex-wrap: wrap;
`;

const PageButton = styled.button<{ $active?: boolean }>`
  padding: 8px 12px;
  border: 1px solid ${props => props.$active ? '#007bff' : '#ddd'};
  background-color: ${props => props.$active ? '#007bff' : 'white'};
  color: ${props => props.$active ? 'white' : '#333'};
  border-radius: 4px;
  cursor: pointer;
  min-width: 40px;
  
  &:hover {
    background-color: ${props => props.$active ? '#0056b3' : '#f8f9fa'};
    border-color: ${props => props.$active ? '#0056b3' : '#007bff'};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Ellipsis = styled.span`
  padding: 8px 4px;
  color: #6c757d;
`;