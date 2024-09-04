import { Router } from "express";
import { PrismaController } from "./prisma.controller";

export class PrismaRoutes {


    static get routes(){ 
    const router= Router();

    const prismaController =new PrismaController();
     
    router.post(`/DB`,prismaController.onReceivedMessage);
    router.post(`/ImageDB`,prismaController.onReceivedImage);
    router.post(`/audioDB`,prismaController.onReceivedAudio);
    router.post(`/videoDB`,prismaController.onReceivedVideo);
    router.post(`/docDB`,prismaController.onReceivedDocument);

    router.post(`/user`,prismaController.onCreateUser);



    router.get(`/users`,prismaController.onRequestUsers);
    router.get(`/user`,prismaController.onSearchForUser);
    //implementar una funcion que barra todas las tablas si tiene mensajes
    router.get(`/messagesfromuser`,prismaController.onRequesFortSpecificMessages);
    
    router.put(`/user/:id`,prismaController.onUpdateUser);


return router;
 }
}