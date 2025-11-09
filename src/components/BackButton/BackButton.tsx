// components/BackButton/BackButton.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export const BackButton: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <Button onClick={() => navigate(-1)}>
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