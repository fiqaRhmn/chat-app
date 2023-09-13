import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { ChatContextProvider } from './context/ChatContext';

createRoot(document.getElementById('root')).render(
<AuthContextProvider>
    <ChatContextProvider>
        <StrictMode>
            <App />
        </StrictMode>
    </ChatContextProvider>
</AuthContextProvider>
);