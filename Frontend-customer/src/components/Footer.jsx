import React from "react";
import { Box, Container, Grid, Typography, TextField, Button, IconButton, Divider } from "@mui/material";
import { Facebook, Instagram, Twitter, YouTube, LocationOn, Phone, Email } from "@mui/icons-material";
import { motion } from "framer-motion";
import { Link as RouterLink } from "react-router-dom";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

const Footer = () => {
  return (
    <Box sx={{ bgcolor: "#111", color: "white", pt: 8, pb: 4, mt: 6 }}>
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          {/* Brand Info */}
          <Grid item xs={12} md={3} width="70%">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2, color: "#B8860B" }}>
                Aura Jewels
              </Typography>
              <Typography variant="body2" sx={{ color: "#ccc", lineHeight: 1.8 }}>
                Discover timeless jewellery crafted with elegance and perfection.  
                Aura Jewels brings you a collection that defines luxury, tradition, and modern style.
              </Typography>
            </motion.div>
          </Grid>

          {/* Quick Links */}
          {/* <Grid item xs={12} sm={6} md={2}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} custom={1}>
              <Typography variant="h6" sx={{ mb: 2, color: "#B8860B" }}>
                Quick Links
              </Typography>
              {["Home", "Rings", "Chains", "Earrings", "Contact Us"].map((link, index) => (
                <Typography
                  key={index}
                  variant="body2"
                  sx={{ color: "#ccc", mb: 1, cursor: "pointer", "&:hover": { color: "#fff" } }}
                >
                  {link}
                </Typography>
              ))}
            </motion.div>
          </Grid> */}
          <Grid item xs={12} sm={6} md={2}>
  <Typography variant="h6" sx={{ mb: 2, color: "#FFD700" }}>
    Quick Links
  </Typography>
  {[
    { name: "Home", path: "/" },
    { name: "Rings", path: "/category/rings" },
    { name: "Chains", path: "/category/chains" },
    { name: "Earrings", path: "/category/earrings" },
    { name: "Lockets", path: "/category/lockets" },
    { name: "Bracelets", path: "/category/bracelets" },
    // { name: "Pendants", path: "/category/pendants" },
    // { name: "Solitaires ", path: "/category/solitaires" },

  ].map((link, index) => (
    <Typography
      key={index}
      component={RouterLink}
      to={link.path}
      variant="body2"
      sx={{
        display: "block",
        color: "#ccc",
        mb: 1,
        textDecoration: "none",
        "&:hover": { color: "#fff" },
      }}
    >
      {link.name}
    </Typography>
  ))}
</Grid>


          {/* Customer Policies */}
          <Grid item xs={12} sm={6} md={2}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} custom={2}>
              <Typography variant="h6" sx={{ mb: 2, color: "#B8860B" }}>
                Customer Care
              </Typography>
              {["Contact Us", "About Us" , "Return Policy", "Shipping Info", "Privacy Policy", "FAQs"].map((link, index) => (
                <Typography
                  key={index}
                  variant="body2"
                  sx={{ color: "#ccc", mb: 1, cursor: "pointer", "&:hover": { color: "#fff" } }}
                >
                  {link}
                </Typography>
              ))}
            </motion.div>
          </Grid>

          {/* Newsletter */}
          <Grid item xs={12} md={5}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} custom={3}>
              <Typography variant="h6" sx={{ mb: 2, color: "#B8860B" }}>
                Subscribe to our Newsletter
              </Typography>
              <Typography variant="body2" sx={{ color: "#ccc", mb: 2 }}>
                Be the first to know about new collections, exclusive offers, and style tips.
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                <TextField
                  placeholder="Enter your email"
                  variant="filled"
                  fullWidth
                  InputProps={{
                    disableUnderline: true,
                    style: { backgroundColor: "#fff", borderRadius: "6px" },
                  }}
                />
                <Button
                  variant="contained"
                  sx={{ bgcolor: "#B8860B", "&:hover": { bgcolor: "#9c6f08" } }}
                >
                  Subscribe
                </Button>
              </Box>
              {/* Social Media */}
              <Box sx={{ mt: 3 }}>
                <IconButton sx={{ color: "white", "&:hover": { color: "#1877F2" } }}>
                  <Facebook />
                </IconButton>
                <IconButton sx={{ color: "white", "&:hover": { color: "#E4405F" } }}>
                  <Instagram />
                </IconButton>
                <IconButton sx={{ color: "white", "&:hover": { color: "#1DA1F2" } }}>
                  <Twitter />
                </IconButton>
                <IconButton sx={{ color: "white", "&:hover": { color: "#FF0000" } }}>
                  <YouTube />
                </IconButton>
              </Box>
            </motion.div>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, bgcolor: "#444" }} />

        {/* Bottom Bar */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} custom={4}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography variant="body2" sx={{ color: "#aaa" }}>
                © {new Date().getFullYear()} Aura Jewels. All Rights Reserved.
              </Typography>
            </Grid>
            <Grid item>
              <Box sx={{ display: "flex", gap: 2, color: "#aaa" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <LocationOn fontSize="small" /> <Typography variant="body2">Ludhiana, Punjab</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Phone fontSize="small" /> <Typography variant="body2">+91 98765 43210</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Email fontSize="small" /> <Typography variant="body2">support@aurajewels.com</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Footer;
