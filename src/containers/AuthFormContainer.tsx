// containers/AuthFormContainer.tsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AuthForm } from '../components/AuthForm';
import { 
  signInStart, 
  signUpStart, 
  switchAuthMode,
  clearAuthError 
} from '../store/slices/authSlice';
import type { RootState } from '../store';

export const AuthFormContainer: React.FC = () => {
  const dispatch = useDispatch();
  const { mode, loading, error } = useSelector((state: RootState) => state.auth);

  const handleSubmit = (formData: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    if (mode === 'signin') {
      dispatch(signInStart({
        email: formData.email,
        password: formData.password
      }));
    } else {
      dispatch(signUpStart({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword
      }));
    }
  };

  const handleSwitchMode = (newMode: 'signin' | 'signup') => {
    dispatch(switchAuthMode(newMode));
  };

  return (
    <AuthForm
      mode={mode}
      loading={loading}
      error={error}
      onSubmit={handleSubmit}
      onSwitchMode={handleSwitchMode}
    />
  );
};