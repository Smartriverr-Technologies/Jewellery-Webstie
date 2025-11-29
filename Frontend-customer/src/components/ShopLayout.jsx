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

// import React, { useState } from "react";
// import { Grid, Container, Box, Drawer, Button, useMediaQuery } from "@mui/material";
// import { useTheme } from "@mui/material/styles";
// import FilterSidebar from "./FilterSidebar";

// const ShopLayout = ({ children, onFilterChange }) => {
//   const [drawerOpen, setDrawerOpen] = useState(false);

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("md"));

//   return (
//     <Container maxWidth="xl" sx={{ py: 0, mt: 1 }}>
//       <Grid container spacing={3}>

//         {/* Desktop Sidebar */}
//         {!isMobile && (
//           <Grid item md={3}>
//             <FilterSidebar onFilterChange={onFilterChange} />
//           </Grid>
//         )}

//         {/* Products */}
//         <Grid item xs={12} md={9}>
//           <Box sx={{ mt: isMobile ? 0 : 2 }}>{children}</Box>
//         </Grid>
//       </Grid>

//       {/* Mobile Floating Filter Button */}
//       {isMobile && (
//         <Button
//           variant="contained"
//           sx={{
//             position: "fixed",
//             bottom: 20,
//             right: 20,
//             borderRadius: "50px",
//             px: 4,
//           }}
//           onClick={() => setDrawerOpen(true)}
//         >
//           Filters
//         </Button>
//       )}

//       {/* Mobile Bottom Drawer */}
//       <Drawer anchor="bottom" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
//         <Box sx={{ p: 2 }}>
//           <FilterSidebar onFilterChange={onFilterChange} closeDrawer={() => setDrawerOpen(false)} />
//         </Box>
//       </Drawer>
//     </Container>
//   );
// }

// export default ShopLayout;

// import React, { useState } from "react";
// import { Box, Grid, Drawer, IconButton, useMediaQuery, useTheme, Fab } from "@mui/material";
// import FilterSidebar from "./FilterSidebar";
// import TuneIcon from "@mui/icons-material/Tune";

// const ShopLayout = ({ children, onFilterChange }) => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("md"));
//   const [drawerOpen, setDrawerOpen] = useState(false);

//   return (
//     <Box sx={{ position: "relative", pt: { xs: 1, md: 2 } }}>
      
//       {/* --------------------- MOBILE FILTER BUTTON --------------------- */}
//       {isMobile && (
//         <Fab
//           color="primary"
//           size="medium"
//           onClick={() => setDrawerOpen(true)}
//           sx={{
//             position: "fixed",
//             bottom: 20,
//             right: 20,
//             zIndex: 999,
//             background: "#B8860B",
//             "&:hover": { background: "#a4750a" },
//             boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
//           }}
//         >
//           <TuneIcon />
//         </Fab>
//       )}

//       {/* --------------------- MOBILE DRAWER FILTER --------------------- */}
//       <Drawer
//         anchor="bottom"
//         open={drawerOpen}
//         onClose={() => setDrawerOpen(false)}
//         sx={{ zIndex: 2000 }}
//         PaperProps={{
//           sx: {
//             height: "70vh",
//             borderRadius: "20px 20px 0 0",
//             p: 2,
//             overflowY: "auto",
//           },
//         }}
//       >
//         <FilterSidebar
//           onFilterChange={onFilterChange}
//           closeDrawer={() => setDrawerOpen(false)}
//         />
//       </Drawer>

//       {/* --------------------- DESKTOP LAYOUT --------------------- */}
//       <Grid container spacing={3}>
//         {/* LEFT FILTER (VISIBLE ONLY ON DESKTOP) */}
//         {!isMobile && (
//           <Grid
//             item
//             md={3}
//             sx={{
//               position: "sticky",
//               top: "100px",
//               height: "max-content",
//               alignSelf: "flex-start",
//             }}
//           >
//             <FilterSidebar onFilterChange={onFilterChange} />
//           </Grid>
//         )}

//         {/* RIGHT PRODUCTS AREA */}
//         <Grid
//           item
//           xs={12}
//           md={9}
//           sx={{
//             px: { xs: 1, md: 2 },
//             maxHeight: { md: "calc(100vh - 120px)" },
//             overflowY: { md: "auto" },
//             "&::-webkit-scrollbar": { width: "6px" },
//             "&::-webkit-scrollbar-thumb": {
//               background: "#B8860B",
//               borderRadius: "10px",
//             },
//           }}
//         >
//           {children}
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default ShopLayout;

import React from "react";
import { Box, Drawer, Fab, useMediaQuery } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useTheme } from "@mui/material";
import FilterSidebar from "./FilterSidebar";

const ShopLayout = ({ children, onFilterChange }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = React.useState(false);

  const closeDrawer = () => setOpen(false);

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      {/* ---------- Desktop Filter Sidebar ---------- */}
      {!isMobile && (
        <Box
          sx={{
            width: "260px",
            minWidth: "260px",
            p: 2,
            position: "sticky",
            top: "120px",
            height: "calc(100vh - 120px)",
            overflowY: "auto",
            borderRight: "1px solid #eee",
            background: "#fff",
          }}
        >
          <FilterSidebar onFilterChange={onFilterChange} />
        </Box>
      )}

      {/* ---------- Content Area (Right Side) ---------- */}
      <Box
        sx={{
          flexGrow: 1,
          p: { xs: 2, md: 3 },
          overflow: "auto",
        }}
      >
        {children}
      </Box>

      {/* ---------- Mobile Floating Filter Button ---------- */}
      {isMobile && (
        <>
          <Fab
            onClick={() => setOpen(true)}
            size="medium"
            color="primary"
            sx={{ position: "fixed", bottom: 20, right: 20 }}
          >
            <FilterListIcon />
          </Fab>

          <Drawer anchor="right" open={open} onClose={closeDrawer}>
            <Box sx={{ width: 280, p: 2 }}>
              <FilterSidebar onFilterChange={onFilterChange} closeDrawer={closeDrawer} />
            </Box>
          </Drawer>
        </>
      )}
    </Box>
  );
};

export default ShopLayout;

