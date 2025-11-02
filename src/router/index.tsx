import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/HomePage/HomePage';
import BookPage from '../pages/BookPage/BookPage';
import SearchPage from '../pages/SearchPage/SearchPage';


export const router = createBrowserRouter([
{ path: '/', element: <HomePage /> },
{ path: '/book/:id', element: <BookPage /> },
{ path: '/search', element: <SearchPage /> },
]);