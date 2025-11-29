import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Box,
  Typography,
  CircularProgress,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Fade,
  Tooltip
} from '@mui/material';
import './OrderHistoryPage.css';
import api from '../api/axiosConfig';

const OrderHistoryPage = () => {
  const { userInfo } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const isMobile = window.innerWidth < 768;

  useEffect(() => {
    if (!userInfo?.token) {
      navigate('/login?redirect=/orders');
      return;
    }

    const fetchOrders = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        const { data } = await api.get('/api/orders/myorders', config);
        setOrders(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load orders.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userInfo, navigate]);

  if (loading)
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress size={60} />
      </Box>
    );

  if (error)
    return (
      <Typography color="error" sx={{ mt: 5, textAlign: 'center' }}>
        {error}
      </Typography>
    );

  return (
    <Box sx={{ maxWidth: '1200px', mx: 'auto', my: 4, px: 3 }}>
      <Typography variant="h4" fontWeight={700} sx={{ mb: 3, color: '#B8860B' }}>
        My Orders
      </Typography>

      {orders.length === 0 ? (
        <Typography variant="body1" sx={{ textAlign: 'center', mt: 5 }}>
          No orders found.{' '}
          <Link to="/" style={{ color: '#B8860B', fontWeight: '600' }}>
            Start Shopping
          </Link>
        </Typography>
      ) : (
        <>
          {/* 📱 MOBILE VIEW */}
          {isMobile && (
            <Fade in timeout={400}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {orders.map((order) => (
                  <Paper
                    key={order._id}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                    }}
                  >
                    <Typography fontWeight={600} sx={{ fontSize: '14px', mb: 1 }}>
                      Order: #{order._id.slice(-6)}
                    </Typography>

                    <Typography sx={{ fontSize: '14px', color: '#555' }}>
                      Date: {new Date(order.createdAt).toLocaleDateString()}
                    </Typography>

                    <Typography sx={{ fontSize: '15px', fontWeight: 600, mt: 1 }}>
                      Total: ₹{order.totalPrice}
                    </Typography>

                    {/* Status row */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                      <Typography sx={{ color: order.isPaid ? '#28a745' : '#dc3545' }}>
                        {order.isPaid ? 'Paid ✔️' : 'Not Paid ❌'}
                      </Typography>
                      <Typography sx={{ color: order.isDelivered ? '#28a745' : '#dc3545' }}>
                        {order.isDelivered ? 'Delivered 📦' : 'Pending ⏳'}
                      </Typography>
                    </Box>

                    <Button
                      fullWidth
                      variant="contained"
                      sx={{
                        mt: 2,
                        background: 'linear-gradient(135deg, #B8860B, #FFD700)',
                        textTransform: 'none',
                        fontWeight: 600,
                      }}
                      component={Link}
                      to={`/order/${order._id}`}
                    >
                      View Details
                    </Button>
                  </Paper>
                ))}
              </Box>
            </Fade>
          )}

          {/* 🖥 DESKTOP VIEW */}
          {!isMobile && (
            <Fade in timeout={400}>
              <TableContainer component={Paper} sx={{ boxShadow: '0 5px 20px rgba(0,0,0,0.1)' }}>
                <Table>
                  <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>ID</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Total</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Paid</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Delivered</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Action</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order._id}>
                        <TableCell>{order._id}</TableCell>
                        <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>₹{order.totalPrice}</TableCell>
                        <TableCell>
                          <Tooltip title={order.isPaid ? 'Paid' : 'Not Paid'}>
                            <span style={{ color: order.isPaid ? '#28a745' : '#dc3545' }}>
                              {order.isPaid ? '✔️' : '❌'}
                            </span>
                          </Tooltip>
                        </TableCell>
                        <TableCell>
                          <Tooltip title={order.isDelivered ? 'Delivered' : 'Not Delivered'}>
                            <span style={{ color: order.isDelivered ? '#28a745' : '#dc3545' }}>
                              {order.isDelivered ? '✔️' : '❌'}
                            </span>
                          </Tooltip>
                        </TableCell>
                        <TableCell>
                          <Link to={`/order/${order._id}`} style={{ textDecoration: 'none' }}>
                            <Button
                              variant="contained"
                              sx={{
                                background: 'linear-gradient(135deg, #B8860B, #FFD700)',
                                textTransform: 'none',
                                fontWeight: 600,
                              }}
                            >
                              Details
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Fade>
          )}
        </>
      )}
    </Box>
  );
};

export default OrderHistoryPage;
