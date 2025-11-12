// components/Layout/MobileNav.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import type { MobileNavProps } from './types';

export const MobileNav: React.FC<MobileNavProps> = ({
  totalCartItems,
  isMenuOpen,
  onToggleMenu
}) => {
  return (
    <MobileNavContainer>
      <MobileCart>
        <ActionLink to="/cart">
          <IconWrapper>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M1 1H3.5L4.5 4M4.5 4L6.5 10M4.5 4H17.5M17.5 4L15.5 10M6.5 10L5.5 13.5M6.5 10H15.5M15.5 10L14.5 13.5M5.5 13.5H16.5M5.5 13.5L4 17.5M14.5 13.5H16.5M14.5 13.5L16 17.5M7 16.5C7 17.3284 6.32843 18 5.5 18C4.67157 18 4 17.3284 4 16.5C4 15.6716 4.67157 15 5.5 15C6.32843 15 7 15.6716 7 16.5ZM16 16.5C16 17.3284 15.3284 18 14.5 18C13.6716 18 13 17.3284 13 16.5C13 15.6716 13.6716 15 14.5 15C15.3284 15 16 15.6716 16 16.5Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            </svg>
            {totalCartItems > 0 && <Count>{totalCartItems}</Count>}
          </IconWrapper>
        </ActionLink>
      </MobileCart>

      <BurgerButton onClick={onToggleMenu} $isOpen={isMenuOpen}>
        {isMenuOpen ? (
          <CloseIcon viewBox="0 0 24 24">
            <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </CloseIcon>
        ) : (
          <BurgerIcon>
            <BurgerLine />
            <BurgerLine />
            <BurgerLine />
          </BurgerIcon>
        )}
      </BurgerButton>
    </MobileNavContainer>
  );
};

// Styled components
const MobileNavContainer = styled.div`
  display: none;
  align-items: center;
  gap: 16px;
  
  @media (max-width: 768px) {
    display: flex;
  }
`;

const MobileCart = styled.div`
  display: flex;
`;

const ActionLink = styled(Link)`
  color: #333;
  text-decoration: none;
  padding: 8px;
  border-radius: 4px;
  position: relative;
  
  &:hover {
    background-color: #f8f9fa;
  }
`;

const IconWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
`;

const Count = styled.span`
  position: absolute;
  top: -6px;
  right: -6px;
  background-color: #000000;
  color: white;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
`;

const BurgerButton = styled.button<{ $isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1001;
  position: relative;
`;

const BurgerIcon = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 20px;
  height: 16px;
  position: relative;
`;

const BurgerLine = styled.span`
  width: 100%;
  height: 2px;
  background-color: #333;
  border-radius: 1px;
  transition: all 0.3s ease;
  transform-origin: center;
  display: block;

  &:nth-child(1) {
    transform: translateY(0) rotate(0);
  }

  &:nth-child(2) {
    opacity: 1;
  }

  &:nth-child(3) {
    transform: translateY(0) rotate(0);
  }
`;

const CloseIcon = styled.svg`
  width: 20px;
  height: 20px;
  color: #333;
`;

export default MobileNav;