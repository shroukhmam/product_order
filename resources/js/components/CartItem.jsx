import React from 'react';
import { Box, Typography, IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function CartItem({ item, onQuantityChange, onRemove }) {
    return (
        <Box
            sx={{
                display: 'flex',
                position: 'relative',
                gap: 2,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
                p: 2,
                alignItems: 'center',
                flexWrap: 'wrap', // لجعل المحتوى يلتف عند الشاشات الصغيرة
            }}
        >
            <Box
                component="img"
                src={`${import.meta.env.VITE_API_BASE_URL}/storage/${item.image}`}
                alt={item.name}
                sx={{
                    width: 100,
                    height: 100,
                    objectFit: 'contain',
                    borderRadius: 1,
                    bgcolor: 'background.paper',
                }}
            />
            <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography variant="h6" noWrap>
                    {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                    {item.category}
                </Typography>
                <Typography variant="subtitle1" fontWeight="bold" mt={1}>
                    ${item.price}
                </Typography>
                <Box
                    sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        border: '1px solid #ccc',
                        borderRadius: '10px', // شكل بيضاوي كامل
                        overflow: 'hidden',
                        height: 32,
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
                            px: 1,
                            padding: '5px',

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
                <Box>
                    <IconButton
                        aria-label="remove item"
                        onClick={() => onRemove(item.id)}
                        sx={{ marginLeft: 'auto', color: 'error.main' , position: "absolute" , top:"10%",right:"2%" }}
                    >
                        <DeleteIcon />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    );
}
