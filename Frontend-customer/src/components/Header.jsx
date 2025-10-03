import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  TextField,
  Container,
  InputAdornment,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';

const navLinks = ['rings', 'chains', 'kada', 'bracelets', 'earrings', 'mangalsutras', 'choker-necklace' ,];

const Header = () => {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const { userInfo, logout } = useAuth();
  const [keyword, setKeyword] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [isShrunk, setIsShrunk] = useState(false);

  const cartItemCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const logoutHandler = () => {
    logout();
    handleClose();
    navigate('/login');
  };

  const searchHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
      setKeyword('');
    } else {
      navigate('/');
    }
  };

  // ✅ Shrink on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsShrunk(true);
      } else {
        setIsShrunk(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        background: 'rgba(255,255,255,0.9)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid rgba(0,0,0,0.08)',
        transition: 'all 0.3s ease',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            py: isShrunk ? 0.5 : 1.5,
            justifyContent: 'space-between',
            transition: 'all 0.3s ease',
          }}
        >
          {/* Logo */}
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              textDecoration: 'none',
              color: 'primary.main',
              fontWeight: 700,
              letterSpacing: 1,
              fontSize: isShrunk ? '1.2rem' : '1.6rem',
              transition: 'all 0.3s ease',
              '&:hover': { color: 'secondary.main' },
            }}
          >
            Aura Jewels
          </Typography>

          {/* Search */}
          <Box
            component="form"
            onSubmit={searchHandler}
            sx={{ flexGrow: 1, mx: 4, maxWidth: 500 }}
          >
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              placeholder="Search products..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              InputProps={{
                sx: {
                  borderRadius: '50px',
                  backgroundColor: '#fff',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
                  fontSize: isShrunk ? '0.85rem' : '1rem',
                  height: isShrunk ? 36 : 44,
                  transition: 'all 0.3s ease',
                  '&:hover': { boxShadow: '0 4px 10px rgba(0,0,0,0.1)' },
                },
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* Right Actions */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {/* Cart */}
            <IconButton
              component={Link}
              to="/cart"
              size="large"
              sx={{
                color: 'text.primary',
                transition: 'transform 0.2s ease',
                '&:hover': { transform: 'scale(1.1)' },
              }}
            >
              <Badge badgeContent={cartItemCount} color="primary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            {/* User Menu */}
            {userInfo ? (
              <>
                <Button
                  onClick={handleMenu}
                  startIcon={<AccountCircle />}
                  sx={{
                    fontWeight: 600,
                    textTransform: 'none',
                    borderRadius: '30px',
                    px: 2,
                    fontSize: isShrunk ? '0.85rem' : '0.95rem',
                    color: 'text.primary',
                    transition: 'all 0.3s ease',
                    '&:hover': { backgroundColor: 'rgba(25,118,210,0.1)' },
                  }}
                >
                  {userInfo.name}
                </Button>
                {/* <Link to="/gallery" style={{ textDecoration: 'none' }}>Galllery</Link> */}
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem component={Link} to="/profile" onClick={handleClose}>
                    My Orders
                  </MenuItem>
                  <MenuItem component={Link} to="/wishlist" onClick={handleClose}>
                    My Wishlist
                  </MenuItem>
                  <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                component={Link}
                to="/login"
                sx={{
                  fontWeight: 600,
                  textTransform: 'none',
                  borderRadius: '30px',
                  px: 2,
                  fontSize: isShrunk ? '0.85rem' : '0.95rem',
                  transition: 'all 0.3s ease',
                  color: 'text.primary',
                  '&:hover': { backgroundColor: 'rgba(25,118,210,0.1)' },
                }}
              >
                Sign In
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>

      {/* Navigation Links */}
      <Box
        sx={{
          width: '100%',
          bgcolor: 'rgba(255,255,255,0.95)',
          borderTop: '1px solid rgba(0,0,0,0.05)',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            component="nav"
            variant="dense"
            sx={{
              justifyContent: 'center',
              gap: 4,
              minHeight: isShrunk ? 38 : 48,
              transition: 'all 0.3s ease',
            }}
          >
            {navLinks.map((link) => (
              <Button
                key={link}
                component={Link}
                to={`/category/${link}`}
                sx={{
                  color: 'text.primary',
                  fontWeight: 600,
                  position: 'relative',
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                  fontSize: isShrunk ? '0.75rem' : '0.85rem',
                  transition: 'all 0.3s ease',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    width: 0,
                    height: '2px',
                    left: 0,
                    bottom: -2,
                    bgcolor: 'primary.main',
                    transition: 'width 0.3s ease',
                  },
                  '&:hover::after': { width: '100%' },
                }}
              >
                {link}
              </Button>
            ))}
          </Toolbar>
        </Container>
      </Box>
    </AppBar>
  );
};

export default Header;
