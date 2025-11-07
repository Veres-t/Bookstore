// store/slices/cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Book } from '../../types';

export interface CartItem extends Book {
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

// Загрузка из localStorage
const loadCartFromStorage = (): CartItem[] => {
  try {
    const cart = localStorage.getItem('bookstore-cart');
    return cart ? JSON.parse(cart) : [];
  } catch {
    return [];
  }
};

const initialState: CartState = {
  items: loadCartFromStorage(),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Добавить в корзину
    addToCart: (state, action: PayloadAction<Book>) => {
      const existingItem = state.items.find(item => item.isbn13 === action.payload.isbn13);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      
      // Сохраняем в localStorage
      localStorage.setItem('bookstore-cart', JSON.stringify(state.items));
    },

    // Удалить из корзины
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.isbn13 !== action.payload);
      localStorage.setItem('bookstore-cart', JSON.stringify(state.items));
    },

    // Изменить количество
    updateQuantity: (state, action: PayloadAction<{ isbn13: string; quantity: number }>) => {
      const item = state.items.find(item => item.isbn13 === action.payload.isbn13);
      if (item && action.payload.quantity > 0) {
        item.quantity = action.payload.quantity;
        localStorage.setItem('bookstore-cart', JSON.stringify(state.items));
      }
    },

    // Увеличить количество
    increaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find(item => item.isbn13 === action.payload);
      if (item) {
        item.quantity += 1;
        localStorage.setItem('bookstore-cart', JSON.stringify(state.items));
      }
    },

    // Уменьшить количество
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find(item => item.isbn13 === action.payload);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items = state.items.filter(cartItem => cartItem.isbn13 !== action.payload);
        }
        localStorage.setItem('bookstore-cart', JSON.stringify(state.items));
      }
    },

    // Очистить корзину
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem('bookstore-cart');
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;