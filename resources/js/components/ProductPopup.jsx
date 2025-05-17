import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    IconButton,
    Divider,
    Chip,
    Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useCart } from "../contexts/CartContext.jsx";

export default function ProductPopup({ product, onClose, onAddToCart }) {

    const initialQuantity = 0;

    const [quantity, setQuantity] = useState(initialQuantity);

    useEffect(() => {
        setQuantity(initialQuantity);
    }, [product]);

    const handleQuantityChange = (newQuantity) => {
        setQuantity(newQuantity);
    };

    const handleAdd = () => {
        onAddToCart(product, quantity);
    };

    return (
        <Box
            onClick={onClose}
            sx={{
                position: 'fixed',
                inset: 0,
                bgcolor: 'rgba(0,0,0,0.5)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1300,
                backdropFilter: 'blur(3px)',
                px: 2,
            }}
        >
            <Box
                onClick={(e) => e.stopPropagation()}
                sx={{
                    bgcolor: 'background.paper',
                    borderRadius: 3,
                    width: { xs: '100%', sm: 300 },
                    maxHeight: '90vh',
                    overflowY: 'auto',
                    boxShadow: 24,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3,
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" fontWeight="bold" sx={{ px: 1 }}>
                        Product Details
                    </Typography>
                    <IconButton onClick={onClose} size="large">
                        <CloseIcon />
                    </IconButton>
                </Box>

                {/* صورة المنتج */}
                <Box
                    sx={{
                        width: '100%',
                        height: 120,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        bgcolor: '#fafafa',
                        borderRadius: 2,
                    }}
                >
                    <img
                        src={`${import.meta.env.VITE_API_BASE_URL}/storage/${product.image}`}
                        alt={product.name}
                        style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                    />
                </Box>

                <Box sx={{ paddingLeft: '10px' }}>
                    <Typography variant="h5" fontWeight={700} component="div" sx={{ mb: 1 }}>
                        {product.name}{' '}
                        <Chip
                            label={product.category}
                            size="small"
                            sx={{
                                ml: 1,
                                fontSize: '0.75rem',
                                verticalAlign: 'middle',
                                textTransform: 'capitalize',
                            }}
                        />
                    </Typography>

                    <Typography variant="h6" color="primary" fontWeight="bold">
                        ${product.price}
                    </Typography>
                </Box>

                <Divider />

                <Box sx={{ px: 1 }}>
                    <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                        Product Details
                    </Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                            Category:
                        </Typography>
                        <Typography variant="body2" fontWeight="bold" sx={{ textTransform: 'capitalize' }}>
                            {product.category}
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" color="text.secondary">
                            Stock:
                        </Typography>
                        <Typography variant="body2" fontWeight="bold">
                            {product.stock ?? 'N/A'} items
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{ px: 1, textAlign: 'center', display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        Quantity
                    </Typography>

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
                            onClick={() => handleQuantityChange(Math.max(1, quantity - 1))}
                            disabled={quantity <= 1}
                            variant="text"
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
                                userSelect: 'none',
                            }}
                        >
                            {quantity}
                        </Typography>

                        <Button
                            onClick={() => handleQuantityChange(quantity + 1)}
                            variant="text"
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
                </Box>

                <Button
                    variant="contained"
                    sx={{ backgroundColor: 'black', width: '90%', margin: '0px auto 10px' }}
                    size="large"
                    fullWidth
                    onClick={handleAdd}
                >
                    Add to Cart
                </Button>
            </Box>
        </Box>
    );
}
