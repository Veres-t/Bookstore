// components/Layout/Layout.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Footer } from '../Footer';

export interface LayoutProps {
  children: React.ReactNode;
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  onSearch: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  totalCartItems: number;
  favoritesCount: number;
  isAuthenticated: boolean;
  isMenuOpen: boolean;
  onToggleMenu: () => void;
  onCloseMenu: () => void;
  onSignOut: () => void;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  searchQuery,
  onSearchQueryChange,
  onSearch,
  onKeyPress,
  totalCartItems,
  favoritesCount,
  isAuthenticated,
  isMenuOpen,
  onToggleMenu,
  onCloseMenu,
  onSignOut
}) => {
  return (
    <Container>
      <Header>
        <Nav>
          <Logo to="/" onClick={onCloseMenu}>BOOKSTORE</Logo>
          
          {/* Поиск - видимый только на десктопе */}
          <SearchContainer $isDesktopOnly={true}>
            <SearchInput
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => onSearchQueryChange(e.target.value)}
              onKeyPress={onKeyPress}
            />
            <SearchIcon onClick={onSearch}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M11.7422 10.3439C12.5329 9.2673 13 7.9382 13 6.5C13 2.91015 10.0899 0 6.5 0C2.91015 0 0 2.91015 0 6.5C0 10.0899 2.91015 13 6.5 13C7.93858 13 9.26801 12.5327 10.3448 11.7415L10.3439 11.7422C10.3734 11.7822 10.4062 11.8204 10.4424 11.8566L14.2929 15.7071C14.6834 16.0976 15.3166 16.0976 15.7071 15.7071C16.0976 15.3166 16.0976 14.6834 15.7071 14.2929L11.8566 10.4424C11.8204 10.4062 11.7822 10.3734 11.7422 10.3439ZM12 6.5C12 9.53757 9.53757 12 6.5 12C3.46243 12 1 9.53757 1 6.5C1 3.46243 3.46243 1 6.5 1C9.53757 1 12 3.46243 12 6.5Z" fill="currentColor"/>
              </svg>
            </SearchIcon>
          </SearchContainer>

          {/* Десктопные иконки - скрываются на мобильных */}
          <DesktopActions $isDesktopOnly={true}>
            <ActionLink to="/favorites">
              <IconWrapper>
                <svg width="20" height="18" viewBox="0 0 20 18" fill="none">
                  <path d="M17.5 2.5C15.5 0.5 12.5 0.5 10.5 2.5L10 3L9.5 2.5C7.5 0.5 4.5 0.5 2.5 2.5C0.5 4.5 0.5 7.5 2.5 9.5L9.5 16.5L10 17L10.5 16.5L17.5 9.5C19.5 7.5 19.5 4.5 17.5 2.5Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                </svg>
                {favoritesCount > 0 && <Count>{favoritesCount}</Count>}
              </IconWrapper>
            </ActionLink>
            <ActionLink to="/cart">
              <IconWrapper>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M1 1H3.5L4.5 4M4.5 4L6.5 10M4.5 4H17.5M17.5 4L15.5 10M6.5 10L5.5 13.5M6.5 10H15.5M15.5 10L14.5 13.5M5.5 13.5H16.5M5.5 13.5L4 17.5M14.5 13.5H16.5M14.5 13.5L16 17.5M7 16.5C7 17.3284 6.32843 18 5.5 18C4.67157 18 4 17.3284 4 16.5C4 15.6716 4.67157 15 5.5 15C6.32843 15 7 15.6716 7 16.5ZM16 16.5C16 17.3284 15.3284 18 14.5 18C13.6716 18 13 17.3284 13 16.5C13 15.6716 13.6716 15 14.5 15C15.3284 15 16 15.6716 16 16.5Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                </svg>
                {totalCartItems > 0 && <Count>{totalCartItems}</Count>}
              </IconWrapper>
            </ActionLink>
            <ActionLink to="/account">
              <IconWrapper>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 8C9.65685 8 11 6.65685 11 5C11 3.34315 9.65685 2 8 2C6.34315 2 5 3.34315 5 5C5 6.65685 6.34315 8 8 8Z" fill="currentColor"/>
                  <path d="M8 9C5.23858 9 3 11.2386 3 14H13C13 11.2386 10.7614 9 8 9Z" fill="currentColor"/>
                </svg>
              </IconWrapper>
            </ActionLink>
          </DesktopActions>

          {/* Мобильные элементы - корзина и бургер рядом */}
          <MobileActions $isMobileOnly={true}>
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

            {/* Исправленный бургер-меню */}
            <BurgerButton onClick={onToggleMenu} $isOpen={isMenuOpen}>
              {isMenuOpen ? (
                // Крестик когда меню открыто
                <CloseIcon viewBox="0 0 24 24">
                  <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </CloseIcon>
              ) : (
                // Бургер когда меню закрыто - исправленные стили
                <BurgerIcon>
                  <BurgerLine />
                  <BurgerLine />
                  <BurgerLine />
                </BurgerIcon>
              )}
            </BurgerButton>
          </MobileActions>
        </Nav>
      </Header>

      {/* Мобильное меню */}
      <MobileMenu $isOpen={isMenuOpen}>
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
          {/* Поиск в мобильном меню - всегда активен */}
          <MobileSearchContainer>
            <MobileSearchInput
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSearchQueryChange(e.target.value)}
              onKeyPress={onKeyPress}
            />
            <MobileSearchIcon onClick={onSearch}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M11.7422 10.3439C12.5329 9.2673 13 7.9382 13 6.5C13 2.91015 10.0899 0 6.5 0C2.91015 0 0 2.91015 0 6.5C0 10.0899 2.91015 13 6.5 13C7.93858 13 9.26801 12.5327 10.3448 11.7415L10.3439 11.7422C10.3734 11.7822 10.4062 11.8204 10.4424 11.8566L14.2929 15.7071C14.6834 16.0976 15.3166 16.0976 15.7071 15.7071C16.0976 15.3166 16.0976 14.6834 15.7071 14.2929L11.8566 10.4424C11.8204 10.4062 11.7822 10.3734 11.7422 10.3439ZM12 6.5C12 9.53757 9.53757 12 6.5 12C3.46243 12 1 9.53757 1 6.5C1 3.46243 3.46243 1 6.5 1C9.53757 1 12 3.46243 12 6.5Z" fill="currentColor"/>
              </svg>
            </MobileSearchIcon>
          </MobileSearchContainer>

          {/* Навигация для авторизованных пользователей */}
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
            /* Навигация для неавторизованных пользователей */
            <MobileNavBottom>
              <MobileNavLink to="/signin" onClick={onCloseMenu}>
                SIGN IN
              </MobileNavLink>
            </MobileNavBottom>
          )}
        </MobileMenuContent>
        
        {/* Overlay для закрытия меню */}
        <MobileMenuOverlay $isOpen={isMenuOpen} onClick={onCloseMenu} />
      </MobileMenu>

      <Main>{children}</Main>
      <Footer />
    </Container>
  );
};

// Styled components
const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Header = styled.header`
  background-color: #fff;
  border-bottom: 1px solid #e1e5e9;
  padding: 0 20px;
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  max-width: 1200px;
  margin: 0 auto;
  gap: 30px;
  position: relative;

  @media (max-width: 768px) {
    height: 60px;
    gap: 16px;
    justify-content: space-between;
  }
`;

const Logo = styled(Link)`
  font-size: 18px;
  font-weight: 700;
  color: #000000;
  text-decoration: none;
  white-space: nowrap;
  letter-spacing: 0.5px;
  z-index: 1001;
  
  &:hover {
    color: #000000;
  }

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

// Десктопные стили
const SearchContainer = styled.div<{ $isDesktopOnly?: boolean }>`
  display: flex;
  align-items: center;
  background: #fff;
  border: 1px solid #e1e5e9;
  border-radius: 4px;
  padding: 0 12px;
  flex: 1;
  max-width: 400px;
  height: 40px;

  @media (max-width: 768px) {
    ${props => props.$isDesktopOnly && `
      display: none;
    `}
  }
`;

const SearchInput = styled.input`
  border: none;
  background: transparent;
  padding: 0 8px 0 0;
  flex: 1;
  outline: none;
  font-size: 14px;
  color: #333;

  &::placeholder {
    color: #6c757d;
  }
`;

const SearchIcon = styled.button`
  border: none;
  background: transparent;
  color: #6c757d;
  padding: 0;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  &:hover {
    color: #333;
  }
`;

const DesktopActions = styled.div<{ $isDesktopOnly?: boolean }>`
  display: flex;
  gap: 24px;
  align-items: center;

  @media (max-width: 768px) {
    ${props => props.$isDesktopOnly && `
      display: none;
    `}
  }
`;

// Мобильные элементы - корзина и бургер рядом
const MobileActions = styled.div<{ $isMobileOnly?: boolean }>`
  display: none;
  align-items: center;
  gap: 16px;
  
  @media (max-width: 768px) {
    ${props => props.$isMobileOnly && `
      display: flex;
    `}
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

// Исправленные стили бургер-меню
const BurgerButton = styled.button<{ $isOpen: boolean }>`
  display: none;
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

  @media (max-width: 768px) {
    display: flex;
  }
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

const MobileMenu = styled.div<{ $isOpen: boolean }>`
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

const Main = styled.main`
  flex: 1;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  
  @media (max-width: 768px) {
    padding: 16px;
  }
  
  @media (max-width: 320px) {
    padding: 12px;
  }
`;

export default Layout;