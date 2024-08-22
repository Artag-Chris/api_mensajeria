import { Router } from "express";
import { PrismaController } from "./prisma.controller";

export class PrismaRoutes {


    static get routes(){ 
    const router= Router();
    const prismaController =new PrismaController();

    //router.get(`/users`,prismaController.getUsers);
    //router.get(`/users/:id`,prismaController.getUserById);
    //router.post(`/user`,prismaController.createUser);
    //router.put(`/user`,prismaController.updateUser);

    // router.get(`/last`,whatsaapController.getLastTicketNumber);
    // router.get(`/pending`,whatsaapController.pendingTickets);


    // router.post(`/`,whatsaapController.createTicket);

    // router.get(`/draw/:desk`,whatsaapController.drawTicket);
    // router.put(`/done/:ticketId`,whatsaapController.ticketFinished);


    // router.get(`/working-on`,whatsaapController.workingOn);




return router;
 }
}