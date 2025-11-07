// store/selectors/favoritesSelectors.ts
import type { RootState } from '../index';
import type { Book } from '../../types';

export const getFavoritesItems = (state: RootState): Book[] => state.favorites.items;

export const isInFavorites = (state: RootState, isbn13: string): boolean => {
  return state.favorites.items.some(item => item.isbn13 === isbn13);
};

export const getFavoritesCount = (state: RootState): number => {
  return state.favorites.items.length;
};