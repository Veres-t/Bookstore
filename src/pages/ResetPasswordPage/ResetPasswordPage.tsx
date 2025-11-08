// pages/ResetPasswordPage/ResetPasswordPage.tsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input, Card, Heading } from '../../components';
import { resetPasswordStart } from '../../store/slices/authSlice';
import type { RootState } from '../../store';
import styled from 'styled-components';

export const ResetPasswordPage: React.FC = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(resetPasswordStart(email));
    setSubmitted(true);
  };

  const handleGoToHome = () => {
    window.location.href = '/';
  };

  return (
    <ResetCard padding="large">
      <Form onSubmit={handleSubmit}>
        <FormHeading level={2}>Reset Password</FormHeading>
        
        {submitted && !error && (
          <SuccessMessage>
            You will receive an email {email} with a link to reset your password!
          </SuccessMessage>
        )}
        
        <Input
          label="Email"
          type="email"
          placeholder="Your email"
          value={email}
          onChange={setEmail}
          required
          disabled={submitted && !error}
        />
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        {!submitted || error ? (
          <ResetButton type="submit" variant="primary" disabled={loading}>
            {loading ? 'Sending...' : 'Reset'}
          </ResetButton>
        ) : (
          <HomeButton type="button" onClick={handleGoToHome}>
            GO TO HOME
          </HomeButton>
        )}
      </Form>
    </ResetCard>
  );
};

// Styled components
const ResetCard = styled(Card)`
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

const SuccessMessage = styled.div`
  color: #000000;
  background-color: #ffe6e6; /* ⭐ РОЗОВЫЙ ФОН */
  border: 1px solid #ffcccc; /* ⭐ РОЗОВАЯ РАМКА */
  padding: 16px;
  border-radius: 4px;
  font-size: 14px;
  line-height: 1.5;
  text-align: left;
  margin-bottom: 8px;
`;

const ResetButton = styled(Button)`
  background-color: #000000;
  color: white;
  border: 1px solid #000000;

  &:hover:not(:disabled) {
    background-color: #333333;
    border-color: #333333;
  }
`;

const HomeButton = styled(Button)`
  background-color: #000000;
  color: white;
  border: 1px solid #000000;

  &:hover {
    background-color: #333333;
    border-color: #333333;
  }
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  background-color: #fdf2f2;
  border: 1px solid #fbd5d5;
  padding: 12px;
  border-radius: 4px;
  font-size: 14px;
  text-align: center;
`;

export default ResetPasswordPage;