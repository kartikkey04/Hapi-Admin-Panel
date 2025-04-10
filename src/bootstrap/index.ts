import { Server } from '@hapi/hapi';
import { connectDB } from '../config/db';
import { authRoutes } from '../modules/auth/routes';
import { createDefaultSuperAdmin } from '../modules/auth/service';

export const initServer = async () => {
  await connectDB();

  // Create super admin if not exists
  await createDefaultSuperAdmin();

  const server = new Server({
    port: process.env.PORT || 3000,
    host: 'localhost',
  });

  server.route(authRoutes);

  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};
