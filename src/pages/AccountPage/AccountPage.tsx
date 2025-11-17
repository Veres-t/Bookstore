// pages/AccountPage/AccountPage.tsx
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Input, PageTitle } from '../../components';
import { BackButton } from '../../components/BackButton/BackButton';
import { 
  changePasswordStart, 
  clearPasswordChangeStatus,
  clearAuthError 
} from '../../store/slices/authSlice';
import type { RootState } from '../../store';
import styled from 'styled-components';

export const AccountPage: React.FC = () => {
  const dispatch = useDispatch();
  const { user, loading, error, passwordChangeSuccess } = useSelector((state: RootState) => state.auth);
  
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Очищаем статусы при размонтировании
  useEffect(() => {
    return () => {
      dispatch(clearPasswordChangeStatus());
      dispatch(clearAuthError());
    };
  }, [dispatch]);

  //  Показываем сообщение об успехе и очищаем форму
  useEffect(() => {
    if (passwordChangeSuccess) {
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      
      // Автоматически скрываем сообщение через 3 секунды
      const timer = setTimeout(() => {
        dispatch(clearPasswordChangeStatus());
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [passwordChangeSuccess, dispatch]);

  const handleSaveChanges = () => {
    // Валидация паролей
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    
    if (passwordData.newPassword.length < 6) {
      alert('New password must be at least 6 characters long');
      return;
    }

    // ВЫЗЫВАЕМ ЛОГИКУ СМЕНЫ ПАРОЛЯ
    dispatch(changePasswordStart({
      currentPassword: passwordData.currentPassword,
      newPassword: passwordData.newPassword,
    }));
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
    dispatch(clearPasswordChangeStatus());
    dispatch(clearAuthError());
  };

  if (!user) {
    return (
      <Container>
        <BackButton />
        <PageTitle>ACCOUNT</PageTitle>
        <div>Please sign in to view your account.</div>
      </Container>
    );
  }

  return (
    <Container>
      <BackButton />
      <PageTitle>ACCOUNT</PageTitle>
      
      {/* Сообщение об успешной смене пароля */}
      {passwordChangeSuccess && (
        <SuccessMessage>
          ✅ Password changed successfully!
        </SuccessMessage>
      )}
      
      {/*  Сообщение об ошибке */}
      {error && (
        <ErrorMessage>
          {error}
        </ErrorMessage>
      )}

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
            <Label>Current Password</Label>
            <Input
              type="password"
              value={passwordData.currentPassword}
              onChange={(value) => setPasswordData(prev => ({ ...prev, currentPassword: value }))}
              placeholder="Enter current password"
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
              placeholder="Enter new password"
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
              disabled={loading}
            >
              {loading ? 'SAVING...' : 'SAVE CHANGES'}
            </Button>
            
            <Button 
              variant="secondary" 
              onClick={handleCancel}
              disabled={loading}
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


const SuccessMessage = styled.div`
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
  padding: 12px 16px;
  border-radius: 4px;
  font-weight: 500;
`;

const ErrorMessage = styled.div`
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  padding: 12px 16px;
  border-radius: 4px;
  font-weight: 500;
`;

export default AccountPage;