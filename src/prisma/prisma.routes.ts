import { Router } from "express";
import { PrismaController } from "./prisma.controller";

export class PrismaRoutes {


    static get routes(){ 
    const router= Router();

    const prismaController =new PrismaController();

    //funciones de recepcion de mensajes 
    router.post(`/DB`,prismaController.onReceivedMessage);
    router.post(`/ImageDB`,prismaController.onReceivedImage);
    router.post(`/audioDB`,prismaController.onReceivedAudio);
    router.post(`/videoDB`,prismaController.onReceivedVideo);
    router.post(`/docDB`,prismaController.onReceivedDocument);

    //relacionado para usuarios
    router.post(`/user`,prismaController.onCreateUser);
    
    router.get(`/users`,prismaController.onRequestUsers);
    router.get(`/user`,prismaController.onSearchForUser);
    router.put(`/user/:id`,prismaController.onUpdateUser);

    //funciones de busqueda de mensajes
    router.get(`/deepSearchForAllMessages`,prismaController.onRequesForAlltypesOfMessages);
    router.get(`/searchForTextMessages`,prismaController.onRequesForTextMessages);
    router.get(`/searchForImageMessages`,prismaController.onRequesForImageMessages);
    router.get(`/searchForAudioMessages`,prismaController.onRequesForAudioMessages);
    router.get(`/searchForVideoMessages`,prismaController.onRequesForVideoMessages);
    router.get(`/searchForDocumentMessages`,prismaController.onRequesForDocumentMessages);
    


return router;
 }
}