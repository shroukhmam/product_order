import React, { useEffect, useState } from 'react';
import {
    Box,
    Grid,
    Button,
    Drawer,
    Typography,
    TextField,
    useMediaQuery,
    useTheme,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Slider,
    Link
} from '@mui/material';
import ProductCard from '../components/ProductCard';
import CartSummary from '../components/CartSummary';
import { useCart } from '../contexts/CartContext.jsx';
import axios from '../services/axios';
import { Link as RouterLink } from 'react-router-dom';
import ProductPopup from "../components/ProductPopup.jsx";


export default function ProductOrderPage() {
    const [products, setProducts] = useState([]);
    const { cart, addToCart, removeFromCart, clearCart, updateQuantity } = useCart();
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [tempFilters, setTempFilters] = useState({
        name: '',
        min_price: 0,
        max_price: 5000,
        category: 'All',
    });
    const [activeFilters, setActiveFilters] = useState({ ...tempFilters });
    const [categories] = useState(['All', 'T-shirts', 'Polo', 'Jeans', 'Shirts']);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);
    const [showSidebar, setShowSidebar] = useState(true);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const fetchProducts = async () => {
        try {
            const res = await axios.get('/products', {
                params: {
                    search: activeFilters.name,
                    category: activeFilters.category === 'All' ? '' : activeFilters.category,
                    min_price: activeFilters.min_price,
                    max_price: activeFilters.max_price,
                    page,
                },
            });
            setProducts(res.data.data);
            setLastPage(res.data.last_page);
            setTotalProducts(res.data.total);
        } catch (err) {
            console.error('Error fetching products', err);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [activeFilters, page]);

    const handleProductClick = async (productId) => {
        try {
            const res = await axios.get(`/products/${productId}`);
            setSelectedProduct(res.data.product);
        } catch (error) {
            console.error('Failed to fetch product', error);
        }
    };

    const handleClosePopup = () => setSelectedProduct(null);

    const handleAddToCart = (product, quantity) => {
        addToCart(product, quantity);
        handleClosePopup();
    };
    const handleRemoveFromCart = (id) => removeFromCart(id);

    const handleSubmitOrder = async () => {
        try {
            const payload = cart.map((item) => ({
                product_id: item.id,
                quantity: item.quantity,
            }));
            await axios.post('orders', { items: payload });
            alert('✅ Order submitted successfully!');
            clearCart();
        } catch (err) {
            alert('❌ Failed to submit order');
        }
    };

    const applyFilters = () => {
        setActiveFilters(tempFilters);
        setPage(1);
        setShowSidebar(false);
    };

    const clearFilters = () => {
        const cleared = {
            name: '',
            min_price: 0,
            max_price: 5000,
            category: 'All',
        };
        setTempFilters(cleared);
        setActiveFilters(cleared);
        setPage(1);
    };

    const from = (page - 1) * 10 + 1;
    const to = from + products.length - 1;

    const FilterSidebar = (
        <Box>
            <Typography variant="h6">Filters</Typography>

            {/* Price */}
            <Typography mt={2} variant="subtitle2">Price</Typography>
            <Box >
                <Slider
                    value={[tempFilters.min_price, tempFilters.max_price]}
                    onChange={(e, newValue) => {
                        setTempFilters({ ...tempFilters, min_price: newValue[0], max_price: newValue[1] });
                    }}
                    valueLabelDisplay="auto"
                    min={0}
                    max={5000}
                    sx={{
                        color: 'black', // اللون الأساسي للـ Slider
                        '& .MuiSlider-thumb': {
                            backgroundColor: 'black',
                        },
                        '& .MuiSlider-track': {
                            backgroundColor: 'black',
                        },
                        '& .MuiSlider-rail': {
                            backgroundColor: '#ccc',
                        },
                    }}
                />
                <Box display="flex" justifyContent="space-between">
                    <Typography variant="body2">${tempFilters.min_price}</Typography>
                    <Typography variant="body2">${tempFilters.max_price}</Typography>
                </Box>
            </Box>

            {/* Categories */}
            <Box mt={2} display="flex" flexDirection="column" gap={1}>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Category</FormLabel>
                    <RadioGroup
                        value={tempFilters.category}
                        onChange={(e) => setTempFilters({ ...tempFilters, category: e.target.value })}
                    >
                        {categories.map((cat) => (
                            <FormControlLabel
                                key={cat}
                                value={cat}
                                control={<Radio />}
                                label={cat}
                            />
                        ))}
                    </RadioGroup>
                </FormControl>
            </Box>

            {/* Filter Buttons */}
            <Box mt={3} display="flex" flexDirection="column" gap={1}>
                <Button variant="contained" onClick={applyFilters}
                        sx={{
                    color: 'white',
                        backgroundColor: 'black',

                }} >
                    Apply Filters
                </Button>
                <Button
                    variant="outlined"
                    onClick={clearFilters}
                    sx={{
                        color: 'black',
                        borderColor: 'black',
                        '&:hover': {
                            borderColor: 'black',
                            backgroundColor: '#f5f5f5',
                        },
                    }}
                >
                    Clear All
                </Button>
            </Box>
        </Box>
    );

    return (
        <>
            <Box>
            <Typography variant="body2" sx={{marginLeft: '50px',marginTop: '50px',}} color="text.secondary" mb={1} mt={1}>
                <Link component={RouterLink} to="/" underline="hover" color="inherit">
                    Home
                </Link>
                {' / '}
                <Typography component="span" color="black">
                    Casual
                </Typography>
            </Typography>
            </Box>
            <Box display="flex" bgcolor="#f5f5f5" sx={{ backgroundColor: "#eee", padding: '50px 0' }}>
                <Button
                    onClick={() => setShowSidebar(!showSidebar)}
                    sx={{ mb: 2, color: "black", position: 'absolute',
                        left: showSidebar ? '20%' : '2%',
                        border: 'none', top: '160px', fontSize: '20px',
                        '@media (max-width:600px)': {
                            left: '2%',
                        } }}
                >
                    ☰
                </Button>

                {/* Sidebar */}
                {isMobile ? (
                    <Drawer open={showSidebar} onClose={() => setShowSidebar(false)}>
                        <Box p={2} width={250}>
                            {FilterSidebar}
                        </Box>
                    </Drawer>
                ) : (
                    showSidebar && (
                        <Box
                            sx={{
                                width: 250,
                                height: '85vh',
                                bgcolor: 'white',
                                borderRight: '1px solid #eee',
                                p: 2,
                            }}
                        >
                            {FilterSidebar}
                        </Box>
                    )
                )}

                {/* Main Content */}
                <Box flex={1} p={3} sx={{backgroundColor:'white', margin:'0 5px'}}>
                    <Typography variant="h5" mb={2}>Products</Typography>

                    <TextField
                        placeholder="Search by name"
                        value={tempFilters.name}
                        onChange={(e) => {
                            setTempFilters({ ...tempFilters, name: e.target.value });
                            setActiveFilters({ ...activeFilters, name: e.target.value });
                            setPage(1);
                        }}
                        variant="outlined"
                        size="small"
                        sx={{ mb: 2, width: '100%', maxWidth: 400 }}
                    />

                    <Typography variant="body2" mb={2}>
                        Showing {from}–{to} of {totalProducts} products
                    </Typography>

                    <Grid container spacing={2}>
                        {products.map((product) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id} onClick={() => handleProductClick(product.id)}>
                                <ProductCard product={product}  />
                            </Grid>
                        ))}

                        {selectedProduct && (
                            <ProductPopup
                                product={selectedProduct}
                                onClose={handleClosePopup}
                                onAddToCart={handleAddToCart}
                            />
                        )}
                    </Grid>

                    {/* Pagination */}
                    <Box mt={4} display="flex" justifyContent="center" gap={1}>
                        {Array.from({ length: lastPage }, (_, i) => i + 1)
                            .filter((p) => Math.abs(p - page) <= 2 || p === 1 || p === lastPage)
                            .map((p, idx, arr) => {
                                const prev = arr[idx - 1];
                                const showEllipsis = prev && p - prev > 1;

                                return (
                                    <React.Fragment key={p}>
                                        {showEllipsis && <Box px={1}>...</Box>}
                                        <Button
                                            variant={page === p ? 'contained' : 'outlined'}
                                            onClick={() => setPage(p)}
                                            sx={{backgroundColor : 'black'}}
                                        >
                                            {p}
                                        </Button>
                                    </React.Fragment>
                                );
                            })}
                    </Box>
                </Box>

                {/* Cart Summary */}
                {!isMobile && (
                    <Box>
                    <Box
                        sx={{
                            width: 300,
                            height: 'auto',
                            marginRight: '7px',
                            bgcolor: '#fff',
                            borderLeft: '1px solid #eee',
                            p: 2,
                        }}
                    >
                        <CartSummary
                            items={cart}
                            onRemove={handleRemoveFromCart}
                            onQuantityChange={updateQuantity}
                        />
                    </Box>
                    </Box>
                )}
            </Box>
        </>
    );
}
