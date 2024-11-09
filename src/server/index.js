import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from 'dotenv';
import authRoutes from './api/auth.js';
import scanRoutes from './api/scans.js';

// Load environment variables
config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false
}));

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/scans', scanRoutes);

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Security Scanner API' });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: err.message 
  });
});

// Start server
app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});