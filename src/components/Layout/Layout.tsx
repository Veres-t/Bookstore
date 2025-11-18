// components/Layout/Layout.tsx
import React from 'react';
import styled from 'styled-components';
import { Footer } from '../Footer';
import { Header } from './Header';
import { MobileMenu } from './MobileMenu';
import type { LayoutProps } from './types';

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
      <Header
        searchQuery={searchQuery}
        onSearchQueryChange={onSearchQueryChange}
        onSearch={onSearch}
        onKeyPress={onKeyPress}
        totalCartItems={totalCartItems}
        favoritesCount={favoritesCount}
        isAuthenticated={isAuthenticated}
        isMenuOpen={isMenuOpen}
        onToggleMenu={onToggleMenu}
        onCloseMenu={onCloseMenu}
      />

      <MobileMenu
        isOpen={isMenuOpen}
        onCloseMenu={onCloseMenu}
        searchQuery={searchQuery}
        onSearchQueryChange={onSearchQueryChange}
        onSearch={onSearch}
        onKeyPress={onKeyPress}
        totalCartItems={totalCartItems}
        favoritesCount={favoritesCount}
        isAuthenticated={isAuthenticated}
        onSignOut={onSignOut}
      />

      <Main>{children}</Main>
      <Footer />
    </Container>
  );
};


const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
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