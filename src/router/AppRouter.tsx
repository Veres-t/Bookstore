// router/AppRouter.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from '../components';
import { LayoutContainer } from '../containers'; 
import { NewPasswordPage } from '../pages';
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
      <LayoutContainer> {/* Используем LayoutContainer вместо Layout */}
        <Routes>
          {/* Публичные маршруты */}
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/books/:isbn13" element={<BookDetailsPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
      
<Route path="/reset-password" element={<ResetPasswordPage />} />
<Route path="/new-password" element={<NewPasswordPage />} />

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
      </LayoutContainer>
    </Router>
  );
};