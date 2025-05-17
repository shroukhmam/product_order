import React, { useState } from 'react';
import { Box, Button, Typography} from '@mui/material';
import {useCart} from "../contexts/CartContext.jsx";

export default function ProductCard({ product }) {

    const { cart, incrementQuantity, decrementQuantity } = useCart();
    const item = cart.find(i => i.id === product.id);
    const quantity = item ? item.quantity : 0;

    const [showPopup, setShowPopup] = useState(false);


    return (
        <>
            {/* البطاقة */}
            <Box
                onClick={() => setShowPopup(true)}
                sx={{
                    cursor: 'pointer',
                    border: '1px solid #e0e0e0',
                    borderRadius: 2,
                    width: 200,
                    overflow: 'hidden',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    '&:hover': { transform: 'scale(1.02)', transition: '0.2s' },
                }}
            >
                <Box
                    sx={{
                        width: '100%',
                        height: 160,
                        bgcolor: 'white',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        p: 1,
                    }}
                >
                    <img
                        src={`${import.meta.env.VITE_API_BASE_URL}/storage/${product.image}`}
                        alt={product.name}
                        style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                    />
                </Box>

                <Box sx={{textAlign: 'center' , backgroundColor:'white' }}>

                    <Box sx={{ display: 'flex',
                        justifyContent: 'space-around', width:'100%'}}>
                        <Typography variant="subtitle1" fontWeight={600} color="text.primary" noWrap>
                            {product.name}
                        </Typography>
                        {/* دائرة المخزون */}
                        <Box
                            sx={{
                                bgcolor: '#ccc', // لون خلفية دائري - يمكن تغييره
                                color: 'white',
                                borderRadius: '50%',
                                width: 20,
                                height: 20,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 'bold',
                                userSelect: 'none',
                                marginTop:'2px',
                            }}
                        >
                            {product.stock}
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-around', width:"100%"}}>
                        <Typography variant="h6" fontWeight="bold" mt={0.5}>
                            ${product.price}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ lineHeight:3}} noWrap>
                            {product.category}
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{backgroundColor:'white',paddingBottom:'10px' ,paddingLeft:'15px' }}>
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
                            onClick={(e) => {
                                e.stopPropagation();
                                decrementQuantity(product.id);
                            }}
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
                            onClick={(e) => {
                                e.stopPropagation();
                                incrementQuantity(product);
                            }}
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
            </Box>

            {/* Popup التفاصيل */}
            {/*{showPopup && (*/}
            {/*    <ProductPopup*/}
            {/*        product={product}*/}
            {/*        quantity={quantity}*/}
            {/*        setQuantity={setQuantity}*/}
            {/*        onClose={() => setShowPopup(false)}*/}
            {/*        onAddToCart={handleAddToCart}*/}
            {/*    />*/}
            {/*)}*/}

        </>
    );
}
