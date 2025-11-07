import React from 'react';
import styled from 'styled-components';

export interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxRating = 5,
  size = 'medium',
  className
}) => {
  return (
    <StarContainer $size={size} className={className}>
      {[...Array(maxRating)].map((_, index) => (
        <Star key={index} $filled={index < rating}>
          ★
        </Star>
      ))}
    </StarContainer>
  );
};

const StarContainer = styled.div<{ $size: string }>`
  display: flex;
  gap: 2px;
  
  ${props => props.$size === 'small' && `
    font-size: 12px;
  `}
  
  ${props => props.$size === 'medium' && `
    font-size: 16px;
  `}
  
  ${props => props.$size === 'large' && `
    font-size: 20px;
  `}
`;

const Star = styled.span<{ $filled: boolean }>`
  color: ${props => props.$filled ? '#ffc107' : '#ddd'};
`;