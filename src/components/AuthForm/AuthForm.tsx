// components/AuthForm/AuthForm.tsx
import React from 'react';
import styled from 'styled-components';
import { Button, Input, Card } from '../../components';
import { validateEmail } from '../../helpers';

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
  
  const [registrationSuccess, setRegistrationSuccess] = React.useState(false);
  const [hasSubmitted, setHasSubmitted] = React.useState(false);
  const [localErrors, setLocalErrors] = React.useState<Record<string, string>>({});
  const [touched, setTouched] = React.useState<Record<string, boolean>>({});

  const isSignIn = mode === 'signin';

  // Проверка валидности формы
  const isFormValid = () => {
    if (mode === 'signup') {
      const allFieldsFilled = (
        formData.name.trim() !== '' &&
        formData.email.trim() !== '' &&
        formData.password.trim() !== '' &&
        formData.confirmPassword.trim() !== ''
      );
      
      const noErrors = Object.keys(localErrors).length === 0;
      
      return allFieldsFilled && noErrors;
    } else {
      const allFieldsFilled = (
        formData.email.trim() !== '' &&
        formData.password.trim() !== ''
      );
      
      const noErrors = Object.keys(localErrors).length === 0;
      
      return allFieldsFilled && noErrors;
    }
  };

  // Валидация поля
  const validateField = (field: string, value: string) => {
    const errors: Record<string, string> = {};

    if (mode === 'signup') {
      if (field === 'name' && value.trim() && !value.trim()) {
        errors.name = 'Name is required';
      }

      if (field === 'email' && value.trim()) {
        if (!validateEmail(value)) {
          errors.email = 'Please enter a valid email address';
        }
      }

      if (field === 'password' && value) {
        if (value.length < 6) {
          errors.password = 'Password must be at least 6 characters';
        }
      }

      if (field === 'confirmPassword' && value && formData.password) {
        if (formData.password !== value) {
          errors.confirmPassword = 'Passwords do not match';
        }
      }
      
      if (field === 'password' && formData.confirmPassword) {
        if (value !== formData.confirmPassword) {
          errors.confirmPassword = 'Passwords do not match';
        } else {
          setLocalErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors.confirmPassword;
            return newErrors;
          });
        }
      }
    } else {
      if (field === 'email' && value.trim() && !validateEmail(value)) {
        errors.email = 'Please enter a valid email address';
      }
      if (field === 'password' && value && value.length < 6) {
        errors.password = 'Password must be at least 6 characters';
      }
    }

    setLocalErrors(prev => {
      const newErrors = { ...prev };
      
      if (!errors[field]) {
        delete newErrors[field];
      } else {
        newErrors[field] = errors[field];
      }
      
      return newErrors;
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (touched[field] || value) {
      validateField(field, value);
    }
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const value = formData[field as keyof typeof formData];
    if (value) {
      validateField(field, value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Отмечаем все поля как "посещенные"
    const allTouched: Record<string, boolean> = {};
    if (mode === 'signup') {
      allTouched.name = true;
      allTouched.email = true;
      allTouched.password = true;
      allTouched.confirmPassword = true;
    } else {
      allTouched.email = true;
      allTouched.password = true;
    }
    setTouched(allTouched);

    // Финальная валидация всех полей
    const finalErrors: Record<string, string> = {};
    
    if (mode === 'signup') {
      if (!formData.name.trim()) finalErrors.name = 'Name is required';
      if (!formData.email.trim()) finalErrors.email = 'Email is required';
      else if (!validateEmail(formData.email)) finalErrors.email = 'Invalid email';
      if (!formData.password.trim()) finalErrors.password = 'Password is required';
      else if (formData.password.length < 6) finalErrors.password = 'Password must be at least 6 characters';
      if (!formData.confirmPassword.trim()) finalErrors.confirmPassword = 'Please confirm your password';
      else if (formData.password !== formData.confirmPassword) {
        finalErrors.confirmPassword = 'Passwords do not match';
      }
    } else {
      if (!formData.email.trim()) finalErrors.email = 'Email is required';
      else if (!validateEmail(formData.email)) finalErrors.email = 'Invalid email';
      if (!formData.password.trim()) finalErrors.password = 'Password is required';
    }

    if (Object.keys(finalErrors).length > 0) {
      setLocalErrors(finalErrors);
      return;
    }

    setHasSubmitted(true);
    onSubmit(formData);
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
      setRegistrationSuccess(false);
      setHasSubmitted(false);
      setLocalErrors({});
      setTouched({});
    }
  };

  // ✅ ИСПРАВЛЕННЫЙ ЭФФЕКТ - ПРОБЛЕМА БЫЛА ЗДЕСЬ!
  React.useEffect(() => {
    // Проверяем успешную регистрацию
    if (mode === 'signup' && hasSubmitted && !loading && !error) {
      console.log('✅ Registration successful! Showing success message...');
      setRegistrationSuccess(true);
    }
  }, [mode, loading, error, hasSubmitted]);

  const handleSuccessContinue = () => {
    setRegistrationSuccess(false);
    setHasSubmitted(false);
    setLocalErrors({});
    setTouched({});
    onSwitchMode('signin');
  };

  // ✅ Сообщение об успехе после регистрации
  if (registrationSuccess) {
    return (
      <AuthCard padding="large" className={className}>
        <SuccessMessage>
          <SuccessIcon>🎉</SuccessIcon>
          <SuccessTitle>Registration Successful!</SuccessTitle>
          <SuccessText>
            Your account has been created successfully. 
            Please sign in with your email and password.
          </SuccessText>
          <Button 
            variant="primary" 
            onClick={handleSuccessContinue}
          >
            Sign In Now
          </Button>
        </SuccessMessage>
      </AuthCard>
    );
  }

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
            onBlur={() => handleBlur('name')}
            error={touched.name ? localErrors.name : ''}
            required
          />
        )}

        <Input
          label="Email"
          type="email"
          placeholder="Your email"
          value={formData.email}
          onChange={(value) => handleChange('email', value)}
          onBlur={() => handleBlur('email')}
          error={touched.email ? localErrors.email : ''}
          required
        />

        <Input
          label="Password"
          type="password"
          placeholder="Your password"
          value={formData.password}
          onChange={(value) => handleChange('password', value)}
          onBlur={() => handleBlur('password')}
          error={touched.password ? localErrors.password : ''}
          required
        />

        {!isSignIn && (
          <Input
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={(value) => handleChange('confirmPassword', value)}
            onBlur={() => handleBlur('confirmPassword')}
            error={touched.confirmPassword ? localErrors.confirmPassword : ''}
            required
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

        {/* ✅ ДЕБАГ ИНФОРМАЦИЯ УДАЛЕНА - пользователю не нужно это видеть */}

        <Button 
          type="submit" 
          variant="primary" 
          disabled={loading || !isFormValid()}
        >
          {loading ? 'Loading...' : (isSignIn ? 'Sign In' : 'Sign Up')}
        </Button>
      </Form>
    </AuthCard>
  );
};

// Styled components остаются без изменений
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

const SuccessMessage = styled.div`
  text-align: center;
  padding: 20px;
`;

const SuccessIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
`;

const SuccessTitle = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 8px;
`;

const SuccessText = styled.p`
  color: #666;
  margin-bottom: 24px;
  line-height: 1.5;
`;

export default AuthForm;