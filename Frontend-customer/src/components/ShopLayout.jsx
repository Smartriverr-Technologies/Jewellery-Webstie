// import React from 'react';
// import { Grid, Container, Box } from '@mui/material';
// import FilterSidebar from './FilterSidebar';

// const ShopLayout = ({ children, onFilterChange }) => {
//   return (
//     <Container maxWidth="xl" sx={{ py: 1 }}>
//       <Grid container spacing={3} alignItems="flex-start">
        
//         {/* --- Left: Sticky Filter Sidebar --- */}
//         <Grid item xs={12} md={3} sx={{
//           position: 'relative',
//           height: 'fit-content',
//           // border: '1px solid black',
//           width: '23%',
//           float: 'left',
//         }}>
//           <FilterSidebar onFilterChange={onFilterChange} />
//         </Grid>

//         {/* --- Right: Scrollable Products Section --- */}
//         <Grid 
//           item 
//           xs={12} 
//           md={9} 
//           sx={{
//             maxHeight: 'calc(100vh - 100px)', // adjust according to navbar height
//             overflowY: 'auto',
//             pr: 1,
//             '&::-webkit-scrollbar': { width: '6px' },
//             '&::-webkit-scrollbar-thumb': { background: '#B8860B', borderRadius: '3px' },
//             // border: '1px solid black',
//             width: '75%',
//             float: 'right',
//             // display: 'flex',
//             // alignItems: 'center',
//             jsustifyContent: 'center',
//             alignContent: 'center',
//             px: 4,
//             marginTop: 2,
//           }}
//         >
//           <Box>
//             {children}
//           </Box>
//         </Grid>

//       </Grid>
//     </Container>
//   );
// };

// export default ShopLayout;

import React from "react";
import { Grid, Container, Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import FilterSidebar from "./FilterSidebar";

const ShopLayout = ({ children, onFilterChange }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // mobile = < md screens

  return (
    <Container maxWidth="xl" sx={{ py: 1 }}>
      <Grid container spacing={3} alignItems="flex-start">
        
        {/* ---------- Filter Sidebar - Hide Completely on Mobile ---------- */}
        {!isMobile && (
          <Grid
            item
            xs={12}
            md={3}
            sx={{
              position: "relative",
              height: "fit-content",
              width: "23%",
              float: "left",
            }}
          >
            <FilterSidebar onFilterChange={onFilterChange} />
          </Grid>
        )}

        {/* ---------- Products Section (Full width on mobile) ---------- */}
        <Grid
          item
          xs={12}
          md={9}
          sx={{
            maxHeight: "calc(100vh - 100px)",
            overflowY: "auto",
            pr: 1,
            "&::-webkit-scrollbar": { width: "6px" },
            "&::-webkit-scrollbar-thumb": { background: "#B8860B", borderRadius: "3px" },
            width: isMobile ? "100%" : "75%",
            float: "right",
            justifyContent: "center",
            px: 2,
            mt: 2,
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

