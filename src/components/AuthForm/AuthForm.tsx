// components/AuthForm/AuthForm.tsx
import React from 'react';
import styled from 'styled-components';
import { Button, Input, Card } from '../../components';

export interface AuthFormProps {
  mode: 'signin' | 'signup';
  loading?: boolean;
  error?: string | null;
  onSubmit: (formData: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => void;
  onSwitchMode: (mode: 'signin' | 'signup') => void;
  className?: string;
}

export const AuthForm: React.FC<AuthFormProps> = ({ 
  mode, 
  loading = false, 
  error = null,
  onSubmit,
  onSwitchMode,
  className 
}) => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const isSignIn = mode === 'signin';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleTabClick = (newMode: 'signin' | 'signup') => {
    if (newMode !== mode) {
      onSwitchMode(newMode);
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
    }
  };

  return (
    <AuthCard padding="large" className={className}>
      <Header>
        <Tab 
          $active={isSignIn} 
          onClick={() => handleTabClick('signin')}
        >
          SIGN IN
        </Tab>
        <Tab 
          $active={!isSignIn} 
          onClick={() => handleTabClick('signup')}
        >
          SIGN UP
        </Tab>
      </Header>

      <Form onSubmit={handleSubmit}>
        {!isSignIn && (
          <Input
            label="Name"
            type="text"
            placeholder="Your name"
            value={formData.name}
            onChange={(value) => handleChange('name', value)}
          />
        )}

        <Input
          label="Email"
          type="email"
          placeholder="Your email"
          value={formData.email}
          onChange={(value) => handleChange('email', value)}
        />

        <Input
          label="Password"
          type="password"
          placeholder="Your password"
          value={formData.password}
          onChange={(value) => handleChange('password', value)}
        />

        {!isSignIn && (
          <Input
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={(value) => handleChange('confirmPassword', value)}
          />
        )}

        {error && (
          <ErrorMessage>
            {error}
          </ErrorMessage>
        )}

        {isSignIn && (
          <ForgotPasswordLink href="/reset-password">
            Forgot password?
          </ForgotPasswordLink>
        )}

        {/* ✅ Используем Button без переопределения стилей */}
        <Button 
          type="submit" 
          variant="primary" 
          disabled={loading}
        >
          {loading ? 'Loading...' : (isSignIn ? 'Sign In' : 'Sign Up')}
        </Button>
      </Form>
    </AuthCard>
  );
};

// Styled components
const AuthCard = styled(Card)`
  max-width: 400px;
  margin: 80px auto 0 auto;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  border-bottom: 1px solid #e1e5e9;
  margin-bottom: 24px;
`;

const Tab = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: 16px;
  border: none;
  background: none;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  border-bottom: 2px solid ${props => props.$active ? '#000000' : 'transparent'};
  color: ${props => props.$active ? '#000000' : '#666'};
  transition: all 0.3s ease;

  &:hover {
    color: #000000;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
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

const ForgotPasswordLink = styled.a`
  color: #000000;
  text-decoration: none;
  font-size: 14px;
  align-self: flex-start;
  margin-top: -8px;

  &:hover {
    text-decoration: underline;
  }
`;

// ✅ Убираем SubmitButton styled component

export default AuthForm;