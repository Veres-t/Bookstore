import React from 'react';
import styled from 'styled-components';

export interface HeadingProps {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
}

// Создаем отдельные стилизованные компоненты для каждого уровня
const StyledH1 = styled.h1`
  margin: 0;
  color: #333;
  font-weight: 600;
  line-height: 1.2;
  font-size: 32px;
  
  @media (max-width: 768px) {
    font-size: 28px;
  }
  
  @media (max-width: 320px) {
    font-size: 24px;
  }
`;

const StyledH2 = styled.h2`
  margin: 0;
  color: #333;
  font-weight: 600;
  line-height: 1.2;
  font-size: 28px;
  
  @media (max-width: 768px) {
    font-size: 24px;
  }
  
  @media (max-width: 320px) {
    font-size: 20px;
  }
`;

const StyledH3 = styled.h3`
  margin: 0;
  color: #333;
  font-weight: 600;
  line-height: 1.2;
  font-size: 24px;
  
  @media (max-width: 768px) {
    font-size: 20px;
  }
  
  @media (max-width: 320px) {
    font-size: 18px;
  }
`;

const StyledH4 = styled.h4`
  margin: 0;
  color: #333;
  font-weight: 600;
  line-height: 1.2;
  font-size: 20px;
`;

const StyledH5 = styled.h5`
  margin: 0;
  color: #333;
  font-weight: 600;
  line-height: 1.2;
  font-size: 18px;
`;

const StyledH6 = styled.h6`
  margin: 0;
  color: #333;
  font-weight: 600;
  line-height: 1.2;
  font-size: 16px;
`;

export const Heading: React.FC<HeadingProps> = ({
  children,
  level = 1,
  className
}) => {
  const components = {
    1: StyledH1,
    2: StyledH2,
    3: StyledH3,
    4: StyledH4,
    5: StyledH5,
    6: StyledH6
  };

  const Component = components[level];

  return <Component className={className}>{children}</Component>;
};