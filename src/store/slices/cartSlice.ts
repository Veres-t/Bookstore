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
    // Добавить в корзину - ИСПРАВЛЕНО
    addToCart: (state, action: PayloadAction<{ book: Book }>) => {
      const existingItem = state.items.find(item => item.isbn13 === action.payload.book.isbn13);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload.book, quantity: 1 });
      }
      
      // Сохраняем в localStorage
      localStorage.setItem('bookstore-cart', JSON.stringify(state.items));
    },

    // Удалить из корзины - ИСПРАВЛЕНО
    removeFromCart: (state, action: PayloadAction<{ isbn13: string }>) => {
      state.items = state.items.filter(item => item.isbn13 !== action.payload.isbn13);
      localStorage.setItem('bookstore-cart', JSON.stringify(state.items));
    },

    // Изменить количество - ИСПРАВЛЕНО
    updateQuantity: (state, action: PayloadAction<{ isbn13: string; quantity: number }>) => {
      const item = state.items.find(item => item.isbn13 === action.payload.isbn13);
      if (item && action.payload.quantity > 0) {
        item.quantity = action.payload.quantity;
        localStorage.setItem('bookstore-cart', JSON.stringify(state.items));
      }
    },

    // Увеличить количество - ИСПРАВЛЕНО
    increaseQuantity: (state, action: PayloadAction<{ isbn13: string }>) => {
      const item = state.items.find(item => item.isbn13 === action.payload.isbn13);
      if (item) {
        item.quantity += 1;
        localStorage.setItem('bookstore-cart', JSON.stringify(state.items));
      }
    },

    // Уменьшить количество - ИСПРАВЛЕНО
    decreaseQuantity: (state, action: PayloadAction<{ isbn13: string }>) => {
      const item = state.items.find(item => item.isbn13 === action.payload.isbn13);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items = state.items.filter(cartItem => cartItem.isbn13 !== action.payload.isbn13);
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