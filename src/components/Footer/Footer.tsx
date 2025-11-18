// components/Footer/Footer.tsx
import React from 'react';
import styled from 'styled-components';

export interface FooterProps {
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    <FooterContainer className={className}>
      <CopyrightSection>
        <CopyrightText>©2022 Bookstore</CopyrightText>
        <RightsText>All rights reserved</RightsText>
      </CopyrightSection>
    </FooterContainer>
  );
};


const FooterContainer = styled.footer`
  background-color: #f8f9fa;
  border-top: 1px solid #e1e5e9;
  margin-top: 60px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
`;

const CopyrightSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 8px;
    text-align: center;
  }
`;

const CopyrightText = styled.p`
  font-size: 14px;
  color: #333;
  font-weight: 500;
`;

const RightsText = styled.p`
  font-size: 14px;
  color: #666;
`;

export default Footer;