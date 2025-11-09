// pages/AccountPage/AccountPage.tsx
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from '../../components';
import type { RootState } from '../../store';
import styled from 'styled-components';

export const AccountPage: React.FC = () => {
  const navigate = useNavigate();
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

  const handleBack = () => {
    navigate(-1);
  };

  const handleSaveChanges = () => {
    console.log('Save changes:', { profileData, passwordData });
    // Здесь будет вызов API для сохранения изменений
  };

  const handleCancel = () => {
    // Сбрасываем данные к исходным значениям
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
        <BackButton onClick={handleBack}>←</BackButton>
        <PageTitle>ACCOUNT</PageTitle>
        <div>Please sign in to view your account.</div>
      </Container>
    );
  }

  return (
    <Container>
      {/* Кнопка назад */}
      <BackButton onClick={handleBack}>←</BackButton>
      
      {/* Заголовок ACCOUNT под стрелкой */}
      <PageTitle>ACCOUNT</PageTitle>
      
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
            <SaveButton type="button" variant="primary" onClick={handleSaveChanges}>
              SAVE CHANGES
            </SaveButton>
            <CancelButton type="button" onClick={handleCancel}>
              CANCEL
            </CancelButton>
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

const BackButton = styled.button`
  background: none;
  border: none;
  font-size: 32px;
  cursor: pointer;
  padding: 4px;
  color: #333;
  font-weight: 300;
  align-self: flex-start;
  margin-bottom: 4px;
  line-height: 1;
  
  &:hover {
    color: #007bff;
  }
`;

const PageTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin: 0 0 16px 0;
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
    // Кнопки остаются рядом на планшетах, занимают всю ширину
  }
  
  @media (max-width: 480px) {
    flex-direction: column; // Только на мобильных кнопки друг под другом
  }
`;

const SaveButton = styled(Button)`
  background-color: #000000;
  color: white;
  border: 1px solid #000000;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 600;
  flex: 1;
  
  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 13px;
  }
  
  @media (max-width: 480px) {
    padding: 10px 20px;
    font-size: 14px;
  }
  
  &:hover:not(:disabled) {
    background-color: #333333;
    border-color: #333333;
  }
`;

const CancelButton = styled.button`
  background-color: white;
  color: #000000;
  border: 1px solid #ccc;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  font-family: inherit;
  flex: 1;
  
  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 13px;
  }
  
  @media (max-width: 480px) {
    padding: 10px 20px;
    font-size: 14px;
  }
  
  &:hover:not(:disabled) {
    background-color: #f8f9fa;
    border-color: #999;
  }`