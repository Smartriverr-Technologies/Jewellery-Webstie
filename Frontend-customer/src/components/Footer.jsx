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
  // marginTop: theme.spacing(1),
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
            <FooterLink href="/shop">Collections</FooterLink>
            <FooterLink href="/about-us">About Us</FooterLink>
            <FooterLink href="/contact-us">Contact</FooterLink>
          </Grid>

          {/* Customer Service */}
          <Grid item xs={12} sm={6} md={3}>
            <SectionTitle variant="h6">Customer Care</SectionTitle>
            <FooterLink href="/shipping-delivery">Shipping & Delivery</FooterLink>
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

// import React, { useState } from 'react';
// import { Box, Container, Grid, Typography, Link, IconButton, Divider } from '@mui/material';
// import { styled, keyframes } from '@mui/material/styles';
// import FacebookIcon from '@mui/icons-material/Facebook';
// import InstagramIcon from '@mui/icons-material/Instagram';
// import TwitterIcon from '@mui/icons-material/Twitter';
// import PinterestIcon from '@mui/icons-material/Pinterest';
// import EmailIcon from '@mui/icons-material/Email';
// import PhoneIcon from '@mui/icons-material/Phone';
// import LocationOnIcon from '@mui/icons-material/LocationOn';

// const shimmer = keyframes`
//   0% {
//     background-position: -1000px 0;
//   }
//   100% {
//     background-position: 1000px 0;
//   }
// `;

// const float = keyframes`
//   0%, 100% {
//     transform: translateY(0px);
//   }
//   50% {
//     transform: translateY(-10px);
//   }
// `;

// const glow = keyframes`
//   0%, 100% {
//     box-shadow: 0 0 5px rgba(212, 175, 55, 0.5), 0 0 10px rgba(212, 175, 55, 0.3);
//   }
//   50% {
//     box-shadow: 0 0 20px rgba(212, 175, 55, 0.8), 0 0 30px rgba(212, 175, 55, 0.5);
//   }
// `;

// const slideInLeft = keyframes`
//   from {
//     opacity: 0;
//     transform: translateX(-30px);
//   }
//   to {
//     opacity: 1;
//     transform: translateX(0);
//   }
// `;

// const FooterWrapper = styled(Box)(({ theme }) => ({
//   background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #2d2d2d 100%)',
//   color: '#ffffff',
//   paddingTop: theme.spacing(8),
//   paddingBottom: theme.spacing(3),
//   marginTop: theme.spacing(2),
//   position: 'relative',
//   overflow: 'hidden',
//   '&::before': {
//     content: '""',
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     height: '2px',
//     background: 'linear-gradient(90deg, transparent, #d4af37, #f0d97d, #d4af37, transparent)',
//     animation: `${shimmer} 3s infinite linear`,
//     backgroundSize: '1000px 100%',
//   },
//   '&::after': {
//     content: '""',
//     position: 'absolute',
//     top: '-50%',
//     right: '-10%',
//     width: '500px',
//     height: '500px',
//     background: 'radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, transparent 70%)',
//     borderRadius: '50%',
//     animation: `${float} 6s ease-in-out infinite`,
//   },
// }));

// const DecorativeOrb = styled(Box)({
//   position: 'absolute',
//   width: '300px',
//   height: '300px',
//   background: 'radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 70%)',
//   borderRadius: '50%',
//   filter: 'blur(60px)',
//   animation: `${float} 8s ease-in-out infinite`,
//   bottom: '10%',
//   left: '-5%',
//   animationDelay: '1s',
// });

// const FooterLink = styled(Link)({
//   color: '#b8b8b8',
//   textDecoration: 'none',
//   display: 'block',
//   marginBottom: '12px',
//   fontSize: '0.95rem',
//   transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
//   position: 'relative',
//   paddingLeft: '0',
//   animation: `${slideInLeft} 0.6s ease-out backwards`,
//   '&::before': {
//     content: '""',
//     position: 'absolute',
//     left: 0,
//     bottom: 0,
//     width: '0',
//     height: '1px',
//     background: 'linear-gradient(90deg, #d4af37, #f0d97d)',
//     transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
//   },
//   '&:hover': {
//     color: '#d4af37',
//     paddingLeft: '12px',
//     letterSpacing: '0.5px',
//     '&::before': {
//       width: '80%',
//     },
//   },
// });

// const SocialIconButton = styled(IconButton)({
//   color: '#b8b8b8',
//   border: '2px solid #333',
//   marginRight: '12px',
//   transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
//   position: 'relative',
//   overflow: 'hidden',
//   '&::before': {
//     content: '""',
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     width: '0',
//     height: '0',
//     borderRadius: '50%',
//     background: 'rgba(212, 175, 55, 0.2)',
//     transform: 'translate(-50%, -50%)',
//     transition: 'width 0.4s, height 0.4s',
//   },
//   '&:hover': {
//     color: '#d4af37',
//     borderColor: '#d4af37',
//     transform: 'translateY(-5px) rotate(5deg)',
//     backgroundColor: 'rgba(212, 175, 55, 0.1)',
//     animation: `${glow} 2s ease-in-out infinite`,
//     '&::before': {
//       width: '100px',
//       height: '100px',
//     },
//   },
// });

// const SectionTitle = styled(Typography)({
//   color: '#d4af37',
//   fontWeight: 700,
//   marginBottom: '28px',
//   fontSize: '1.2rem',
//   letterSpacing: '2px',
//   textTransform: 'uppercase',
//   position: 'relative',
//   paddingBottom: '16px',
//   background: 'linear-gradient(90deg, #d4af37, #f0d97d, #d4af37)',
//   backgroundClip: 'text',
//   WebkitBackgroundClip: 'text',
//   WebkitTextFillColor: 'transparent',
//   backgroundSize: '200% auto',
//   animation: `${shimmer} 3s linear infinite`,
//   '&::after': {
//     content: '""',
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     width: '60px',
//     height: '3px',
//     background: 'linear-gradient(90deg, #d4af37, transparent)',
//     borderRadius: '2px',
//     boxShadow: '0 0 10px rgba(212, 175, 55, 0.5)',
//   },
// });

// const ContactItem = styled(Box)({
//   display: 'flex',
//   alignItems: 'flex-start',
//   marginBottom: '20px',
//   color: '#b8b8b8',
//   transition: 'all 0.3s ease',
//   padding: '8px',
//   borderRadius: '8px',
//   cursor: 'pointer',
//   '&:hover': {
//     backgroundColor: 'rgba(212, 175, 55, 0.05)',
//     transform: 'translateX(5px)',
//     '& svg': {
//       transform: 'scale(1.2) rotate(5deg)',
//     },
//   },
//   '& svg': {
//     color: '#d4af37',
//     marginRight: '12px',
//     marginTop: '2px',
//     transition: 'all 0.3s ease',
//     filter: 'drop-shadow(0 0 5px rgba(212, 175, 55, 0.3))',
//   },
// });

// const NewsletterBox = styled(Box)({
//   background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(212, 175, 55, 0.05) 100%)',
//   padding: '24px',
//   borderRadius: '12px',
//   border: '1px solid rgba(212, 175, 55, 0.2)',
//   marginTop: '24px',
//   position: 'relative',
//   overflow: 'hidden',
//   backdropFilter: 'blur(10px)',
//   '&::before': {
//     content: '""',
//     position: 'absolute',
//     top: 0,
//     left: '-100%',
//     width: '100%',
//     height: '100%',
//     background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
//     transition: 'left 0.5s',
//   },
//   '&:hover::before': {
//     left: '100%',
//   },
// });

// const Footer = () => {
//   const [hoveredIcon, setHoveredIcon] = useState(null);

//   return (
//     <FooterWrapper>
//       <DecorativeOrb />
//       <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
//         <Grid container spacing={4}>
//           {/* About Section */}
//           <Grid item xs={12} sm={6} md={3}>
//             <SectionTitle variant="h6">About Us</SectionTitle>
//             <Typography 
//               variant="body2" 
//               sx={{ 
//                 color: '#b8b8b8', 
//                 mb: 3, 
//                 lineHeight: 1.8,
//                 transition: 'color 0.3s ease',
//                 '&:hover': {
//                   color: '#d0d0d0',
//                 }
//               }}
//             >
//               Crafting timeless elegance since 1990. We specialize in exquisite jewellery that celebrates life's precious moments.
//             </Typography>
//             <Box>
//               <SocialIconButton 
//                 size="small"
//                 onMouseEnter={() => setHoveredIcon('facebook')}
//                 onMouseLeave={() => setHoveredIcon(null)}
//               >
//                 <FacebookIcon />
//               </SocialIconButton>
//               <SocialIconButton 
//                 size="small"
//                 onMouseEnter={() => setHoveredIcon('instagram')}
//                 onMouseLeave={() => setHoveredIcon(null)}
//               >
//                 <InstagramIcon />
//               </SocialIconButton>
//               <SocialIconButton 
//                 size="small"
//                 onMouseEnter={() => setHoveredIcon('twitter')}
//                 onMouseLeave={() => setHoveredIcon(null)}
//               >
//                 <TwitterIcon />
//               </SocialIconButton>
//               <SocialIconButton 
//                 size="small"
//                 onMouseEnter={() => setHoveredIcon('pinterest')}
//                 onMouseLeave={() => setHoveredIcon(null)}
//               >
//                 <PinterestIcon />
//               </SocialIconButton>
//             </Box>
//           </Grid>

//           {/* Quick Links */}
//           <Grid item xs={12} sm={6} md={3}>
//             <SectionTitle variant="h6">Quick Links</SectionTitle>
//             <FooterLink href="/" style={{ animationDelay: '0.1s' }}>Home</FooterLink>
//             <FooterLink href="/gallery" style={{ animationDelay: '0.2s' }}>Gallery</FooterLink>
//             <FooterLink href="/products" style={{ animationDelay: '0.3s' }}>Collections</FooterLink>
//             <FooterLink href="/about" style={{ animationDelay: '0.4s' }}>About Us</FooterLink>
//             <FooterLink href="/contact" style={{ animationDelay: '0.5s' }}>Contact</FooterLink>
//           </Grid>

//           {/* Customer Service */}
//           <Grid item xs={12} sm={6} md={3}>
//             <SectionTitle variant="h6">Customer Care</SectionTitle>
//             <FooterLink href="/shipping" style={{ animationDelay: '0.1s' }}>Shipping & Delivery</FooterLink>
//             <FooterLink href="/returns" style={{ animationDelay: '0.2s' }}>Returns & Exchange</FooterLink>
//             <FooterLink href="/size-guide" style={{ animationDelay: '0.3s' }}>Size Guide</FooterLink>
//             <FooterLink href="/care" style={{ animationDelay: '0.4s' }}>Jewellery Care</FooterLink>
//             <FooterLink href="/faq" style={{ animationDelay: '0.5s' }}>FAQs</FooterLink>
//           </Grid>

//           {/* Contact Info */}
//           <Grid item xs={12} sm={6} md={3}>
//             <SectionTitle variant="h6">Contact Us</SectionTitle>
//             <ContactItem>
//               <LocationOnIcon fontSize="small" />
//               <Typography variant="body2">
//                 123 Jewel Street, Diamond District<br />
//                 New York, NY 10001
//               </Typography>
//             </ContactItem>
//             <ContactItem>
//               <PhoneIcon fontSize="small" />
//               <Typography variant="body2">
//                 +1 (555) 123-4567
//               </Typography>
//             </ContactItem>
//             <ContactItem>
//               <EmailIcon fontSize="small" />
//               <Typography variant="body2">
//                 info@yourbrand.com
//               </Typography>
//             </ContactItem>
//           </Grid>
//         </Grid>

//         <Divider 
//           sx={{ 
//             my: 4, 
//             borderColor: 'rgba(212, 175, 55, 0.2)',
//             boxShadow: '0 1px 10px rgba(212, 175, 55, 0.1)',
//           }} 
//         />

//         {/* Bottom Bar */}
//         <Box sx={{ 
//           display: 'flex', 
//           justifyContent: 'space-between', 
//           alignItems: 'center', 
//           flexWrap: 'wrap', 
//           gap: 2 
//         }}>
//           <Typography 
//             variant="body2" 
//             sx={{ 
//               color: '#888',
//               transition: 'color 0.3s ease',
//               '&:hover': {
//                 color: '#d4af37',
//               }
//             }}
//           >
//             © {new Date().getFullYear()} Your Jewellery Brand. All rights reserved.
//           </Typography>
//           <Box sx={{ display: 'flex', gap: 3 }}>
//             <FooterLink href="/privacy" sx={{ mb: 0, fontSize: '0.85rem' }}>
//               Privacy Policy
//             </FooterLink>
//             <FooterLink href="/terms" sx={{ mb: 0, fontSize: '0.85rem' }}>
//               Terms & Conditions
//             </FooterLink>
//             <FooterLink href="/cookies" sx={{ mb: 0, fontSize: '0.85rem' }}>
//               Cookie Policy
//             </FooterLink>
//           </Box>
//         </Box>
//       </Container>
//     </FooterWrapper>
//   );
// };

// export default Footer;