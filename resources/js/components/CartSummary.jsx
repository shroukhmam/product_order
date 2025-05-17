import React from 'react';
import { Link } from 'react-router-dom';
import {
    Box,
    Typography,
    Button,
    IconButton,
    Divider,
    Grid
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function CartSummary({ items, onRemove , onQuantityChange}) {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = items.length > 0 ? 10 : 0;
    const tax = subtotal * 0.1;
    const total = subtotal + shipping + tax;

    return (
        <Box
            sx={{
                p: 3,
                mt: 3,
            }}
        >
            <Typography variant="h5" gutterBottom>
                 Order Summary
            </Typography>

            {items.length === 0 ? (
                <Typography>No items added yet</Typography>
            ) : (
                <Box>
                    {/* المنتجات */}
                    {items.map(item => (
                        <>
                            <Grid container spacing={2} alignItems="center" key={item.id} mb={2}>
                                <Grid item xs={3}>
                                    <img
                                        src={`${import.meta.env.VITE_API_BASE_URL}/storage/${item.image}`}
                                        alt={item.name}
                                        style={{ width: '30px', borderRadius: 4 }}
                                    />
                                </Grid>
                                <Grid item xs={7}>
                                    <Typography fontWeight="bold">{item.name}</Typography>
                                    <Box
                                        sx={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            border: '1px solid #ccc',
                                            borderRadius: '10px',
                                            overflow: 'hidden',
                                            bgcolor: '#f7f7f7',
                                        }}
                                    >
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            onClick={() => onQuantityChange(item.id, item.quantity - 1)}
                                            disabled={item.quantity <= 1}
                                            sx={{
                                                minWidth: 32,
                                                padding: '5px',
                                                border: 'none',
                                                borderRadius: 0,
                                                color: '#555',
                                            }}
                                        >
                                            –
                                        </Button>

                                        <Typography
                                            sx={{
                                                minWidth: 32,
                                                textAlign: 'center',
                                                fontSize: 14,
                                                bgcolor: 'white',
                                                padding: '5px',
                                                px: 1,
                                            }}
                                        >
                                            {item.quantity}
                                        </Typography>

                                        <Button
                                            variant="outlined"
                                            size="small"
                                            onClick={() => onQuantityChange(item.id, item.quantity + 1)}
                                            sx={{
                                                minWidth: 32,
                                                padding: '5px',
                                                border: 'none',
                                                borderRadius: 0,
                                                color: '#555',
                                            }}
                                        >
                                            +
                                        </Button>
                                    </Box>

                                </Grid>
                                <Grid item xs={2}>
                                    <IconButton
                                        onClick={() => onRemove(item.id)}
                                        color="error"
                                        size="small"
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                    <Typography variant="body2" color="text.secondary">
                                        ${ (item.quantity * (Number(item.price) || 0)).toFixed(2) }
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Divider sx={{ my: 2 }} />
                        </>
                    ))}


                    {/* الفواتير */}
                    <Box display="flex" justifyContent="space-between" mb={1}>
                        <Typography>Subtotal:</Typography>
                        <Typography>${subtotal.toFixed(2)}</Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between" mb={1}>
                        <Typography>Shipping:</Typography>
                        <Typography>${shipping.toFixed(2)}</Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between" mb={1}>
                        <Typography>Tax:</Typography>
                        <Typography>${tax.toFixed(2)}</Typography>
                    </Box>
                    <Divider sx={{ my: 2 }} />

                    <Box display="flex" justifyContent="space-between" mt={2} mb={3}>
                        <Typography fontWeight="bold">Total:</Typography>
                        <Typography fontWeight="bold">${total.toFixed(2)}</Typography>
                    </Box>

                    {/* زر الطلب */}
                    <Button
                        component={Link}
                        to="/cart"
                        variant="contained"
                        sx={{ color: "white", backgroundColor: "black" }}
                        fullWidth
                        disabled={items.length === 0}
                    >
                        Proceed To Checkout
                    </Button>
                </Box>
            )}
        </Box>
    );
}
