// components/Layout/MobileMenu.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import type { MobileMenuProps } from './types';

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onCloseMenu,
  searchQuery,
  onSearchQueryChange,
  onSearch,
  totalCartItems,
  favoritesCount,
  isAuthenticated,
  onSignOut
}) => {
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      onSearch();
      onCloseMenu();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <>
      <MobileMenuContainer $isOpen={isOpen}>
        <MobileMenuHeader>
          <MenuTitle>Menu</MenuTitle>
          <CloseButton onClick={onCloseMenu}>
            <CloseIcon viewBox="0 0 24 24">
              <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </CloseIcon>
          </CloseButton>
        </MobileMenuHeader>

        <MobileMenuContent>
          <MobileSearchContainer>
            <MobileSearchInput
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSearchQueryChange(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <MobileSearchIcon onClick={handleSearch}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M11.7422 10.3439C12.5329 9.2673 13 7.9382 13 6.5C13 2.91015 10.0899 0 6.5 0C2.91015 0 0 2.91015 0 6.5C0 10.0899 2.91015 13 6.5 13C7.93858 13 9.26801 12.5327 10.3448 11.7415L10.3439 11.7422C10.3734 11.7822 10.4062 11.8204 10.4424 11.8566L14.2929 15.7071C14.6834 16.0976 15.3166 16.0976 15.7071 15.7071C16.0976 15.3166 16.0976 14.6834 15.7071 14.2929L11.8566 10.4424C11.8204 10.4062 11.7822 10.3734 11.7422 10.3439ZM12 6.5C12 9.53757 9.53757 12 6.5 12C3.46243 12 1 9.53757 1 6.5C1 3.46243 3.46243 1 6.5 1C9.53757 1 12 3.46243 12 6.5Z" fill="currentColor"/>
              </svg>
            </MobileSearchIcon>
          </MobileSearchContainer>

          {isAuthenticated ? (
            <>
              <MobileNavItem>
                <MobileNavLink to="/favorites" onClick={onCloseMenu}>
                  <MobileNavIcon>
                    <svg width="20" height="18" viewBox="0 0 20 18" fill="none">
                      <path d="M17.5 2.5C15.5 0.5 12.5 0.5 10.5 2.5L10 3L9.5 2.5C7.5 0.5 4.5 0.5 2.5 2.5C0.5 4.5 0.5 7.5 2.5 9.5L9.5 16.5L10 17L10.5 16.5L17.5 9.5C19.5 7.5 19.5 4.5 17.5 2.5Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                    </svg>
                  </MobileNavIcon>
                  FAVORITES
                  {favoritesCount > 0 && <MobileCount>{favoritesCount}</MobileCount>}
                </MobileNavLink>
              </MobileNavItem>
              
              <MobileNavItem>
                <MobileNavLink to="/cart" onClick={onCloseMenu}>
                  <MobileNavIcon>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M1 1H3.5L4.5 4M4.5 4L6.5 10M4.5 4H17.5M17.5 4L15.5 10M6.5 10L5.5 13.5M6.5 10H15.5M15.5 10L14.5 13.5M5.5 13.5H16.5M5.5 13.5L4 17.5M14.5 13.5H16.5M14.5 13.5L16 17.5M7 16.5C7 17.3284 6.32843 18 5.5 18C4.67157 18 4 17.3284 4 16.5C4 15.6716 4.67157 15 5.5 15C6.32843 15 7 15.6716 7 16.5ZM16 16.5C16 17.3284 15.3284 18 14.5 18C13.6716 18 13 17.3284 13 16.5C13 15.6716 13.6716 15 14.5 15C15.3284 15 16 15.6716 16 16.5Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                    </svg>
                  </MobileNavIcon>
                  CART
                  {totalCartItems > 0 && <MobileCount>{totalCartItems}</MobileCount>}
                </MobileNavLink>
              </MobileNavItem>

              <MobileNavBottom>
                <MobileNavButton onClick={onSignOut}>
                  LOG OUT
                </MobileNavButton>
              </MobileNavBottom>
            </>
          ) : (
            <MobileNavBottom>
              <MobileNavLink to="/signin" onClick={onCloseMenu}>
                SIGN IN
              </MobileNavLink>
            </MobileNavBottom>
          )}
        </MobileMenuContent>
      </MobileMenuContainer>

      <MobileMenuOverlay $isOpen={isOpen} onClick={onCloseMenu} />
    </>
  );
};


const MobileMenuContainer = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  width: 368px;
  height: 100vh;
  background: white;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  transform: ${props => props.$isOpen ? 'translateX(0)' : 'translateX(100%)'};
  transition: transform 0.3s ease;
  z-index: 1000;
  display: flex;
  flex-direction: column;

  @media (max-width: 320px) {
    width: 100%;
  }

  @media (min-width: 769px) {
    display: none;
  }
`;

const MobileMenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #e1e5e9;
`;

const MenuTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CloseIcon = styled.svg`
  width: 20px;
  height: 20px;
  color: #333;
`;

const MobileMenuOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  opacity: ${props => props.$isOpen ? '1' : '0'};
  visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
  transition: all 0.3s ease;
  z-index: 999;

  @media (min-width: 769px) {
    display: none;
  }
`;

const MobileMenuContent = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: 1;
`;

const MobileSearchContainer = styled.div`
  display: flex;
  align-items: center;
  background: #fff;
  border: 1px solid #e1e5e9;
  border-radius: 4px;
  padding: 0 12px;
  height: 44px;
  margin-bottom: 24px;
  width: 100%;
`;

const MobileSearchInput = styled.input`
  border: none;
  background: transparent;
  padding: 0 8px 0 0;
  flex: 1;
  outline: none;
  font-size: 16px;
  color: #333;
  width: 100%;

  &::placeholder {
    color: #6c757d;
  }
`;

const MobileSearchIcon = styled.button`
  border: none;
  background: transparent;
  color: #6c757d;
  padding: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const MobileNavItem = styled.div`
  margin-bottom: 16px;
`;

const MobileNavLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 12px 0;
  color: #333;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  position: relative;
  border-bottom: 1px solid #f0f0f0;
`;

const MobileNavIcon = styled.div`
  width: 24px;
  height: 24px;
  margin-right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MobileCount = styled.span`
  position: absolute;
  right: 0;
  background-color: #000000;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
`;

const MobileNavBottom = styled.div`
  margin-top: auto;
  padding-top: 24px;
  border-top: 1px solid #e1e5e9;
`;

const MobileNavButton = styled.button`
  width: 100%;
  padding: 12px;
  background: none;
  border: 1px solid #333;
  color: #333;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  border-radius: 4px;
  
  &:hover {
    background-color: #f8f9fa;
  }
`;

export default MobileMenu;