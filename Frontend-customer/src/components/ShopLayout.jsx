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
//         px: { xs: 1, md: 2 },   // remove vertical padding
//         py: { xs: 0, md: 1 },   // no gap under navbar on mobile
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


// import React, { useState } from "react";
// import { Grid, Container, Fab, Drawer, useMediaQuery } from "@mui/material";
// import FilterListIcon from "@mui/icons-material/FilterList";
// import { useTheme } from "@mui/material/styles";
// import FilterSidebar from "./FilterSidebar";

// const ShopLayout = ({ children, onFilterChange }) => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("md"));

//   const [drawerOpen, setDrawerOpen] = useState(false);

//   return (
//     <Container maxWidth="xl" sx={{ py: { xs: 0, md: 2 } }}>
//       <Grid container spacing={3} alignItems="flex-start">

//         {/* === Desktop Filter Sidebar === */}
//         {!isMobile && (
//           <Grid item md={3} sx={{ position: "sticky", top: 150 }}>
//             <FilterSidebar onFilterChange={onFilterChange} />
//           </Grid>
//         )}

//         {/* === Products Section === */}
//         <Grid item xs={12} md={9} sx={{ width: "100%", mt: { xs: 0, md: 2 } }}>
//           {children}
//         </Grid>
//       </Grid>

//       {/* === Mobile Floating Filter Button === */}
//       {isMobile && (
//         <>
//           <Fab
//             color="warning"
//             onClick={() => setDrawerOpen(true)}
//             sx={{
//               position: "fixed",
//               bottom: 20,
//               right: 20,
//               zIndex: 1300,
//               backgroundColor: "#B8860B",
//               color: "#fff",
//             }}
//           >
//             <FilterListIcon />
//           </Fab>

//           {/* === Bottom Drawer === */}
//           <Drawer
//             anchor="bottom"
//             open={drawerOpen}
//             onClose={() => setDrawerOpen(false)}
//             PaperProps={{
//               sx: {
//                 borderRadius: "16px 16px 0 0",
//                 p: 2,
//                 height: "70vh",
//               },
//             }}
//           >
//             <FilterSidebar onFilterChange={onFilterChange} closeDrawer={() => setDrawerOpen(false)} />
//           </Drawer>
//         </>
//       )}
//     </Container>
//   );
// };

// export default ShopLayout;

import React, { useState } from "react";
import { Grid, Container, Fab, Drawer, Box } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import FilterSidebar from "./FilterSidebar";
import { useMediaQuery, useTheme } from "@mui/material";

const ShopLayout = ({ children, onFilterChange }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <Container maxWidth="xl" sx={{ p: 0, mt: 1 }}>
      <Grid container spacing={3}>

        {/* Desktop Sidebar */}
        {!isMobile && (
          <Grid item md={3}>
            <FilterSidebar onFilterChange={onFilterChange} />
          </Grid>
        )}

        {/* Products Section */}
        <Grid item xs={12} md={9} sx={{ px: isMobile ? 1 : 2 }}>
          {children}
        </Grid>
      </Grid>

      {/* Mobile Filter FAB */}
      {isMobile && (
        <Fab
          color="warning"
          sx={{
            position: "fixed",
            bottom: 20,
            right: 20,
            backgroundColor: "#E57C04",
            color: "#fff",
            zIndex: 1500,
          }}
          onClick={() => setDrawerOpen(true)}
        >
          <FilterListIcon />
        </Fab>
      )}

      {/* Drawer for Filters */}
      <Drawer
        anchor="bottom"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { borderRadius: "20px 20px 0 0", p: 2, height: "70vh" } }}
      >
        <FilterSidebar onFilterChange={onFilterChange} closeDrawer={() => setDrawerOpen(false)} />
      </Drawer>
    </Container>
  );
};

export default ShopLayout;
