import { Router } from "express";
import { PrismaController } from "./prisma.controller";

export class PrismaRoutes {


    static get routes(){ 
    const router= Router();

    const prismaController =new PrismaController();
     
    router.post(`/DB`,prismaController.onReceivedMessage);
    router.post(`/ImageDB`,prismaController.onReceivedImage);
    router.post(`/audioDB`,prismaController.onReceivedAudio);
   // router.post(`/videoDB`,prismaController.onReceivedVideo);
   // router.post(`/documentDB`,prismaController.onReceivedDocument);

    router.post(`/user`,prismaController.onCreateUser);



    router.get(`/users`,prismaController.onRequestUsers);
    router.get(`/user`,prismaController.onSearchForUser);
    router.get(`/messagesfromuser`,prismaController.onRequesFortSpecificMessages);
    
    router.put(`/user/:id`,prismaController.onUpdateUser);


return router;
 }
}