// components/BackButton/BackButton.tsx  
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export interface BackButtonProps {
  onClick?: () => void;
  className?: string;
}

export const BackButton: React.FC<BackButtonProps> = ({ 
  onClick, 
  className
}) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(-1);
    }
  };
  
  return (
    <Button onClick={handleClick} className={className}>
      ←
    </Button>
  );
};

const Button = styled.button`
  background: none;
  border: none;
  font-size: 32px;
  cursor: pointer;
  padding: 4px;
  color: #333;
  font-weight: 300;
  align-self: flex-start;
  margin-bottom: 4px;
  line-height: 1;
  
  &:hover {
    color: #007bff;
  }
`;