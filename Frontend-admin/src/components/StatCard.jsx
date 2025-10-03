import React from 'react';
import { Paper, Box, Typography, Divider } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import {
  LineChart, Line, ResponsiveContainer,
} from 'recharts';

const StatCard = ({ title, value, icon, color, trend, percentage, subtitle, chartData }) => {
  return (
    <Paper
      elevation={4}
      sx={{
        p: 3,
        borderRadius: 3,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: 'linear-gradient(135deg, #ffffff, #f8f9fb)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 28px rgba(0,0,0,0.12)',
        },
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Box
          sx={{
            p: 1.8,
            borderRadius: '16px',
            mr: 2,
            backgroundColor: color || '#1976d2',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 26,
          }}
        >
          {icon}
        </Box>
        <Box>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            sx={{ fontWeight: 600, letterSpacing: 0.5 }}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="caption" color="text.disabled">
              {subtitle}
            </Typography>
          )}
        </Box>
      </Box>

      {/* Value */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: 800,
          mb: 1,
          color: '#111',
          lineHeight: 1.3,
        }}
      >
        {value}
      </Typography>

      {/* Chart */}
      {chartData && (
        <Box sx={{ height: 60, mb: 2 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <Line
                type="monotone"
                dataKey="value"
                stroke={color}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      )}

      <Divider sx={{ my: 1.5 }} />

      {/* Trend */}
      {trend && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            mt: 1,
            color: trend === 'up' ? 'success.main' : 'error.main',
          }}
        >
          {trend === 'up' ? (
            <TrendingUpIcon fontSize="small" sx={{ mr: 0.5 }} />
          ) : (
            <TrendingDownIcon fontSize="small" sx={{ mr: 0.5 }} />
          )}
          <Typography variant="body2" sx={{ fontWeight: 600, mr: 0.5 }}>
            {percentage}%
          </Typography>
          <Typography variant="body2" color="text.secondary">
            vs last month
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default StatCard;
