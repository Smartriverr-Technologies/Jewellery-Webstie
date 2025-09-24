import React from 'react';
import { Grid, Container, Box } from '@mui/material';
import FilterSidebar from './FilterSidebar';

const ShopLayout = ({ children, onFilterChange }) => {
  return (
    <Container maxWidth="xl" sx={{ py: 1 }}>
      <Grid container spacing={3} alignItems="flex-start">
        
        {/* --- Left: Sticky Filter Sidebar --- */}
        <Grid item xs={12} md={3} sx={{
          position: 'relative',
          height: 'fit-content',
          // border: '1px solid black',
          width: '23%',
          float: 'left',
        }}>
          <FilterSidebar onFilterChange={onFilterChange} />
        </Grid>

        {/* --- Right: Scrollable Products Section --- */}
        <Grid 
          item 
          xs={12} 
          md={9} 
          sx={{
            maxHeight: 'calc(100vh - 100px)', // adjust according to navbar height
            overflowY: 'auto',
            pr: 1,
            '&::-webkit-scrollbar': { width: '6px' },
            '&::-webkit-scrollbar-thumb': { background: '#B8860B', borderRadius: '3px' },
            // border: '1px solid black',
            width: '75%',
            float: 'right',
            // display: 'flex',
            // alignItems: 'center',
            jsustifyContent: 'center',
            alignContent: 'center',
            px: 4,
            marginTop: 2,
          }}
        >
          <Box>
            {children}
          </Box>
        </Grid>

      </Grid>
    </Container>
  );
};

export default ShopLayout;
