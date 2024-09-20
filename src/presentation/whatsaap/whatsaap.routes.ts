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
    
    //se crearan rutas para plantillas especificas de whatsapp 
    //se mandara por parametro el numero al que enviaremos la plantilla
    router.post(`/welcome`,whatsaapController.sendWelcome);
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
    
    //desde el front a meta para responder al usuario
    router.post(`/sendTextResponse`,whatsaapController.sendText);
    router.post(`/sendImageResponse`,whatsaapController.sendImage);
    router.post(`/sendAudioResponse`,whatsaapController.sendAudio);
    router.post(`/sendVideoResponse`,whatsaapController.sendVideo);
    router.post(`/sendDocumentResponse`,whatsaapController.sendDocument);


return router;
 }
}