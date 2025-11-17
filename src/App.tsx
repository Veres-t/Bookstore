// App.tsx
import React, { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { store } from './store';
import { AppRouter } from './router';
import { loadUserFromStorage } from './store/slices/authSlice';
import './App.css';

// Компонент для инициализации
const AppInitializer: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Загружаем пользователя из localStorage при старте приложения
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  return <AppRouter />;
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <AppInitializer />
      </div>
    </Provider>
  );
};

export default App;