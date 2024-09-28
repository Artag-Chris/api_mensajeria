import { Router } from "express";
import { PrismaController } from "./prisma.controller";

export class PrismaRoutes {


    static get routes(){ 
    const router= Router();

    const prismaController =new PrismaController();

    //funciones de recepcion de mensajes usuarios
    router.post(`/DB`,prismaController.onReceivedMessage);
    router.post(`/ImageDB`,prismaController.onReceivedImage);
    router.post(`/audioDB`,prismaController.onReceivedAudio);
    router.post(`/videoDB`,prismaController.onReceivedVideo);
    router.post(`/docDB`,prismaController.onReceivedDocument);
    
    //funciones de recepcion de mensajes del front-end
    router.post("/frontmessage",prismaController.onReceivedFrontMessage);
    router.post("/frontmessageImage",prismaController.onReceivedFrontMessageImage);
    router.post("/frontmessagedocument",prismaController.onReceivedFrontMessageDoc);
    router.post("/frontmessagevideo",prismaController.onReceivedFrontMessageVideo)

    //relacionado para usuarios
    router.post(`/user`,prismaController.onCreateUser);
    
    router.get(`/users`,prismaController.onRequestUsers);
    router.get(`/user/:id`,prismaController.onRequestForUser);
    router.put(`/user/:id`,prismaController.onUpdateUser);

    //funciones de busqueda de mensajes
    router.get(`/deepSearchForAllMessages/:id`,prismaController.onRequesForAlltypesOfMessages);
    router.get(`/searchForTextMessages/:id`,prismaController.onRequesForTextMessages);
    router.get(`/searchForImageMessages/:id`,prismaController.onRequesForImageMessages);
    router.get(`/searchForAudioMessages/:id`,prismaController.onRequesForAudioMessages);
    router.get(`/searchForVideoMessages/:id`,prismaController.onRequesForVideoMessages);
    router.get(`/searchForDocumentMessages/:id`,prismaController.onRequesForDocumentMessages);
    router.get(`/searchForBotMessages/:id`,prismaController.onConsultForBotMessages);
    
return router;
 }
}