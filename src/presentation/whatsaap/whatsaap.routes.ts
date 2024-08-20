import { Router } from "express";
import { WhatsaapController } from "./whatsaap.controller";

export class whatsappRoutes{


    static get routes(){ 
    const router= Router();
    const whatsaapController =new WhatsaapController();

    router.get(`/`,whatsaapController.getTickets);
    router.get(`/last`,whatsaapController.getLastTicketNumber);
    router.get(`/pending`,whatsaapController.pendingTickets);


    router.post(`/`,whatsaapController.createTicket);

    router.get(`/draw/:desk`,whatsaapController.drawTicket);
    router.put(`/done/:ticketId`,whatsaapController.ticketFinished);


    router.get(`/working-on`,whatsaapController.workingOn);




return router;
 }
}