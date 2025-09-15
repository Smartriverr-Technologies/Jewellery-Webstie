import 'dotenv/config';
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

// --- Initialization ---
const app = express();
const __dirname = path.resolve();

// --- Middlewares ---
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));

// --- CORS Configuration to allow both frontends ---
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
// --------------------------------------------------

app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100
}));

// --- Main Server Logic ---
(async () => {
  try {
    await connectDB();

    // --- API Routes ---
    app.use('/api', apiRoutes);

    // --- Serve Frontend in Production ---
    if (process.env.NODE_ENV === 'production') {
      app.use(express.static(path.join(__dirname, '/frontend-customer/dist')));
      app.get('*', (req, res) =>
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
    app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));

  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
})();