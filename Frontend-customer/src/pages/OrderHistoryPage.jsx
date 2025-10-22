import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Box, Typography, CircularProgress, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Fade, Tooltip } from '@mui/material';
import './OrderHistoryPage.css';
import api from '../api/axiosConfig';

const OrderHistoryPage = () => {
  const { userInfo } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMyOrders = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        const { data } = await api.get('/api/orders/myorders', config);
        setOrders(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    if (userInfo) fetchMyOrders();
  }, [userInfo]);

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress size={60} /></Box>;
  if (error) return <Typography color="error" sx={{ mt: 5, textAlign: 'center' }}>{error}</Typography>;

  return (
    <Box sx={{ maxWidth: '1200px', mx: 'auto', my: 5, px: 3 }}>
      <Typography variant="h4" fontWeight={700} sx={{ mb: 3, color: '#B8860B' }}>
        My Orders
      </Typography>

      {orders.length === 0 ? (
        <Typography variant="body1" sx={{ textAlign: 'center', mt: 5 }}>
          You have not placed any orders yet. <Link to="/" style={{ color: '#B8860B', fontWeight: '600' }}>Go Shopping</Link>
        </Typography>
      ) : (
        <Fade in={true}>
          <TableContainer 
            component={Paper} 
            sx={{ 
              boxShadow: '0 5px 20px rgba(0,0,0,0.1)', 
              overflowX: 'hidden', 
              overflowY: 'hidden' 
            }}
          >
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
                {orders.map((order, index) => (
                  <TableRow
                    key={order._id}
                    className="order-row"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <TableCell>{order._id}</TableCell>
                    <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>₹{order.totalPrice}</TableCell>
                    <TableCell>
                      <Tooltip title={order.isPaid ? `Paid on ${new Date(order.paidAt).toLocaleDateString()}` : 'Not Paid'}>
                        <span style={{ color: order.isPaid ? '#28a745' : '#dc3545', fontWeight: 600 }}>
                          {order.isPaid ? '✅' : '❌'}
                        </span>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Tooltip title={order.isDelivered ? `Delivered on ${new Date(order.deliveredAt).toLocaleDateString()}` : 'Not Delivered'}>
                        <span style={{ color: order.isDelivered ? '#28a745' : '#dc3545', fontWeight: 600 }}>
                          {order.isDelivered ? '✅' : '❌'}
                        </span>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Link to={`/order/${order._id}`} style={{ textDecoration: 'none' }}>
                        <Button variant="contained" sx={{
                          background: 'linear-gradient(135deg, #B8860B, #FFD700)',
                          color: '#fff',
                          fontWeight: 600,
                          textTransform: 'none',
                          '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }
                        }}>
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
    </Box>
  );
};

export default OrderHistoryPage;
