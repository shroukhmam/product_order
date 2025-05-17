import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { NavLink } from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';

import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import MenuIcon from '@mui/icons-material/Menu';

export default function Navbar() {
    const { user, token, logout , login} = useAuth();
    const { cart } = useCart();

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = (open) => () => {
        setDrawerOpen(open);
    };

    const navLinks = [
        { title: 'Products', path: '/products' },
        { title: 'Sell Your Product', path: '/cart' },
    ];

    return (
        <>
            <AppBar position="static" color="transparent" elevation={1}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <img
                            src={`${import.meta.env.VITE_API_BASE_URL}/storage/logo.jpeg`}
                            alt="Logo"
                            style={{ height: 40 }}
                        />

                        {!isMobile && (
                            navLinks.map(({ title, path }) => (
                                <Button
                                    key={title}
                                    component={NavLink}
                                    to={path}
                                    sx={{
                                        color: 'black',
                                        fontWeight: 'bold',
                                        '&.active': {
                                            backgroundColor: 'black',
                                            color: 'white',
                                            borderRadius: 1,
                                        },
                                    }}
                                >
                                    {title}
                                </Button>
                            ))
                        )}

                        {isMobile && (
                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                onClick={toggleDrawer(true)}
                                sx={{ color: 'black' }}
                            >
                                <MenuIcon />
                            </IconButton>
                        )}
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <IconButton
                            component={NavLink}
                            to="/cart"
                            size="large"
                            aria-label={`show ${totalItems} items in cart`}
                            color="inherit"
                        >
                            <Badge
                                badgeContent={totalItems}
                                sx={{
                                    '& .MuiBadge-badge': {
                                        backgroundColor: 'red',
                                        color: 'white',
                                    },
                                }}
                            >
                                <FaShoppingCart style={{ color: 'black', fontSize: 24 }} />
                            </Badge>
                        </IconButton>
                        {token ? (
                            <Button
                                onClick={logout}
                                variant="contained"
                                sx={{ bgcolor: 'black', '&:hover': { bgcolor: '#333' } }}
                            >
                                Logout
                            </Button>
                        ) : (
                            <Button
                                component={Link}
                                to="/login"
                                variant="contained"
                                sx={{ bgcolor: 'black', '&:hover': { bgcolor: '#333' } }}
                            >
                                Login
                            </Button>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>

            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
            >
                <Box
                    sx={{ width: 250, padding: 2 }}
                    role="presentation"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                >
                    <List>
                        {navLinks.map(({ title, path }) => (
                            <ListItem key={title} disablePadding>
                                <ListItemButton
                                    component={NavLink}
                                    to={path}
                                    sx={{
                                        color: 'black',
                                        fontWeight: 'bold',
                                        '&.active': {
                                            backgroundColor: 'black',
                                            color: 'white',
                                            borderRadius: 1,
                                        },
                                    }}
                                >
                                    {title}
                                </ListItemButton>
                            </ListItem>
                        ))}

                        <ListItem disablePadding sx={{ marginTop: 2 }}>
                            {token ? (
                                <Button
                                    onClick={logout}
                                    variant="contained"
                                    sx={{ bgcolor: 'black', '&:hover': { bgcolor: '#333' } }}
                                >
                                    Logout
                                </Button>
                            ) : (
                                <Button
                                    onClick={login}
                                    variant="contained"
                                    sx={{ bgcolor: 'black', '&:hover': { bgcolor: '#333' } }}
                                >
                                    Login
                                </Button>
                            )}
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
        </>
    );
}
