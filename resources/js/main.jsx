// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';

ReactDOM.createRoot(document.getElementById('app')).render(
    <React.StrictMode>
        <AuthProvider>
            <CartProvider>
                <App />
            </CartProvider>
        </AuthProvider>
    </React.StrictMode>
);
