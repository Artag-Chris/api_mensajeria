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
    
    router.post(`/welcome`,whatsaapController.sendWelcome);
    // router.get(`/last`,whatsaapController.getLastTicketNumber);
    // router.get(`/pending`,whatsaapController.pendingTickets);


    // router.post(`/`,whatsaapController.createTicket);

    // router.get(`/draw/:desk`,whatsaapController.drawTicket);
    // router.put(`/done/:ticketId`,whatsaapController.ticketFinished);


    // router.get(`/working-on`,whatsaapController.workingOn);




return router;
 }
}