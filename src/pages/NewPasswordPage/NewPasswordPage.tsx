// pages/NewPasswordPage/NewPasswordPage.tsx
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button, Input, Card, Heading } from '../../components';
import type { RootState } from '../../store';
import styled from 'styled-components';

export const NewPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { loading } = useSelector((state: RootState) => state.auth);
  
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const token = searchParams.get('token');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    console.log('Setting new password for token:', token);
    
    setSubmitted(true);
    setTimeout(() => {
      navigate('/signin', { 
        state: { message: 'Your password has been changed!' } 
      });
    }, 2000);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (submitted) {
    return (
      <NewPasswordCard padding="large">
        <SuccessMessage>New Password</SuccessMessage>
        <SuccessText>
          Your password has been changed! Redirecting to Sign In...
        </SuccessText>
      </NewPasswordCard>
    );
  }

  return (
    <NewPasswordCard padding="large">
      <Form onSubmit={handleSubmit}>
        <FormHeading level={2}>New Password</FormHeading>
        
        <Input
          label="Password"
          type="password"
          placeholder="Your password"
          value={formData.password}
          onChange={(value) => handleChange('password', value)}
          required
        />
        
        <Input
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={(value) => handleChange('confirmPassword', value)}
          required
        />
        
        
        <Button 
          type="submit" 
          variant="primary" 
          disabled={loading}
        >
          {loading ? 'Setting...' : 'Set Password'}
        </Button>
      </Form>
    </NewPasswordCard>
  );
};


const NewPasswordCard = styled(Card)`
  max-width: 400px;
  margin: 80px auto 0 auto;
  width: 100%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FormHeading = styled(Heading)`
  color: #000000;
  text-align: left;
  margin-bottom: 8px;
`;

const SuccessMessage = styled.h2`
  color: #000000;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 16px;
  text-align: left;
`;

const SuccessText = styled.p`
  color: #000000;
  text-align: left;
  line-height: 1.5;
`;

export default NewPasswordPage;