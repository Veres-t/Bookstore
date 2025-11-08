// components/Layout/Layout.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { getTotalItems, getFavoritesCount } from '../../store/selectors';
import type { RootState } from '../../store';

export interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const totalCartItems = useSelector((state: RootState) => getTotalItems(state));
  const favoritesCount = useSelector((state: RootState) => getFavoritesCount(state));

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Container>
      <Header>
        <Nav>
          <Logo to="/">BOOKSTORE</Logo>
          <SearchContainer>
            <SearchInput
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <SearchButton onClick={handleSearch}>
              🔍
            </SearchButton>
          </SearchContainer>
          <UserActions>
            <ActionLink to="/favorites">
              ❤️ {favoritesCount > 0 && <Count>{favoritesCount}</Count>}
            </ActionLink>
            <ActionLink to="/cart">
              🛒 {totalCartItems > 0 && <Count>{totalCartItems}</Count>}
            </ActionLink>
            <ActionLink to="/account">👤</ActionLink>
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
  gap: 20px;

  @media (max-width: 768px) {
    gap: 12px;
    height: 50px;
  }
`;

const Logo = styled(Link)`
  font-size: 24px;
  font-weight: bold;
  color: #000000; /* Черный цвет для BOOKSTORE */
  text-decoration: none;
  white-space: nowrap;
  
  &:hover {
    color: #333333;
  }

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background: #f8f9fa;
  border-radius: 20px;
  padding: 4px;
  flex: 1;
  max-width: 400px;
  margin: 0 20px;

  @media (max-width: 768px) {
    max-width: 200px;
    margin: 0 10px;
  }

  @media (max-width: 480px) {
    max-width: 150px;
  }
`;

const SearchInput = styled.input`
  border: none;
  background: transparent;
  padding: 8px 12px;
  flex: 1;
  outline: none;
  font-size: 14px;

  &::placeholder {
    color: #6c757d;
  }
`;

const SearchButton = styled.button`
  border: none;
  background: #007bff; /* Синий цвет для лупы */
  color: white;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  &:hover {
    background: #0056b3;
  }
`;

const UserActions = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  white-space: nowrap;

  @media (max-width: 480px) {
    gap: 8px;
  }
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
  background-color: #000000; /* Черный цвет для счетчиков */
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