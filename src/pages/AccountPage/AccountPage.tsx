// pages/AccountPage/AccountPage.tsx
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Input, PageTitle } from '../../components';
import type { RootState } from '../../store';
import styled from 'styled-components';

export const AccountPage: React.FC = () => {
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

  const handleSaveChanges = () => {
    console.log('Save changes:', { profileData, passwordData });
    // Здесь будет вызов API для сохранения изменений
  };

  const handleCancel = () => {
    setProfileData({
      name: user?.name || '',
      email: user?.email || '',
    });
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

  if (!user) {
    return (
      <Container>
        <PageTitle withBackButton>ACCOUNT</PageTitle>
        <div>Please sign in to view your account.</div>
      </Container>
    );
  }

  return (
    <Container>
      <PageTitle withBackButton>ACCOUNT</PageTitle>
      
      {/* Секция Profile */}
      <Section>
        <SectionTitle>PROFILE</SectionTitle>
        <FormRow>
          <FormGroup>
            <Label>Name</Label>
            <Input
              type="text"
              value={profileData.name}
              onChange={(value) => setProfileData(prev => ({ ...prev, name: value }))}
              placeholder="Your name"
            />
          </FormGroup>
          <FormGroup>
            <Label>Email</Label>
            <Input
              type="email"
              value={profileData.email}
              onChange={(value) => setProfileData(prev => ({ ...prev, email: value }))}
              placeholder="Your email"
            />
          </FormGroup>
        </FormRow>
      </Section>

      {/* Секция Password */}
      <Section>
        <SectionTitle>PASSWORD</SectionTitle>
        
        {/* Текущий пароль */}
        <FormRow>
          <FormGroup>
            <Label>Password</Label>
            <Input
              type="password"
              value="••••••••"
              onChange={() => {}}
              disabled
            />
          </FormGroup>
          <FormGroup>
            {/* Пустая группа для выравнивания */}
          </FormGroup>
        </FormRow>
        
        {/* Новый пароль */}
        <FormRow>
          <FormGroup>
            <Label>New password</Label>
            <Input
              type="password"
              value={passwordData.newPassword}
              onChange={(value) => setPasswordData(prev => ({ ...prev, newPassword: value }))}
              placeholder="New password"
            />
          </FormGroup>
          <FormGroup>
            <Label>Confirm new password</Label>
            <Input
              type="password"
              value={passwordData.confirmPassword}
              onChange={(value) => setPasswordData(prev => ({ ...prev, confirmPassword: value }))}
              placeholder="Confirm new password"
            />
          </FormGroup>
        </FormRow>

        {/* Серая линия разделитель с отступами */}
        <DividerContainer>
          <Divider />
        </DividerContainer>

        {/* Кнопки справа под Confirm new password */}
        <ButtonsContainer>
          <ButtonsRow>
            <Button 
              variant="primary" 
              onClick={handleSaveChanges}
            >
              SAVE CHANGES
            </Button>
            
            <Button 
              variant="secondary" 
              onClick={handleCancel}
            >
              CANCEL
            </Button>
          </ButtonsRow>
        </ButtonsContainer>
      </Section>
    </Container>
  );
};

// Styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Section = styled.div`
  margin-bottom: 0;
`;

const SectionTitle = styled.h2`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0 0 16px 0;
  text-transform: uppercase;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 16px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: 600;
  color: #333;
  font-size: 14px;
  margin-bottom: 8px;
`;

const DividerContainer = styled.div`
  margin: 24px 0;
`;

const Divider = styled.div`
  height: 1px;
  background-color: #e1e5e9;
  width: 100%;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  
  @media (max-width: 768px) {
    justify-content: flex-start;
  }
`;

const ButtonsRow = styled.div`
  display: flex;
  gap: 12px;
  width: 50%;
  
  @media (max-width: 768px) {
    width: 100%;
  }
  
  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

export default AccountPage;