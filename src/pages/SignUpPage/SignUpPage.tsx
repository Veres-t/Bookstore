// pages/SignUpPage/SignUpPage.tsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Input, Heading, Card } from '../../components';
import { signUpStart } from '../../store/slices/authSlice';
import type { RootState } from '../../store';

export const SignUpPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [formErrors, setFormErrors] = useState({
    confirmPassword: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Валидация
    if (formData.password !== formData.confirmPassword) {
      setFormErrors({ confirmPassword: 'Passwords do not match' });
      return;
    }

    setFormErrors({ confirmPassword: '' });
    dispatch(signUpStart(formData));
    navigate('/');
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Очищаем ошибки при изменении
    if (field === 'confirmPassword' || field === 'password') {
      setFormErrors({ confirmPassword: '' });
    }
  };

  return (
    <Card padding="large">
      <Heading level={2}>Sign Up</Heading>
      <form onSubmit={handleSubmit}>
        <Input
          label="Name"
          type="text"
          placeholder="Your name"
          value={formData.name}
          onChange={(value) => handleChange('name', value)}
          required
        />
        <Input
          label="Email"
          type="email"
          placeholder="Your email"
          value={formData.email}
          onChange={(value) => handleChange('email', value)}
          required
        />
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
          error={formErrors.confirmPassword}
          required
        />
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? 'Creating Account...' : 'Sign Up'}
        </Button>
      </form>
      <div style={{ marginTop: '16px' }}>
        <Link to="/signin">Already have an account? Sign In</Link>
      </div>
    </Card>
  );
};