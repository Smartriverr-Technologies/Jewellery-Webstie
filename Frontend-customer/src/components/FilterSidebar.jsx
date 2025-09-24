import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box, Typography, TextField, Select, MenuItem, FormControl, InputLabel, Button, Paper } from '@mui/material';

const FilterSidebar = ({ onFilterChange }) => {
  const [searchParams] = useSearchParams();
  
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');
  const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || 'latest');

  useEffect(() => {
    setMinPrice(searchParams.get('minPrice') || '');
    setMaxPrice(searchParams.get('maxPrice') || '');
    setSortBy(searchParams.get('sortBy') || 'latest');
  }, [searchParams]);

  const handleApplyFilters = () => {
    const newFilters = { sortBy };
    if (minPrice) newFilters.minPrice = minPrice;
    if (maxPrice) newFilters.maxPrice = maxPrice;
    newFilters.pageNumber = 1;
    onFilterChange(newFilters);
  };

  return (
    <Paper 
  elevation={3} 
  sx={{ 
    p: 2, 
    borderRadius: 2, 
    position: 'sticky',
    top: 80, // thoda aur neeche navbar se
    backgroundColor: '#fff',
    // width: '23%',
    // border: '1px solid black',
    marginTop: 2,
  }}
>
      <Typography variant="h6" gutterBottom>Filters</Typography>
      <Box component="div" sx={{ mb: 2 }}>
        <Typography variant="subtitle1" gutterBottom>Price Range</Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField label="Min" type="number" variant="outlined" size="small" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
          <TextField label="Max" type="number" variant="outlined" size="small" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
        </Box>
      </Box>
      <Box component="div" sx={{ mb: 2 }}>
        <FormControl fullWidth size="small">
          <InputLabel>Sort By</InputLabel>
          <Select value={sortBy} label="Sort By" onChange={(e) => setSortBy(e.target.value)}>
            <MenuItem value="latest">Latest</MenuItem>
            <MenuItem value="price-asc">Price: Low to High</MenuItem>
            <MenuItem value="price-desc">Price: High to Low</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Button variant="contained" onClick={handleApplyFilters} fullWidth>
        Apply Filters
      </Button>
    </Paper>
  );
};

export default FilterSidebar;