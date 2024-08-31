import { Router } from "express";
import { WhatsaapController } from "./whatsaap.controller";

export class whatsappRoutes{


    static get routes(){ 
    const router= Router();
    const whatsaapController =new WhatsaapController();

    //esta ruta sera para enviar el batch y deberia ser post
    //router.get(`/`,whatsaapController.senBatch);
    
    router.get(`/getphones`,whatsaapController.getPhones);
    router.get(`/getCustomers`,whatsaapController.getCustomers);
    router.get(`/getTemplates`,whatsaapController.getTemplates);
    
    router.post(`/welcome`,whatsaapController.sendWelcome);
    



return router;
 }
}