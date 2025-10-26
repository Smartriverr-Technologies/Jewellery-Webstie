// import React from "react";
// import { Link } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import { Box, Typography, Grid, Skeleton } from "@mui/material";
// import { motion } from "framer-motion";
// import api from "../api/axiosConfig";

// const fetchCategories = async () => {
//   const { data } = await api.get("/api/categories");
//   return data;
// };

// const Categories = () => {
//   const { data: categories, isLoading } = useQuery({
//     queryKey: ["categories"],
//     queryFn: fetchCategories,
//   });

//   return (
//     <Box sx={{ py: 2, textAlign: "center", background: "#fdfdfd" }}>
//       {/* Section Heading */}
//       {/* <Typography
//         variant="h4"
//         component="h2"
//         gutterBottom
//         sx={{
//           // fontWeight: 'bold',
//           // // fontFamily: "Cormorant Garamond, serif", // Elegant premium font
//           // //  letterSpacing: "0.5px",
//           // color: "#222",
//           // fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.5rem" },
//           // background: 'linear-gradient(45deg, #B8860B 30%, #21CBF3 90%)',
//          fontWeight: 700,
// background: 'linear-gradient(45deg, #FFD700 20%, #FFB347 50%, #21CBF3 80%)',
// WebkitBackgroundClip: 'text',
// WebkitTextFillColor: 'transparent',
// mb: 2,
          

//         }}
//       >
//         Shop by Category
//       </Typography> */}
//       <Typography 
//                   variant="h4" 
//                   component="h2" 
//                   align="center" 
//                   gutterBottom
//                   sx={{ 
//                     fontWeight: 700,
//                     background: 'linear-gradient(45deg, #B8860B 30%, #21CBF3 90%)',
//                     WebkitBackgroundClip: 'text',
//                     WebkitTextFillColor: 'transparent',
//                     mb: 5,
//                   }}
//                 >
//                  Shop by Category
//                 </Typography>
//       {/* Gold Underline */}
//       {/* <Box
//         sx={{
//           width: 200,
//           height: 4,
//           backgroundColor: "#B8860B", // Gold underline
//           borderRadius: 2,
//           mx: "auto",
//           mb: 6,
//         }}
//       /> */}

//       <Grid container spacing={6} justifyContent="center">
//         {isLoading ? (
//           Array.from(new Array(6)).map((_, index) => (
//             <Grid item key={index} xs={6} sm={4} md={2}>
//               <Skeleton variant="circular" width={120} height={120} />
//               <Skeleton width="60%" sx={{ mt: 2, mx: "auto" }} />
//             </Grid>
//           ))
//         ) : (
//           categories?.map((category, index) => (
//             <Grid item key={category.name} xs={6} sm={4} md={2}>
//               <motion.div
//                 initial={{ opacity: 0, y: 40 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: index * 0.12 }}
//                 viewport={{ once: true }}
//                 whileHover={{ scale: 1.05, rotate: -1 }}
//               >
//                 <Link
//                   to={`/category/${category.slug}`}
//                   style={{ textDecoration: "none" }}
//                 >
//                   <Box
//                     sx={{
//                       display: "flex",
//                       flexDirection: "column",
//                       alignItems: "center",
//                       gap: 2,
//                       cursor: "pointer",
//                       "&:hover .category-circle": {
//                         // boxShadow: "0 10px 24px rgba(184,134,11,0.4)",
//                       },
//                       "&:hover .category-name": {
//                         color: "#B8860B",
//                         fontWeight: 600,
//                       },
//                     }}
//                   >
//                     {/* Circle Image */}
//                     <Box
//                       className="category-circle"
//                       sx={{
//                         width: { xs: 100, sm: 130 },
//                         height: { xs: 100, sm: 130 },
//                         borderRadius: "50%",
//                         overflow: "hidden",
//                         background: "#fff",
//                         boxShadow: "0px 6px 14px rgba(0,0,0,0.1)",
//                         transition: "all 0.4s ease",
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                       }}
//                     >
//                       <img
//                         src={category.image}
//                         alt={category.name}
//                         style={{
//                           width: "100%",
//                           height: "100%",
//                           objectFit: "cover",
//                           transition: "transform 0.5s ease",
//                         }}
//                         onMouseOver={(e) =>
//                           (e.currentTarget.style.transform = "scale(1.1)")
//                         }
//                         onMouseOut={(e) =>
//                           (e.currentTarget.style.transform = "scale(1)")
//                         }
//                       />
//                     </Box>

//                     {/* Name */}
//                     <Typography
//                       variant="subtitle1"
//                       className="category-name"
//                       sx={{
//                         mt: 1,
//                         fontWeight: 500,
//                         fontFamily: "Poppins, sans-serif",
//                         color: "#444",
//                         transition: "all 0.3s ease",
//                       }}
//                     >
//                       {category.name}
//                     </Typography>
//                   </Box>
//                 </Link>
//               </motion.div>
//             </Grid>
//           ))
//         )}
//       </Grid>
//     </Box>
//   );
// };

// export default Categories;


import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Box, Typography, Grid, Skeleton } from "@mui/material";
import { motion } from "framer-motion";
import api from "../api/axiosConfig";

const fetchCategories = async () => {
  const { data } = await api.get("/api/categories");
  return data;
};

const Categories = () => {
  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  return (
    <Box
      sx={{
        py: { xs: 3, sm: 4, md: 6 },
        textAlign: "center",
        background: "#fdfdfd",
        px: { xs: 2, sm: 4, md: 8 },
      }}
    >
      {/* Heading */}
      <Typography
        variant="h4"
        component="h2"
        align="center"
        gutterBottom
        sx={{
          fontWeight: 700,
          background: "linear-gradient(45deg, #B8860B 30%, #21CBF3 90%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          mb: { xs: 3, sm: 5 },
          fontSize: { xs: "1.6rem", sm: "2rem", md: "2.4rem" },
        }}
      >
        Shop by Category
      </Typography>

      {/* Category Grid */}
      <Grid
        container
        spacing={{ xs: 3, sm: 4, md: 6 }}
        justifyContent="center"
      >
        {isLoading
          ? Array.from(new Array(6)).map((_, index) => (
              <Grid item key={index} xs={6} sm={4} md={2}>
                <Skeleton variant="circular" width={100} height={100} />
                <Skeleton width="60%" sx={{ mt: 1.5, mx: "auto" }} />
              </Grid>
            ))
          : categories?.map((category, index) => (
              <Grid item key={category.name} xs={6} sm={4} md={2}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Link
                    to={`/category/${category.slug}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: { xs: 1.5, sm: 2 },
                        cursor: "pointer",
                      }}
                    >
                      {/* Circle Image */}
                      <Box
                        sx={{
                          width: { xs: 90, sm: 120, md: 130 },
                          height: { xs: 90, sm: 120, md: 130 },
                          borderRadius: "50%",
                          overflow: "hidden",
                          background: "#fff",
                          boxShadow: "0px 6px 14px rgba(0,0,0,0.1)",
                          transition: "all 0.4s ease",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <img
                          src={category.image}
                          alt={category.name}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            transition: "transform 0.5s ease",
                          }}
                          onMouseOver={(e) =>
                            (e.currentTarget.style.transform = "scale(1.1)")
                          }
                          onMouseOut={(e) =>
                            (e.currentTarget.style.transform = "scale(1)")
                          }
                        />
                      </Box>

                      {/* Category Name */}
                      <Typography
                        variant="subtitle1"
                        sx={{
                          mt: 0.5,
                          fontWeight: 500,
                          fontFamily: "Poppins, sans-serif",
                          color: "#444",
                          fontSize: { xs: "0.85rem", sm: "1rem" },
                          transition: "all 0.3s ease",
                          "&:hover": {
                            color: "#B8860B",
                            fontWeight: 600,
                          },
                        }}
                      >
                        {category.name}
                      </Typography>
                    </Box>
                  </Link>
                </motion.div>
              </Grid>
            ))}
      </Grid>
    </Box>
  );
};

export default Categories;
