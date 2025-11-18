// src/__tests__/slices/authSlice.test.ts
import authReducer, { signInSuccess, signUpSuccess, signOut } from '../../store/slices/authSlice';
import type { User } from '../../types';

const mockUser: User = {
  id: '1',
  name: 'Test User',
  email: 'test@example.com'
};


const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  mode: 'signin' as const,
  passwordChangeSuccess: false
};

describe('authSlice reducers', () => {
  it('should handle signInSuccess - user should be authenticated', () => {
    const action = signInSuccess(mockUser);
    const state = authReducer(initialState, action);
    
    expect(state.user).toEqual(mockUser);
    expect(state.isAuthenticated).toBe(true);
    expect(state.loading).toBe(false);
  });

  it('should handle signUpSuccess - user should NOT be authenticated', () => {
    const loadingState = { 
      ...initialState, 
      loading: true 
    };
    const action = signUpSuccess(mockUser);
    const state = authReducer(loadingState, action);
    
    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
    expect(state.loading).toBe(false);
  });

  it('should handle signOut - should clear user data', () => {
    const loggedInState = {
      ...initialState,
      user: mockUser,
      isAuthenticated: true
    };
    
    const action = signOut();
    const state = authReducer(loggedInState, action);
    
    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });
});