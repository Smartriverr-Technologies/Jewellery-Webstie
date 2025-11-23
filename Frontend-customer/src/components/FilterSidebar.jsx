// import React, { useState, useEffect } from "react";
// import { useSearchParams } from "react-router-dom";
// import {
//   Box,
//   Typography,
//   TextField,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Button,
//   Paper,
//   Stack,
//   useMediaQuery
// } from "@mui/material";
// import { useTheme } from "@mui/material/styles";

// const FilterSidebar = ({ onFilterChange , closeDrawer}) => {
//   const [searchParams] = useSearchParams();

//   const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
//   const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
//   const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "latest");

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("md"));

//   useEffect(() => {
//     setMinPrice(searchParams.get("minPrice") || "");
//     setMaxPrice(searchParams.get("maxPrice") || "");
//     setSortBy(searchParams.get("sortBy") || "latest");
//   }, [searchParams]);

//   // const handleApplyFilters = () => {
//   //   const newFilters = { sortBy };
//   //   if (minPrice) newFilters.minPrice = minPrice;
//   //   if (maxPrice) newFilters.maxPrice = maxPrice;
//   //   newFilters.pageNumber = 1;
//   //   onFilterChange(newFilters);
//   // };
//   const handleApplyFilters = () => {
//     const newFilters = { sortBy };
//     if (minPrice) newFilters.minPrice = minPrice;
//     if (maxPrice) newFilters.maxPrice = maxPrice;
//     newFilters.pageNumber = 1;
//     onFilterChange(newFilters);
//     if (closeDrawer) closeDrawer();
//   };


//   // const handleClearFilters = () => {
//   //   setMinPrice("");
//   //   setMaxPrice("");
//   //   setSortBy("latest");
//   //   onFilterChange({
//   //     sortBy: "latest",
//   //     pageNumber: 1,
//   //     minPrice: "",
//   //     maxPrice: "",
//   //   });
//   // };

//   const handleClearFilters = () => {
//     setMinPrice("");
//     setMaxPrice("");
//     setSortBy("latest");
//     onFilterChange({ sortBy: "latest", pageNumber: 1 });
//     if (closeDrawer) closeDrawer();
//   };

//   // Completely hide sidebar including white space
//   if (isMobile) return null;

//   return (
//     <Paper
//       elevation={1}
//       sx={{
//         p: { xs: 1.5, md: 2.5 },
//         borderRadius: 2,
//         backgroundColor: "#fff",
//         border: "1px solid rgba(0,0,0,0.08)",
//         boxShadow: { xs: "none", md: "0 4px 12px rgba(0,0,0,0.05)" },
//         position: { md: "sticky" },
//         top: { md: 150 },
//         mb: { xs: 2, md: 0 }
//       }}
//     >
//       <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
//         Filters
//       </Typography>

//       <Stack spacing={2} direction="column">
//         <Box>
//           <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>Price</Typography>
//           <Stack direction="row" spacing={1}>
//             <TextField size="small" type="number" label="Min" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
//             <TextField size="small" type="number" label="Max" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
//           </Stack>
//         </Box>

//         <Box>
//           <FormControl fullWidth size="small">
//             <InputLabel>Sort By</InputLabel>
//             <Select value={sortBy} label="Sort By" onChange={(e) => setSortBy(e.target.value)}>
//               <MenuItem value="latest">Latest</MenuItem>
//               <MenuItem value="price-asc">Price: Low to High</MenuItem>
//               <MenuItem value="price-desc">Price: High to Low</MenuItem>
//             </Select>
//           </FormControl>
//         </Box>

//         <Box sx={{ display: "flex", width: "100%", gap: 1 }}>
//           <Button variant="contained" onClick={handleApplyFilters} fullWidth>Apply</Button>
//           <Button variant="outlined" onClick={handleClearFilters} fullWidth>Clear</Button>
//         </Box>
//       </Stack>
//     </Paper>
//   );
// };

// export default FilterSidebar;


import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Box, Typography, TextField, Select, MenuItem, FormControl, InputLabel, Button, Stack } from "@mui/material";

const FilterSidebar = ({ onFilterChange, closeDrawer }) => {
  const [searchParams] = useSearchParams();

  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "latest");

  const handleApplyFilters = () => {
    const newFilters = { sortBy };
    if (minPrice) newFilters.minPrice = minPrice;
    if (maxPrice) newFilters.maxPrice = maxPrice;
    newFilters.pageNumber = 1;

    onFilterChange(newFilters);
    if (closeDrawer) closeDrawer(); // close in mobile drawer
  };

  const handleClearFilters = () => {
    setMinPrice("");
    setMaxPrice("");
    setSortBy("latest");
    onFilterChange({ sortBy: "latest", pageNumber: 1, minPrice: "", maxPrice: "" });
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Filters</Typography>

      <Stack spacing={3}>
        <Box>
          <Typography variant="subtitle1">Price</Typography>
          <Stack direction="row" spacing={1}>
            <TextField size="small" type="number" label="Min" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
            <TextField size="small" type="number" label="Max" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
          </Stack>
        </Box>

        <Box>
          <FormControl fullWidth size="small">
            <InputLabel>Sort By</InputLabel>
            <Select value={sortBy} label="Sort By" onChange={(e) => setSortBy(e.target.value)}>
              <MenuItem value="latest">Latest</MenuItem>
              <MenuItem value="price-asc">Price: Low to High</MenuItem>
              <MenuItem value="price-desc">Price: High to Low</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Stack direction="row" spacing={2}>
          <Button variant="contained" fullWidth onClick={handleApplyFilters}>Apply</Button>
          <Button variant="outlined" fullWidth onClick={handleClearFilters}>Clear</Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default FilterSidebar;
