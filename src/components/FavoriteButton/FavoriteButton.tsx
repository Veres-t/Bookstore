// components/FavoriteButton/FavoriteButton.tsx
import React from 'react';
import styled from 'styled-components';

export interface FavoriteButtonProps { // Добавляем export
  isFavorite: boolean;
  onClick: () => void;
  className?: string;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  isFavorite,
  onClick,
  className
}) => {
  return (
    <Button 
      $isFavorite={isFavorite} 
      onClick={onClick}
      className={className}
    >
      {isFavorite ? '❤️' : '🤍'}
    </Button>
  );
};

const Button = styled.button<{ $isFavorite: boolean }>`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  
  &:hover {
    transform: scale(1.1);
  }
`;