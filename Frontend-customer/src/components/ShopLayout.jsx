import React from "react";
import { Grid, Container, Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import FilterSidebar from "./FilterSidebar";

const ShopLayout = ({ children, onFilterChange }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // detects screen < md

  return (
    <Container maxWidth="xl" sx={{ py: 1 }}>
      <Grid container spacing={3} alignItems="flex-start">

        {/* ---- Only render this grid when not mobile ---- */}
        {!isMobile && (
          // <Grid
          //   item
          //   md={3}
          //   sx={{
          //     position: "relative",
          //     height: "fit-content",
          //     width: "23%",
          //     float: "left",
          //   }}
          // >
          //   <FilterSidebar onFilterChange={onFilterChange} />
          // </Grid>
          <Grid item
  xs={12}
  md={3}
  sx={{
    display: { xs: 'none', md: 'block' },  // hide completely on mobile
    position: 'relative',
    height: 'fit-content',
    width: { xs: '0%', md: '23%' },        // remove width on mobile
    float: { xs: 'none', md: 'left' },
  }}
>
  <FilterSidebar onFilterChange={onFilterChange} />
</Grid>
        )}

        {/* ---- Product Section always visible ---- */}
        {/* <Grid
          item
          xs={12}
          md={3}
          sx={{
            maxHeight: "calc(100vh - 100px)",
            overflowY: "auto",
            pr: 1,
            "&::-webkit-scrollbar": { width: "6px" },
            "&::-webkit-scrollbar-thumb": { background: "#B8860B", borderRadius: "3px" },
            width: isMobile ? "100%" : "75%",
            float: "right",
            px: isMobile ? 0 : 4,
            mt: 2,
          }}
        >
          <Box>{children}</Box>
        </Grid> */}

        <Grid
  item
  xs={12}
  md={9}
  sx={{
    maxHeight: 'calc(100vh - 100px)',
    overflowY: 'auto',
    pr: 1,
    '&::-webkit-scrollbar': { width: '6px' },
    '&::-webkit-scrollbar-thumb': { background: '#B8860B', borderRadius: '3px' },
    width: { xs: '100%', md: '75%' },    // full width on mobile
    float: { xs: 'none', md: 'right' },
    px: { xs: 1, md: 4 },
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
