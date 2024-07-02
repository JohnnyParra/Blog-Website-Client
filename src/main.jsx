// Libraries && Context
import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClientProvider, QueryClient } from 'react-query';
import { UserProvider } from './Context/UserContext';

// App component
import App from './App';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

// Styling
import './index.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <UserProvider>
      <App />
    </UserProvider>
  </QueryClientProvider>
);
