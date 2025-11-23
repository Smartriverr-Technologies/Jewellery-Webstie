import React from "react";
import { Grid, Container, Box } from "@mui/material";
import FilterSidebar from "./FilterSidebar";

const ShopLayout = ({ children, onFilterChange }) => {
  return (
    <Container maxWidth="xl" sx={{ py: 0, mt: 0 }}>
      <Grid container spacing={0} alignItems="flex-start">

        {/* Desktop Filter Sidebar */}
        <Grid
          item
          xs={12}
          md={3}
          sx={{
            display: { xs: "none", md: "block" },  // Hide completely on mobile
            position: "sticky",
            top: "90px",  // adjust based on navbar height if needed
            height: "fit-content",
          }}
        >
          <FilterSidebar onFilterChange={onFilterChange} />
        </Grid>

        {/* Products Section */}
        <Grid
          item
          xs={12}
          md={9}
          sx={{
            width: { xs: "100%", md: "100%" },   // Full width on mobile & desktop
            height: "auto",
            overflowY: { xs: "visible", md: "auto" }, // no scroll container on mobile
            mt: { xs: 2, md: 0 },
            px: { xs: 1, md: 4 },
          }}
        >
          <Box sx={{ width: "100%" }}>
            {children}
          </Box>
        </Grid>

      </Grid>
    </Container>
  );
};

export default ShopLayout;
