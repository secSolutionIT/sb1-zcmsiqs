import healthRoutes from './health.js';
import mainRoutes from './main.js';

export default function routes(app) {
  app.use('/', mainRoutes);
  app.use('/health', healthRoutes);
}