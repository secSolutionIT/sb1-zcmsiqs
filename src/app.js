import express from 'express';
import middleware from './middleware/index.js';
import routes from './routes/index.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();

// Apply middleware
middleware(app);

// Apply routes
routes(app);

// Error handling
app.use(errorHandler);

export default app;