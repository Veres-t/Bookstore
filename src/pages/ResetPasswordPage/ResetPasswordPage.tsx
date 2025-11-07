// pages/ResetPasswordPage/ResetPasswordPage.tsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Input, Heading, Card } from '../../components';
import { resetPasswordStart } from '../../store/slices/authSlice';
import type { RootState } from '../../store';

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

  if (submitted && !error) {
    return (
      <Card padding="large">
        <Heading level={2}>Check Your Email</Heading>
        <p>We've sent a password reset link to {email}</p>
        <Link to="/signin">
          <Button variant="primary">Back to Sign In</Button>
        </Link>
      </Card>
    );
  }

  return (
    <Card padding="large">
      <Heading level={2}>Reset Password</Heading>
      <form onSubmit={handleSubmit}>
        <Input
          label="Email"
          type="email"
          placeholder="Your email"
          value={email}
          onChange={setEmail}
          required
        />
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? 'Sending...' : 'Reset Password'}
        </Button>
      </form>
      <div style={{ marginTop: '16px' }}>
        <Link to="/signin">Back to Sign In</Link>
      </div>
    </Card>
  );
};