import React from 'react';
import styled from 'styled-components';

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

// Более строгая типизация для вариантов
type ButtonVariant = 'primary' | 'secondary' | 'outline';
type ButtonSize = 'small' | 'medium' | 'large';

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'medium',
  disabled = false,
  className
}) => {
  return (
    <StyledButton
      type={type}
      $variant={variant}
      $size={size}
      disabled={disabled}
      onClick={onClick}
      className={className}
    >
      {children}
    </StyledButton>
  );
};

// Улучшенная типизация для styled-components
interface StyledButtonProps {
  $variant: ButtonVariant;
  $size: ButtonSize;
}

const StyledButton = styled.button<StyledButtonProps>`
  padding: ${props => {
    switch (props.$size) {
      case 'small': return '8px 16px';
      case 'large': return '16px 32px';
      default: return '12px 24px';
    }
  }};
  
  border: none;
  border-radius: 4px;
  font-size: ${props => {
    switch (props.$size) {
      case 'small': return '14px';
      case 'large': return '18px';
      default: return '16px';
    }
  }};
  
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
    padding: ${props => {
      switch (props.$size) {
        case 'small': return '6px 12px';
        case 'large': return '14px 28px';
        default: return '10px 20px';
      }
    }};
    
    font-size: ${props => {
      switch (props.$size) {
        case 'small': return '12px';
        case 'large': return '16px';
        default: return '14px';
      }
    }};
  }
`;