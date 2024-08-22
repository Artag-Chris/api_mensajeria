import { Router } from 'express';
import { whatsappRoutes } from './whatsaap/whatsaap.routes';
import { PrismaRoutes } from '../prisma/prisma.routes';




export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    // Definir las rutas

    //ruta para el whatsapp
    router.use(`/api/whatsapp`, whatsappRoutes.routes);

    //ruta para la base de datos
    router.use(`/api/prisma`, PrismaRoutes.routes);

    return router;
  }
}


