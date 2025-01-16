import { Router } from "express";
import { WhatsaapController } from "./whatsaap.controller";

export class whatsappRoutes{


    static get routes(){ 
    const router= Router();
    const whatsaapController =new WhatsaapController();  

    router.get(`/`,whatsaapController.index);

    //rutas de whatsapp relacionadas con el servicio
    router.get(`/getphones`,whatsaapController.getPhones);
    router.get(`/getCustomers`,whatsaapController.getCustomers);
    router.get(`/getTemplates`,whatsaapController.getTemplates);
    
    //se crearan rutas para plantillas especificas de whatsapp 
    router.post(`/verification`,whatsaapController.sendVerification);
    router.get('/verification/:id/:numero', whatsaapController.sendtemplateverification);
    
    router.post(`/sinvariable`,whatsaapController.sinvariable);
    router.post(`/unavariable`,whatsaapController.unavariable);
    router.post(`/dosvariable`,whatsaapController.dosvariables);
    router.post(`/tresvariable`,whatsaapController.tresvariables);
    router.post(`/cuatrovariable`,whatsaapController.cuatrovariables);
    router.post(`/sinvariableimage`,whatsaapController.sinvariableimage);
    router.post(`/unavariableimage`,whatsaapController.unavariableimage);
    router.post(`/dosvariableimage`,whatsaapController.dosvariablesimage);
    router.post(`/tresvariableimage`,whatsaapController.tresvariablesimage);
    router.post(`/cuatrovariableimage`,whatsaapController.cuatrovariablesimage);
    router.post(`/sinvariabledocument`,whatsaapController.sinvariabledocument);
    router.post(`/unavariabledocument`,whatsaapController.unavariabledocument);
    router.post(`/dosvariabledocument`,whatsaapController.dosvariablesdocument);
    router.post(`/tresvariabledocument`,whatsaapController.tresvariablesdocument);
    router.post(`/cuatrovariabledocument`,whatsaapController.cuatrovariablesdocument);
    router.post(`/sinvariablevideo`,whatsaapController.sinvariablevideo);
    router.post(`/unavariablevideo`,whatsaapController.unavariablevideo);
    router.post(`/dosvariablevideo`,whatsaapController.dosvariablesvideo);
    router.post(`/tresvariablevideo`,whatsaapController.tresvariablesvideo);
    router.post(`/cuatrovariablevideo`,whatsaapController.cuatrovariablesvideo);

    //desde el front a meta para responder al usuario
    router.post(`/sendTextResponse`,whatsaapController.sendText);
    router.post(`/sendImageResponse`,whatsaapController.sendImage);
    router.post(`/sendAudioResponse`,whatsaapController.sendAudio);
    router.post(`/sendVideoResponse`,whatsaapController.sendVideo);
    router.post(`/sendDocumentResponse`,whatsaapController.sendDocument);

return router;
 }
}