// components/Button/Button.tsx
import React from 'react';
import styled from 'styled-components';

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

type ButtonVariant = 'primary' | 'secondary';
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
  font-weight: 600;
  width: auto; /* Убрали width: 100% */
  
  ${props => props.$variant === 'primary' && `
    background-color: #000000;
    color: white;
    border: 1px solid #000000;
    
    &:hover:not(:disabled) {
      background-color: #333333;
      border-color: #333333;
    }
  `}
  
  ${props => props.$variant === 'secondary' && `
    background-color: white;
    color: #000000;
    border: 1px solid #ccc;
    
    &:hover:not(:disabled) {
      background-color: #f8f9fa;
      border-color: #999;
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