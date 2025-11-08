// router/AppRouter.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout, ProtectedRoute } from '../components';
import { 
  HomePage, 
  SignInPage, 
  SignUpPage, 
  SearchPage, 
  BookDetailsPage, 
  FavoritesPage, 
  CartPage, 
  ResetPasswordPage,
  AccountPage
} from '../pages';

export const AppRouter: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Публичные маршруты */}
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/books/:isbn13" element={<BookDetailsPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          
          {/* Защищенные маршруты */}
          <Route 
            path="/favorites" 
            element={
              <ProtectedRoute>
                <FavoritesPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/cart" 
            element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/account" 
            element={
              <ProtectedRoute>
                <AccountPage />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Layout>
    </Router>
  );
};