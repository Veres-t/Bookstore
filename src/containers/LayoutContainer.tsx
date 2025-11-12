// containers/LayoutContainer.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Layout } from '../components/Layout';
import { signOut } from '../store/slices/authSlice';
import { useAppSelector, useAuth } from '../store/hooks'; // Добавляем useAuth
import { getTotalItems, getFavoritesCount } from '../store/selectors';

export const LayoutContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const totalCartItems = useAppSelector(getTotalItems);
  const favoritesCount = useAppSelector(getFavoritesCount);
  const { isAuthenticated } = useAuth(); // Используем типизированный хук

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsMenuOpen(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSignOut = () => {
    dispatch(signOut());
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <Layout
      searchQuery={searchQuery}
      onSearchQueryChange={setSearchQuery}
      onSearch={handleSearch}
      onKeyPress={handleKeyPress}
      totalCartItems={totalCartItems}
      favoritesCount={favoritesCount}
      isAuthenticated={isAuthenticated}
      isMenuOpen={isMenuOpen}
      onToggleMenu={toggleMenu}
      onCloseMenu={closeMenu}
      onSignOut={handleSignOut}
    >
      {children}
    </Layout>
  );
};