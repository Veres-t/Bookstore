// src/__tests__/components/AuthForm.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { AuthForm } from '../../components/AuthForm';


import '@testing-library/jest-dom';

const mockOnSubmit = jest.fn();
const mockOnSwitchMode = jest.fn();

const renderAuthForm = (mode: 'signin' | 'signup' = 'signin') => {
  return render(
    <AuthForm
      mode={mode}
      onSubmit={mockOnSubmit}
      onSwitchMode={mockOnSwitchMode}
    />
  );
};

describe('AuthForm Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  //  Отображение формы входа
  it('should render sign in form with correct fields', () => {
    renderAuthForm('signin');
    
    expect(screen.getByText('SIGN IN')).toBeInTheDocument();
    
    expect(screen.getByPlaceholderText('Your email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Your password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument();
  });

  //  Отображение формы регистрации
  it('should render sign up form with additional fields', () => {
    renderAuthForm('signup');
    
    expect(screen.getByText('SIGN UP')).toBeInTheDocument();
    //  используйте placeholder вместо label
    expect(screen.getByPlaceholderText('Your name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Confirm your password')).toBeInTheDocument();
  });

  //  Переключение между режимами
  it('should switch between sign in and sign up modes', () => {
    renderAuthForm('signin');
    
    const signUpTab = screen.getByText('SIGN UP');
    fireEvent.click(signUpTab);
    
    expect(mockOnSwitchMode).toHaveBeenCalledWith('signup');
  });
});