import { FC } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import Main from './Pages/Main';

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
    </QueryClientProvider>
  );
};

export default WrappedApp;
