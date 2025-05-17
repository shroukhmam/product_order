import React from 'react';
import { Box, Typography, Button, Divider, Paper } from '@mui/material';

export default function OrderSummary({ cart, onSubmitOrder }) {
    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = subtotal > 0 ? 30 : 0;
    const tax = +(subtotal * 0.14).toFixed(2);
    const total = subtotal + shipping + tax;
    const today = new Date();
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const formattedDate = `${monthNames[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`;
    return (
        <Paper elevation={3} sx={{ p: 3, minWidth: 280, flex: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" gutterBottom>
                    Order Summary
                </Typography>
                <Typography variant="body1" sx={{color:'primary.main'}}>
                    {formattedDate}
                </Typography>
            </Box>

            <Box sx={styles.row}>
                <Typography color="text.secondary">Subtotal:</Typography>
                <Typography>${subtotal.toFixed(2)}</Typography>
            </Box>
            <Box sx={styles.row}>
                <Typography color="text.secondary">Shipping:</Typography>
                <Typography>${shipping.toFixed(2)}</Typography>
            </Box>
            <Box sx={styles.row}>
                <Typography color="text.secondary">Tax (14%):</Typography>
                <Typography>${tax.toFixed(2)}</Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={styles.total}>
                <Typography variant="subtitle1"><strong>Total:</strong></Typography>
                <Typography variant="subtitle1"><strong>${total.toFixed(2)}</strong></Typography>
            </Box>

            <Button
                variant="contained"
                fullWidth
                sx={{ mt: 3 , backgroundColor:"black" ,color:"white" }}
                onClick={onSubmitOrder}
                disabled={cart.length === 0}
            >
                Place the Order
            </Button>
        </Paper>
    );
}

const styles = {
    row: {
        display: 'flex',
        justifyContent: 'space-between',
        my: 1,
    },
    total: {
        display: 'flex',
        justifyContent: 'space-between',
        mt: 2,
    },
};
