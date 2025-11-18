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

  return (
    <PaginationContainer className={className}>
     
      <NavButton 
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ← Prev
      </NavButton>
      
      <PagesContainer>
        <PageNumber
          $active={1 === currentPage}
          onClick={() => onPageChange(1)}
        >
          1
        </PageNumber>

       
        {currentPage > 3 && <Ellipsis>...</Ellipsis>}

        
        {[currentPage - 1, currentPage, currentPage + 1]
          .filter(page => page > 1 && page < totalPages)
          .map(page => (
            <PageNumber
              key={page}
              $active={page === currentPage}
              onClick={() => onPageChange(page)}
            >
              {page}
            </PageNumber>
          ))
        }

        
        {currentPage < totalPages - 2 && <Ellipsis>...</Ellipsis>}

        
        {totalPages > 1 && (
          <PageNumber
            $active={totalPages === currentPage}
            onClick={() => onPageChange(totalPages)}
          >
            {totalPages}
          </PageNumber>
        )}
      </PagesContainer>

      
      <NavButton 
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next →
      </NavButton>
    </PaginationContainer>
  );
};


const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
  padding: 0 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 14px;
`;

const NavButton = styled.button`
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  padding: 8px 0;
  font-size: 14px;
  
  &:hover:not(:disabled) {
    color: #0056b3;
  }
  
  &:disabled {
    color: #ccc;
    cursor: not-allowed;
  }
`;

const PagesContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const PageNumber = styled.span<{ $active?: boolean }>`
  color: ${props => props.$active ? '#007bff' : '#333'};
  font-weight: ${props => props.$active ? '600' : '400'};
  cursor: pointer;
  padding: 4px 8px;
  
  &:hover {
    color: #007bff;
  }
`;

const Ellipsis = styled.span`
  color: #666;
  padding: 4px 2px;
`;

export default Pagination;