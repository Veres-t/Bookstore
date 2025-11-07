// components/Layout/Layout.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { getTotalItems, getFavoritesCount } from '../../store/selectors';
import type { RootState } from '../../store';

export interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const totalCartItems = useSelector((state: RootState) => getTotalItems(state));
  const favoritesCount = useSelector((state: RootState) => getFavoritesCount(state));
  const location = useLocation();

  return (
    <Container>
      <Header>
        <Nav>
          <Logo to="/">BOOKSTORE</Logo>
          <NavLinks>
            <NavLink to="/" $isActive={location.pathname === '/'}>
              Home
            </NavLink>
            <NavLink to="/search" $isActive={location.pathname === '/search'}>
              Search
            </NavLink>
          </NavLinks>
          <UserActions>
            <ActionLink to="/favorites">
              ❤️ {favoritesCount > 0 && <Count>{favoritesCount}</Count>}
            </ActionLink>
            <ActionLink to="/cart">
              🛒 {totalCartItems > 0 && <Count>{totalCartItems}</Count>}
            </ActionLink>
            <ActionLink to="/signin">👤</ActionLink>
          </UserActions>
        </Nav>
      </Header>
      <Main>{children}</Main>
    </Container>
  );
};

// Styled components
const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 0 20px;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Logo = styled(Link)`
  font-size: 24px;
  font-weight: bold;
  color: #007bff;
  text-decoration: none;
  
  &:hover {
    color: #0056b3;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 32px;
  
  @media (max-width: 768px) {
    gap: 16px;
  }
`;

const NavLink = styled(Link)<{ $isActive: boolean }>`
  color: ${props => props.$isActive ? '#007bff' : '#333'};
  text-decoration: none;
  font-weight: ${props => props.$isActive ? '600' : '400'};
  padding: 8px 16px;
  border-radius: 4px;
  
  &:hover {
    background-color: #f8f9fa;
  }
`;

const UserActions = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
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

const Count = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: #007bff;
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
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