// components/PageTitle/PageTitle.tsx
import React from 'react';
import styled from 'styled-components';

export interface PageTitleProps {
  children: string;
  className?: string;
}

export const PageTitle: React.FC<PageTitleProps> = ({
  children,
  className
}) => {
  return <Title className={className}>{children}</Title>;
};

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin: 0;
  margin-bottom: 24px;
`;