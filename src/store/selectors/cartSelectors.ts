// store/selectors/cartSelectors.ts
import type { RootState } from '../index';
import type { CartItem } from '../slices/cartSlice';

export const getCartItems = (state: RootState): CartItem[] => state.cart.items;

export const getTotalPrice = (state: RootState): number => {
  return state.cart.items.reduce((total, item) => {
    const price = parseFloat(item.price?.replace('$', '') || '0');
    return total + (price * item.quantity);
  }, 0);
};

export const getTotalItems = (state: RootState): number => {
  return state.cart.items.reduce((total, item) => total + item.quantity, 0);
};

export const getItemQuantity = (state: RootState, isbn13: string): number => {
  const item = state.cart.items.find(item => item.isbn13 === isbn13);
  return item ? item.quantity : 0;
};