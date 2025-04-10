import { Request, ResponseToolkit, ServerRoute } from '@hapi/hapi';
import { registerSchema } from './validation';
import * as Service from './service';
import { any } from 'joi';

export const authRoutes: ServerRoute[] = [
  {
    method: 'POST',
    path: '/super-admin/register',
    handler: async (req: Request, h: ResponseToolkit) => {
      const payload = req.payload as any;
      const { error } = registerSchema.validate(payload);
      if (error) return h.response({ error: error.details[0].message }).code(400);

      const user = await Service.createDefaultSuperAdmin(payload);
      return h.response({ user }).code(201);
    },
  },
  {
    method: 'POST',
    path: '/sub-admin',
    handler: async (req: Request, h: ResponseToolkit) => {
      const payload = req.payload as any;
      const { error } = registerSchema.validate(payload);
      if (error) return h.response({ error: error.details[0].message }).code(400);

      const user = await Service.createSubAdmin(payload);
      return h.response({ user }).code(201);
    },
  },
  {
    method: 'GET',
    path: '/sub-admin',
    handler: async (request, h) => {
      const users = await Service.getAllSubAdmins();
      return h.response(users);
    },
  },
  {
    method: 'GET',
    path: '/sub-admin/{id}',
    handler: async (req, h) => {
      const user = await Service.getSubAdmin(req.params.id);
      return user ? h.response(user) : h.response({ error: 'Not found' }).code(404);
    },
  },
  {
    method: 'PUT',
    path: '/sub-admin/{id}',
    handler: async (req, h) => {
      const updated = await Service.updateSubAdmin(req.params.id, req.payload);
      return h.response(updated as any);
    },
  },
  {
    method: 'DELETE',
    path: '/sub-admin/{id}',
    handler: async (req, h) => {
      await Service.deleteSubAdmin(req.params.id);
      return h.response({ message: 'Deleted successfully' });
    },
  },
];
