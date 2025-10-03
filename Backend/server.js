import 'dotenv/config'; // Handles .env variables
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import path from 'path';

// --- Local Imports ---
import connectDB from './config/db123.js';
import apiRoutes from './routes/index.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

import uploadRoutes from './routes/uploadRoutes.js';

// --- Initialization ---
const app = express();
const __dirname = path.resolve();

// --- Middlewares ---
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));


// const path = require('path');
// const favicon = require('serve-favicon');
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// app.get('/favicon.ico', (req, res) => res.status(204).end());

const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:5173',
  process.env.ADMIN_FRONTEND_URL || 'http://localhost:5174'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100
}));

app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  next();
});

// --- Main Server Logic ---
(async () => {
  try {
    await connectDB();

    // --- API Routes ---
    app.use('/api', apiRoutes);
    
    // Make 'uploads' folder static
    app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
    app.use('/api/upload', uploadRoutes);


    // --- Serve Frontend in Production ---
    // if (process.env.NODE_ENV === 'production') {
    //   app.use(express.static(path.join(__dirname, '/frontend-customer/dist')));
    //   app.get('/*anything', (req, res) =>
    //     res.sendFile(path.resolve(__dirname, 'frontend-customer', 'dist', 'index.html'))
    //   );
    // } else {
    //   app.get('/', (req, res) => res.send('API is running successfully!'));
    // }
    if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend-customer/dist')));

  // Add a basic API health check route that works in production
  app.get('/api/health', (req, res) => res.send('API is running'));

  // The "catch-all" handler: for any request that doesn't match one above,
  // send back the main index.html file.
  app.get('/*anything', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend-customer', 'dist', 'index.html'))
  );
} else {
  app.get('/', (req, res) => res.send('API is running successfully!'));
}

    // --- Error Handling Middleware (must be last) ---
    app.use(notFound);
    app.use(errorHandler);

    // --- Start Server ---
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
})();