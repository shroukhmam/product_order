import React from 'react';
import axios from '../services/axios';
import { useCart } from '../contexts/CartContext';
import CartItem from '../components/CartItem';
import OrderSummary from '../components/OrderSummary';
import { useNavigate } from 'react-router-dom';
import {Box, Typography, Grid, useTheme, useMediaQuery, Link} from '@mui/material';
import {Link as RouterLink} from "react-router";

export default function CartPage() {
    const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
    const navigate = useNavigate();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); // نقطة توقف صغيرة

    const handleSubmitOrder = async () => {
        const token = localStorage.getItem('token');

        if (!token) {
            alert('⚠️ Please login first.');
            navigate('/login');
            return;
        }
        try {
            const payload = cart.map(item => ({
                product_id: item.id,
                quantity: item.quantity
            }));

            await axios.post('/orders', { items: payload });

            alert('✅ Order submitted successfully!');
            clearCart();
        } catch (err) {
            if (err.response && err.response.status === 422) {
                const errors = err.response.data.errors;
                let messages = Object.values(errors)
                    .flat()
                    .join('\n');
                alert(`❌ Validation Error:\n${messages}`);
            } else {
                alert(err);
            }
            console.error(err.response?.data);
        }
    };

    return (
        <Box
        >

            <Typography variant="body2" sx={{marginLeft: '50px',marginTop: '50px',}} color="text.secondary" mb={1} mt={1}>
                <Link component={RouterLink} to="/" underline="hover" color="inherit">
                    Home
                </Link>
                {' / '}
                <Typography component="span" color="black">
                    Casual
                </Typography>
            </Typography>

            <Grid container spacing={8}  alignItems="flex-start">
                <Grid item xs={12} md={7} sx={{ flexGrow: 1 }}>
                    {cart.length === 0 ? (
                        <Typography color="text.secondary" sx={{ fontStyle: 'italic' }}>
                            🛒 Your cart is empty.
                        </Typography>
                    ) : (
                        cart.map((item, index) => (
                            <Box key={item.id} mb={2}>
                                <CartItem
                                    item={item}
                                    onQuantityChange={updateQuantity}
                                    onRemove={removeFromCart}
                                />
                            </Box>
                        ))
                    )}
                </Grid>

                <Grid item xs={12} md={5}>
                    <OrderSummary cart={cart} onSubmitOrder={handleSubmitOrder} />
                </Grid>
            </Grid>
        </Box>
    );
}
