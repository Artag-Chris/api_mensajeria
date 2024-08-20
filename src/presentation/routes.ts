import { Router } from 'express';
import { whatsappRoutes } from './whatsaap/whatsaap.routes';




export class AppRoutes {


  static get routes(): Router {

    const router = Router();
    
    // Definir las rutas
  
//rutas de whatssapp 
router.use(`/api/whatsapp`,whatsappRoutes.routes);

    return router;
  }


}

