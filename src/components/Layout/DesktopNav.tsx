// components/Layout/DesktopNav.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import type { DesktopNavProps } from './types';

export const DesktopNav: React.FC<DesktopNavProps> = ({
  searchQuery,
  onSearchQueryChange,
  onSearch,
  totalCartItems,
  favoritesCount,
}) => {
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      onSearch();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <DesktopNavContainer>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Search books..."
          value={searchQuery}
          onChange={(e) => onSearchQueryChange(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <SearchIcon onClick={handleSearch}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M11.7422 10.3439C12.5329 9.2673 13 7.9382 13 6.5C13 2.91015 10.0899 0 6.5 0C2.91015 0 0 2.91015 0 6.5C0 10.0899 2.91015 13 6.5 13C7.93858 13 9.26801 12.5327 10.3448 11.7415L10.3439 11.7422C10.3734 11.7822 10.4062 11.8204 10.4424 11.8566L14.2929 15.7071C14.6834 16.0976 15.3166 16.0976 15.7071 15.7071C16.0976 15.3166 16.0976 14.6834 15.7071 14.2929L11.8566 10.4424C11.8204 10.4062 11.7822 10.3734 11.7422 10.3439ZM12 6.5C12 9.53757 9.53757 12 6.5 12C3.46243 12 1 9.53757 1 6.5C1 3.46243 3.46243 1 6.5 1C9.53757 1 12 3.46243 12 6.5Z" fill="currentColor"/>
          </svg>
        </SearchIcon>
      </SearchContainer>

      <IconsContainer>
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
      </IconsContainer>
    </DesktopNavContainer>
  );
};

// Styled components остаются без изменений
const DesktopNavContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  flex: 1;
  justify-content: space-between;

  @media (max-width: 768px) {
    display: none;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background: #fff;
  border: 1px solid #e1e5e9;
  border-radius: 4px;
  padding: 0 12px;
  flex: 1;
  max-width: 400px;
  height: 40px;
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

const IconsContainer = styled.div`
  display: flex;
  gap: 24px;
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

export default DesktopNav;