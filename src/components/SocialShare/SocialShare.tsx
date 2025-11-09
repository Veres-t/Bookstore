// components/SocialShare/SocialShare.tsx
import React from 'react';
import styled from 'styled-components';

export const SocialShare: React.FC = () => {
  return (
    <SocialContainer>
      <SocialButton>f</SocialButton> {/* Facebook */}
      <SocialButton>t</SocialButton> {/* Twitter */}
      <SocialButton>...</SocialButton> {/* More */}
    </SocialContainer>
  );
};

const SocialContainer = styled.div`
  display: flex;
  gap: 12px;
  margin: 24px 0;
`;

const SocialButton = styled.button`
  width: 40px;
  height: 40px;
  border: 1px solid #e1e5e9;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: #f8f9fa;
  }
`;