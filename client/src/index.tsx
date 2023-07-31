import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './redux/store';

import App from './App';
import './styles/index/index.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <BrowserRouter basename='/hilde'>
        <App />
      </BrowserRouter>
    </ReduxProvider>
  </React.StrictMode>
);
