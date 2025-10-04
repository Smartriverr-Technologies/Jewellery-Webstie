import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Container, Grid, Typography, CircularProgress, Alert, Box } from '@mui/material';
import StatCard from '../components/StatCard';
import api from '../api/axiosConfig';
// Icons
import PeopleIcon from '@mui/icons-material/People';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import CategoryIcon from '@mui/icons-material/Category';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

// API
const fetchDashboardStats = async (token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const { data } = await api.get('/api/dashboard/stats', config);
  return data;
};

// Demo chart data
const demoChart = [
  { value: 100 }, { value: 120 }, { value: 90 }, { value: 140 }, { value: 160 }, { value: 180 },
];

const DashboardPage = () => {
  const { userInfo } = useAuth();
  const { data: stats, isLoading, isError } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: () => fetchDashboardStats(userInfo.token),
    enabled: !!userInfo,
  });

  if (isLoading) return <CircularProgress />;
  if (isError) return <Alert severity="error">Could not load dashboard data.</Alert>;

  return (
    <Container sx={{ py: 4 }}>
      {/* Page Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700}>
          Admin Dashboard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Overview of your store’s performance and activities
        </Typography>
      </Box>

      {/* Stats Grid */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Total Revenue"
            subtitle="This month"
            value={`₹${stats.totalRevenue.toFixed(2)}`}
            icon={<MonetizationOnIcon />}
            color="#27ae60"
            trend="up"
            percentage={12.5}
            chartData={demoChart}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Total Users"
            subtitle="All registered"
            value={stats.users}
            icon={<PeopleIcon />}
            color="#2980b9"
            trend="up"
            percentage={8.2}
            chartData={demoChart}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Total Products"
            subtitle="Available items"
            value={stats.products}
            icon={<Inventory2Icon />}
            color="#8e44ad"
            trend="down"
            percentage={-2.1}
            chartData={demoChart}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Total Orders"
            subtitle="All time"
            value={stats.orders}
            icon={<ShoppingCartIcon />}
            color="#f39c12"
            trend="up"
            percentage={4.6}
            chartData={demoChart}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Pending Orders"
            subtitle="Need action"
            value={stats.pendingOrders}
            icon={<PendingActionsIcon />}
            color="#e74c3c"
            trend="down"
            percentage={-5.4}
            chartData={demoChart}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Total Categories"
            subtitle="Active categories"
            value={stats.categories}
            icon={<CategoryIcon />}
            color="#7f8c8d"
            chartData={demoChart}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashboardPage;
