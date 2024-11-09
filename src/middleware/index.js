import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import express from 'express';
import requestLogger from './requestLogger.js';

export default function middleware(app) {
  // Security headers
  app.use(helmet());
  
  // Enable CORS
  app.use(cors());
  
  // Request logging
  app.use(morgan('dev'));
  app.use(requestLogger);
  
  // Parse JSON bodies
  app.use(express.json());
  
  // Parse URL-encoded bodies
  app.use(express.urlencoded({ extended: true }));
}