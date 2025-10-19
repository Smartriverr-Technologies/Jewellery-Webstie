// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate, Link } from "react-router-dom";
// import axios from "axios";
// import { useAuth } from "../context/AuthContext";
// import { useSnackbar } from 'notistack'; 
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import {
//   Box,
//   Paper,
//   Typography,
//   Grid,
//   TextField,
//   Button,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Checkbox,
//   FormControlLabel,
//   CircularProgress,
//   Alert,
//   Divider,
//   Card,
//   CardContent,
// } from "@mui/material";
// import api from "../api/axiosConfig";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// // --- API Functions ---
// const fetchProductById = async (productId) => {
//   const { data } = await api.get(`/api/products/${productId}`);
//   return data;
// };

// const fetchCategories = async () => {
//   const { data } = await api.get("/api/categories");
//   return data;
// };

// const updateProduct = async ({ productId, productData, token }) => {
//   const config = {
//     headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//   };
//   const { data } = await api.put(
//     `/api/products/${productId}`,
//     productData,
//     config
//   );
//   return data;
// };

// // --- Component ---
// const ProductEditPage = () => {
//   const { id: productId } = useParams();
//   const navigate = useNavigate();
//   const { userInfo } = useAuth();
//   const queryClient = useQueryClient();
//   const { enqueueSnackbar } = useSnackbar();

//   // Form state
//   const [title, setTitle] = useState("");
//   const [price, setPrice] = useState(0);
//   const [images, setImages] = useState([{ url: "" }, { url: "" }]);
//   const [category, setCategory] = useState("");
//   const [stock, setStock] = useState(0);
//   const [description, setDescription] = useState("");
//   const [active, setActive] = useState(false);
//   const [isLatest, setIsLatest] = useState(false);
//   const [uploading, setUploading] = useState({ image1: false, image2: false });

//   // Queries
//   const {
//     data: product,
//     isLoading: isLoadingProduct,
//     isError,
//     error,
//   } = useQuery({
//     queryKey: ["product", productId],
//     queryFn: () => fetchProductById(productId),
//   });

//   const { data: categories, isLoading: isLoadingCategories } = useQuery({
//     queryKey: ["categories"],
//     queryFn: fetchCategories,
//   });

//   useEffect(() => {
//     if (product) {
//       setTitle(product.title);
//       setPrice(product.price);
//       setImages(product.images?.length ? product.images : [{ url: "" }, { url: "" }]);
//       setCategory(product.category?._id || product.category || "");
//       setStock((product.variants && product.variants[0]?.stock) || 0);
//       setDescription(product.description);
//       setActive(product.active);
//       setIsLatest(product.isLatest || false);
//     }
//   }, [product]);

//   const updateMutation = useMutation({
//     mutationFn: updateProduct,
//     onSuccess: () => {
//        enqueueSnackbar('Product updated successfully!', { variant: 'success' });
//       queryClient.invalidateQueries({ queryKey: ["productsAdmin"] });
//       queryClient.invalidateQueries({ queryKey: ["product", productId] });
//       navigate("/products");
//     },
//     onError: (err) => alert(err.response?.data?.message || "Failed to update product", { variant: 'error' }),
//   });

//   // const uploadFileHandler = async (e, imageNumber) => {
//   //   const file = e.target.files[0];
//   //   const formData = new FormData();
//   //   formData.append("File", file);
//   //   setUploading((prev) => ({ ...prev, [`image${imageNumber}`]: true }));
//   //   try {
//   //     const config = {
//   //       headers: {
//   //         "Content-Type": "multipart/form-data",
//   //         Authorization: `Bearer ${userInfo.token}`,
//   //       },
//   //     };
//   //     const { data } = await api.post("/api/upload", formData, config);
//   //     const newImages = [...images];
//   //     newImages[imageNumber - 1] = { url: data.image, alt: title };
//   //     setImages(newImages);
//   //   } catch (error) {
//   //     alert("Image upload failed.");
//   //   } finally {
//   //     setUploading((prev) => ({ ...prev, [`image${imageNumber}`]: false }));
//   //   }
//   // };


//   const uploadFileHandler = async (e, imageNumber) => {
//   const file = e.target.files[0];
//   if (!file) return;

//   const formData = new FormData();
//   formData.append('file', file); // <-- 1. Change 'File' to 'file'
//   setUploading((prev) => ({ ...prev, [`image${imageNumber}`]: true }));

//   try {
//     const config = { 
//       headers: { 
//         'Content-Type': 'multipart/form-data', 
//         Authorization: `Bearer ${userInfo.token}` 
//       } 
//     };
    
//     const { data } = await api.post('/api/upload', formData, config);
    
//     const newImages = [...images];
//     newImages[imageNumber - 1] = { url: data.url, alt: title }; // <-- 2. Use data.url
//     setImages(newImages);
//     alert('Image uploaded successfully!');

//   } catch (error) {
//     alert('Image upload failed.');
//   } finally {
//     setUploading((prev) => ({ ...prev, [`image${imageNumber}`]: false }));
//   }
// };

//   const submitHandler = (e) => {
//     e.preventDefault();
//     const productData = {
//       title,
//       price,
//       description,
//       images,
//       category,
//       variants: [{ price, stock }],
//       active,
//       isLatest,
//     };
//     updateMutation.mutate({ productId, productData, token: userInfo.token });
//   };

//   if (isLoadingProduct)
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
//         <CircularProgress size={50} />
//       </Box>
//     );
//   if (isError) return <Alert severity="error">{error.message}</Alert>;

//   return (
//     <Box p={3}>
//       {/* Header */}
//       <Box display="flex" alignItems="center" mb={3}>
//         <Button
//           component={Link}
//           to="/products"
//           startIcon={<ArrowBackIcon />}
//           variant="outlined"
//           sx={{ borderRadius: 2, textTransform: "none" }}
//         >
//           Back to Products
//         </Button>
//       </Box>

//       <Typography variant="h4" fontWeight="bold" gutterBottom>
//         Edit Product
//       </Typography>
//       <Typography variant="body2" color="text.secondary" mb={3}>
//         Update product details, media, and settings below.
//       </Typography>

//       {/* Form */}
//       <Box component="form" onSubmit={submitHandler}>
//         <Grid container spacing={3}>
//           {/* Basic Info */}
//           <Grid item xs={12} md={8}>
//             <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
//               <CardContent>
//                 <Typography variant="h6" gutterBottom fontWeight="600">
//                   Basic Information
//                 </Typography>
//                 <Divider sx={{ mb: 2 }} />

//                 <TextField
//                   fullWidth
//                   label="Title"
//                   value={title}
//                   onChange={(e) => setTitle(e.target.value)}
//                   required
//                   sx={{ mb: 2 }}
//                 />
//                 <TextField
//                   fullWidth
//                   label="Description"
//                   multiline
//                   rows={4}
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                   required
//                 />
//               </CardContent>
//             </Card>
//           </Grid>

//           {/* Pricing & Stock */}
//           <Grid item xs={12} md={4}>
//             <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
//               <CardContent>
//                 <Typography variant="h6" gutterBottom fontWeight="600">
//                   Pricing & Stock
//                 </Typography>
//                 <Divider sx={{ mb: 2 }} />

//                 <TextField
//                   fullWidth
//                   label="Price"
//                   type="number"
//                   value={price}
//                   onChange={(e) => setPrice(e.target.value)}
//                   required
//                   sx={{ mb: 2 }}
//                 />
//                 <TextField
//                   fullWidth
//                   label="Stock Count"
//                   type="number"
//                   value={stock}
//                   onChange={(e) => setStock(e.target.value)}
//                   required
//                 />
//               </CardContent>
//             </Card>
//           </Grid>

//           {/* Category & Settings */}
//           <Grid item xs={12} md={4}>
//             <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
//               <CardContent>
//                 <Typography variant="h6" gutterBottom fontWeight="600">
//                   Category & Settings
//                 </Typography>
//                 <Divider sx={{ mb: 2 }} />

//                 {!isLoadingCategories && categories && (
//                   <FormControl fullWidth sx={{ mb: 2 }}>
//                     <InputLabel>Category</InputLabel>
//                     <Select value={category} label="Category" onChange={(e) => setCategory(e.target.value)}>
//                       {categories.map((cat) => (
//                         <MenuItem key={cat._id} value={cat._id}>
//                           {cat.name}
//                         </MenuItem>
//                       ))}
//                     </Select>
//                   </FormControl>
//                 )}

//                 <FormControlLabel
//                   control={<Checkbox checked={active} onChange={(e) => setActive(e.target.checked)} />}
//                   label="Is Active"
//                 />
//                 <FormControlLabel
//                   control={<Checkbox checked={isLatest} onChange={(e) => setIsLatest(e.target.checked)} />}
//                   label="Is Latest"
//                 />
//               </CardContent>
//             </Card>
//           </Grid>

//           {/* Media Upload */}
//           <Grid item xs={12} md={8}>
//             <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
//               <CardContent>
//                 <Typography variant="h6" gutterBottom fontWeight="600">
//                   Product Images
//                 </Typography>
//                 <Divider sx={{ mb: 2 }} />

//                 <Grid container spacing={3}>
//                   {[0, 1].map((index) => (
//                     <Grid item xs={12} md={6} key={index}>
//                       <TextField
//                         fullWidth
//                         label={index === 0 ? "Primary Image URL" : "Hover Image URL"}
//                         value={images[index]?.url || ""}
//                         InputProps={{ readOnly: true }}
//                         helperText="Upload to set path"
//                         sx={{ mb: 1 }}
//                       />
//                       <Button
//                         variant="contained"
//                         component="label"
//                         disabled={uploading[`image${index + 1}`]}
//                         fullWidth
//                         sx={{
//                           borderRadius: 2,
//                           textTransform: "none",
//                           fontWeight: "bold",
//                           background: "linear-gradient(135deg, #1976D2, #1565C0)",
//                           "&:hover": { background: "linear-gradient(135deg, #1565C0, #0D47A1)" },
//                         }}
//                       >
//                         {uploading[`image${index + 1}`]
//                           ? "Uploading..."
//                           : index === 0
//                           ? "Upload Primary Image"
//                           : "Upload Hover Image"}
//                         <input type="file" hidden onChange={(e) => uploadFileHandler(e, index + 1)} />
//                       </Button>
//                       {images[index]?.url && (
//                         <Box mt={2}>
//                           <img
//                             src={images[index].url}
//                             alt={`Product ${index}`}
//                             style={{ width: "100%", borderRadius: "10px", objectFit: "cover" }}
//                           />
//                         </Box>
//                       )}
//                     </Grid>
//                   ))}
//                 </Grid>
//               </CardContent>
//             </Card>
//           </Grid>

//           {/* Submit */}
//           <Grid item xs={12}>
//             <Button
//               type="submit"
//               variant="contained"
//               fullWidth
//               disabled={updateMutation.isLoading}
//               sx={{
//                 borderRadius: 3,
//                 textTransform: "none",
//                 fontWeight: "bold",
//                 py: 1.5,
//                 background: "linear-gradient(135deg, #43A047, #2E7D32)",
//                 "&:hover": { background: "linear-gradient(135deg, #388E3C, #1B5E20)" },
//               }}
//             >
//               {updateMutation.isLoading ? "Updating..." : "Update Product"}
//             </Button>
//           </Grid>
//         </Grid>
//       </Box>
//     </Box>
//   );
// };

// export default ProductEditPage;

// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate, Link } from "react-router-dom";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import {
//   Box,
//   Paper,
//   Typography,
//   Grid,
//   TextField,
//   Button,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Checkbox,
//   FormControlLabel,
//   CircularProgress,
//   Alert,
//   Divider,
//   Card,
//   CardContent,
// } from "@mui/material";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import { useSnackbar } from "notistack";
// import api from "../api/axiosConfig";
// import { useAuth } from "../context/AuthContext";

// // --- API Functions ---
// const fetchProductById = async (productId) => {
//   const { data } = await api.get(`/api/products/${productId}`);
//   return data;
// };

// const fetchCategories = async () => {
//   const { data } = await api.get("/api/categories");
//   return data;
// };

// const updateProduct = async ({ productId, productData, token }) => {
//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//   };
//   const { data } = await api.put(`/api/products/${productId}`, productData, config);
//   return data;
// };

// // --- Component ---
// const ProductEditPage = () => {
//   const { id: productId } = useParams();
//   const navigate = useNavigate();
//   const { userInfo } = useAuth();
//   const queryClient = useQueryClient();
//   const { enqueueSnackbar } = useSnackbar();

//   // --- State ---
//   const [title, setTitle] = useState("");
//   const [price, setPrice] = useState(0);
//   const [images, setImages] = useState([{ url: "" }, { url: "" }]);
//   const [category, setCategory] = useState("");
//   const [stock, setStock] = useState(0);
//   const [description, setDescription] = useState("");
//   const [active, setActive] = useState(false);
//   const [isLatest, setIsLatest] = useState(false);
//   const [uploading, setUploading] = useState({ image1: false, image2: false });

//   // --- Queries ---
//   const {
//     data: product,
//     isLoading: isLoadingProduct,
//     isError,
//     error,
//   } = useQuery({
//     queryKey: ["product", productId],
//     queryFn: () => fetchProductById(productId),
//   });

//   const { data: categories, isLoading: isLoadingCategories } = useQuery({
//     queryKey: ["categories"],
//     queryFn: fetchCategories,
//   });

//   // --- Load product data ---
//   useEffect(() => {
//     if (product) {
//       setTitle(product.title);
//       setPrice(product.price);
//       setImages(product.images?.length ? product.images : [{ url: "" }, { url: "" }]);
//       setCategory(product.category?._id || product.category || "");
//       setStock(product.variants?.[0]?.stock || 0);
//       setDescription(product.description);
//       setActive(product.active);
//       setIsLatest(product.isLatest || false);
//     }
//   }, [product]);

//   // --- Update product mutation ---
//   const updateMutation = useMutation({
//     mutationFn: updateProduct,
//     onSuccess: () => {
//       enqueueSnackbar("✅ Product updated successfully!", { variant: "success" });
//       queryClient.invalidateQueries(["productsAdmin"]);
//       queryClient.invalidateQueries(["product", productId]);
//       navigate("/products");
//     },
//     onError: (err) =>
//       enqueueSnackbar(err.response?.data?.message || "❌ Failed to update product", {
//         variant: "error",
//       }),
//   });

//   // --- Upload handler ---
//   const uploadFileHandler = async (e, imageNumber) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("media", file); // Must match backend field name: 'file'
//     setUploading((prev) => ({ ...prev, [`image${imageNumber}`]: true }));

//     try {
//       const config = {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${userInfo.token}`,
//         },
//       };

//       const { data } = await api.post("/api/upload", formData, config);
//       const uploadedUrl = data.files?.[0]?.url;

//      if (!uploadedUrl) throw new Error("No URL returned from server");

//       // Update local images array
//       const newImages = [...images];
//       newImages[imageNumber - 1] = { url: data.url, alt: title };
//       setImages(newImages);

//       enqueueSnackbar("Image uploaded successfully!", { variant: "success" });
//     } catch (error) {
//       enqueueSnackbar("❌ Image upload failed!", { variant: "error" });
//     } finally {
//       setUploading((prev) => ({ ...prev, [`image${imageNumber}`]: false }));
//     }
//   };

//   // --- Submit handler ---
//   const submitHandler = (e) => {
//     e.preventDefault();
//      const validImages = images.filter((img) => img.url); 

//     const productData = {
//       title,
//       price,
//       description,
//       images:validImages,
//       category,
//       variants: [{ price, stock }],
//       active,
//       isLatest,
//     };
//     updateMutation.mutate({ productId, productData, token: userInfo.token });
//   };

//   // --- Loading States ---
//   if (isLoadingProduct)
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
//         <CircularProgress size={50} />
//       </Box>
//     );

//   if (isError) return <Alert severity="error">{error.message}</Alert>;

//   // --- Render ---
//   return (
//     <Box p={3}>
//       {/* Header */}
//       <Box display="flex" alignItems="center" mb={3}>
//         <Button
//           component={Link}
//           to="/products"
//           startIcon={<ArrowBackIcon />}
//           variant="outlined"
//           sx={{ borderRadius: 2, textTransform: "none" }}
//         >
//           Back to Products
//         </Button>
//       </Box>

//       <Typography variant="h4" fontWeight="bold" gutterBottom>
//         Edit Product
//       </Typography>
//       <Typography variant="body2" color="text.secondary" mb={3}>
//         Update product details, media, and settings below.
//       </Typography>

//       {/* Form */}
//       <Box component="form" onSubmit={submitHandler}>
//         <Grid container spacing={3}>
//           {/* Basic Info */}
//           <Grid item xs={12} md={8}>
//             <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
//               <CardContent>
//                 <Typography variant="h6" gutterBottom fontWeight="600">
//                   Basic Information
//                 </Typography>
//                 <Divider sx={{ mb: 2 }} />

//                 <TextField
//                   fullWidth
//                   label="Title"
//                   value={title}
//                   onChange={(e) => setTitle(e.target.value)}
//                   required
//                   sx={{ mb: 2 }}
//                 />
//                 <TextField
//                   fullWidth
//                   label="Description"
//                   multiline
//                   rows={4}
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                   required
//                 />
//               </CardContent>
//             </Card>
//           </Grid>

//           {/* Pricing & Stock */}
//           <Grid item xs={12} md={4}>
//             <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
//               <CardContent>
//                 <Typography variant="h6" gutterBottom fontWeight="600">
//                   Pricing & Stock
//                 </Typography>
//                 <Divider sx={{ mb: 2 }} />

//                 <TextField
//                   fullWidth
//                   label="Price"
//                   type="number"
//                   value={price}
//                   onChange={(e) => setPrice(e.target.value)}
//                   required
//                   sx={{ mb: 2 }}
//                 />
//                 <TextField
//                   fullWidth
//                   label="Stock Count"
//                   type="number"
//                   value={stock}
//                   onChange={(e) => setStock(e.target.value)}
//                   required
//                 />
//               </CardContent>
//             </Card>
//           </Grid>

//           {/* Category & Settings */}
//           <Grid item xs={12} md={4}>
//             <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
//               <CardContent>
//                 <Typography variant="h6" gutterBottom fontWeight="600">
//                   Category & Settings
//                 </Typography>
//                 <Divider sx={{ mb: 2 }} />

//                 {!isLoadingCategories && categories && (
//                   <FormControl fullWidth sx={{ mb: 2 }}>
//                     <InputLabel>Category</InputLabel>
//                     <Select
//                       value={category}
//                       label="Category"
//                       onChange={(e) => setCategory(e.target.value)}
//                     >
//                       {categories.map((cat) => (
//                         <MenuItem key={cat._id} value={cat._id}>
//                           {cat.name}
//                         </MenuItem>
//                       ))}
//                     </Select>
//                   </FormControl>
//                 )}

//                 <FormControlLabel
//                   control={
//                     <Checkbox checked={active} onChange={(e) => setActive(e.target.checked)} />
//                   }
//                   label="Is Active"
//                 />
//                 <FormControlLabel
//                   control={
//                     <Checkbox checked={isLatest} onChange={(e) => setIsLatest(e.target.checked)} />
//                   }
//                   label="Is Latest"
//                 />
//               </CardContent>
//             </Card>
//           </Grid>

//           {/* Media Upload */}
//           <Grid item xs={12} md={8}>
//             <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
//               <CardContent>
//                 <Typography variant="h6" gutterBottom fontWeight="600">
//                   Product Images
//                 </Typography>
//                 <Divider sx={{ mb: 2 }} />

//                 <Grid container spacing={3}>
//                   {[0, 1].map((index) => (
//                     <Grid item xs={12} md={6} key={index}>
//                       <TextField
//                         fullWidth
//                         label={index === 0 ? "Primary Image URL" : "Hover Image URL"}
//                         value={images[index]?.url || ""}
//                         InputProps={{ readOnly: true }}
//                         helperText="Upload to set path"
//                         sx={{ mb: 1 }}
//                       />
//                       <Button
//                         variant="contained"
//                         component="label"
//                         disabled={uploading[`image${index + 1}`]}
//                         fullWidth
//                         sx={{
//                           borderRadius: 2,
//                           textTransform: "none",
//                           fontWeight: "bold",
//                           background: "linear-gradient(135deg, #1976D2, #1565C0)",
//                           "&:hover": { background: "linear-gradient(135deg, #1565C0, #0D47A1)" },
//                         }}
//                       >
//                         {uploading[`image${index + 1}`]
//                           ? "Uploading..."
//                           : index === 0
//                           ? "Upload Primary Image"
//                           : "Upload Hover Image"}
//                         <input type="file" hidden onChange={(e) => uploadFileHandler(e, index + 1)} />
//                       </Button>

//                       {images[index]?.url && (
//                         <Box mt={2}>
//                           <img
//                             src={images[index].url}
//                             alt={`Product ${index}`}
//                             style={{
//                               width: "100%",
//                               borderRadius: "10px",
//                               objectFit: "cover",
//                             }}
//                           />
//                         </Box>
//                       )}
//                     </Grid>
//                   ))}
//                 </Grid>
//               </CardContent>
//             </Card>
//           </Grid>

//           {/* Submit */}
//           <Grid item xs={12}>
//             <Button
//               type="submit"
//               variant="contained"
//               fullWidth
//               disabled={updateMutation.isLoading}
//               sx={{
//                 borderRadius: 3,
//                 textTransform: "none",
//                 fontWeight: "bold",
//                 py: 1.5,
//                 background: "linear-gradient(135deg, #43A047, #2E7D32)",
//                 "&:hover": {
//                   background: "linear-gradient(135deg, #388E3C, #1B5E20)",
//                 },
//               }}
//             >
//               {updateMutation.isLoading ? "Updating..." : "Update Product"}
//             </Button>
//           </Grid>
//         </Grid>
//       </Box>
//     </Box>
//   );
// };

// export default ProductEditPage;

import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  CircularProgress,
  Alert,
  Divider,
  Card,
  CardContent,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useSnackbar } from "notistack";
import api from "../api/axiosConfig";
import { useAuth } from "../context/AuthContext";

// --- API functions ---
const fetchProductById = async (productId) => {
  const { data } = await api.get(`/api/products/${productId}`);
  return data;
};

const fetchCategories = async () => {
  const { data } = await api.get("/api/categories");
  return data;
};

const updateProduct = async ({ productId, productData, token }) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await api.put(`/api/products/${productId}`, productData, config);
  return data;
};

const ProductEditPage = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const { userInfo } = useAuth();
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  // --- States ---
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [images, setImages] = useState([{ url: "" }, { url: "" }]);
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [description, setDescription] = useState("");
  const [active, setActive] = useState(false);
  const [isLatest, setIsLatest] = useState(false);
  const [uploading, setUploading] = useState({ image1: false, image2: false });

  // --- Queries ---
  const {
    data: product,
    isLoading: isLoadingProduct,
    isError,
    error,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => fetchProductById(productId),
  });

  const { data: categories, isLoading: isLoadingCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  // --- Load product data ---
  useEffect(() => {
    if (product) {
      setTitle(product.title || "");
      setPrice(product.price || 0);
      setImages(product.images?.length ? product.images.map(img => ({ url: img.url })) : [{ url: "" }, { url: "" }]);
      setCategory(product.category?._id || product.category || "");
      setStock(product.variants?.[0]?.stock || 0);
      setDescription(product.description || "");
      setActive(product.active || false);
      setIsLatest(product.isLatest || false);
    }
  }, [product]);

  // --- Update Product Mutation ---
  const updateMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      enqueueSnackbar("✅ Product updated successfully!", { variant: "success" });
      queryClient.invalidateQueries(["productsAdmin"]);
      queryClient.invalidateQueries(["product", productId]);
      navigate("/products");
    },
    onError: (err) => {
      enqueueSnackbar(err.response?.data?.message || "❌ Failed to update product", {
        variant: "error",
      });
    },
  });

  // --- Upload File Handler ---
  const uploadFileHandler = async (e, imageNumber) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("media", file);
    
    setUploading((prev) => ({ ...prev, [`image${imageNumber}`]: true }));

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await api.post("/api/upload", formData, config);
      const uploadedUrl = data.files?.[0]?.url;

      if (!uploadedUrl) throw new Error("No URL returned from server");

      const newImages = [...images];
      newImages[imageNumber - 1] = { url: uploadedUrl };
      setImages(newImages);

      enqueueSnackbar("✅ Image uploaded successfully!", { variant: "success" });
    } catch (error) {
      enqueueSnackbar("❌ Image upload failed!", { variant: "error" });
    } finally {
      setUploading((prev) => ({ ...prev, [`image${imageNumber}`]: false }));
    }
  };

  // --- Submit Handler ---
  const submitHandler = (e) => {
    e.preventDefault();

    const validImages = images.filter((img) => img.url); // remove empty slots

    const productData = {
      title,
      price,
      description,
      images: validImages, // ensure array of {url: "..."}
      category,
      variants: [{ price, stock }],
      active,
      isLatest,
    };

    updateMutation.mutate({ productId, productData, token: userInfo.token });
  };

  // --- Render ---
  if (isLoadingProduct)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
        <CircularProgress size={50} />
      </Box>
    );

  if (isError) return <Alert severity="error">{error.message}</Alert>;

  return (
    <Box p={3}>
      <Box display="flex" alignItems="center" mb={3}>
        <Button
          component={Link}
          to="/products"
          startIcon={<ArrowBackIcon />}
          variant="outlined"
          sx={{ borderRadius: 2, textTransform: "none" }}
        >
          Back to Products
        </Button>
      </Box>

      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Edit Product
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Update product details, media, and settings below.
      </Typography>

      <Box component="form" onSubmit={submitHandler}>
        <Grid container spacing={3}>
          {/* Keep your UI same — content unchanged */}
          {/* Basic Info */}
          <Grid item xs={12} md={8}>
            <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom fontWeight="600">
                  Basic Information
                </Typography>
                <Divider sx={{ mb: 2 }} />

                <TextField
                  fullWidth
                  label="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Description"
                  multiline
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </CardContent>
            </Card>
          </Grid>

          {/* Pricing & Stock */}
          <Grid item xs={12} md={4}>
            <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom fontWeight="600">
                  Pricing & Stock
                </Typography>
                <Divider sx={{ mb: 2 }} />

                <TextField
                  fullWidth
                  label="Price"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Stock Count"
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  required
                />
              </CardContent>
            </Card>
          </Grid>

          {/* Category & Settings */}
          <Grid item xs={12} md={4}>
            <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom fontWeight="600">
                  Category & Settings
                </Typography>
                <Divider sx={{ mb: 2 }} />

                {!isLoadingCategories && categories && (
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Category</InputLabel>
                    <Select
                      value={category}
                      label="Category"
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      {categories.map((cat) => (
                        <MenuItem key={cat._id} value={cat._id}>
                          {cat.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}

                <FormControlLabel
                  control={
                    <Checkbox checked={active} onChange={(e) => setActive(e.target.checked)} />
                  }
                  label="Is Active"
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={isLatest} onChange={(e) => setIsLatest(e.target.checked)} />
                  }
                  label="Is Latest"
                />
              </CardContent>
            </Card>
          </Grid>
          
          {/* Image Upload Section */}
          <Grid item xs={12} md={8}>
            <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom fontWeight="600">
                  Product Images
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Grid container spacing={3}>
                  {[0, 1].map((index) => (
                    <Grid item xs={12} md={6} key={index}>
                      <TextField
                        fullWidth
                        label={index === 0 ? "Primary Image URL" : "Hover Image URL"}
                        value={images[index]?.url || ""}
                        InputProps={{ readOnly: true }}
                        helperText="Upload to set path"
                        sx={{ mb: 1 }}
                      />
                      <Button
                        variant="contained"
                        component="label"
                        disabled={uploading[`image${index + 1}`]}
                        fullWidth
                        sx={{
                          borderRadius: 2,
                          textTransform: "none",
                          fontWeight: "bold",
                          background: "linear-gradient(135deg, #1976D2, #1565C0)",
                          "&:hover": { background: "linear-gradient(135deg, #1565C0, #0D47A1)" },
                        }}
                      >
                        {uploading[`image${index + 1}`]
                          ? "Uploading..."
                          : index === 0
                          ? "Upload Primary Image"
                          : "Upload Hover Image"}
                        <input type="file" hidden onChange={(e) => uploadFileHandler(e, index + 1)} />
                      </Button>

                      {images[index]?.url && (
                        <Box mt={2}>
                          <img
                            src={images[index].url}
                            alt={`Product ${index}`}
                            style={{
                              width: "100%",
                              borderRadius: "10px",
                              objectFit: "cover",
                            }}
                          />
                        </Box>
                      )}
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={updateMutation.isLoading}
              sx={{
                borderRadius: 3,
                textTransform: "none",
                fontWeight: "bold",
                py: 1.5,
                background: "linear-gradient(135deg, #43A047, #2E7D32)",
                "&:hover": {
                  background: "linear-gradient(135deg, #388E3C, #1B5E20)",
                },
              }}
            >
              {updateMutation.isLoading ? "Updating..." : "Update Product"}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ProductEditPage;
