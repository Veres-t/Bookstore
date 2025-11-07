import React from 'react';
import styled from 'styled-components';

export interface IconProps {
  name: 'search' | 'heart' | 'cart' | 'user' | 'home' | 'arrow';
  size?: 'small' | 'medium' | 'large';
  color?: string;
  className?: string;
  onClick?: () => void;
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 'medium',
  color,
  className,
  onClick
}) => {
  const getIconSymbol = (iconName: string) => {
    const icons = {
      search: '🔍',
      heart: '❤️',
      cart: '🛒',
      user: '👤',
      home: '🏠',
      arrow: '→'
    };
    return icons[iconName as keyof typeof icons] || '?';
  };

  return (
    <StyledIcon 
      $size={size} 
      style={{ color }} 
      className={className}
      onClick={onClick}
    >
      {getIconSymbol(name)}
    </StyledIcon>
  );
};

const StyledIcon = styled.span<{ $size: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  
  ${props => props.$size === 'small' && `
    font-size: 16px;
    width: 20px;
    height: 20px;
  `}
  
  ${props => props.$size === 'medium' && `
    font-size: 20px;
    width: 24px;
    height: 24px;
  `}
  
  ${props => props.$size === 'large' && `
    font-size: 24px;
    width: 32px;
    height: 32px;
  `}
`;