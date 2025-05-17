import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import LoginPage from './pages/LoginPage';
import ProductOrderPage from './pages/ProductOrderPage';
import Navbar from './components/Navbar';
import CartPage from "./pages/CartPage.jsx";

export default function App() {
    const { token } = useAuth();

    return (
        <BrowserRouter>
            {<Navbar />}
            <Routes>
                <Route path="/" element={<ProductOrderPage />} />
                <Route path="/login" element={token ? <Navigate to="/" /> : <LoginPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    );
}
