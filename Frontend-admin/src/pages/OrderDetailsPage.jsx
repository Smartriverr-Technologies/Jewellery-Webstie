// import React from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import axios from 'axios';
// import { useAuth } from '../context/AuthContext';
// import { Container, Paper, Typography, Grid, Box, CircularProgress, Alert, Button, Divider, List, ListItem, ListItemAvatar, Avatar, ListItemText } from '@mui/material';
// import api from '../api/axiosConfig';
// // API Functions
// const fetchOrderDetails = async ({ queryKey, token }) => {
//   const [_key, orderId] = queryKey;
//   const config = { headers: { Authorization: `Bearer ${token}` } };
//   const { data } = await api.get(`/api/orders/${orderId}`, config);
//   return data;
// };

// const markAsDelivered = async ({ orderId, token }) => {
//   const config = { headers: { Authorization: `Bearer ${token}` } };
//   const { data } = await api.put(`/api/orders/${orderId}/deliver`, {}, config);
//   return data;
// };

// const OrderDetailsPage = () => {
//   const { id: orderId } = useParams();
//   const { userInfo } = useAuth();
//   const queryClient = useQueryClient();

//   const { data: order, isLoading, isError, error } = useQuery({
//     queryKey: ['orderDetails', orderId],
//     queryFn: () => fetchOrderDetails({ queryKey: ['orderDetails', orderId], token: userInfo.token }),
//     enabled: !!userInfo,
//   });

//   const deliverMutation = useMutation({
//     mutationFn: markAsDelivered,
//     onSuccess: () => {
//       queryClient.invalidateQueries(['orderDetails', orderId]);
//       alert('Order marked as delivered!');
//     },
//     onError: (err) => alert(err.response?.data?.message || 'Failed to update order'),
//   });

//   const deliverHandler = () => {
//     deliverMutation.mutate({ orderId, token: userInfo.token });
//   };

//   if (isLoading) return <CircularProgress />;
//   if (isError) return <Alert severity="error">{error.message}</Alert>;
//   if (!order) return null;

//   return (
//     <Container sx={{ py: 4 }}>
//       <Typography variant="h4" gutterBottom>Order Details</Typography>
//       <Typography variant="body1" gutterBottom>Order ID: {order._id}</Typography>
//       <Grid container spacing={4} sx={{ mt: 2 }}>
//         <Grid item md={8} xs={12}>
//           <Paper sx={{ p: 2, mb: 2 }}>
//             <Typography variant="h6" gutterBottom>Shipping Information</Typography>
//             <Typography><strong>User:</strong> {order.user.name} ({order.user.email})</Typography>
//             <Typography><strong>Phone:</strong> {order.shippingAddress.phone}</Typography>
//             <Typography><strong>Address:</strong> {`${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.postalCode}, ${order.shippingAddress.country}`}</Typography>
//             {order.isDelivered ? <Alert severity="success" sx={{ mt: 1 }}>Delivered on {new Date(order.deliveredAt).toLocaleDateString('en-GB')}</Alert> : <Alert severity="warning" sx={{ mt: 1 }}>Not Delivered</Alert>}
//           </Paper>
//           <Paper sx={{ p: 2, mb: 2 }}>
//             <Typography variant="h6" gutterBottom>Payment Information</Typography>
//             <Typography><strong>Method:</strong> {order.paymentMethod}</Typography>
//             {order.isPaid ? <Alert severity="success" sx={{ mt: 1 }}>Paid on {new Date(order.paidAt).toLocaleDateString()}</Alert> : <Alert severity="error" sx={{ mt: 1 }}>Not Paid</Alert>}
//           </Paper>
//           <Paper sx={{ p: 2 }}>
//             <Typography variant="h6" gutterBottom>Order Items</Typography>
//             <List>
//               {order.orderItems.map(item => (
//                 <ListItem key={item._id} divider>
//                   <ListItemAvatar><Avatar variant="square" 
//                   src={
//                         item.image?.startsWith('http')
//                           ? item.image
//                           : `${import.meta.env.VITE_API_URL || 'http://localhost:4000'}${item.image}`
//                       } />  
//                   </ListItemAvatar>
//                   <ListItemText primary={<Link to={`/product/slug/${item.slug}`} >{item.name}</Link>} />
//                   <Typography>{item.qty} x ₹{item.price} = ₹{(item.qty * item.price).toFixed(2)}</Typography>
//                 </ListItem>
//               ))}
//             </List>
//           </Paper>
//         </Grid>
//         <Grid item md={4} xs={12}>
//           <Paper sx={{ p: 2 }}>
//             <Typography variant="h5" gutterBottom>Order Summary</Typography>
//             <Divider sx={{ mb: 2 }} />
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}><Typography>Items:</Typography><Typography>₹{order.itemsPrice.toFixed(2)}</Typography></Box>
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}><Typography>Shipping:</Typography><Typography>₹{order.shippingPrice.toFixed(2)}</Typography></Box>
//             {/* <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}><Typography>Tax:</Typography><Typography>${order.taxPrice.toFixed(2)}</Typography></Box> */}
//             <Divider sx={{ mb: 2 }} />
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}><Typography variant="h6">Total:</Typography><Typography variant="h6">₹{order.totalPrice.toFixed(2)}</Typography></Box>
//             {order.isPaid || !order.isDelivered && (
//               <Button fullWidth variant="contained" onClick={deliverHandler} disabled={deliverMutation.isLoading}>
//                 {deliverMutation.isLoading ? 'Marking...' : 'Mark As Delivered'}
//               </Button>
//             )}
//           </Paper>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };
// export default OrderDetailsPage;

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../context/AuthContext';
import {
  Container,
  Paper,
  Typography,
  Grid,
  Box,
  CircularProgress,
  Alert,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from '@mui/material';
import api from '../api/axiosConfig';

// --- API Functions ---
const fetchOrderDetails = async ({ queryKey, token }) => {
  const [_key, orderId] = queryKey;
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const { data } = await api.get(`/api/orders/${orderId}`, config);
  return data;
};

const markAsDelivered = async ({ orderId, token }) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const { data } = await api.put(`/api/orders/${orderId}/deliver`, {}, config);
  return data;
};

// --- Component ---
const OrderDetailsPage = () => {
  const { id: orderId } = useParams();
  const { userInfo } = useAuth();
  const queryClient = useQueryClient();

  const { data: order, isLoading, isError, error } = useQuery({
    queryKey: ['orderDetails', orderId],
    queryFn: () =>
      fetchOrderDetails({ queryKey: ['orderDetails', orderId], token: userInfo.token }),
    enabled: !!userInfo,
  });

  const deliverMutation = useMutation({
    mutationFn: markAsDelivered,
    onSuccess: () => {
      queryClient.invalidateQueries(['orderDetails', orderId]);
      alert('✅ Order marked as delivered!');
    },
    onError: (err) => alert(err.response?.data?.message || 'Failed to update order'),
  });

  const deliverHandler = () => {
    deliverMutation.mutate({ orderId, token: userInfo.token });
  };

  if (isLoading)
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  if (isError)
    return (
      <Alert severity="error" sx={{ m: 3 }}>
        {error.message}
      </Alert>
    );
  if (!order) return null;

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Order Details
      </Typography>
      <Typography variant="body1" gutterBottom>
        Order ID: {order._id}
      </Typography>

      <Grid container spacing={4} sx={{ mt: 2 }}>
        {/* Left Section */}
        <Grid item md={8} xs={12}>
          {/* Shipping */}
          <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              Shipping Information
            </Typography>
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
              <Alert severity="success" sx={{ mt: 1 }}>
                Delivered on {new Date(order.deliveredAt).toLocaleDateString('en-GB')}
              </Alert>
            ) : (
              <Alert severity="warning" sx={{ mt: 1 }}>
                Not Delivered
              </Alert>
            )}
          </Paper>

          {/* Payment */}
          <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              Payment Information
            </Typography>
            <Typography>
              <strong>Method:</strong> {order.paymentMethod}
            </Typography>
            {order.isPaid ? (
              <Alert severity="success" sx={{ mt: 1 }}>
                Paid on {new Date(order.paidAt).toLocaleDateString()}
              </Alert>
            ) : (
              <Alert severity="error" sx={{ mt: 1 }}>
                Not Paid
              </Alert>
            )}
          </Paper>

          {/* Items */}
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Order Items
            </Typography>
            <List>
              {order.orderItems.map((item) => (
                <ListItem key={item._id} divider>
                  <ListItemAvatar>
                    <Avatar
                      variant="rounded"
                      sx={{ width: 64, height: 64, mr: 2 }}
                      // ✅ Smart fix for Cloudinary + local images
                      src={
                        item.image?.startsWith('http')
                          ? item.image
                          : `${import.meta.env.VITE_API_URL || 'http://localhost:4000'}${item.image}`
                      }
                      alt={item.name}
                    />
                  </ListItemAvatar>

                  <ListItemText
                    primary={
                      <a
  href={`${import.meta.env.VITE_CUSTOMER_SITE_URL}/product/slug/${item.slug}`}
  target="_blank"
  rel="noopener noreferrer"
   style={{
                          textDecoration: 'none',
                          color: '#333',
                          fontWeight: 600,
                        }}
>
  {item.name}

</a>

                    }
                    secondary={`${item.qty} x ₹${item.price}`}
                  />

                  <Typography>₹{(item.qty * item.price).toFixed(2)}</Typography>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Right Section */}
        <Grid item md={4} xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h5" gutterBottom>
              Order Summary
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography>Items:</Typography>
              <Typography>₹{order.itemsPrice.toFixed(2)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography>Shipping:</Typography>
              <Typography>₹{order.shippingPrice.toFixed(2)}</Typography>
            </Box>

            <Divider sx={{ mb: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">Total:</Typography>
              <Typography variant="h6" color="primary">
                ₹{order.totalPrice.toFixed(2)}
              </Typography>
            </Box>

            {!order.isDelivered && (
              <Button
                fullWidth
                variant="contained"
                onClick={deliverHandler}
                disabled={deliverMutation.isLoading}
                sx={{
                  bgcolor: '#b8860b',
                  '&:hover': { bgcolor: '#9c750b' },
                }}
              >
                {deliverMutation.isLoading ? 'Marking...' : 'Mark As Delivered'}
              </Button>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default OrderDetailsPage;
