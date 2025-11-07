import React from 'react';
import styled from 'styled-components';

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  disabled = false,
  className
}) => {
  return (
    <StyledButton
      type={type}
      $variant={variant}
      disabled={disabled}
      onClick={onClick}
      className={className}
    >
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button<{ $variant: string }>`
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  width: 100%;
  
  ${props => props.$variant === 'primary' && `
    background-color: #007bff;
    color: white;
    
    &:hover:not(:disabled) {
      background-color: #0056b3;
    }
  `}
  
  ${props => props.$variant === 'secondary' && `
    background-color: #6c757d;
    color: white;
    
    &:hover:not(:disabled) {
      background-color: #545b62;
    }
  `}
  
  ${props => props.$variant === 'outline' && `
    background-color: transparent;
    border: 2px solid #007bff;
    color: #007bff;
    
    &:hover:not(:disabled) {
      background-color: #007bff;
      color: white;
    }
  `}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 14px;
  }
`;