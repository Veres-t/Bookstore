// components/SocialShare/SocialShare.tsx
import React from 'react';
import styled from 'styled-components';

export const SocialShare: React.FC = () => {
  const handleFacebookShare = () => {
    console.log('Sharing on Facebook');
    // Здесь будет логика шаринга в Facebook
  };

  const handleTwitterShare = () => {
    console.log('Sharing on Twitter');
    // Здесь будет логика шаринга в Twitter
  };

  const handleMoreOptions = () => {
    console.log('Opening more share options');
    // Здесь будет логика дополнительных опций шаринга
  };

  return (
    <SocialContainer>
      <SocialButton onClick={handleFacebookShare} aria-label="Share on Facebook">
        <FacebookIcon />
      </SocialButton>
      
      <SocialButton onClick={handleTwitterShare} aria-label="Share on Twitter">
        <TwitterIcon />
      </SocialButton>
      
      <SocialButton onClick={handleMoreOptions} aria-label="More share options">
        <MoreIcon />
      </SocialButton>
    </SocialContainer>
  );
};

// Styled components
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
  padding: 0;
  transition: all 0.2s ease;
  
  &:hover {
    background: #f8f9fa;
    border-color: #ccc;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

// SVG иконки
const FacebookIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" 
      stroke="#313037" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

const TwitterIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M23 3.00005C22.0424 3.67552 20.9821 4.19216 19.86 4.53005C19.2577 3.83756 18.4573 3.34674 17.567 3.12397C16.6767 2.90121 15.7395 2.95724 14.8821 3.2845C14.0247 3.61176 13.2884 4.19445 12.773 4.95376C12.2575 5.71308 11.9877 6.61238 12 7.53005V8.53005C10.2426 8.57561 8.50127 8.18586 6.93101 7.39549C5.36074 6.60513 4.01032 5.43868 3 4.00005C3 4.00005 -1 13 8 17C5.94053 18.398 3.48716 19.099 1 19C10 24 21 19 21 7.50005C20.9991 7.2215 20.9723 6.94364 20.92 6.67005C21.9406 5.66354 22.6608 4.39276 23 3.00005V3.00005Z" 
      stroke="#313037" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

const MoreIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" 
      stroke="#313037" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z" 
      stroke="#313037" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z" 
      stroke="#313037" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

export default SocialShare;