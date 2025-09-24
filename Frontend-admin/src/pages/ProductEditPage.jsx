import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Box, Paper, Typography, Grid, TextField, Button, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel, CircularProgress, Alert } from '@mui/material';

// --- API Functions for React Query ---
const fetchProductById = async (productId) => {
  const { data } = await axios.get(`http://localhost:4000/api/products/${productId}`);
  return data;
};

const fetchCategories = async () => {
  const { data } = await axios.get('http://localhost:4000/api/categories');
  return data;
};

const updateProduct = async ({ productId, productData, token }) => {
  const config = { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } };
  const { data } = await axios.put(`http://localhost:4000/api/products/${productId}`, productData, config);
  return data;
};

// --- The Component ---
const ProductEditPage = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const { userInfo } = useAuth();
  const queryClient = useQueryClient();

  // Form state
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(0);
  const [images, setImages] = useState([{ url: '' }, { url: '' }]);
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState(0);
  const [description, setDescription] = useState('');
  const [active, setActive] = useState(false);
  const [isLatest, setIsLatest] = useState(false);
  const [uploading, setUploading] = useState({ image1: false, image2: false });

  // Fetching product data
  const { data: product, isLoading, isError, error } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => fetchProductById(productId),
  });

  // Fetching categories for the dropdown
  const { data: categories, isLoading: isLoadingCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  // Effect to populate form when product data loads
  useEffect(() => {
    if (product) {
      setTitle(product.title);
      setPrice(product.price);
      setImages(product.images?.length ? product.images : [{ url: '' }, { url: '' }]);
      setCategory(product.category?._id || '');
      setStock(product.variants && product.variants[0]?.stock || 0);
      setDescription(product.description);
      setActive(product.active);
      setIsLatest(product.isLatest || false);
    }
  }, [product]);

  const updateMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(['productsAdmin']); // Refreshes the product list
      navigate('/products');
    },
    onError: (err) => alert(err.response?.data?.message || 'Failed to update'),
  });

  const uploadFileHandler = async (e, imageNumber) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(prev => ({ ...prev, [`image${imageNumber}`]: true }));
    try {
      const config = { headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${userInfo.token}` } };
      const { data } = await axios.post('http://localhost:4000/api/upload', formData, config);
      const newImages = [...images];
      newImages[imageNumber - 1] = { url: data.image, alt: title };
      setImages(newImages);
    } catch (error) {
      alert('Image upload failed.');
    } finally {
      setUploading(prev => ({ ...prev, [`image${imageNumber}`]: false }));
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const productData = { title, price, description, images, category, variants: [{ price, stock }], active, isLatest };
    updateMutation.mutate({ productId, productData, token: userInfo.token });
  };

  if (isLoading) return <CircularProgress />;
  if (isError) return <Alert severity="error">{error.message}</Alert>;

  return (
    <Paper sx={{ p: 4, m: 2, borderRadius: 2 }}>
      <Link to="/products" style={{ textDecoration: 'none', marginBottom: '1rem', display: 'inline-block' }}>
        <Button variant="outlined">&larr; Go Back</Button>
      </Link>
      <Typography variant="h4" gutterBottom>Edit Product</Typography>
      <Box component="form" onSubmit={submitHandler}>
        <Grid container spacing={2}>
          <Grid item xs={12}><TextField fullWidth label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required /></Grid>
          <Grid item xs={12}><TextField fullWidth label="Price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} required /></Grid>
          <Grid item xs={12}>
            <FormControl fullWidth required>
              <InputLabel>Category</InputLabel>
              <Select value={category} label="Category" onChange={(e) => setCategory(e.target.value)}>
                {isLoadingCategories ? <MenuItem>Loading...</MenuItem> :
                categories?.map(cat => (
                  <MenuItem key={cat._id} value={cat._id}>{cat.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}><TextField fullWidth label="Stock Count" type="number" value={stock} onChange={(e) => setStock(e.target.value)} required /></Grid>
          <Grid item xs={12}><TextField fullWidth label="Description" multiline rows={4} value={description} onChange={(e) => setDescription(e.target.value)} required /></Grid>
          <Grid item xs={12} md={6}>
            <TextField fullWidth label="Primary Image URL" value={images[0]?.url || ''} InputProps={{ readOnly: true }} helperText="Upload to set path" />
            <Button variant="contained" component="label" sx={{ mt: 1 }} disabled={uploading.image1}>{uploading.image1 ? 'Uploading...' : 'Upload Primary Image'}<input type="file" hidden onChange={(e) => uploadFileHandler(e, 1)} /></Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField fullWidth label="Hover Image URL" value={images[1]?.url || ''} InputProps={{ readOnly: true }} helperText="Upload to set path" />
            <Button variant="contained" component="label" sx={{ mt: 1 }} disabled={uploading.image2}>{uploading.image2 ? 'Uploading...' : 'Upload Hover Image'}<input type="file" hidden onChange={(e) => uploadFileHandler(e, 2)} /></Button>
          </Grid>
          <Grid item xs={6}><FormControlLabel control={<Checkbox checked={active} onChange={(e) => setActive(e.target.checked)} />} label="Is Active" /></Grid>
          <Grid item xs={6}><FormControlLabel control={<Checkbox checked={isLatest} onChange={(e) => setIsLatest(e.target.checked)} />} label="Is Latest" /></Grid>
          <Grid item xs={12}><Button type="submit" variant="contained" color="primary" disabled={updateMutation.isLoading} fullWidth>{updateMutation.isLoading ? 'Updating...' : 'Update Product'}</Button></Grid>
        </Grid>
      </Box>
    </Paper>
  );
};
export default ProductEditPage;