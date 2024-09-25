import { Router } from 'express';
import { whatsappRoutes } from './whatsaap/whatsaap.routes';
import { PrismaRoutes } from '../prisma/prisma.routes';




export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use(`/api/whatsapp`, whatsappRoutes.routes);
   
    router.use(`/api/prisma`, PrismaRoutes.routes);

    return router;
  }
}


