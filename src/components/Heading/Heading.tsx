import React from 'react';
import styled from 'styled-components';

export interface HeadingProps {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
}

export const Heading: React.FC<HeadingProps> = ({
  children,
  level = 1,
  className
}) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  
  return (
    <StyledHeading as={Tag} $level={level} className={className}>
      {children}
    </StyledHeading>
  );
};

const StyledHeading = styled.h1<{ $level: number }>`
  margin: 0;
  color: #333;
  font-weight: 600;
  line-height: 1.2;
  
  ${props => props.$level === 1 && `
    font-size: 32px;
  `}
  
  ${props => props.$level === 2 && `
    font-size: 28px;
  `}
  
  ${props => props.$level === 3 && `
    font-size: 24px;
  `}
  
  ${props => props.$level === 4 && `
    font-size: 20px;
  `}
  
  ${props => props.$level === 5 && `
    font-size: 18px;
  `}
  
  ${props => props.$level === 6 && `
    font-size: 16px;
  `}
  
  @media (max-width: 768px) {
    ${props => props.$level === 1 && `
      font-size: 28px;
    `}
    
    ${props => props.$level === 2 && `
      font-size: 24px;
    `}
    
    ${props => props.$level === 3 && `
      font-size: 20px;
    `}
  }
  
  @media (max-width: 320px) {
    ${props => props.$level === 1 && `
      font-size: 24px;
    `}
    
    ${props => props.$level === 2 && `
      font-size: 20px;
    `}
    
    ${props => props.$level === 3 && `
      font-size: 18px;
    `}
  }
`;