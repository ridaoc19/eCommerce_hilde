import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './redux/store';
import App from './App';

import './index.scss';

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(
  <StrictMode>
    <ReduxProvider store={store}>
      <BrowserRouter basename='/hilde'>
        <App />
      </BrowserRouter>
    </ReduxProvider>
  </StrictMode>
);
