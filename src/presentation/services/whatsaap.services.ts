//import { UuuiAdapter } from "../../config/uuid.adapter";
import axios, { AxiosError } from "axios"
import{ WssService } from "../../notifications/wss.service";
import {envs } from "../../config/envs";
import { headers, urlSendMessage, urlSendtemplate } from "../../config/url/whatsappPostUrl";
import { PhonesResponse } from "../../domain/interfaces/getPhonesResponse";
import { cleanPhoneNumber } from "../../domain/functions/formatedNumber";
import { FourVariable, FourVariableDocument, FourVariableImage, FourVariableVideo, NoVariableDocument, NoVariableImage, NoVariableVideo, OneVariable, OneVariableDocument, OneVariableVideo, ThreeVariableDocument, ThreeVariableImage, ThreeVariables, ThreeVariableVideo, TwoVariable, TwoVariableDocument, TwoVariableImage, TwoVariableVideo } from "../../domain/interfaces";
import { OneVariableImage } from "../../domain/interfaces/oneVariableImage";
//import { createNumber } from "../../domain/functions/createNumber";
import PrismaService from "../../prisma/prisma.service";
import { reemplazarValores } from "../../domain/functions/reemplazarValores";

 
export class WhatsaapService {
  /********************************************************************** 
   servicio de whatsapp relacionado con todo lo referente a mensajes de whatsapp
   algunos metodos usan la clase de prisma para guardar la informacion
   especifica de solo plantillas con el fin de que los agentes sepan 
   que plantillas les han enviado a los usuarios
  ***********************************************************************/
constructor(
  //TODO: implementaremos un logger aqui para el registro de errores
  //TODO: se quitaran las lineas de codigo comentadas
  //TODO: se quitaran los console.log
  //no se usa el websocket aqui
  private readonly wssService = WssService.instance,
  private readonly prismaService = new PrismaService(),
) {}

onRequestForPhones = async () => {
  
  //no se usa una forma de no escribir esa url
  try {
    const response = await axios.get(`https://graph.facebook.com/${envs.Version}/${envs.Phone_Number_ID}`, {
      headers: {
        Authorization: `Bearer ${envs.User_Access_Token}`,
      },
    });

    const phoneData:PhonesResponse = response.data;
    const { display_phone_number } = phoneData;
    
     // console.log(cleanPhoneNumber(display_phone_number));

    const phoneToSend = new Array({
      "id": 1,
      "number": cleanPhoneNumber(display_phone_number)
    });

    return JSON.stringify(phoneToSend);
  } catch (error) {
    //Todo: se colocara logger de error
    if (axios.isAxiosError(error)) {
      console.error('Axios error response:', error.response);
    }
    throw new Error(`An error happened!\n${error}`);
  }
    
};

onRequesForTemplates = async (): Promise<any> => {
  //Todo: se quitaran los url a la vista
  
  try {
    const response = await axios.get(`https://graph.facebook.com/${envs.Version}/${envs.Business_ID}/message_templates`, {
      headers: {
        Authorization: `Bearer ${envs.User_Access_Token}`,
      },
    });
    
    return response.data.data;
  } catch (error) {

    //Todo: se colocara logger de error
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
       // console.error('Axios error response:', axiosError.response);
      } else {
        //console.error('Axios error without response:', axiosError.message);
      }
     
    } else {
      /*console.error('Non-Axios error:', error);*/
      
    }
    /*throw new Error(`An error happened!\n${error}`);*/
  }
  
}
//envio de plantillas

//se quitara metodo
onSendWelcome = async (id: any): Promise<any> => {
 
  const template = {
    name: "bienvenido",
    language: {
      code: "es_MX",
    },
  };
  const WelcomeTemplate: any = {
    messaging_product: "whatsapp",
    to: id,
    //to:"573205711428",
    type: 'template',
    template: template,
  };

  try {
    const response = await axios
      .post(urlSendMessage, WelcomeTemplate, { headers });
      console.log(`mensaje enviado a ${id}`);
    return response.data;
  } catch (error:any) {
    if (error.response) {
      // The request was made and the server responded with a status code that falls out of the range of 2xx
      console.error(`Error al enviar el mensaje. Código de estado: ${error.response.status}`);
      console.error(`Mensaje de error: ${error.response.data}`);
    } else if (error.request) {
      // The request was made but no response was received
      console.error(`Error al enviar el mensaje. No se recibió respuesta.`);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error(`Error al enviar el mensaje: ${error.message}`);
    }
  }
  return "ok";
}

onSendVerification = async (phone: any,codigo: number): Promise<any> => {
 //
  //const verificationNumber= createNumber().toString();
 
  const template:any={
   "messaging_product": "whatsapp",
      "recipient_type": "individual",
      "to": `57${phone}`,
      "type": "template",
      "template": {
        "name": "codigo_de_verificacion",
        "language": {
          "code": "es"
      },
      "components": [
        {
          "type": "body",
          "parameters": [
            {
              "type": "text",
              "text": codigo //verificationNumber //se podria colocar otra cosa si no se quiere ver el numero
            }
          ]
        },
        {
          "type": "button",
          "sub_type": "url",
          "index": "0",
          "parameters": [
            {
              "type": "text",
              "text": codigo//verificationNumber
            }
          ]
        }
      ]
    }
  }
  //se debera mandar a guardar a la base de datos el codigo de la verificacion 
  try {
    const response = await axios
      .post(urlSendMessage, template, { headers });
      console.log(`mensaje enviado a ${phone}`);
      const verificationCodeService = new PrismaService();
     // const verificationCodeData = await verificationCodeService
     // .saveVerificationCode(phone, codigo);
    return response.data;
  } catch (error:any) {
    if (error.response) {
      // The request was made and the server responded with a status code that falls out of the range of 2xx
      console.error(`Error al enviar el mensaje. Código de estado: ${error.response.status}`);
      console.error(`Detalle de error: ${error.response.data}`);
    } else if (error.request) {
      // The request was made but no response was received
      console.error(`Error al enviar el mensaje. No se recibió respuesta.`);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error(`Error al enviar el mensaje: ${error.message}`);
    }
  }
    
  return "ok";
  
}
onSendTemplateVerification  = async (phone: any,numero: any): Promise<any> => {
 //console.log(phone)
 //console.log(numero)
  const payload={
    "destination": phone,
    "template": "codigo_de_recuperacion_de_contrasea",
    "params": [
      numero
    ],
    "source": "158743457332682",
    "sender" : 0
  }
  return JSON.stringify(payload)
}
//plantillas de 0 variables de texto
onRequesWithoutVariables= async (payload:any) => {
  //Todo: podriamos usar un dto
  const {phone,template,selectedTemplate}= payload
  const plantillabody=selectedTemplate.components[0].text
  const id = (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).toString();

  const Message:any={
    id ,
    message: plantillabody,
    to: `57${phone}`,
    status: "delivered",
    direction: "outgoing",
    type: "text",
    mediaId: "",
    attendant: 0,
    
  }
  const rawTemplate= {
    name:"Bot",
    phone:envs.BOT_NUMBER,
    attendding:0,
    lastActive:new Date(),
    WhatsappMessage:[Message]
  }
  const plantilla=template
  //console.log(plantilla.name)
  try{
    const payload={
      "messaging_product": "whatsapp",
      "to": `57${phone}`,
      "type": "template",
      "template": {
        "name": plantilla,
        "language": {
          "code": "es_MX",
        }
      }
    }
    const response = await axios
    .post(urlSendtemplate, payload, { headers });
    //console.log(`respuesta del servidor ${response.data}`);
    this.prismaService.onFrontMessageReceived(rawTemplate);
    console.log(`response ${response.data}`);
    return response.data;
  }catch(error:any){
    //Todo: logger
    console.log("error aquii!!!!!!!",error.response.data)
  }
    
}
//1 variable texto
onRequesFor1= async (payload:any) => {
  //Todo: podriamos usar un dto
  const {phone, texto,template,selectedTemplate}= payload
  
  const plantillabody=selectedTemplate.components[0].text
  const nuevoTexto = plantillabody.replace(/\{\{([^}]+)\}\}/g, () => {
    return texto;
  });
  
  
  const id = (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).toString();
  const Message:any={
    id ,
    message: nuevoTexto,
    to: `57${phone}`,
    status: "delivered",
    direction: "outgoing",
    type: "text",
    mediaId: "",
    attendant: 0,
  }
  const rawTemplate= {
    name:"Bot",
    phone:envs.BOT_NUMBER,
    attendding:0,
    lastActive:new Date(),
    WhatsappMessage:[Message]
  }
  const plantilla=template
  //console.log(plantilla.name)
  try{
    const template:OneVariable={
      messaging_product: "whatsapp",
      to: phone,
      type: "template",
      template: {
        name: plantilla,
        language: {
          code: "es_MX",
        },
        components: [{
          type: "body",
          parameters: [{
            type: "text",
            text: `${texto}`
          }]
        }]
      }
      }

      const response = await axios
      .post(urlSendtemplate, template, { headers });
      this.prismaService.onFrontMessageReceived(rawTemplate);
      return response.data;
  }catch(error){
    //Todo: logger
  console.log(error)
  }
  

}
//2 variables texto
onRequesFor2= async (payload:any) => {
  //Todo: podriamos usar un dto
  const {phone, texto, texto2,template,selectedTemplate}= payload
  const plantillabody=selectedTemplate.components[0].text;
  const id = (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).toString();
  const valores: { [key: string]: string } = {
    1: texto,
    2: texto2,
  };
  
  const nuevoTexto: string = reemplazarValores(plantillabody, valores);


  //console.log(plantillabody)
  const plantilla=template
  const Message:any={
    id ,
    message: nuevoTexto,
    to: `57${phone}`,
    status: "delivered",
    direction: "outgoing",
    type: "text",
    mediaId: "",
    attendant: 0,
    
  }
  const rawTemplate= {
    name:"Bot",
    phone:envs.BOT_NUMBER,
    attendding:0,
    lastActive:new Date(),
    WhatsappMessage:[Message]
  }
   try{
    const template:TwoVariable={
      messaging_product: "whatsapp",
      to: phone,
      type: "template",
      template: {
        name: plantilla,
        language: {
          code: "es_MX",
        },
        components: [{
          type: "body",
          parameters: [
            {
            type: "text",
            text: `${texto}`
          },
          {
            type: "text",
            text: `${texto2}`
          }
        ]
        }]
      }
      }
  
      const response = await axios
      .post(urlSendtemplate, template, { headers });
      this.prismaService.onFrontMessageReceived(rawTemplate);
      return response.data;
   }catch(error){
    //Todo: logger
    // console.log(error)
   }
  
}
//3 variables texto
onRequesFor3= async (payload:any) => {
  //Todo: podriamos usar un dto
  //TODO: borrar codigo innecesario
  const {phone, texto, texto2, texto3,template,selectedTemplate}= payload
  const plantillabody=selectedTemplate.components[0].text;
  const id = (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).toString();
  const valores: { [key: string]: string } = {
    1: texto,
    2: texto2,
    3: texto3,
  };
  const nuevoTexto: string = reemplazarValores(plantillabody, valores);
  const Message:any={
    id ,
    message: nuevoTexto,
    to: `57${phone}`,
    status: "delivered",
    direction: "outgoing",
    type: "text",
    mediaId: "",
    attendant: 0,
    
  }
  const rawTemplate= {
    name:"Bot",
    phone:envs.BOT_NUMBER,
    attendding:0,
    lastActive:new Date(),
    WhatsappMessage:[Message]
  }
  const plantilla=template
  try{
    const template:ThreeVariables={
      messaging_product: "whatsapp",
      to: phone,
      type: "template",
      template: {
        name: plantilla,
        language: {
          code: "es_MX",
        },
        components: [{
          type: "body",
          parameters: [
            {
            type: "text",
            text: `${texto}`
          },
          {
            type: "text",
            text: `${texto2}`
          },
          {
            type: "text",
            text: `${texto3}`
          } 
        ]
        }]
      }
      }
  
      const response = await axios
      .post(urlSendtemplate, template, { headers });
  
      return response.data;
   }catch(error){
     console.log(error)
   }
}
//4 variables texto
onRequesFor4= async (payload:any) => {
  const {phone, texto, texto2, texto3,texto4,template,selectedTemplate}= payload
  const plantillabody=selectedTemplate.components[0].text;
  const id = (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).toString();
  const valores: { [key: string]: string } = {
    1: texto,
    2: texto2,
    3: texto3,
    4: texto4,
  };
  const nuevoTexto: string = reemplazarValores(plantillabody, valores);
  const Message:any={
    id ,
    message: nuevoTexto,
    to: `57${phone}`,
    status: "delivered",
    direction: "outgoing",
    type: "text",
    mediaId: "",
    attendant: 0,
    
  }
  const rawTemplate= {
    name:"Bot",
    phone:envs.BOT_NUMBER,
    attendding:0,
    lastActive:new Date(),
    WhatsappMessage:[Message]
  }
  const plantilla=template
  try{
    const template:FourVariable={
      messaging_product: "whatsapp",
      to: phone,
      type: "template",
      template: {
        name: plantilla,
        language: {
          code: "es_MX",
        },
        components: [{
          type: "body",
          parameters: [
            {
            type: "text",
            text: `${texto}`
          },
          {
            type: "text",
            text: `${texto2}`
          },
          {
            type: "text",
            text: `${texto3}`
          },
          {
            type: "text",
            text: `${texto4}`
          } 
        ]
        }]
      }
      }
  
      const response = await axios
      .post(urlSendtemplate, template, { headers });
      this.prismaService.onFrontMessageReceived(rawTemplate);
     
      return response.data;
   }catch(error){
    //Todo: logger
     console.log(error)
   }
}
//sin variables imagenes
onRequesWithoutVariablesImage= async (payload:any) => {
  //Todo: podriamos usar un dto
  const {phone, mediaId, template,selectedTemplate}= payload
  const plantillabody=selectedTemplate.components[0].text
  const id = (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).toString();

  const Message:any={
    id ,
    message: plantillabody,
    to: `57${phone}`,
    status: "delivered",
    direction: "outgoing",
    type: "text",
    mediaId: "",
    attendant: 0,
    
  }
  const rawTemplate= {
    name:"Bot",
    phone:envs.BOT_NUMBER,
    attendding:0,
    lastActive:new Date(),
    WhatsappMessage:[Message]
  }
  const plantilla=template
  
  try{
    const imageTemplate: NoVariableImage = {
      messaging_product: "whatsapp",
      to: phone,
      type: "template",
      template: {
        name: plantilla,
        language: {
          code: "es_MX",
        },"components": [
          {
          type: "header",
          "parameters": [
            {
              type: "image",
              "image":{
                "link": mediaId   
              }
            }
          ]
        }
      ]
      }
    }
    
    const response = await axios
    .post(urlSendtemplate, imageTemplate, { headers });
    this.prismaService.onFrontMessageReceived(rawTemplate);
  //console.log("enviado a meta")
    return response.data;
  }catch(error){
    //Todo: logger
    console.log(error)
  }
  
   
}
//1 variable imagen
onRequesFor1Image= async (payload:any) => {
  //Todo: podriamos usar un dto
  const {phone, mediaId, texto,template,selectedTemplate}= payload
  const plantillabody=selectedTemplate.components[0].text;
  const id = (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).toString();
  const valores: { [key: string]: string } = {
    1: texto,
  };
  const nuevoTexto: string = reemplazarValores(plantillabody, valores);
  const Message:any={
    id ,
    message: nuevoTexto,
    to: `57${phone}`,
    status: "delivered",
    direction: "outgoing",
    type: "text",
    mediaId: "",
    attendant: 0,
    
  }
  const rawTemplate= {
    name:"Bot",
    phone:envs.BOT_NUMBER,
    attendding:0,
    lastActive:new Date(),
    WhatsappMessage:[Message]
  }
  const plantilla=template

  try{
    const imageTemplate: OneVariableImage = {
      messaging_product: "whatsapp",
      to: phone,
      type: "template",
      template: {
        name: plantilla,
        language: {
          code: "es_MX",
        },"components": [
          {
          type: "header",
          "parameters": [
            {
              type: "image",
              "image":{
                "link": mediaId   
              }
            }
          ]
        },
        {
          type: "body",
          "parameters": [
            {
              type: "text",
              text: texto
            }
          ]
        }
      ]
      }
    }
    
    const response = await axios
    .post(urlSendtemplate, imageTemplate, { headers });
  this.prismaService.onFrontMessageReceived(rawTemplate);
  //console.log("enviado a meta")
    return response.data;
  }catch(error){
    //Todo: logger
    console.log(error)
  }  
}
//2 variables imagen
onRequesFor2Image= async (payload:any) => {
  //Todo: podriamos usar un dto
  const {phone, mediaId, texto, texto2,template,selectedTemplate}= payload;
  const plantillabody=selectedTemplate.components[0].text;
  const id = (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).toString();
  const valores: { [key: string]: string } = {
    1: texto,
    2: texto2,
  };
  const nuevoTexto: string = reemplazarValores(plantillabody, valores);
  const Message:any={
    id ,
    message: nuevoTexto,
    to: `57${phone}`,
    status: "delivered",
    direction: "outgoing",
    type: "text",
    mediaId: "",
    attendant: 0,
    
  }
  const rawTemplate= {
    name:"Bot",
    phone:envs.BOT_NUMBER,
    attendding:0,
    lastActive:new Date(),
    WhatsappMessage:[Message]
  }
  const plantilla=template
  
  try{
    const imageTemplate: TwoVariableImage = {
      messaging_product: "whatsapp",
      to: phone,
      type: "template",
      template: {
        name: plantilla,
        language: {
          code: "es_MX",
        },"components": [
          {
          type: "header",
          "parameters": [
            {
              type: "image",
              "image":{
                "link": mediaId   
              }
            }
          ]
        },
        {
          type: "body",
          "parameters": [
            {
              type: "text",
              text: texto
            },
            {
              type: "text",
              text: texto2
            }
          ]
        }
      ]
      }
    }
    
    const response = await axios
    .post(urlSendtemplate, imageTemplate, { headers });
  this.prismaService.onFrontMessageReceived(rawTemplate);
   // console.log("enviado a meta")
    return response.data;
  }catch(error){
    //Todo: logger
    console.log(error)
  }
    
}
//3 variables imagen
onRequesFor3Image= async (payload:any) => {
  //Todo: podriamos usar un dto
  const {phone, mediaId, texto, texto2,texto3,template,selectedTemplate}= payload
  const plantillabody=selectedTemplate.components[0].text;
  const id = (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).toString();
  const valores: { [key: string]: string } = {
    1: texto,
    2: texto2,
    3: texto3,
  };
  const nuevoTexto: string = reemplazarValores(plantillabody, valores);
  const Message:any={
    id ,
    message: nuevoTexto,
    to: `57${phone}`,
    status: "delivered",
    direction: "outgoing",
    type: "text",
    mediaId: "",
    attendant: 0,
    
  }
  const rawTemplate= {
    name:"Bot",
    phone:envs.BOT_NUMBER,
    attendding:0,
    lastActive:new Date(),
    WhatsappMessage:[Message]
  }
  const plantilla=template
  try{
    const imageTemplate: ThreeVariableImage = {
      messaging_product: "whatsapp",
      to: phone,
      type: "template",
      template: {
        name: plantilla,
        language: {
          code: "es_MX",
        },"components": [
          {
          type: "header",
          "parameters": [
            {
              type: "image",
              "image":{
                "link": mediaId   
              }
            }
          ]
        },
        {
          type: "body",
          "parameters": [
            {
              type: "text",
              text: texto
            },
            {
              type: "text",
              text: texto2
            },
            {
              type: "text",
              text: texto3
            }
          ]
        }
      ]
      }
    }
    
    const response = await axios
    .post(urlSendtemplate, imageTemplate, { headers });
  this.prismaService.onFrontMessageReceived(rawTemplate);
 // console.log("enviado a meta")
    return response.data;
  }catch(error){
    //Todo: logger
    console.log(error)
  }
}
//4 variables imagen
onRequesFor4Image= async (payload:any) => {
  //Todo: podriamos usar un dto
  const {phone, mediaId, texto, texto2,texto3,texto4,template,selectedTemplate}= payload
  const plantillabody=selectedTemplate.components[0].text;
  const id = (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).toString();
  const valores: { [key: string]: string } = {
    1: texto,
    2: texto2,
    3: texto3,
    4: texto4
  };
  const nuevoTexto: string = reemplazarValores(plantillabody, valores);
  const Message:any={
    id ,
    message: nuevoTexto,
    to: `57${phone}`,
    status: "delivered",
    direction: "outgoing",
    type: "text",
    mediaId: "",
    attendant: 0,
    
  }
  const rawTemplate= {
    name:"Bot",
    phone:envs.BOT_NUMBER,
    attendding:0,
    lastActive:new Date(),
    WhatsappMessage:[Message]
  }
  const plantilla=template
  try{
    const imageTemplate: FourVariableImage = {
      messaging_product: "whatsapp",
      to: phone,
      type: "template",
      template: {
        name: plantilla,
        language: {
          code: "es_MX",
        },"components": [
          {
          type: "header",
          "parameters": [
            {
              type: "image",
              "image":{
                "link": mediaId   
              }
            }
          ]
        },
        {
          type: "body",
          "parameters": [
            {
              type: "text",
              text: texto
            },
            {
              type: "text",
              text: texto2
            },
            {
              type: "text",
              text: texto3
            },
            {
              type: "text",
              text: texto4
            }
          ]
        }
      ]
      }
    }
    
    const response = await axios
    .post(urlSendtemplate, imageTemplate, { headers });
  this.prismaService.onFrontMessageReceived(rawTemplate);
 // console.log("enviado a meta")
    return response.data;
  }catch(error){
    //Todo: logger
    console.log(error)
  }
   
}
/*
tendra pioridad las plantillas de documentos
*/

//sin variables documento
onRequesWithoutVariablesDocument = async (payload:any) => {
  //Todo: podriamos usar un dto
  const {phone, mediaId, template,selectedTemplate}= payload
  const plantillabody=selectedTemplate.components[0].text
  const id = (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).toString();

  const Message:any={
    id ,
    message: plantillabody,
    to: `57${phone}`,
    status: "delivered",
    direction: "outgoing",
    type: "text",
    mediaId: "",
    attendant: 0,
    
  }
  const rawTemplate= {
    name:"Bot",
    phone:envs.BOT_NUMBER,
    attendding:0,
    lastActive:new Date(),
    WhatsappMessage:[Message]
  }
  const plantilla=template
  
  try{
    const documentTemplate: NoVariableDocument = {
      messaging_product: "whatsapp",
      to: phone,
      type: "template",
      template: {
        name: plantilla,
        language: {
          code: "es_MX",
        },"components": [
          {
          type: "header",
          "parameters": [
            {
              type: "document",
              "document":{
                "link": mediaId,  
                "filename": "Documento.pdf"
              }
            }
          ]
        }
      ]
      }
    }
    
    const response = await axios
    .post(urlSendtemplate, documentTemplate, { headers });
  this.prismaService.onFrontMessageReceived(rawTemplate);
 // console.log("enviado a meta")
    return response.data;
  }catch(error){
    //Todo: logger
    console.log(error)
  }
}
//1 variable documento
onRequesFor1Document = async (payload:any) => {
  //Todo: podriamos usar un dto 
  //Todo: no guarda los mensajes con documentos en header
  const {phone, mediaId, texto, template,selectedTemplate}= payload
  const plantillabody=selectedTemplate.components[0].text;
  const id = (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).toString();
  const valores: { [key: string]: string } = {
    1: texto,
  };
 // const nuevoTexto: string = reemplazarValores(plantillabody, valores);
  const Message:any={
    id ,
  //  message: nuevoTexto,
    message: plantillabody,
    to: `57${phone}`,
    status: "delivered",
    direction: "outgoing",
    type: "text",
    mediaId: "",
    attendant: 0,
    
  }
  const rawTemplate= {
    name:"Bot",
    phone:envs.BOT_NUMBER,
    attendding:0,
    lastActive:new Date(),
    WhatsappMessage:[Message]
  }
  const plantilla=template
  
  try{
    const documentTemplate: OneVariableDocument = {
      messaging_product: "whatsapp",
      to: phone,
      type: "template",
      template: {
        name: plantilla,
        language: {
          code: "es_MX",
        },"components": [
          {
          type: "header",
          "parameters": [
            {
              type: "document",
              "document":{
                "link": mediaId,
                "filename": "Documento.pdf"   
              }
            }
          ]
        },
        {
          type: "body",
          "parameters": [
            {
              type: "text",
              text: texto
            }
          ]
        }
      ]
      }
    }
    
    const response = await axios
    .post(urlSendtemplate, documentTemplate, { headers });
   // console.log(response.data)
  this.prismaService.onFrontMessageReceived(rawTemplate);
  //console.log("enviado a meta")
    return response.data;
  }catch(error){
    //Todo: logger
    console.log(error)
  }

  
}
//2 variables documento
onRequesFor2Document = async (payload:any) => {
  //Todo: podriamos usar un dto
  const {phone, mediaId, texto, texto2,template,selectedTemplate}= payload
  const plantillabody=selectedTemplate.components[0].text;
  const id = (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).toString();
  const valores: { [key: string]: string } = {
    1: texto,
    2: texto2,  
  };
  const nuevoTexto: string = reemplazarValores(plantillabody, valores);
  const Message:any={
    id ,
    message: nuevoTexto,
    to: `57${phone}`,
    status: "delivered",
    direction: "outgoing",
    type: "text",
    mediaId: "",
    attendant: 0,
    
  }
  const rawTemplate= {
    name:"Bot",
    phone:envs.BOT_NUMBER,
    attendding:0,
    lastActive:new Date(),
    WhatsappMessage:[Message]
  }
  const plantilla=template
 
  try{
    const documentTemplate: TwoVariableDocument = {
      messaging_product: "whatsapp",
      to: phone,
      type: "template",
      template: {
        name: plantilla,
        language: {
          code: "es_MX",
        },"components": [
          {
          type: "header",
          "parameters": [
            {
              type: "document",
              "document":{
                "link": mediaId   
                ,"filename": "Documento.pdf"
              }
            }
          ]
        },
        {
          type: "body",
          "parameters": [
            {
              type: "text",
              text: texto
            },
            {
              type: "text",
              text: texto2
            }
          ]
        }
      ]
      }
    }
    
    const response = await axios
    .post(urlSendtemplate, documentTemplate, { headers });
  this.prismaService.onFrontMessageReceived(rawTemplate);
   // console.log("enviado a meta")
    return response.data;
  }catch(error){
    //Todo: logger
    console.log(error)
  }
}
//3 variables documento
onRequesFor3Document = async (payload:any) => {
  //Todo: podriamos usar un dto
  const {phone, mediaId, texto, texto2,texto3,template,selectedTemplate}= payload
  const plantillabody=selectedTemplate.components[0].text;
  const id = (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).toString();
  const valores: { [key: string]: string } = {
    1: texto,
    2: texto2,
    3: texto3,
  };
  const nuevoTexto: string = reemplazarValores(plantillabody, valores);
  const Message:any={
    id ,
    message: nuevoTexto,
    to: `57${phone}`,
    status: "delivered",
    direction: "outgoing",
    type: "text",
    mediaId: "",
    attendant: 0,
    
  }
  const rawTemplate= {
    name:"Bot",
    phone:envs.BOT_NUMBER,
    attendding:0,
    lastActive:new Date(),
    WhatsappMessage:[Message]
  }
  const plantilla=template
  try{
    const documentTemplate: ThreeVariableDocument = {
      messaging_product: "whatsapp",
      to: phone,
      type: "template",
      template: {
        name: plantilla,
        language: {
          code: "es_MX",
        },"components": [
          {
          type: "header",
          "parameters": [
            {
              type: "document",
              "document":{
                "link": mediaId  
                ,"filename": "Documento.pdf" 
              }
            }
          ]
        },
        {
          type: "body",
          "parameters": [
            {
              type: "text",
              text: texto
            },
            {
              type: "text",
              text: texto2
            },
            {
              type: "text",
              text: texto3
            }
          ]
        }
      ]
      }
    }
    
    const response = await axios
    .post(urlSendtemplate, documentTemplate, { headers });
  this.prismaService.onFrontMessageReceived(rawTemplate);
 // console.log("enviado a meta")
    return response.data;
  }catch(error){
    //Todo: logger
    console.log(error)
  }
}
//4 variables documento
onRequesFor4Document = async (payload:any) => {
  //Todo: podriamos usar un dto
  const {phone, mediaId, texto, texto2,texto3,texto4,template,selectedTemplate}= payload
  const plantillabody=selectedTemplate.components[0].text;
  const id = (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).toString();
  const valores: { [key: string]: string } = {
    1: texto,
    2: texto2,
    3: texto3,
    4: texto4,
  };
  const nuevoTexto: string = reemplazarValores(plantillabody, valores);
  const Message:any={
    id ,
    message: nuevoTexto,
    to: `57${phone}`,
    status: "delivered",
    direction: "outgoing",
    type: "text",
    mediaId: "",
    attendant: 0,
    
  }
  const rawTemplate= {
    name:"Bot",
    phone:envs.BOT_NUMBER,
    attendding:0,
    lastActive:new Date(),
    WhatsappMessage:[Message]
  }
  const plantilla=template
  try{
    const documentTemplate: FourVariableDocument = {
      messaging_product: "whatsapp",
      to: phone,
      type: "template",
      template: {
        name: plantilla,
        language: {
          code: "es_MX",
        },"components": [
          {
          type: "header",
          "parameters": [
            {
              type: "document",
              "document":{
                "link": mediaId   
                ,"filename": "Documento.pdf"
              }
            }
          ]
        },
        {
          type: "body",
          "parameters": [
            {
              type: "text",
              text: texto
            },
            {
              type: "text",
              text: texto2
            },
            {
              type: "text",
              text: texto3
            },
            {
              type: "text",
              text: texto4
            }
          ]
        }
      ]
      }
    }
    
    const response = await axios
    .post(urlSendtemplate, documentTemplate, { headers });
  this.prismaService.onFrontMessageReceived(rawTemplate);
  //console.log("enviado a meta")
    return response.data;
  }catch(error){
    //Todo: logger
    console.log(error)
  }
}
//sin variables video
onRequesWithoutVariablesVideo = async (payload:any) => {
  //Todo: podriamos usar un dto
  const {phone, mediaId, template,selectedTemplate}= payload
  const plantillabody=selectedTemplate.components[0].text
  const id = (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).toString();

  const Message:any={
    id ,
    message: plantillabody,
    to: `57${phone}`,
    status: "delivered",
    direction: "outgoing",
    type: "text",
    mediaId: "",
    attendant: 0,
    
  }
  const rawTemplate= {
    name:"Bot",
    phone:envs.BOT_NUMBER,
    attendding:0,
    lastActive:new Date(),
    WhatsappMessage:[Message]
  }
  const plantilla=template
  try{
    const videoTemplate: NoVariableVideo = {
      messaging_product: "whatsapp",
      to: phone,
      type: "template",
      template: {
        name: plantilla,
        language: {
          code: "es_MX",
        },"components": [
          {
          type: "header",
          "parameters": [
            {
              type: "video",
              "video":{
                "link": mediaId   
              }
            }
          ]
        }
      ]
      }
    }
    
    const response = await axios
    .post(urlSendtemplate, videoTemplate, { headers });
  this.prismaService.onFrontMessageReceived(rawTemplate);
  //console.log("enviado a meta")
    return response.data;
  }catch(error){
    //Todo: logger
    console.log(error)
  }
  
}
//1 variable video
onRequesFor1Video = async (payload:any) => {
  //Todo: podriamos usar un dto
  //no se guardara los videos del header
  const {phone, mediaId, texto, template,selectedTemplate}= payload
  const plantillabody=selectedTemplate.components[0].text
  const nuevoTexto = plantillabody.replace(/\{\{([^}]+)\}\}/g, () => {
    return texto;
  });
  const id = (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).toString();
  const Message:any={
    id ,
    message: nuevoTexto,
    to: `57${phone}`,
    status: "delivered",
    direction: "outgoing",
    type: "text",
    mediaId: "",
    attendant: 0,
  }
  const rawTemplate= {
    name:"Bot",
    phone:envs.BOT_NUMBER,
    attendding:0,
    lastActive:new Date(),
    WhatsappMessage:[Message]
  }
  const plantilla=template
  
  try{
    const videoTemplate: OneVariableVideo = {
      messaging_product: "whatsapp",
      to: phone,
      type: "template",
      template: {
        name: plantilla,
        language: {
          code: "es_MX",
        },"components": [
          {
          type: "header",
          "parameters": [
            {
              type: "video",
              "video":{
                "link": mediaId   
              }
            }
          ]
        },
        {
          type: "body",
          "parameters": [
            {
              type: "text",
              text: texto
            }
          ]
        }
      ]
      }
    }
    
    const response = await axios
    .post(urlSendtemplate, videoTemplate, { headers });
  this.prismaService.onFrontMessageReceived(rawTemplate);
 // console.log("enviado a meta")
    return response.data;
  }catch(error){
    //Todo: logger
    console.log(error)
  }
}
//2 variables video
onRequesFor2Video = async (payload:any) => {
  //Todo: podriamos usar un dto
  const {phone, mediaId, texto, texto2,template,selectedTemplate}= payload
  const plantillabody=selectedTemplate.components[0].text;
  const id = (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).toString();
  const valores: { [key: string]: string } = {
    1: texto,
    2: texto2,
  };
  const nuevoTexto: string = reemplazarValores(plantillabody, valores);
  const Message:any={
    id ,
    message: nuevoTexto,
    to: `57${phone}`,
    status: "delivered",
    direction: "outgoing",
    type: "text",
    mediaId: "",
    attendant: 0,
    
  }
  const rawTemplate= {
    name:"Bot",
    phone:envs.BOT_NUMBER,
    attendding:0,
    lastActive:new Date(),
    WhatsappMessage:[Message]
  }
  const plantilla=template
  try{
    const videoTemplate: TwoVariableVideo = {
      messaging_product: "whatsapp",
      to: phone,
      type: "template",
      template: {
        name: plantilla,
        language: {
          code: "es_MX",
        },"components": [
          {
          type: "header",
          "parameters": [
            {
              type: "video",
              "video":{
                "link": mediaId   
              }
            }
          ]
        },
        {
          type: "body",
          "parameters": [
            {
              type: "text",
              text: texto
            },
            {
              type: "text",
              text: texto2
            }
          ]
        }
      ]
      }
    }
    
    const response = await axios
    .post(urlSendtemplate, videoTemplate, { headers });
  this.prismaService.onFrontMessageReceived(rawTemplate);
  //  console.log("enviado a meta")
    return response.data;
  }catch(error){
    //Todo: logger
    console.log(error)
  }
}
//3 variables video
onRequesFor3Video = async (payload:any) => {
  const {phone, mediaId, texto, texto2,texto3,template,selectedTemplate}= payload
  const plantillabody=selectedTemplate.components[0].text;
  const id = (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).toString();
  const valores: { [key: string]: string } = {
    1: texto,
    2: texto2,
    3: texto3,
  };
  const nuevoTexto: string = reemplazarValores(plantillabody, valores);
  const Message:any={
    id ,
    message: nuevoTexto,
    to: `57${phone}`,
    status: "delivered",
    direction: "outgoing",
    type: "text",
    mediaId: "",
    attendant: 0,
    
  }
  const rawTemplate= {
    name:"Bot",
    phone:envs.BOT_NUMBER,
    attendding:0,
    lastActive:new Date(),
    WhatsappMessage:[Message]
  }
  const plantilla=template
  try{
    const videoTemplate: ThreeVariableVideo = {
      messaging_product: "whatsapp",
      to: phone,
      type: "template",
      template: {
        name: plantilla,
        language: {
          code: "es_MX",
        },"components": [
          {
          type: "header",
          "parameters": [
            {
              type: "video",
              "video":{
                "link": mediaId   
              }
            }
          ]
        },
        {
          type: "body",
          "parameters": [
            {
              type: "text",
              text: texto
            },
            {
              type: "text",
              text: texto2
            },
            {
              type: "text",
              text: texto3
            }
          ]
        }
      ]
      }
    }
    
    const response = await axios
    .post(urlSendtemplate, videoTemplate, { headers });
  this.prismaService.onFrontMessageReceived(rawTemplate);
 // console.log("enviado a meta")
    return response.data;
  }catch(error){
    console.log(error)
  }
}
//4 variables video
onRequesFor4Video = async (payload:any) => {
  //Todo: podriamos usar un dto
  const {phone, mediaId, texto, texto2,texto3,texto4,template,selectedTemplate}= payload
  const plantillabody=selectedTemplate.components[0].text;
  const id = (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).toString();
  const valores: { [key: string]: string } = {
    1: texto,
    2: texto2,
    3: texto3,
    4: texto4
  };
  const nuevoTexto: string = reemplazarValores(plantillabody, valores);
  const Message:any={
    id ,
    message: nuevoTexto,
    to: `57${phone}`,
    status: "delivered",
    direction: "outgoing",
    type: "text",
    mediaId: "",
    attendant: 0,
    
  }
  const rawTemplate= {
    name:"Bot",
    phone:envs.BOT_NUMBER,
    attendding:0,
    lastActive:new Date(),
    WhatsappMessage:[Message]
  }
  const plantilla=template
  
  try{
    const videoTemplate: FourVariableVideo = {
      messaging_product: "whatsapp",
      to: phone,
      type: "template",
      template: {
        name: plantilla,
        language: {
          code: "es_MX",
        },"components": [
          {
          type: "header",
          "parameters": [
            {
              type: "video",
              "video":{
                "link": mediaId   
              }
            }
          ]
        },
        {
          type: "body",
          "parameters": [
            {
              type: "text",
              text: texto
            },
            {
              type: "text",
              text: texto2
            },
            {
              type: "text",
              text: texto3
            },
            {
              type: "text",
              text: texto4
            }
          ]
        }
      ]
      }
    }
    
    const response = await axios
    .post(urlSendtemplate, videoTemplate, { headers });
  this.prismaService.onFrontMessageReceived(rawTemplate);
 // console.log("enviado a meta")
    return response.data;
  }catch(error){
    //logger
    console.log(error)
  }
}
//aqui enviamos mensajes de texto desde el front
onSendText = async (id: any, message: string) => {
  const textTemplate: any = {
    messaging_product: "whatsapp",
    to: id,
    text: { body: `${message}` },
  };
  try {
    //console.log(message, id);
    const response = await axios
      .post(urlSendMessage, textTemplate, { headers });

    return response.data;
  } catch (error:any) {
    //logger
    if (error.response) {
      console.error(`Error al enviar el mensaje. Código de estado: ${error.response.status}`);
      console.error(`Respuesta de error: ${error.response.data}`);
    } else if (error.request) {
      console.error(`Error al enviar el mensaje. No se recibió respuesta.`);
    } else {
      console.error(`Error al enviar el mensaje: ${error.message}`);
    }
  }
  return "ok";
}
//enviamos mensajes de imagenes
onSendImage = async (payload:any) => {
  const {to,mediaId}=payload
  const imageTemplate: any = {
    "messaging_product": "whatsapp",
    "recipient_type": "individual",
    "to": to,
    "type": "image",
    "image": mediaId
  }
  try{
    const response = await axios
    .post(urlSendMessage, JSON.stringify(imageTemplate), { headers });
    console.log(response.data)
  return response.data;

  }catch(error:any){
    //logger
    if (error.response) {
      console.error(`Error al enviar el mensaje. Código de estado: ${error.response.status}`);
      console.error(`Respuesta de error: ${error.response}`);
    } else if (error.request) {
      console.error(`Error al enviar el mensaje. No se recibió respuesta.`);
    } else {
      console.error(`Error al enviar el mensaje: ${error.message}`);
    }
}

}
//no implementado
onSendAudio = async (payload:any) => {
  console.log(payload)
  //aun no se ha implementado
}
//cuando mandamos un video por url
onSendVideo = async (payload:any) => {
  const {to,mediaId}=payload
  const videoTemplate: any = {
    "messaging_product": "whatsapp",
    "recipient_type": "individual",
    "to": to,
    "type": "video",
    "video": mediaId
  }
  
  try{
    const response = await axios
    .post(urlSendMessage, JSON.stringify(videoTemplate), { headers });
   // console.log(response.data)
  return response.data;

  }catch(error:any){
    //logger
    if (error.response) {
      console.error(`Error al enviar el mensaje. Código de estado: ${error.response.status}`);
      console.error(`Respuesta de error: ${error.response}`);
    } else if (error.request) {
      console.error(`Error al enviar el mensaje. No se recibió respuesta.`);
    } else {
      console.error(`Error al enviar el mensaje: ${error.message}`);
    }
  }
}
//aqui enviamos el documento al cliente
onSendDoc = async (payload:any) => {
  //este metodo falla aveces asi que hay que estar atento
  //por si encuentro algo en la ejecucion 
  //sino es de aqui es del front que falla
  const {to,mediaId}=payload
 // const {id}=mediaId
  const docTemplate: any = {
    "messaging_product": "whatsapp",
    "recipient_type": "individual",
    "to": to,
    "type": "document",
    "document": mediaId
  }
  try{
    //TODO: deberiamos de delegar la responsabilidad de combertir
    //lo que enviamos  a otra variable y despues preguntar que si esta correcta
    //lo envia a meta si no que envie una respuesta de volver a cargar
   // console.log(JSON.stringify(docTemplate))

   //const document 
    const response = await axios
    .post(urlSendMessage, JSON.stringify(docTemplate), { headers });
    console.log(response.data)
  return response.data;
  }catch(error:any){
    if (error.response) {
      console.error(`Error al enviar el documento. Código de estado: ${error.response.status}`);
      console.error(`Respuesta de error: ${error.response}`);
    } else if (error.request) {
      console.error(`Error al enviar el documento. No se recibió respuesta.`);
    } else {
      console.error(`Error al enviar el documento: ${error.message.data}`);
    }
  }
}



}

