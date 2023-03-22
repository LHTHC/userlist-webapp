import { FC } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import Main from './Pages/Main';
import './App.css';

const queryClient = new QueryClient();

const App: FC = () => {
  return (
    <div className="App">
      <Main />
    </div>
  );
};

const WrappedApp: FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default WrappedApp;
