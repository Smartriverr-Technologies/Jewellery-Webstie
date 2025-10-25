import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSnackbar } from "notistack";
import {
  Box,
  Typography,
  Button,
  Grid,
  Container,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Alert,
  CircularProgress,
} from "@mui/material";
import CheckoutSteps from "../components/CheckoutSteps";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@mui/material";
import api from '../api/axiosConfig';


const fetchSettings = async () => {
  const { data } = await api.get('/api/settings');
  return data;
};

// --- API functions ---
const placeOrderFn = async ({ order, token }) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await api.post(
    "/api/orders",
    order,
    config
  );
  return data;
};

const createRazorpayOrderFn = async ({ orderId, token }) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const { data } = await api.post(
    `/api/orders/${orderId}/create-razorpay-order`,
    {},
    config
  );
  return data;
};

const verifyPaymentFn = async ({ orderId, paymentResult, token }) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const { data } = await api.post(
    `/api/orders/${orderId}/verify-payment`,
    paymentResult,
    config
  );
  return data;
};

const PlaceOrderPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { cartItems, shippingAddress, paymentMethod, clearCart } = useCart();
  const { userInfo } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const { data: settings, isLoading: isLoadingSettings } = useQuery({ 
    queryKey: ['settings'], 
    queryFn: fetchSettings 
  });

  // --- Price Calculations ---
  const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2);
  const itemsPrice = addDecimals(
    cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  // const shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 10);
   const shippingPrice = addDecimals(
    settings ? (itemsPrice > settings.freeShippingThreshold ? 0 : settings.shippingCharge) : 0
  );
  // const taxPrice = addDecimals(Number((0.15 * itemsPrice).toFixed(2)));
  const totalPrice = (
    Number(itemsPrice) +
    Number(shippingPrice)  
    // Number(taxPrice)
  ).toFixed(2);

  const placeOrderMutation = useMutation({
    mutationFn: placeOrderFn,
    onSuccess: (createdOrder) => {
      if (createdOrder.paymentMethod === "Razorpay") {
        payWithRazorpayHandler(createdOrder);
      } else {
        enqueueSnackbar("Order placed successfully!", { variant: "success" });
        clearCart();
        navigate(`/order/${createdOrder._id}`);
      }
    },
    onError: (error) =>
      enqueueSnackbar(
        error.response?.data?.message || "Could not place order.",
        { variant: "error" }
      ),
  });

  const payWithRazorpayHandler = async (order) => {
    try {
      const razorpayOrder = await createRazorpayOrderFn({
        orderId: order._id,
        token: userInfo.token,
      });
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: "Aura Jewels",
        description: `Payment for Order #${order._id}`,
        order_id: razorpayOrder.id,
        handler: async function (response) {
          try {
            await verifyPaymentFn({
              orderId: order._id,
              paymentResult: response,
              token: userInfo.token,
            });
            queryClient.invalidateQueries(["orderDetails", order._id]);
            enqueueSnackbar("Payment successful!", { variant: "success" });
            clearCart();
            navigate(`/order/${order._id}`);
          } catch (error) {
            enqueueSnackbar("Payment verification failed.", {
              variant: "error",
            });
          }
        },
        prefill: {
          name: userInfo.name,
          email: userInfo.email,
          contact: shippingAddress.phone,
        },
        theme: { color: "#FF9900" }, // Amazon yellow
      };
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      enqueueSnackbar("Could not initiate Razorpay payment.", {
        variant: "error",
      });
    }
  };

  const placeOrderHandler = () => {
    // placeOrderMutation.mutate({
    //   order: {
    //     orderItems: cartItems,
    //     shippingAddress,
    //     paymentMethod,
    //     itemsPrice,
    //     shippingPrice,
    //     taxPrice,
    //     totalPrice,
    //   },
    //   token: userInfo.token,
    // });
    placeOrderMutation.mutate({
      order: {
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
      },
      token: userInfo.token,
    });
  };

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <CheckoutSteps step1 step2 step3 step4 />

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {/* Left Section */}
        <Grid item md={8} xs={12}>
          <Paper sx={{ p: 2, mb: 2 , }}>
            <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.2rem', color: '#111' }} gutterBottom>
              Shipping Address
            </Typography>
            <Typography>
              {shippingAddress.address}, {shippingAddress.city},{" "}
              {shippingAddress.postalCode}, {shippingAddress.country}
            </Typography>
            <Typography>Phone: {shippingAddress.phone}</Typography>
          </Paper>

          <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.2rem', color: '#111' }} gutterBottom>
              Payment Method
            </Typography>
            <Typography>{paymentMethod}</Typography>
          </Paper>

          
       <Paper
  sx={{
    p: 3,
    borderRadius: 2,
    border: '1px solid #ddd',
    boxShadow: 'none',
    bgcolor: '#fff',
  }}
>
  <Box display="flex" alignItems="center" mb={2}>
    <Typography
      variant="h6"
      sx={{ fontWeight: 700, fontSize: '1.2rem', color: '#111' }}
    >
      Order Items
    </Typography>
  </Box>

  <List disablePadding>
    {cartItems.map((item) => (
      <ListItem
        key={item._id}
        alignItems="flex-start"
        divider
        sx={{
          py: 2,
          px: 0,
          display: 'flex',
          alignItems: 'flex-start',
        }}
      >
        {/* Product Image */}
        <ListItemAvatar sx={{ minWidth: 90 }}>
          <Avatar
            variant="square"
            src={item.images[0]?.url}
            sx={{
              width: 100,
              height: 100,
              borderRadius: 1,
              border: '1px solid #ddd',
              objectFit: 'contain',
              bgcolor: '#fff',
            }}
          />
        </ListItemAvatar>

        {/* Product Info */}
        <ListItemText
          sx={{ flex: 1, ml: 2 }}
          primary={
            <Link
              to={`/product/slug/${item.slug}`}
              style={{
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '1rem',
                color: '#B8860B',
              }}
              onMouseEnter={(e) =>
                (e.target.style.textDecoration = 'underline')
              }
              onMouseLeave={(e) =>
                (e.target.style.textDecoration = 'none')
              }
            >
              {item.title}
            </Link>
          }
          secondary={
            <Box>
              {/* Description */}
              {item.description && (
                <Typography
                  variant="body2"
                  sx={{ color: '#565959', fontSize: '0.85rem', mt: 0.5 }}
                >
                  {item.description.length > 40
                    ? item.description.slice(0, 40) + '...'
                    : item.description}
                </Typography>
              )}

              {/* Qty & Price */}
              <Typography
                sx={{
                  fontSize: '0.9rem',
                  color: '#111',
                  mt: 1,
                }}
              >
                Qty: <strong>{item.qty}</strong> × ₹{item.price}
              </Typography>

              {/* Subtotal */}
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  color: '#B8860B',
                }}
              >
                Subtotal: ₹{item.qty * item.price}
              </Typography>
            </Box>
          }
        />

        {/* Right-aligned Subtotal */}
        <Typography
          variant="body1"
          fontWeight={700}
          sx={{
            color: 'black',
            fontSize: '1rem',
            minWidth: 120,
            textAlign: 'right',
            alignSelf: 'center',
          }}
        >
          ₹{item.qty * item.price}
        </Typography>
      </ListItem>
    ))}
  </List>
</Paper>


        </Grid>

        {/* Right Section - Order Summary */}
        <Grid item md={4} xs={12}>
         
          <Paper
            elevation={3}
            sx={{ p: 3, position: { md: "sticky" }, top: 100, border: "1px solid #ddd" }}
          >
            <Typography variant="h6" gutterBottom>Order Summary</Typography>
            <Divider sx={{ mb: 2 }} />

            {isLoadingSettings ? <Skeleton height={100} /> : (
                <>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                        <Typography>Items:</Typography>
                        <Typography>₹{itemsPrice}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                        <Typography>Shipping:</Typography>
                        <Typography>₹{shippingPrice}</Typography>
                    </Box>
                     {itemsPrice < settings.freeShippingThreshold && shippingPrice > 0 && (
                  <Typography variant="caption" color="#B8860B" sx={{ display: 'block', textAlign: 'right', fontStyle: 'italic' , fontWeight: 'bold' }}>
                    Add ₹{addDecimals(settings.freeShippingThreshold - itemsPrice)} more for FREE shipping.
                  </Typography>
                )}
                    <Divider sx={{ my: 2 }} />
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                        <Typography variant="h6">Order Total:</Typography>
                        <Typography variant="h6" sx={{ color: "#B8860B" }}>₹{totalPrice}</Typography>
                    </Box>
                </>
            )}
            
            {placeOrderMutation.isError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {placeOrderMutation.error.response?.data?.message || "An error occurred"}
              </Alert>
            )}
            
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ bgcolor: "#B8860B", color: "white", fontWeight: 600, "&:hover": { bgcolor: "#A07409" }, mb: 1 }}
              onClick={placeOrderHandler}
              disabled={cartItems.length === 0 || placeOrderMutation.isLoading || isLoadingSettings}
            >
              {placeOrderMutation.isLoading ? <CircularProgress size={24} /> : "Place your order"}
            </Button>
            <Typography variant="caption" color="text.secondary">
              By placing your order, you agree to our terms and conditions.
            </Typography>
            {/* Delivery & Exchange Info Box */}


          </Paper>
          <Box
  sx={{
    mt: 3,
    p: 2.5,
    borderRadius: 2,
    border: "1px solid #e0d7c6",
    background: "linear-gradient(145deg, #fffdf8, #fffaf0)",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    textAlign: "left",
  }}
>
  <Typography
    variant="h6"
    sx={{
      color: "#B8860B",
      fontWeight: 700,
      fontSize: "1.1rem",
      mb: 1,
    }}
  >
    Shipping & Exchange Policy
  </Typography>

  <Typography
    variant="body2"
    sx={{
      color: "#444",
      lineHeight: 1.7,
      mb: 1,
    }}
  >
    Your jewellery will be carefully crafted and shipped within{" "}
    <strong>5–7 business days</strong> after placing the order. We ensure
    every piece reaches you with elegance and safety.
  </Typography>

  <Typography
    variant="body2"
    sx={{
      color: "#444",
      lineHeight: 1.7,
    }}
  >
    Please note: <strong>No refunds</strong> are available. However, we offer
    smooth and hassle-free <strong>exchange options</strong> in case of size
    or manufacturing defects.
  </Typography>
</Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PlaceOrderPage;

