// App.tsx
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { AppRouter } from './router';
import './App.css';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <AppRouter />
      </div>
    </Provider>
  );
};

export default App;