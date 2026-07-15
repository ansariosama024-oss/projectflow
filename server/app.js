import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import dotenv from 'dotenv';
import routes from './routes/index.js';
import { notFound } from './middleware/notFound.js';
import { errorHandler } from './utils/errorHandler.js';
import { apiLimiter } from './middleware/rateLimiter.js';

dotenv.config();

const app = express();

// Security
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Compression
app.use(compression());

// Logging
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Rate limiting
// app.use('/api', apiLimiter);

// Routes
app.use('/api', routes);

// 404 + error handling
app.use(notFound);
app.use(errorHandler);

export default app;
