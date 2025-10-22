// import React, { useEffect, useState  } from 'react';
// import { Link , useParams } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import axios from 'axios';
// import './OrderDetailsPage.css';

// const OrderDetailsPage = () => {
//   const { id: orderId } = useParams();
//   const { userInfo } = useAuth();

//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchOrder = async () => {
//       try {
//         const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
//         const { data } = await axios.get(`http://localhost:4000/api/orders/${orderId}`, config);
//         setOrder(data);
//       } catch (err) {
//         setError(err.response?.data?.message || 'Failed to fetch order');
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (userInfo) fetchOrder();
//   }, [orderId, userInfo]);

//   if (loading) return <div className="loading">Loading order details...</div>;
//   if (error) return <div className="error-message">{error}</div>;
//   if (!order) return <div className="error-message">Order not found.</div>;

//   const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2);

//   return (
//     <div className="order-details-container">
//       <h1 className="page-title">Order Details</h1>

//       <div className="order-grid">

//         {/* Left Section: Order Details */}
//         <div className="order-details-left">
//           {/* Shipping */}
//           <div className="card animate-fade">
//             <h2>Shipping</h2>
//             <p><strong>Name: </strong>{order.user.name}</p>
//             <p><strong>Email: </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
//             <p><strong>Phone: </strong>{order.shippingAddress.phone}</p>
//             <p><strong>Address: </strong>{order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}</p>
//             <div className={`status-box ${order.isDelivered ? 'success' : 'pending'} animate-status`}>
//               {order.isDelivered ? `Delivered on ${new Date(order.deliveredAt).toLocaleDateString()}` : 'Not Delivered'}
//             </div>
//           </div>

//           {/* Payment */}
//           <div className="card animate-fade">
//             <h2>Payment Method</h2>
//             <p><strong>Method: </strong>{order.paymentMethod}</p>
//             <div className={`status-box ${order.isPaid ? 'success' : 'pending'} animate-status`}>
//               {order.isPaid ? `Paid on ${new Date(order.paidAt).toLocaleDateString()}` : 'Not Paid'}
//             </div>
//           </div>

//           {/* Order Items */}
//           <div className="card animate-fade">
//             <h2>Order Items</h2>
//             {order.orderItems.map((item) => (
//               <div key={item._id} className="order-item animate-hover">
//                 <img src={`http://localhost:4000${item.image}`} alt={item.name} />
//                 <Link to={`/product/${item.product}`} className="item-name">{item.name}</Link>
//                 <div className="item-price">{item.qty} x ${item.price} = ${addDecimals(item.qty * item.price)}</div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Right Section: Order Summary */}
//         <div className="order-summary card animate-fade">
//           <h2>Order Summary</h2>
//           <div className="summary-row"><span>Items:</span><span>${order.itemsPrice}</span></div>
//           <div className="summary-row"><span>Shipping:</span><span>${order.shippingPrice}</span></div>
//           <div className="summary-row"><span>Tax:</span><span>${order.taxPrice}</span></div>
//           <div className="summary-row total"><span>Total:</span><span>${order.totalPrice}</span></div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default OrderDetailsPage;

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useSnackbar } from 'notistack';
import {
  Box,
  Typography,
  Button,
  Grid,
  Container,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Alert,
  CircularProgress,
} from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import api from '../api/axiosConfig';
// --- API Functions ---
const fetchOrderDetails = async ({ queryKey, token }) => {
  const [_key, orderId] = queryKey;
  if (!token) return null;
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const { data } = await api.get(`/api/orders/${orderId}`, config);
  return data;
};

// --- Component ---
const OrderDetailsPage = () => {
  const { id: orderId } = useParams();
  const { userInfo } = useAuth();
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const { data: order, isLoading, isError, error } = useQuery({
    queryKey: ['orderDetails', orderId],
    queryFn: () => fetchOrderDetails({ queryKey: ['orderDetails', orderId], token: userInfo.token }),
    enabled: !!userInfo,
  });

  if (isLoading)
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}>
        <CircularProgress />
      </Box>
    );

  if (isError)
    return (
      <Alert severity="error" sx={{ m: 3 }}>
        {error.response?.data?.message || 'Could not load order details.'}
      </Alert>
    );

  if (!order) return null;

  return (
    <Container sx={{ my: 5 }}>
      {/* Page Header */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h3" sx={{ fontWeight: 800, mb: 1, color: '#B8860B' }}>
          Order Details
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Order ID: {order._id}
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Left Section */}
        <Grid item md={8} xs={12}>
          {/* Shipping Info */}
          <Paper
            sx={{
              p: 3,
              mb: 3,
              borderRadius: 3,
              boxShadow: '0px 4px 20px rgba(0,0,0,0.08)',
            }}
          >
            <Box display="flex" alignItems="center" mb={2}>
              <LocalShippingIcon sx={{ color: '#B8860B', mr: 1 }} />
              <Typography variant="h6" fontWeight={700}>
                Shipping Information
              </Typography>
            </Box>
            <Typography>
              <strong>User:</strong> {order.user.name} ({order.user.email})
            </Typography>
            <Typography>
              <strong>Phone:</strong> {order.shippingAddress.phone}
            </Typography>
            <Typography>
              <strong>Address:</strong>{' '}
              {`${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.postalCode}, ${order.shippingAddress.country}`}
            </Typography>
            {order.isDelivered ? (
              <Alert severity="success" sx={{ mt: 2, borderRadius: 2 }}>
                Delivered on {new Date(order.deliveredAt).toLocaleDateString()}
              </Alert>
            ) : (
              <Alert severity="warning" sx={{ mt: 2, borderRadius: 2 }}>
                Not Delivered
              </Alert>
            )}
          </Paper>

          {/* Payment Info */}
          <Paper
            sx={{
              p: 3,
              mb: 3,
              borderRadius: 3,
              boxShadow: '0px 4px 20px rgba(0,0,0,0.08)',
            }}
          >
            <Box display="flex" alignItems="center" mb={2}>
              <CreditCardIcon sx={{ color: '#B8860B', mr: 1 }} />
              <Typography variant="h6" fontWeight={700}>
                Payment Information
              </Typography>
            </Box>
            <Typography>
              <strong>Method:</strong> {order.paymentMethod}
            </Typography>
            {order.isPaid ? (
              <Alert severity="success" sx={{ mt: 2, borderRadius: 2 }}>
                Paid on {new Date(order.paidAt).toLocaleDateString()}
              </Alert>
            ) : (
              <Alert severity="error" sx={{ mt: 2, borderRadius: 2 }}>
                Not Paid
              </Alert>
            )}
          </Paper>

          {/* Order Items */}
          <Paper
            sx={{
              p: 3,
              borderRadius: 3,
              boxShadow: '0px 4px 20px rgba(0,0,0,0.08)',
            }}
          >
            <Box display="flex" alignItems="center" mb={2}>
              <ShoppingBagIcon sx={{ color: '#B8860B', mr: 1 }} />
              <Typography variant="h6" fontWeight={700}>
                Order Items
              </Typography>
            </Box>
            <List disablePadding>
              {order.orderItems.map((item) => (
                <ListItem
                  key={item._id}
                  divider
                  sx={{
                    py: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      variant="rounded"
                      src={
            item.image?.startsWith('http')
              ? item.image
              : `${import.meta.env.VITE_API_URL || 'http://localhost:4000'}${item.image}`
          }
                      
                      sx={{ width: 64, height: 64, mr: 2, borderRadius: 2 }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Link
                        to={`/product/slug/${item.slug}`}
                        style={{ textDecoration: 'none', fontWeight: 600, color: '#333' }}
                      >
                        {item.name}
                      </Link>
                    }
                    secondary={`${item.qty} x ₹${item.price.toFixed(2)}`}
                  />
                  <Typography variant="subtitle1" fontWeight={600}>
                    ₹{(item.qty * item.price).toFixed(2)}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Right Section - Order Summary */}
        <Grid item md={4} xs={12}>
          <Paper
            elevation={4}
            sx={{
              p: 3,
              borderRadius: 3,
              position: { md: 'sticky' },
              top: 90,
              boxShadow: '0px 6px 24px rgba(0,0,0,0.12)',
            }}
          >
            <Box display="flex" alignItems="center" mb={2}>
              <ReceiptLongIcon sx={{ color: '#B8860B', mr: 1 }} />
              <Typography variant="h6" fontWeight={700}>
                Order Summary
              </Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography>Items:</Typography>
              <Typography>₹{order.itemsPrice.toFixed(2)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography>Shipping:</Typography>
              <Typography>₹{order.shippingPrice.toFixed(2)}</Typography>
            </Box>
            {/* <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography>Tax:</Typography>
              <Typography>₹{order.taxPrice.toFixed(2)}</Typography>
            </Box> */}
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6" fontWeight={700}>
                Total:
              </Typography>
              <Typography variant="h6" fontWeight={700} color="#B8860B">
                ₹{order.totalPrice.toFixed(2)}
              </Typography>
            </Box>

            {!order.isPaid && order.paymentMethod === 'Razorpay' && (
              <Button
                fullWidth
                variant="contained"
                sx={{
                  mt: 2,
                  bgcolor: '#B8860B',
                  color: '#fff',
                  fontWeight: 600,
                  '&:hover': { bgcolor: '#9c6d08' },
                }}
              >
                Pay Now with Razorpay
              </Button>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default OrderDetailsPage;
