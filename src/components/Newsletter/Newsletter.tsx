// components/Newsletter/Newsletter.tsx
import React, { useState } from 'react';
import { Button } from '../Button'; // ✅ Добавляем импорт Button
import styled from 'styled-components';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Subscribed with email:', email);
    setEmail('');
  };

  return (
    <NewsletterSection>
      <NewsletterContent>
        <NewsletterTitle>SUBSCRIBE TO NEWSLETTER</NewsletterTitle>
        <NewsletterText>
          Be the first to know about new IT books, upcoming releases, exclusive offers and more.
        </NewsletterText>
        <SubscribeForm onSubmit={handleSubscribe}>
          <EmailInput
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {/* ✅ Заменяем на Button компонент */}
          <Button variant="primary" size="small" type="submit">
            SUBSCRIBE
          </Button>
        </SubscribeForm>
      </NewsletterContent>
    </NewsletterSection>
  );
};

// Styled components
const NewsletterSection = styled.section`
  background: #ffe6e6;
  padding: 40px;
  margin: 60px 0 40px 0;
  border-radius: 0;
  
  @media (max-width: 768px) {
    padding: 30px 20px;
    margin: 40px 0 30px 0;
  }
`;

const NewsletterContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

const NewsletterTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: #333;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const NewsletterText = styled.p`
  font-size: 14px;
  color: #666;
  line-height: 1.5;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

const SubscribeForm = styled.form`
  display: flex;
  width: 100%;
  margin-top: 16px;
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 12px;
  }
`;

const EmailInput = styled.input`
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-right: none;
  border-radius: 4px 0 0 4px;
  font-size: 14px;
  flex: 1;
  
  &:focus {
    outline: none;
    border-color: #007bff;
  }
  
  @media (max-width: 480px) {
    border-right: 1px solid #ddd;
    border-radius: 4px;
  }
`;

// ✅ Убираем старый SubscribeButton, так как теперь используем Button компонент

export default Newsletter;