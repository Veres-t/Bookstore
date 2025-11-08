// components/Card/Card.tsx
import React from 'react';
import styled from 'styled-components';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'small' | 'medium' | 'large';
  style?: React.CSSProperties; // Добавляем поддержку style
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  padding = 'medium',
  style
}) => {
  return (
    <StyledCard $padding={padding} className={className} style={style}>
      {children}
    </StyledCard>
  );
};

const StyledCard = styled.div<{ $padding: string }>`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e1e5e9;
  
  ${props => props.$padding === 'none' && `
    padding: 0;
  `}
  
  ${props => props.$padding === 'small' && `
    padding: 12px;
  `}
  
  ${props => props.$padding === 'medium' && `
    padding: 16px;
  `}
  
  ${props => props.$padding === 'large' && `
    padding: 24px;
  `}
  
  @media (max-width: 768px) {
    ${props => props.$padding === 'large' && `
      padding: 16px;
    `}
    
    ${props => props.$padding === 'medium' && `
      padding: 12px;
    `}
  }
`;