// pages/SignInPage/SignInPage.tsx
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AuthFormContainer } from '../../containers/AuthFormContainer';
import styled from 'styled-components';

export const SignInPage: React.FC = () => {
  const location = useLocation();
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (location.state?.message) {
      setMessage(location.state.message);
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  return (
    <Container>
      {message && (
        <SuccessMessage>
          {message}
        </SuccessMessage>
      )}
      <AuthFormContainer />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding-top: 5px;
`;

const SuccessMessage = styled.div`
  background-color: #d4edda;
  color: #0f0e0eff;
  border: 1px solid #c3e6cb;
  padding: 16px 20px;
  border-radius: 4px;
  margin-bottom: 5px;
  max-width: 400px;
  width: 100%;
  text-align: center;
`;

export default SignInPage;