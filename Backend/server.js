// import 'dotenv/config';
// import express from 'express';
// import helmet from 'helmet';
// import cors from 'cors';
// import morgan from 'morgan';
// import rateLimit from 'express-rate-limit';
// import path from 'path';

// // --- Local Imports ---
// import connectDB from './config/db123.js';
// import apiRoutes from './routes/index.js';
// import uploadRoutes from './routes/uploadRoutes.js';
// import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// // --- Initialization ---
// const app = express();
// const __dirname = path.resolve();

// // --- Middlewares ---
// // Security headers
// app.use(helmet({ contentSecurityPolicy: false }));
// app.use(express.json());

// // Logger - only run in development
// if (process.env.NODE_ENV === 'development') {
//   app.use(morgan('dev'));
// }

// // --- CORS Configuration ---
// const allowedOrigins = [
//   'https://jewellery-webstie.vercel.app', 
//   'https://jewellery-webstie-uvku.vercel.app',
// ];

// if (process.env.NODE_ENV !== 'production') {
//   allowedOrigins.push('http://localhost:5173');
//   allowedOrigins.push('http://localhost:5174');
// }

// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true
// }));

// // ✅ Fix: Preflight requests handler with regex
// app.options(/.*/, cors());

// // --- Main Server Logic ---
// (async () => {
//   try {
//     await connectDB();

//     // --- API Routes ---
//     app.use('/api', apiRoutes);
//     // app.use('/api/upload', uploadRoutes);

//     // Make 'uploads' folder static and public
//     app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

//     // --- Production Build & Catch-all Route ---
//     if (process.env.NODE_ENV === 'production') {
//       app.use(express.static(path.join(__dirname, '/frontend-customer/dist')));

//       // ✅ Fix: Catch-all with regex
//       app.get(/.*/, (req, res) =>
//         res.sendFile(path.resolve(__dirname, 'frontend-customer', 'dist', 'index.html'))
//       );
//     } else {
//       app.get('/', (req, res) => res.send('API is running in development mode.'));
//     }

//     // --- Error Handling Middleware (must be last) ---
//     app.use(notFound);
//     app.use(errorHandler);

//     // --- Start Server ---
//     const PORT = process.env.PORT || 4000;
//     app.listen(PORT, () =>
//       console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`)
//     );

//   } catch (err) {
//     console.error('Failed to start server:', err);
//     process.exit(1);
//   }
// })();


// 

// import 'dotenv/config';
// import express from 'express';
// import helmet from 'helmet';
// import cors from 'cors';
// import morgan from 'morgan';
// import path from 'path';

// // Local Imports
// import connectDB from './config/db123.js';
// import apiRoutes from './routes/index.js';
// import uploadRoutes from './routes/uploadRoutes.js';
// import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// // Initialization
// const app = express();
// const __dirname = path.resolve();

// // Middlewares
// app.use(helmet({ contentSecurityPolicy: false }));
// app.use(express.json());

// if (process.env.NODE_ENV === 'development') {
//   app.use(morgan('dev'));
// }

// const allowedOrigins = [
//   process.env.FRONTEND_URL,
//   process.env.ADMIN_FRONTEND_URL
// ];
// if (process.env.NODE_ENV !== 'production') {
//   allowedOrigins.push('http://localhost:5173', 'http://localhost:5174');
// }
// app.use(cors({ origin: allowedOrigins, credentials: true }));
// app.options(/.*/, cors());

// // Main Server Logic
// (async () => {
//   try {
//     await connectDB();

//     // API Routes
//     app.use('/api', apiRoutes);
//     app.use('/api/upload', uploadRoutes);
    
//     // Make 'uploads' folder static
//     app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

//     // Production Build & Catch-all Route
//     if (process.env.NODE_ENV === 'production') {
//       app.use(express.static(path.join(__dirname, '/frontend-customer/dist')));
      
//       // The corrected catch-all route that serves the frontend
//       app.get(/.*/, (req, res) =>
//         res.sendFile(path.resolve(__dirname, 'frontend-customer', 'dist', 'index.html'))
//       );
//     } else {
//       app.get('/', (req, res) => res.send('API is running in development mode.'));
//     }

//     // Error Handling Middleware (must be last)
//     app.use(notFound);
//     app.use(errorHandler);

//     // Start Server
//     const PORT = process.env.PORT || 4000;
//     app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

//   } catch (err) {
//     console.error('Failed to start server:', err);
//     process.exit(1);
//   }
// })();

import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';

// Local Imports
import connectDB from './config/db123.js';
import apiRoutes from './routes/index.js';
import uploadRoutes from './routes/uploadRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// Initialization
const app = express();
const __dirname = path.resolve();

// Middlewares
app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.ADMIN_FRONTEND_URL
];
if (process.env.NODE_ENV !== 'production') {
  allowedOrigins.push('http://localhost:5173', 'http://localhost:5174');
}
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.options(/.*/, cors());

// Main Server Logic
(async () => {
  try {
    await connectDB();

    // API Routes
    app.use('/api', apiRoutes);
    app.use('/api/upload', uploadRoutes);
    
    // Make 'uploads' folder static
    app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

    // Production Build & Catch-all Route
    if (process.env.NODE_ENV === 'production') {
      // Admin Frontend
      // app.use('/admin', express.static(path.join(__dirname, '/frontend-admin/dist')));
      // app.get('/admin/*', (req, res) =>
      //   res.sendFile(path.resolve(__dirname, 'frontend-admin', 'dist', 'index.html'))
      // );

      // // Customer Frontend
      // app.use('/', express.static(path.join(__dirname, '/frontend-customer/dist')));
      // app.get('/*', (req, res) =>
      //   res.sendFile(path.resolve(__dirname, 'frontend-customer', 'dist', 'index.html'))
      // );

      // Admin Frontend
app.use('/admin', express.static(path.join(__dirname, '/frontend-admin/dist')));
app.get('/admin/(.*)', (req, res) =>
  res.sendFile(path.resolve(__dirname, 'frontend-admin', 'dist', 'index.html'))
);

// Customer Frontend
app.use('/', express.static(path.join(__dirname, '/frontend-customer/dist')));
app.get('/(.*)', (req, res) =>
  res.sendFile(path.resolve(__dirname, 'frontend-customer', 'dist', 'index.html'))
);

    } else {
      app.get('/', (req, res) => res.send('API is running in development mode.'));
    }

    // Error Handling Middleware (must be last)
    app.use(notFound);
    app.use(errorHandler);

    // Start Server
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
})();
