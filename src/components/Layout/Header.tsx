// components/Layout/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { DesktopNav } from './DesktopNav';
import { MobileNav } from './MobileNav';
import type { HeaderProps } from './types';

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchQueryChange,
  onSearch,
  onKeyPress,
  totalCartItems,
  favoritesCount,
  isAuthenticated,
  isMenuOpen,
  onToggleMenu,
  onCloseMenu
}) => {
  return (
    <HeaderContainer>
      <Nav>
        <Logo to="/" onClick={onCloseMenu}>BOOKSTORE</Logo>
        
        <DesktopNav
          searchQuery={searchQuery}
          onSearchQueryChange={onSearchQueryChange}
          onSearch={onSearch}
          onKeyPress={onKeyPress}
          totalCartItems={totalCartItems}
          favoritesCount={favoritesCount}
          isAuthenticated={isAuthenticated}
        />
        
        <MobileNav
          totalCartItems={totalCartItems}
          isMenuOpen={isMenuOpen}
          onToggleMenu={onToggleMenu}
        />
      </Nav>
    </HeaderContainer>
  );
};


const HeaderContainer = styled.header`
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

export default Header;