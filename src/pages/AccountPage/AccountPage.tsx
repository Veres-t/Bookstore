// pages/AccountPage/AccountPage.tsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Heading, Button, Input, Card } from '../../components';
import { signOut } from '../../store/slices/authSlice';
import type { RootState } from '../../store';
import styled from 'styled-components';

export const AccountPage: React.FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Update profile:', profileData);
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Change password:', passwordData);
  };

  const handleSignOut = () => {
    dispatch(signOut());
  };

  if (!user) {
    return (
      <div>
        <Heading level={1}>Account</Heading>
        <Card padding="large">
          <p>Please sign in to view your account.</p>
        </Card>
      </div>
    );
  }

  return (
    <Container>
      <Heading level={1}>Account Settings</Heading>
      
      <StyledCard padding="large">
        <Heading level={2}>Profile Information</Heading>
        <form onSubmit={handleProfileUpdate}>
          <Input
            label="Name"
            value={profileData.name}
            onChange={(value) => setProfileData(prev => ({ ...prev, name: value }))}
            placeholder="Your name"
          />
          <Input
            label="Email"
            type="email"
            value={profileData.email}
            onChange={(value) => setProfileData(prev => ({ ...prev, email: value }))}
            placeholder="Your email"
          />
          <SubmitButton type="submit" variant="primary">
            Update Profile
          </SubmitButton>
        </form>
      </StyledCard>

      <StyledCard padding="large">
        <Heading level={2}>Change Password</Heading>
        <form onSubmit={handlePasswordChange}>
          <Input
            label="Current Password"
            type="password"
            value={passwordData.currentPassword}
            onChange={(value) => setPasswordData(prev => ({ ...prev, currentPassword: value }))}
            placeholder="Current password"
          />
          <Input
            label="New Password"
            type="password"
            value={passwordData.newPassword}
            onChange={(value) => setPasswordData(prev => ({ ...prev, newPassword: value }))}
            placeholder="New password"
          />
          <Input
            label="Confirm New Password"
            type="password"
            value={passwordData.confirmPassword}
            onChange={(value) => setPasswordData(prev => ({ ...prev, confirmPassword: value }))}
            placeholder="Confirm new password"
          />
          <SubmitButton type="submit" variant="primary">
            Change Password
          </SubmitButton>
        </form>
      </StyledCard>

      <Card padding="large">
        <Heading level={2}>Account Actions</Heading>
        <Button variant="outline" onClick={handleSignOut}>
          Sign Out
        </Button>
      </Card>
    </Container>
  );
};

// Styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const StyledCard = styled(Card)`
  margin-bottom: 24px;
`;

const SubmitButton = styled(Button)`
  margin-top: 16px;
`;