// src/__tests__/components/AuthForm.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { AuthForm } from '../../components/AuthForm';

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

  // 🧪 ТЕСТ 5.1: Отображение формы входа
  it('should render sign in form with correct fields', () => {
    renderAuthForm('signin');
    
    expect(screen.getByText('SIGN IN')).toBeInTheDocument();
    // ✅ ИСПРАВЛЕНО: используйте placeholder вместо label
    expect(screen.getByPlaceholderText('Your email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Your password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument();
  });

  // 🧪 ТЕСТ 5.2: Отображение формы регистрации
  it('should render sign up form with additional fields', () => {
    renderAuthForm('signup');
    
    expect(screen.getByText('SIGN UP')).toBeInTheDocument();
    // ✅ ИСПРАВЛЕНО: используйте placeholder вместо label
    expect(screen.getByPlaceholderText('Your name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Confirm your password')).toBeInTheDocument();
  });

  // 🧪 ТЕСТ 5.3: Переключение между режимами
  it('should switch between sign in and sign up modes', () => {
    renderAuthForm('signin');
    
    const signUpTab = screen.getByText('SIGN UP');
    fireEvent.click(signUpTab);
    
    expect(mockOnSwitchMode).toHaveBeenCalledWith('signup');
  });
});