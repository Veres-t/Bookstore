// store/hooks.ts
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './index';

// Типизированные версии useDispatch и useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Типизированные хуки для конкретных слайсов
export const useAuth = () => useAppSelector((state) => state.auth);
export const useBooks = () => useAppSelector((state) => state.books);
export const useCart = () => useAppSelector((state) => state.cart);
export const useFavorites = () => useAppSelector((state) => state.favorites);