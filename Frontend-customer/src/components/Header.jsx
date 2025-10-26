// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useCart } from '../context/CartContext';
// import { useAuth } from '../context/AuthContext';
// import {
//   AppBar,
//   Box,
//   Toolbar,
//   Typography,
//   Button,
//   IconButton,
//   Badge,
//   Menu,
//   MenuItem,
//   TextField,
//   Container,
//   InputAdornment,
// } from '@mui/material';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import AccountCircle from '@mui/icons-material/AccountCircle';
// import SearchIcon from '@mui/icons-material/Search';

// const navLinks = ['rings', 'chains', 'kada', 'bracelets', 'earrings', 'mangalsutras', 'choker-necklace' ,];

// const Header = () => {
//   const navigate = useNavigate();
//   const { cartItems } = useCart();
//   const { userInfo, logout } = useAuth();
//   const [keyword, setKeyword] = useState('');
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [isShrunk, setIsShrunk] = useState(false);

//   const cartItemCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

//   const handleMenu = (event) => setAnchorEl(event.currentTarget);
//   const handleClose = () => setAnchorEl(null);

//   const logoutHandler = () => {
//     logout();
//     handleClose();
//     navigate('/login');
//   };

//   const searchHandler = (e) => {
//     e.preventDefault();
//     if (keyword.trim()) {
//       navigate(`/search/${keyword}`);
//       setKeyword('');
//     } else {
//       navigate('/');
//     }
//   };

//   // ✅ Shrink on scroll
//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 80) {
//         setIsShrunk(true);
//       } else {
//         setIsShrunk(false);
//       }
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   return (
//     <AppBar
//       position="fixed"
//       elevation={0}
//       sx={{
//         background: 'rgba(255,255,255,0.9)',
//         backdropFilter: 'blur(8px)',
//         borderBottom: '1px solid rgba(0,0,0,0.08)',
//         transition: 'all 0.3s ease',
//       }}
//     >
//       <Container maxWidth="xl">
//         <Toolbar
//           disableGutters
//           sx={{
//             py: isShrunk ? 0.5 : 1.5,
//             justifyContent: 'space-between',
//             transition: 'all 0.3s ease',
//           }}
//         >
//           {/* Logo */}
//           <Typography
//             variant="h6"
//             component={Link}
//             to="/"
//             sx={{
//               textDecoration: 'none',
//               color: 'primary.main',
//               fontWeight: 700,
//               letterSpacing: 1,
//               fontSize: isShrunk ? '1.2rem' : '1.6rem',
//               transition: 'all 0.3s ease',
//               '&:hover': { color: 'secondary.main' },
//             }}
//           >
//             Aura Jewels
//           </Typography>

//           {/* Search */}
//           <Box
//             component="form"
//             onSubmit={searchHandler}
//             sx={{ flexGrow: 1, mx: 4, maxWidth: 500 }}
//           >
//             <TextField
//               variant="outlined"
//               size="small"
//               fullWidth
//               placeholder="Search products..."
//               value={keyword}
//               onChange={(e) => setKeyword(e.target.value)}
//               InputProps={{
//                 sx: {
//                   borderRadius: '50px',
//                   backgroundColor: '#fff',
//                   boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
//                   fontSize: isShrunk ? '0.85rem' : '1rem',
//                   height: isShrunk ? 36 : 44,
//                   transition: 'all 0.3s ease',
//                   '&:hover': { boxShadow: '0 4px 10px rgba(0,0,0,0.1)' },
//                 },
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <SearchIcon color="action" />
//                   </InputAdornment>
//                 ),
//               }}
//             />
//           </Box>

//           {/* Right Actions */}
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//             {/* Cart */}
//             <IconButton
//               component={Link}
//               to="/cart"
//               size="large"
//               sx={{
//                 color: 'text.primary',
//                 transition: 'transform 0.2s ease',
//                 '&:hover': { transform: 'scale(1.1)' },
//               }}
//             >
//               <Badge badgeContent={cartItemCount} color="primary">
//                 <ShoppingCartIcon />
//               </Badge>
//             </IconButton>

//             {/* User Menu */}
//             {userInfo ? (
//               <>
//                 <Button
//                   onClick={handleMenu}
//                   startIcon={<AccountCircle />}
//                   sx={{
//                     fontWeight: 600,
//                     textTransform: 'none',
//                     borderRadius: '30px',
//                     px: 2,
//                     fontSize: isShrunk ? '0.85rem' : '0.95rem',
//                     color: 'text.primary',
//                     transition: 'all 0.3s ease',
//                     '&:hover': { backgroundColor: 'rgba(25,118,210,0.1)' },
//                   }}
//                 >
//                   {userInfo.name}
//                 </Button>
//                 {/* <Link to="/gallery" style={{ textDecoration: 'none' }}>Galllery</Link> */}
//                 <Menu
//                   anchorEl={anchorEl}
//                   open={Boolean(anchorEl)}
//                   onClose={handleClose}
//                 >
//                   <MenuItem component={Link} to="/profile" onClick={handleClose}>
//                     My Orders
//                   </MenuItem>
//                   <MenuItem component={Link} to="/wishlist" onClick={handleClose}>
//                     My Wishlist
//                   </MenuItem>
//                   <MenuItem onClick={logoutHandler}>Logout</MenuItem>
//                 </Menu>
//               </>
//             ) : (
//               <Button
//                 component={Link}
//                 to="/login"
//                 sx={{
//                   fontWeight: 600,
//                   textTransform: 'none',
//                   borderRadius: '30px',
//                   px: 2,
//                   fontSize: isShrunk ? '0.85rem' : '0.95rem',
//                   transition: 'all 0.3s ease',
//                   color: 'text.primary',
//                   '&:hover': { backgroundColor: 'rgba(25,118,210,0.1)' },
//                 }}
//               >
//                 Sign In
//               </Button>
//             )}
//           </Box>
//         </Toolbar>
//       </Container>

//       {/* Navigation Links */}
//       <Box
//         sx={{
//           width: '100%',
//           bgcolor: 'rgba(255,255,255,0.95)',
//           borderTop: '1px solid rgba(0,0,0,0.05)',
//         }}
//       >
//         <Container maxWidth="lg">
//           <Toolbar
//             component="nav"
//             variant="dense"
//             sx={{
//               justifyContent: 'center',
//               gap: 4,
//               minHeight: isShrunk ? 38 : 48,
//               transition: 'all 0.3s ease',
//             }}
//           >
//             {navLinks.map((link) => (
//               <Button
//                 key={link}
//                 component={Link}
//                 to={`/category/${link}`}
//                 sx={{
//                   color: 'text.primary',
//                   fontWeight: 600,
//                   position: 'relative',
//                   textTransform: 'uppercase',
//                   letterSpacing: 0.5,
//                   fontSize: isShrunk ? '0.75rem' : '0.85rem',
//                   transition: 'all 0.3s ease',
//                   '&::after': {
//                     content: '""',
//                     position: 'absolute',
//                     width: 0,
//                     height: '2px',
//                     left: 0,
//                     bottom: -2,
//                     bgcolor: 'primary.main',
//                     transition: 'width 0.3s ease',
//                   },
//                   '&:hover::after': { width: '100%' },
//                 }}
//               >
//                 {link}
//               </Button>
//             ))}
//           </Toolbar>
//         </Container>
//       </Box>
//     </AppBar>
//   );
// };

// export default Header;


// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useCart } from "../context/CartContext";
// import { useAuth } from "../context/AuthContext";
// import {
//   AppBar,
//   Box,
//   Toolbar,
//   Typography,
//   Button,
//   IconButton,
//   Badge,
//   Menu,
//   MenuItem,
//   TextField,
//   Container,
//   InputAdornment,
//   Drawer,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemText,
//   Divider,
//   useMediaQuery,
// } from "@mui/material";
// import { useTheme } from "@mui/material/styles";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import AccountCircle from "@mui/icons-material/AccountCircle";
// import SearchIcon from "@mui/icons-material/Search";
// import MenuIcon from "@mui/icons-material/Menu";
// import CloseIcon from "@mui/icons-material/Close";

// const navLinks = [
//   "rings",
//   "chains",
//   "kada",
//   "bracelets",
//   "earrings",
//   "mangalsutras",
//   "choker-necklace",
// ];

// const Header = () => {
//   const navigate = useNavigate();
//   const { cartItems } = useCart();
//   const { userInfo, logout } = useAuth();

//   const [keyword, setKeyword] = useState("");
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [isShrunk, setIsShrunk] = useState(false);
//   const [drawerOpen, setDrawerOpen] = useState(false);

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("md"));

//   const cartItemCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

//   const handleMenu = (event) => setAnchorEl(event.currentTarget);
//   const handleClose = () => setAnchorEl(null);

//   const logoutHandler = () => {
//     logout();
//     handleClose();
//     navigate("/login");
//   };

//   const searchHandler = (e) => {
//     e.preventDefault();
//     if (keyword.trim()) {
//       navigate(`/search/${keyword}`);
//       setKeyword("");
//     } else {
//       navigate("/");
//     }
//   };

//   const toggleDrawer = (open) => () => setDrawerOpen(open);

//   // Shrink on scroll
//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 80) setIsShrunk(true);
//       else setIsShrunk(false);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <>
//       <AppBar
//         position="fixed"
//         elevation={0}
//         sx={{
//           background: "rgba(255,255,255,0.9)",
//           backdropFilter: "blur(8px)",
//           borderBottom: "1px solid rgba(0,0,0,0.08)",
//           transition: "all 0.3s ease",
//         }}
//       >
//         <Container maxWidth="xl">
//           <Toolbar
//             disableGutters
//             sx={{
//               py: isShrunk ? 0.5 : 1.5,
//               justifyContent: "space-between",
//               transition: "all 0.3s ease",
//             }}
//           >
//             {/* Logo */}
//             <Typography
//               variant="h6"
//               component={Link}
//               to="/"
//               sx={{
//                 textDecoration: "none",
//                 color: "primary.main",
//                 fontWeight: 700,
//                 letterSpacing: 1,
//                 fontSize: isShrunk ? "1.2rem" : "1.6rem",
//                 transition: "all 0.3s ease",
//                 "&:hover": { color: "secondary.main" },
//               }}
//             >
//               Aura Jewels
//             </Typography>

//             {/* Desktop Search */}
//             {!isMobile && (
//               <Box
//                 component="form"
//                 onSubmit={searchHandler}
//                 sx={{ flexGrow: 1, mx: 4, maxWidth: 500 }}
//               >
//                 <TextField
//                   variant="outlined"
//                   size="small"
//                   fullWidth
//                   placeholder="Search products..."
//                   value={keyword}
//                   onChange={(e) => setKeyword(e.target.value)}
//                   InputProps={{
//                     sx: {
//                       borderRadius: "50px",
//                       backgroundColor: "#fff",
//                       boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
//                       fontSize: isShrunk ? "0.85rem" : "1rem",
//                       height: isShrunk ? 36 : 44,
//                       transition: "all 0.3s ease",
//                     },
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <SearchIcon color="action" />
//                       </InputAdornment>
//                     ),
//                   }}
//                 />
//               </Box>
//             )}

//             {/* Right Actions */}
//             <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//               {/* Search Icon for mobile */}
//               {isMobile && (
//                 <IconButton
//                   onClick={() => navigate("/search")}
//                   sx={{
//                     color: "text.primary",
//                     "&:hover": { transform: "scale(1.1)" },
//                   }}
//                 >
//                   <SearchIcon />
//                 </IconButton>
//               )}

//               {/* Cart */}
//               <IconButton
//                 component={Link}
//                 to="/cart"
//                 size="large"
//                 sx={{
//                   color: "text.primary",
//                   transition: "transform 0.2s ease",
//                   "&:hover": { transform: "scale(1.1)" },
//                 }}
//               >
//                 <Badge badgeContent={cartItemCount} color="primary">
//                   <ShoppingCartIcon />
//                 </Badge>
//               </IconButton>

//               {/* User */}
//               {!isMobile && userInfo ? (
//                 <>
//                   <Button
//                     onClick={handleMenu}
//                     startIcon={<AccountCircle />}
//                     sx={{
//                       fontWeight: 600,
//                       textTransform: "none",
//                       borderRadius: "30px",
//                       px: 2,
//                       color: "text.primary",
//                     }}
//                   >
//                     {userInfo.name}
//                   </Button>
//                   <Menu
//                     anchorEl={anchorEl}
//                     open={Boolean(anchorEl)}
//                     onClose={handleClose}
//                   >
//                     <MenuItem
//                       component={Link}
//                       to="/profile"
//                       onClick={handleClose}
//                     >
//                       My Orders
//                     </MenuItem>
//                     <MenuItem
//                       component={Link}
//                       to="/wishlist"
//                       onClick={handleClose}
//                     >
//                       My Wishlist
//                     </MenuItem>
//                     <MenuItem onClick={logoutHandler}>Logout</MenuItem>
//                   </Menu>
//                 </>
//               ) : (
//                 !isMobile && (
//                   <Button
//                     component={Link}
//                     to="/login"
//                     sx={{
//                       fontWeight: 600,
//                       textTransform: "none",
//                       borderRadius: "30px",
//                       px: 2,
//                       color: "text.primary",
//                     }}
//                   >
//                     Sign In
//                   </Button>
//                 )
//               )}

//               {/* Mobile Menu Button */}
//               {isMobile && (
//                 <IconButton onClick={toggleDrawer(true)}>
//                   <MenuIcon />
//                 </IconButton>
//               )}
//             </Box>
//           </Toolbar>
//         </Container>

//         {/* Desktop Navigation */}
//         {!isMobile && (
//           <Box
//             sx={{
//               width: "100%",
//               bgcolor: "rgba(255,255,255,0.95)",
//               borderTop: "1px solid rgba(0,0,0,0.05)",
//             }}
//           >
//             <Container maxWidth="lg">
//               <Toolbar
//                 component="nav"
//                 variant="dense"
//                 sx={{
//                   justifyContent: "center",
//                   gap: 4,
//                   minHeight: isShrunk ? 38 : 48,
//                   transition: "all 0.3s ease",
//                 }}
//               >
//                 {navLinks.map((link) => (
//                   <Button
//                     key={link}
//                     component={Link}
//                     to={`/category/${link}`}
//                     sx={{
//                       color: "text.primary",
//                       fontWeight: 600,
//                       position: "relative",
//                       textTransform: "uppercase",
//                       fontSize: isShrunk ? "0.75rem" : "0.85rem",
//                       "&::after": {
//                         content: '""',
//                         position: "absolute",
//                         width: 0,
//                         height: "2px",
//                         left: 0,
//                         bottom: -2,
//                         bgcolor: "primary.main",
//                         transition: "width 0.3s ease",
//                       },
//                       "&:hover::after": { width: "100%" },
//                     }}
//                   >
//                     {link}
//                   </Button>
//                 ))}
//               </Toolbar>
//             </Container>
//           </Box>
//         )}
//       </AppBar>

//       {/* Mobile Drawer Menu */}
//       <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
//         <Box
//           sx={{
//             width: 260,
//             p: 2,
//             backgroundColor: "#fff",
//             height: "100%",
//           }}
//         >
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               mb: 2,
//             }}
//           >
//             <Typography variant="h6" sx={{ fontWeight: 700 }}>
//               Menu
//             </Typography>
//             <IconButton onClick={toggleDrawer(false)}>
//               <CloseIcon />
//             </IconButton>
//           </Box>

//           <Divider sx={{ mb: 2 }} />

//           <List>
//             {navLinks.map((link) => (
//               <ListItem key={link} disablePadding>
//                 <ListItemButton
//                   component={Link}
//                   to={`/category/${link}`}
//                   onClick={toggleDrawer(false)}
//                 >
//                   <ListItemText primary={link.toUpperCase()} />
//                 </ListItemButton>
//               </ListItem>
//             ))}
//           </List>

//           <Divider sx={{ my: 2 }} />

//           {userInfo ? (
//             <>
//               <ListItemButton component={Link} to="/profile">
//                 <ListItemText primary="My Orders" />
//               </ListItemButton>
//               <ListItemButton component={Link} to="/wishlist">
//                 <ListItemText primary="My Wishlist" />
//               </ListItemButton>
//               <ListItemButton onClick={logoutHandler}>
//                 <ListItemText primary="Logout" />
//               </ListItemButton>
//             </>
//           ) : (
//             <ListItemButton component={Link} to="/login">
//               <ListItemText primary="Sign In" />
//             </ListItemButton>
//           )}
//         </Box>
//       </Drawer>
//     </>
//   );
// };

// export default Header;

// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useCart } from '../context/CartContext';
// import { useAuth } from '../context/AuthContext';
// import {
//   AppBar,
//   Box,
//   Toolbar,
//   Typography,
//   Button,
//   IconButton,
//   Badge,
//   Menu,
//   MenuItem,
//   TextField,
//   Container,
//   InputAdornment,
// } from '@mui/material';
// import { styled, keyframes } from '@mui/material/styles';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import AccountCircle from '@mui/icons-material/AccountCircle';
// import SearchIcon from '@mui/icons-material/Search';
// import DiamondIcon from '@mui/icons-material/Diamond';

// const navLinks = ['rings', 'chains', 'kada', 'bracelets', 'earrings', 'mangalsutras', 'choker-necklace'];

// // Animations
// const shimmer = keyframes`
//   0% { background-position: -1000px 0; }
//   100% { background-position: 1000px 0; }
// `;

// const float = keyframes`
//   0%, 100% { transform: translateY(0px); }
//   50% { transform: translateY(-3px); }
// `;

// const pulse = keyframes`
//   0%, 100% { transform: scale(1); }
//   50% { transform: scale(1.05); }
// `;

// const slideDown = keyframes`
//   from {
//     opacity: 0;
//     transform: translateY(-20px);
//   }
//   to {
//     opacity: 1;
//     transform: translateY(0);
//   }
// `;

// const glow = keyframes`
//   0%, 100% { 
//     box-shadow: 0 0 5px rgba(212, 175, 55, 0.3), 0 0 10px rgba(212, 175, 55, 0.2);
//   }
//   50% { 
//     box-shadow: 0 0 20px rgba(212, 175, 55, 0.6), 0 0 30px rgba(212, 175, 55, 0.4);
//   }
// `;

// // Styled Components
// const StyledAppBar = styled(AppBar)(({ shrunk }) => ({
//   background: shrunk 
//     ? 'rgba(255, 255, 255, 0.98)' 
//     : 'rgba(255, 255, 255, 0.95)',
//   backdropFilter: 'blur(20px)',
//   borderBottom: '1px solid rgba(212, 175, 55, 0.1)',
//   boxShadow: shrunk 
//     ? '0 4px 30px rgba(0, 0, 0, 0.1)' 
//     : '0 2px 15px rgba(0, 0, 0, 0.05)',
//   transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
//   position: 'relative',
//   '&::before': {
//     content: '""',
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     height: '2px',
//     background: 'linear-gradient(90deg, transparent, #d4af37, #f0d97d, #d4af37, transparent)',
//     animation: `${shimmer} 3s infinite linear`,
//     backgroundSize: '1000px 100%',
//   },
// }));

// const LogoText = styled(Typography)(({ shrunk }) => ({
//   textDecoration: 'none',
//   background: 'linear-gradient(135deg, #d4af37 0%, #f0d97d 50%, #d4af37 100%)',
//   backgroundClip: 'text',
//   WebkitBackgroundClip: 'text',
//   WebkitTextFillColor: 'transparent',
//   fontWeight: 800,
//   letterSpacing: 2,
//   fontSize: shrunk ? '1.3rem' : '1.8rem',
//   transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
//   textTransform: 'uppercase',
//   position: 'relative',
//   display: 'flex',
//   alignItems: 'center',
//   gap: 1,
//   animation: `${float} 3s ease-in-out infinite`,
//   '&:hover': {
//     letterSpacing: 3,
//     filter: 'drop-shadow(0 0 10px rgba(212, 175, 55, 0.5))',
//   },
// }));

// const SearchField = styled(TextField)(({ shrunk }) => ({
//   '& .MuiOutlinedInput-root': {
//     borderRadius: '50px',
//     backgroundColor: '#fff',
//     fontSize: shrunk ? '0.85rem' : '1rem',
//     height: shrunk ? 40 : 48,
//     transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
//     border: '2px solid transparent',
//     boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
//     '&:hover': {
//       boxShadow: '0 4px 20px rgba(212, 175, 55, 0.2)',
//       borderColor: 'rgba(212, 175, 55, 0.3)',
//     },
//     '&.Mui-focused': {
//       boxShadow: '0 6px 30px rgba(212, 175, 55, 0.3)',
//       borderColor: '#d4af37',
//       backgroundColor: '#fffef9',
//     },
//     '& fieldset': {
//       border: 'none',
//     },
//   },
// }));

// const CartIconButton = styled(IconButton)({
//   color: '#1a1a1a',
//   transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
//   position: 'relative',
//   '&:hover': {
//     transform: 'scale(1.15) rotate(5deg)',
//     color: '#d4af37',
//     '& .MuiBadge-badge': {
//       animation: `${pulse} 0.5s ease-in-out`,
//     },
//   },
//   '&::before': {
//     content: '""',
//     position: 'absolute',
//     width: '100%',
//     height: '100%',
//     borderRadius: '50%',
//     background: 'radial-gradient(circle, rgba(212, 175, 55, 0.2), transparent)',
//     transform: 'scale(0)',
//     transition: 'transform 0.3s ease',
//   },
//   '&:hover::before': {
//     transform: 'scale(1.5)',
//   },
// });

// const StyledBadge = styled(Badge)({
//   '& .MuiBadge-badge': {
//     background: 'linear-gradient(135deg, #d4af37 0%, #f0d97d 100%)',
//     color: '#fff',
//     fontWeight: 700,
//     boxShadow: '0 2px 10px rgba(212, 175, 55, 0.5)',
//     animation: `${glow} 2s ease-in-out infinite`,
//   },
// });

// const UserButton = styled(Button)(({ shrunk }) => ({
//   fontWeight: 700,
//   textTransform: 'none',
//   borderRadius: '30px',
//   padding: '8px 24px',
//   fontSize: shrunk ? '0.85rem' : '0.95rem',
//   color: '#1a1a1a',
//   background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(240, 217, 125, 0.1) 100%)',
//   border: '2px solid transparent',
//   transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
//   position: 'relative',
//   overflow: 'hidden',
//   '&::before': {
//     content: '""',
//     position: 'absolute',
//     top: 0,
//     left: '-100%',
//     width: '100%',
//     height: '100%',
//     background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
//     transition: 'left 0.5s',
//   },
//   '&:hover': {
//     background: 'linear-gradient(135deg, #d4af37 0%, #f0d97d 100%)',
//     borderColor: '#d4af37',
//     color: '#fff',
//     transform: 'translateY(-2px)',
//     boxShadow: '0 6px 20px rgba(212, 175, 55, 0.4)',
//     '&::before': {
//       left: '100%',
//     },
//   },
// }));

// const NavButton = styled(Button)(({ shrunk }) => ({
//   color: '#1a1a1a',
//   fontWeight: 700,
//   position: 'relative',
//   textTransform: 'uppercase',
//   letterSpacing: 1.2,
//   fontSize: shrunk ? '0.75rem' : '0.85rem',
//   padding: '6px 16px',
//   transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
//   '&::before': {
//     content: '""',
//     position: 'absolute',
//     width: '0',
//     height: '3px',
//     left: '50%',
//     bottom: 0,
//     background: 'linear-gradient(90deg, #d4af37, #f0d97d, #d4af37)',
//     transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
//     transform: 'translateX(-50%)',
//     borderRadius: '2px',
//   },
//   '&::after': {
//     content: '""',
//     position: 'absolute',
//     width: '100%',
//     height: '100%',
//     top: 0,
//     left: 0,
//     background: 'radial-gradient(circle, rgba(212, 175, 55, 0.1), transparent)',
//     opacity: 0,
//     transition: 'opacity 0.3s ease',
//   },
//   '&:hover': {
//     color: '#d4af37',
//     transform: 'translateY(-2px)',
//     '&::before': {
//       width: '100%',
//     },
//     '&::after': {
//       opacity: 1,
//     },
//   },
// }));

// const NavBar = styled(Box)(({ shrunk }) => ({
//   width: '100%',
//   background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(250, 250, 250, 0.98) 100%)',
//   borderTop: '1px solid rgba(212, 175, 55, 0.15)',
//   borderBottom: '1px solid rgba(212, 175, 55, 0.15)',
//   backdropFilter: 'blur(10px)',
//   animation: `${slideDown} 0.5s ease-out`,
//   boxShadow: shrunk 
//     ? '0 2px 15px rgba(0, 0, 0, 0.05)' 
//     : '0 2px 10px rgba(0, 0, 0, 0.03)',
// }));

// const StyledMenu = styled(Menu)({
//   '& .MuiPaper-root': {
//     borderRadius: '12px',
//     marginTop: '8px',
//     minWidth: 180,
//     boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
//     border: '1px solid rgba(212, 175, 55, 0.2)',
//     background: 'linear-gradient(135deg, #ffffff 0%, #fafafa 100%)',
//     backdropFilter: 'blur(10px)',
//   },
//   '& .MuiMenuItem-root': {
//     padding: '12px 20px',
//     fontWeight: 600,
//     fontSize: '0.9rem',
//     color: '#1a1a1a',
//     transition: 'all 0.3s ease',
//     '&:hover': {
//       background: 'linear-gradient(90deg, rgba(212, 175, 55, 0.1), rgba(240, 217, 125, 0.1))',
//       color: '#d4af37',
//       paddingLeft: '24px',
//     },
//   },
// });

// const DiamondIconStyled = styled(DiamondIcon)(({ shrunk }) => ({
//   fontSize: shrunk ? '1.5rem' : '2rem',
//   transition: 'all 0.4s ease',
//   filter: 'drop-shadow(0 2px 4px rgba(212, 175, 55, 0.3))',
// }));

// const Header = () => {
//   const navigate = useNavigate();
//   const { cartItems } = useCart();
//   const { userInfo, logout } = useAuth();
//   const [keyword, setKeyword] = useState('');
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [isShrunk, setIsShrunk] = useState(false);

//   const cartItemCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

//   const handleMenu = (event) => setAnchorEl(event.currentTarget);
//   const handleClose = () => setAnchorEl(null);

//   const logoutHandler = () => {
//     logout();
//     handleClose();
//     navigate('/login');
//   };

//   const searchHandler = (e) => {
//     e.preventDefault();
//     if (keyword.trim()) {
//       navigate(`/search/${keyword}`);
//       setKeyword('');
//     } else {
//       navigate('/');
//     }
//   };

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 80) {
//         setIsShrunk(true);
//       } else {
//         setIsShrunk(false);
//       }
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   return (
//     <StyledAppBar position="fixed" elevation={0} shrunk={isShrunk}>
//       <Container maxWidth="xl">
//         <Toolbar
//           disableGutters
//           sx={{
//             py: isShrunk ? 0.8 : 2,
//             justifyContent: 'space-between',
//             transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
//           }}
//         >
//           {/* Logo */}
//           <LogoText
//             variant="h6"
//             component={Link}
//             to="/"
//             shrunk={isShrunk}
//           >
//             <DiamondIconStyled shrunk={isShrunk} />
//             Aura Jewels
//           </LogoText>

//           {/* Search */}
//           <Box
//             component="form"
//             onSubmit={searchHandler}
//             sx={{ flexGrow: 1, mx: 4, maxWidth: 550 }}
//           >
//             <SearchField
//               variant="outlined"
//               size="small"
//               fullWidth
//               placeholder="Search for exquisite jewellery..."
//               value={keyword}
//               onChange={(e) => setKeyword(e.target.value)}
//               shrunk={isShrunk}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <SearchIcon sx={{ color: '#d4af37', fontSize: '1.4rem' }} />
//                   </InputAdornment>
//                 ),
//               }}
//             />
//           </Box>

//           {/* Right Actions */}
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
//             {/* Cart */}
//             <CartIconButton
//               component={Link}
//               to="/cart"
//               size="large"
//             >
//               <StyledBadge badgeContent={cartItemCount} color="primary">
//                 <ShoppingCartIcon sx={{ fontSize: '1.6rem' }} />
//               </StyledBadge>
//             </CartIconButton>

//             {/* User Menu */}
//             {userInfo ? (
//               <>
//                 <UserButton
//                   onClick={handleMenu}
//                   startIcon={<AccountCircle />}
//                   shrunk={isShrunk}
//                 >
//                   {userInfo.name}
//                 </UserButton>
//                 <StyledMenu
//                   anchorEl={anchorEl}
//                   open={Boolean(anchorEl)}
//                   onClose={handleClose}
//                   anchorOrigin={{
//                     vertical: 'bottom',
//                     horizontal: 'right',
//                   }}
//                   transformOrigin={{
//                     vertical: 'top',
//                     horizontal: 'right',
//                   }}
//                 >
//                   <MenuItem component={Link} to="/profile" onClick={handleClose}>
//                     My Orders
//                   </MenuItem>
//                   <MenuItem component={Link} to="/wishlist" onClick={handleClose}>
//                     My Wishlist
//                   </MenuItem>
//                   <MenuItem onClick={logoutHandler}>Logout</MenuItem>
//                 </StyledMenu>
//               </>
//             ) : (
//               <UserButton
//                 component={Link}
//                 to="/login"
//                 shrunk={isShrunk}
//               >
//                 Sign In
//               </UserButton>
//             )}
//           </Box>
//         </Toolbar>
//       </Container>

//       {/* Navigation Links */}
//       <NavBar shrunk={isShrunk}>
//         <Container maxWidth="lg">
//           <Toolbar
//             component="nav"
//             variant="dense"
//             sx={{
//               justifyContent: 'center',
//               gap: 1,
//               minHeight: isShrunk ? 40 : 52,
//               transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
//               flexWrap: 'wrap',
//             }}
//           >
//             {navLinks.map((link, index) => (
//               <NavButton
//                 key={link}
//                 component={Link}
//                 to={`/category/${link}`}
//                 shrunk={isShrunk}
//                 sx={{
//                   animation: `${slideDown} ${0.3 + index * 0.1}s ease-out backwards`,
//                 }}
//               >
//                 {link}
//               </NavButton>
//             ))}
//           </Toolbar>
//         </Container>
//       </NavBar>
//     </StyledAppBar>
//   );
// };

// export default Header;


import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
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
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  useMediaQuery,
  Grow,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const navLinks = [
  "rings",
  "chains",
  "kada",
  "bracelets",
  "earrings",
  "mangalsutras",
  "choker-necklace",
];

const Header = () => {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const { userInfo, logout } = useAuth();

  const [keyword, setKeyword] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [isShrunk, setIsShrunk] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const cartItemCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const logoutHandler = () => {
    logout();
    handleClose();
    navigate("/login");
  };

  const searchHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
      setKeyword("");
    } else {
      navigate("/");
    }
    setMobileSearchOpen(false);
  };

  const toggleDrawer = (open) => () => setDrawerOpen(open);

  // Shrink navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsShrunk(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(8px)",
          borderBottom: "1px solid rgba(0,0,0,0.08)",
          transition: "all 0.3s ease",
          zIndex: 1200,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              py: isShrunk ? 0.5 : 1.5,
              justifyContent: "space-between",
              transition: "all 0.3s ease",
              position: "relative",
            }}
          >
            {/* Logo */}
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                textDecoration: "none",
                color: "primary.main",
                fontWeight: 700,
                letterSpacing: 1,
                fontSize: isShrunk ? "1.2rem" : "1.6rem",
                transition: "all 0.3s ease",
                "&:hover": { color: "secondary.main" },
              }}
            >
              Aura Jewels
            </Typography>

            {/* Desktop Search */}
            {!isMobile && (
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
                      borderRadius: "50px",
                      backgroundColor: "#fff",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
                      fontSize: isShrunk ? "0.85rem" : "1rem",
                      height: isShrunk ? 36 : 44,
                      transition: "all 0.3s ease",
                    },
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            )}

            {/* Right Actions */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {/* Mobile Search Toggle */}
              {isMobile && (
                <IconButton
                  onClick={() => setMobileSearchOpen((prev) => !prev)}
                  sx={{
                    color: "text.primary",
                    "&:hover": { transform: "scale(1.1)" },
                    zIndex: 140, // Higher than drawer
                  }}
                >
                  {mobileSearchOpen ? <CloseIcon /> : <SearchIcon />}
                </IconButton>
              )}

              {/* Cart */}
              <IconButton
                component={Link}
                to="/cart"
                size="large"
                sx={{
                  color: "text.primary",
                  transition: "transform 0.2s ease",
                  "&:hover": { transform: "scale(1.1)" },
                }}
              >
                <Badge badgeContent={cartItemCount} color="primary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>

              {/* User Menu */}
              {!isMobile && userInfo ? (
                <>
                  <Button
                    onClick={handleMenu}
                    startIcon={<AccountCircle />}
                    sx={{
                      fontWeight: 600,
                      textTransform: "none",
                      borderRadius: "30px",
                      px: 2,
                      color: "text.primary",
                    }}
                  >
                    {userInfo.name}
                  </Button>
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
                !isMobile && (
                  <Button
                    component={Link}
                    to="/login"
                    sx={{
                      fontWeight: 600,
                      textTransform: "none",
                      borderRadius: "30px",
                      px: 2,
                      color: "text.primary",
                    }}
                  >
                    Sign In
                  </Button>
                )
              )}

              {/* Mobile Menu */}
              {isMobile && (
                <IconButton
                  onClick={toggleDrawer(true)}
                  sx={{ color: "text.primary", zIndex: 14000 }}
                >
                  <MenuIcon />
                </IconButton>
              )}
            </Box>
          </Toolbar>

          {/* Mobile Search Animated */}
          {isMobile && (
            <Grow in={mobileSearchOpen}>
              <Box
                component="form"
                onSubmit={searchHandler}
                sx={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  width: "100%",
                  backgroundColor: "#fff",
                  borderTop: "1px solid rgba(0,0,0,0.05)",
                  p: 1.5,
                  zIndex: 1200, // Below header, above content
                }}
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
                      borderRadius: "30px",
                      backgroundColor: "#fff",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                    },
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </Grow>
          )}
        </Container>

        {/* Desktop Navigation */}
        {/* {!isMobile && (
          <Box
            sx={{
              width: "100%",
              bgcolor: "rgba(255,255,255,0.95)",
              borderTop: "1px solid rgba(0,0,0,0.05)",
            }}
          >
            <Container maxWidth="lg">
              <Toolbar
                component="nav"
                variant="dense"
                sx={{
                  justifyContent: "center",
                  gap: 4,
                  minHeight: isShrunk ? 38 : 48,
                  transition: "all 0.3s ease",
                }}
              >
                {navLinks.map((link) => (
                  <Button
                    key={link}
                    component={Link}
                    to={`/category/${link}`}
                    sx={{
                      color: "text.primary",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      fontSize: isShrunk ? "0.75rem" : "0.85rem",
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        width: 0,
                        height: "2px",
                        left: 0,
                        bottom: -2,
                        bgcolor: "primary.main",
                        transition: "width 0.3s ease",
                      },
                      "&:hover::after": { width: "100%" },
                    }}
                  >
                    {link}
                  </Button>
                ))}
              </Toolbar>
            </Container>
          </Box>
        )} */}

        {/* ✅ Desktop Navigation (Only visible on large screens) */}
{!isMobile && (
  <Box
  sx={{
    display: { xs: "none", md: "block" }, // hide on small screens
    width: "100%",
    bgcolor: "rgba(255,255,255,0.95)",
    borderTop: "1px solid rgba(0,0,0,0.05)",
  }}
>
   <Container maxWidth="lg">
    <Toolbar
      component="nav"
      variant="dense"
      sx={{
        justifyContent: "center",
        gap: 4,
        minHeight: isShrunk ? 38 : 48,
        transition: "all 0.3s ease",
      }}
    >
      {navLinks.map((link) => (
        <Button
          key={link}
          component={Link}
          to={`/category/${link}`}
          sx={{
            position: "relative",
            color: "text.primary",
            fontWeight: 600,
            textTransform: "uppercase",
            fontSize: isShrunk ? "0.75rem" : "0.85rem",
            "&::after": {
              content: '""',
              position: "absolute",
              width: 0,
              height: "2px",
              left: 0,
              bottom: -2,
              bgcolor: "primary.main",
              transition: "width 0.3s ease",
            },
            "&:hover::after": { width: "100%" },
          }}
        >
          {link}
        </Button>
      ))}
    </Toolbar>
  </Container>
  </Box>
)}

      </AppBar>

      {/* ✅ Fixed Mobile Drawer Menu */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: 280,
            backgroundColor: "#fff",
            zIndex: 2000,
            position: "fixed",
      boxShadow: " -2px 0 20px rgba(0,0,0,0.2)", // Always above everything
          },
        }}
      >
        <Box sx={{ p: 2, height: "100%", position: "relative" }}>
          {/* Drawer Header */}
          <Box
            sx={{
              // display: "flex",
              // justifyContent: "space-between",
              // alignItems: "center",
              // mb: 2,
              display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 2,
        position: "sticky",
        top: 0,
        backgroundColor: "#fff",
        zIndex: 2100,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Menu
            </Typography>
            <IconButton onClick={toggleDrawer(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Divider sx={{ mb: 2 }} />

          <List>
            {navLinks.map((link) => (
              <ListItem key={link} disablePadding>
                <ListItemButton
                  component={Link}
                  to={`/category/${link}`}
                  onClick={toggleDrawer(false)}
                >
                  <ListItemText primary={link.toUpperCase()} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Divider sx={{ my: 2 }} />

          {userInfo ? (
            <>
              <ListItemButton component={Link} to="/profile" onClick={toggleDrawer(false)}>
                <ListItemText primary="My Orders" />
              </ListItemButton>
              <ListItemButton component={Link} to="/wishlist" onClick={toggleDrawer(false)}>
                <ListItemText primary="My Wishlist" />
              </ListItemButton>
              {/* <ListItemButton
                onClick={() => {
                  logoutHandler();
                  setDrawerOpen(false);
                }}
              >
                <ListItemText primary="Logout" />
              </ListItemButton> */}
               <Box sx={{ mt: 3, textAlign: "center" }}>
      <Button
        onClick={() => {
          logoutHandler();
          setDrawerOpen(false);
        }}
        variant="contained"
        fullWidth
        sx={{
          background: "linear-gradient(90deg, #b8860b, #daa520)",
          color: "#fff",
          fontWeight: 600,
          textTransform: "none",
          borderRadius: "10px",
          py: 1,
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          "&:hover": {
            background: "linear-gradient(90deg, #daa520, #ffd700)",
          },
        }}
      >
        Logout
      </Button>
    </Box>
            </>
          ) : (
            // <ListItemButton
            //   component={Link}
            //   to="/login"
            //   onClick={toggleDrawer(false)}
            // >
            //   <ListItemText primary="Sign In" />
            // </ListItemButton>
            <Box sx={{ mt: 3, textAlign: "center" }}>
    <Button
      component={Link}
      to="/login"
      onClick={toggleDrawer(false)}
      variant="contained"
      fullWidth
      sx={{
        background: "linear-gradient(90deg, #b8860b, #daa520)",
        color: "#fff",
        fontWeight: 600,
        textTransform: "none",
        borderRadius: "10px",
        py: 1,
        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        "&:hover": {
          background: "linear-gradient(90deg, #daa520, #ffd700)",
        },
      }}
    >
      Sign In
    </Button>
  </Box>
          )}
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
