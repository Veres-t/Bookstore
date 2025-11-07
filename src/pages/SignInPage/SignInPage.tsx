// pages/SignInPage/SignInPage.tsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Input, Heading, Card } from '../../components';
import { signInStart } from '../../store/slices/authSlice';
import type { RootState } from '../../store';

export const SignInPage: React.FC = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(signInStart(formData));
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card padding="large">
      <Heading level={2}>Sign In</Heading>
      <form onSubmit={handleSubmit}>
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
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? 'Signing In...' : 'Sign In'}
        </Button>
      </form>
      <div style={{ marginTop: '16px' }}>
        <Link to="/signup">Don't have an account? Sign Up</Link>
      </div>
      <div style={{ marginTop: '8px' }}>
        <Link to="/reset-password">Forgot password?</Link>
      </div>
    </Card>
  );
};