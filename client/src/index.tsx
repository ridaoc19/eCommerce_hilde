import React from 'react';
import ReactDOM from 'react-dom/client';
// import { ReactQueryDevtools } from 'react-query/devtools';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './redux/store';
// import { QueryClient, QueryClientProvider } from 'react-query';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';



import App from './App';
import './styles/index/index.scss';

const queryClient = new QueryClient()


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReduxProvider store={store}>
        <BrowserRouter basename='/hilde'>
          <App />
          <ReactQueryDevtools initialIsOpen={false} />
          {/* <ReactQueryDevtools initialIsOpen /> */}
        </BrowserRouter>
      </ReduxProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
