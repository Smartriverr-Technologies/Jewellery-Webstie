// import React from "react";
// import { Box, Container, Grid, Typography, TextField, Button, IconButton, Divider } from "@mui/material";
// import { Facebook, Instagram, Twitter, YouTube, LocationOn, Phone, Email } from "@mui/icons-material";
// import { motion } from "framer-motion";
// import { Link as RouterLink } from "react-router-dom";

// // Animation variants
// const fadeInUp = {
//   hidden: { opacity: 0, y: 30 },
//   visible: (i = 0) => ({
//     opacity: 1,
//     y: 0,
//     transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
//   }),
// };

// const Footer = () => {
//   return (
//     <Box sx={{ bgcolor: "#111", color: "white", pt: 6, pb: 4, mt: 2 }}>
//       <Container maxWidth="lg">
//         <Grid container spacing={6}>
//           {/* Brand Info */}
//           <Grid item xs={12} md={3} width="70%">
//             <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
//               <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2, color: "#B8860B" }}>
//                 Aura Jewels
//               </Typography>
//               <Typography variant="body2" sx={{ color: "#ccc", lineHeight: 1.8 }}>
//                 Discover timeless jewellery crafted with elegance and perfection.  
//                 Aura Jewels brings you a collection that defines luxury, tradition, and modern style.
//               </Typography>
//             </motion.div>
//           </Grid>

//           {/* Quick Links */}
//           {/* <Grid item xs={12} sm={6} md={2}>
//             <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} custom={1}>
//               <Typography variant="h6" sx={{ mb: 2, color: "#B8860B" }}>
//                 Quick Links
//               </Typography>
//               {["Home", "Rings", "Chains", "Earrings", "Contact Us"].map((link, index) => (
//                 <Typography
//                   key={index}
//                   variant="body2"
//                   sx={{ color: "#ccc", mb: 1, cursor: "pointer", "&:hover": { color: "#fff" } }}
//                 >
//                   {link}
//                 </Typography>
//               ))}
//             </motion.div>
//           </Grid> */}
//           <Grid item xs={12} sm={6} md={2}>
//   <Typography variant="h6" sx={{ mb: 2, color: "#FFD700" }}>
//     Quick Links
//   </Typography>
//   {[
//     { name: "Home", path: "/" },
//     { name: "Rings", path: "/category/rings" },
//     { name: "Chains", path: "/category/chains" },
//     { name: "Earrings", path: "/category/earrings" },
//     { name: "Lockets", path: "/category/lockets" },
//     { name: "Bracelets", path: "/category/bracelets" },
//     // { name: "Pendants", path: "/category/pendants" },
//     // { name: "Solitaires ", path: "/category/solitaires" },

//   ].map((link, index) => (
//     <Typography
//       key={index}
//       component={RouterLink}
//       to={link.path}
//       variant="body2"
//       sx={{
//         display: "block",
//         color: "#ccc",
//         mb: 1,
//         textDecoration: "none",
//         "&:hover": { color: "#fff" },
//       }}
//     >
//       {link.name}
//     </Typography>
//   ))}
// </Grid>


//           {/* Customer Policies */}
//           <Grid item xs={12} sm={6} md={2}>
//             <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} custom={2}>
//               <Typography variant="h6" sx={{ mb: 2, color: "#B8860B" }}>
//                 Customer Care
//               </Typography>
//               {["Contact Us", "About Us" , "Return Policy", "Shipping Info", "Privacy Policy", "FAQs"].map((link, index) => (
//                 <Typography
//                   key={index}
//                   variant="body2"
//                   sx={{ color: "#ccc", mb: 1, cursor: "pointer", "&:hover": { color: "#fff" } }}
//                 >
//                   {link}
//                 </Typography>
//               ))}
//             </motion.div>
//           </Grid>

//           {/* Newsletter */}
//           <Grid item xs={12} md={5}>
//             <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} custom={3}>
//               <Typography variant="h6" sx={{ mb: 2, color: "#B8860B" }}>
//                 Subscribe to our Newsletter
//               </Typography>
//               <Typography variant="body2" sx={{ color: "#ccc", mb: 2 }}>
//                 Be the first to know about new collections, exclusive offers, and style tips.
//               </Typography>
//               <Box sx={{ display: "flex", gap: 1 }}>
//                 <TextField
//                   placeholder="Enter your email"
//                   variant="filled"
//                   fullWidth
//                   InputProps={{
//                     disableUnderline: true,
//                     style: { backgroundColor: "#fff", borderRadius: "6px" },
//                   }}
//                 />
//                 <Button
//                   variant="contained"
//                   sx={{ bgcolor: "#B8860B", "&:hover": { bgcolor: "#9c6f08" } }}
//                 >
//                   Subscribe
//                 </Button>
//               </Box>
//               {/* Social Media */}
//               <Box sx={{ mt: 3 }}>
//                 <IconButton sx={{ color: "white", "&:hover": { color: "#1877F2" } }}>
//                   <Facebook />
//                 </IconButton>
//                 <IconButton sx={{ color: "white", "&:hover": { color: "#E4405F" } }}>
//                   <Instagram />
//                 </IconButton>
//                 <IconButton sx={{ color: "white", "&:hover": { color: "#1DA1F2" } }}>
//                   <Twitter />
//                 </IconButton>
//                 <IconButton sx={{ color: "white", "&:hover": { color: "#FF0000" } }}>
//                   <YouTube />
//                 </IconButton>
//               </Box>
//             </motion.div>
//           </Grid>
//         </Grid>

//         <Divider sx={{ my: 4, bgcolor: "#444" }} />

//         {/* Bottom Bar */}
//         <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} custom={4}>
//           <Grid container justifyContent="space-between" alignItems="center">
//             <Grid item>
//               <Typography variant="body2" sx={{ color: "#aaa" }}>
//                 © {new Date().getFullYear()} Aura Jewels. All Rights Reserved.
//               </Typography>
//             </Grid>
//             <Grid item>
//               <Box sx={{ display: "flex", gap: 2, color: "#aaa" }}>
//                 <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                   <LocationOn fontSize="small" /> <Typography variant="body2">Ludhiana, Punjab</Typography>
//                 </Box>
//                 <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                   <Phone fontSize="small" /> <Typography variant="body2">+91 98765 43210</Typography>
//                 </Box>
//                 <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                   <Email fontSize="small" /> <Typography variant="body2">support@aurajewels.com</Typography>
//                 </Box>
//               </Box>
//             </Grid>
//           </Grid>
//         </motion.div>
//       </Container>
//     </Box>
//   );
// };

// export default Footer;

// Footer.jsx
import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import PinterestIcon from '@mui/icons-material/Pinterest';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const FooterWrapper = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
  color: '#ffffff',
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(3),
  marginTop: theme.spacing(2),
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '1px',
    background: 'linear-gradient(90deg, transparent, #d4af37, transparent)',
  },
}));

const FooterLink = styled(Link)({
  color: '#b8b8b8',
  textDecoration: 'none',
  display: 'block',
  marginBottom: '12px',
  fontSize: '0.95rem',
  transition: 'all 0.3s ease',
  '&:hover': {
    color: '#d4af37',
    paddingLeft: '8px',
  },
});

const SocialIconButton = styled(IconButton)({
  color: '#b8b8b8',
  border: '1px solid #444',
  marginRight: '12px',
  transition: 'all 0.3s ease',
  '&:hover': {
    color: '#d4af37',
    borderColor: '#d4af37',
    transform: 'translateY(-3px)',
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
  },
});

const SectionTitle = styled(Typography)({
  color: '#d4af37',
  fontWeight: 600,
  marginBottom: '24px',
  fontSize: '1.1rem',
  letterSpacing: '1px',
  textTransform: 'uppercase',
  position: 'relative',
  paddingBottom: '12px',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '40px',
    height: '2px',
    background: '#d4af37',
  },
});

const ContactItem = styled(Box)({
  display: 'flex',
  alignItems: 'flex-start',
  marginBottom: '16px',
  color: '#b8b8b8',
  '& svg': {
    color: '#d4af37',
    marginRight: '12px',
    marginTop: '2px',
  },
});

const Footer = () => {
  return (
    <FooterWrapper>
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          {/* About Section */}
          <Grid item xs={12} sm={6} md={3}>
            <SectionTitle variant="h6">About Us</SectionTitle>
            <Typography variant="body2" sx={{ color: '#b8b8b8', mb: 3, lineHeight: 1.8 }}>
              Crafting timeless elegance since 1990. We specialize in exquisite jewellery that celebrates life's precious moments.
            </Typography>
            <Box>
              <SocialIconButton size="small">
                <FacebookIcon />
              </SocialIconButton>
              <SocialIconButton size="small">
                <InstagramIcon />
              </SocialIconButton>
              <SocialIconButton size="small">
                <TwitterIcon />
              </SocialIconButton>
              <SocialIconButton size="small">
                <PinterestIcon />
              </SocialIconButton>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={3}>
            <SectionTitle variant="h6">Quick Links</SectionTitle>
            <FooterLink href="/">Home</FooterLink>
            <FooterLink href="/gallery">Gallery</FooterLink>
            <FooterLink href="/products">Collections</FooterLink>
            <FooterLink href="/about">About Us</FooterLink>
            <FooterLink href="/contact">Contact</FooterLink>
          </Grid>

          {/* Customer Service */}
          <Grid item xs={12} sm={6} md={3}>
            <SectionTitle variant="h6">Customer Care</SectionTitle>
            <FooterLink href="/shipping">Shipping & Delivery</FooterLink>
            <FooterLink href="/returns">Returns & Exchange</FooterLink>
            <FooterLink href="/size-guide">Size Guide</FooterLink>
            <FooterLink href="/care">Jewellery Care</FooterLink>
            <FooterLink href="/faq">FAQs</FooterLink>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} sm={6} md={3}>
            <SectionTitle variant="h6">Contact Us</SectionTitle>
            <ContactItem>
              <LocationOnIcon fontSize="small" />
              <Typography variant="body2">
                123 Jewel Street, Diamond District<br />
                New York, NY 10001
              </Typography>
            </ContactItem>
            <ContactItem>
              <PhoneIcon fontSize="small" />
              <Typography variant="body2">
                +1 (555) 123-4567
              </Typography>
            </ContactItem>
            <ContactItem>
              <EmailIcon fontSize="small" />
              <Typography variant="body2">
                info@yourbrand.com
              </Typography>
            </ContactItem>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: '#444' }} />

        {/* Bottom Bar */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="body2" sx={{ color: '#888' }}>
            © {new Date().getFullYear()} Your Jewellery Brand. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <FooterLink href="/privacy" sx={{ mb: 0, fontSize: '0.85rem' }}>
              Privacy Policy
            </FooterLink>
            <FooterLink href="/terms" sx={{ mb: 0, fontSize: '0.85rem' }}>
              Terms & Conditions
            </FooterLink>
            <FooterLink href="/cookies" sx={{ mb: 0, fontSize: '0.85rem' }}>
              Cookie Policy
            </FooterLink>
          </Box>
        </Box>
      </Container>
    </FooterWrapper>
  );
};

export default Footer;