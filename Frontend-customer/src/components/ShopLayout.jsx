import React from "react";
import { Grid, Container, Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import FilterSidebar from "./FilterSidebar";

const ShopLayout = ({ children, onFilterChange }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Container
      maxWidth="xl"
      sx={{
        px: { xs: 1, md: 2 },   // remove vertical padding
        py: { xs: 0, md: 1 },   // no gap under navbar on mobile
      }}
    >
      <Grid
        container
        spacing={isMobile ? 0 : 3} // no grid spacing in mobile
        alignItems="flex-start"
      >
        {!isMobile && (
          <Grid
            item
            xs={12}
            md={3}
            sx={{
              position: "relative",
              height: "fit-content",
              width: "23%",
            }}
          >
            <FilterSidebar onFilterChange={onFilterChange} />
          </Grid>
        )}

        <Grid
          item
          xs={12}
          md={9}
          sx={{
            width: isMobile ? "100%" : "75%",
            float: "right",
            overflowY: "auto",
            maxHeight: { md: "calc(100vh - 100px)" },
            px: { xs: 0, md: 2 },
            mt: { xs: 0, md: 2 },  // remove top margin in mobile
          }}
        >
          <Box>{children}</Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ShopLayout;
