import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import {
  Box,
  Button,
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Tooltip,
  CircularProgress,
  Alert,
} from "@mui/material";
import api from '../api/axiosConfig';
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ProductListPage = () => {
  const navigate = useNavigate();
  const { userInfo } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        };
        const { data } = await api.get(
          "/api/products/admin",
          config
        );
        setProducts(data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    if (userInfo) fetchProducts();
  }, [userInfo]);

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const config = {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        };
        await api.delete(`/api/products/${id}`, config);
        setProducts(products.filter((p) => p._id !== id));
      } catch (err) {
        alert(err.response?.data?.message || "Failed to delete product");
      }
    }
  };

  const createProductHandler = async () => {
    if (window.confirm("Are you sure you want to create a new product?")) {
      try {
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        const { data } = await api.post(
          "/api/products",
          {},
          config
        );
        navigate(`/products/${data._id}/edit`);
      } catch (err) {
        alert("Could not create product");
      }
    }
  };

  if (loading)
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  if (error)
    return (
      <Alert severity="error" sx={{ my: 3 }}>
        {error}
      </Alert>
    );

  return (
    <Container sx={{ py: 4 }}>
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" fontWeight={700}>
          Products
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={createProductHandler}
          sx={{
            borderRadius: 2,
            textTransform: "none",
           
            fontWeight: 600,
             background: "linear-gradient(135deg, #43A047, #2E7D32)",
                "&:hover": { background: "linear-gradient(135deg, #388E3C, #1B5E20)" },
            boxShadow: "0 4px 15px rgba(67, 160, 71, 0.3)",
          }}
        >
          Create Product
        </Button>
      </Box>

      {/* Table */}
      <Paper elevation={3} sx={{ borderRadius: 3, overflow: "hidden" }}>
        <TableContainer>
          <Table>
            <TableHead sx={{ bgcolor: "#f5f6fa" }}>
              <TableRow>
                <TableCell>PRODUCT ID</TableCell>
                <TableCell>NAME</TableCell>
                <TableCell>PRICE</TableCell>
                <TableCell>CATEGORY</TableCell>
                <TableCell align="center">ACTIONS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product, index) => (
                <TableRow
                  key={product._id}
                  hover
                  sx={{
                    bgcolor: index % 2 === 0 ? "#fff" : "#fafafa",
                    transition: "0.2s",
                    "&:hover": { bgcolor: "#f1f1f1" },
                  }}
                >
                  <TableCell>{product._id}</TableCell>
                  <TableCell>
                    <Typography fontWeight={600}>{product.title}</Typography>
                  </TableCell>
                  <TableCell>₹{product.price}</TableCell>
                  <TableCell>
                    <Chip
                      label={product.category?.name || "Uncategorized"}
                      color="primary"
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Edit">
                      <IconButton
                        color="primary"
                        component={Link}
                        to={`/products/${product._id}/edit`}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        color="error"
                        onClick={() => deleteHandler(product._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default ProductListPage;
