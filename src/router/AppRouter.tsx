// router/AppRouter.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from '../components';
import { 
  HomePage, 
  SignInPage, 
  SignUpPage, 
  SearchPage, 
  BookDetailsPage, 
  FavoritesPage, 
  CartPage, 
  ResetPasswordPage,
  AccountPage // Добавляем импорт
} from '../pages';

export const AppRouter: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/books/:isbn13" element={<BookDetailsPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/account" element={<AccountPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};