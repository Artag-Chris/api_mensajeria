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

    //funciones de busqueda de mensajes
    router.get(`/deepSearchForAllMessages`,prismaController.onRequesForAlltypesOfMessages);
    router.get(`/searchForTextMessages`,prismaController.onRequesForTextMessages);
    router.get(`/searchForImageMessages`,prismaController.onRequesForImageMessages);
    router.get(`/searchForAudioMessages`,prismaController.onRequesForAudioMessages);
    router.get(`/searchForVideoMessages`,prismaController.onRequesForVideoMessages);
    router.get(`/searchForDocumentMessages`,prismaController.onRequesForDocumentMessages);
    
    router.put(`/user/:id`,prismaController.onUpdateUser);


return router;
 }
}