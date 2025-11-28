// import React from "react";
// import { Grid, Container, Box, useMediaQuery } from "@mui/material";
// import { useTheme } from "@mui/material/styles";
// import FilterSidebar from "./FilterSidebar";

// const ShopLayout = ({ children, onFilterChange }) => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("md"));

//   return (
//     <Container
//       maxWidth="xl"
//       sx={{
//         px: { xs: 1, md: 2 },
//         py: { xs: 2, md: 3 }, // Add vertical padding for spacing from header
//       }}
//     >
//       <Grid
//         container
//         spacing={isMobile ? 0 : 3} // no grid spacing in mobile
//         alignItems="flex-start"
//       >
//         {!isMobile && (
//           <Grid
//             item
//             xs={12}
//             md={3}
//             sx={{
//               position: "relative",
//               height: "fit-content",
//               width: "23%",
//             }}
//           >
//             <FilterSidebar onFilterChange={onFilterChange} />
//           </Grid>
//         )}

//         <Grid
//           item
//           xs={12}
//           md={9}
//           sx={{
//             width: isMobile ? "100%" : "75%",
//             float: "right",
//             overflowY: "auto",
//             maxHeight: { md: "calc(100vh - 100px)" },
//             px: { xs: 0, md: 2 },
//             mt: { xs: 0, md: 2 },  // remove top margin in mobile
//           }}
//         >
//           <Box>{children}</Box>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

// export default ShopLayout;

import React, { useState } from "react";
import { Grid, Container, Box, Drawer, Button, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import FilterSidebar from "./FilterSidebar";

const ShopLayout = ({ children, onFilterChange }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Container maxWidth="xl" sx={{ py: 0, mt: 1 }}>
      <Grid container spacing={3}>

        {/* Desktop Sidebar */}
        {!isMobile && (
          <Grid item md={3}>
            <FilterSidebar onFilterChange={onFilterChange} />
          </Grid>
        )}

        {/* Products */}
        <Grid item xs={12} md={9}>
          <Box sx={{ mt: isMobile ? 0 : 2 }}>{children}</Box>
        </Grid>
      </Grid>

      {/* Mobile Floating Filter Button */}
      {isMobile && (
        <Button
          variant="contained"
          sx={{
            position: "fixed",
            bottom: 20,
            right: 20,
            borderRadius: "50px",
            px: 4,
          }}
          onClick={() => setDrawerOpen(true)}
        >
          Filters
        </Button>
      )}

      {/* Mobile Bottom Drawer */}
      <Drawer anchor="bottom" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ p: 2 }}>
          <FilterSidebar onFilterChange={onFilterChange} closeDrawer={() => setDrawerOpen(false)} />
        </Box>
      </Drawer>
    </Container>
  );
}

export default ShopLayout;
