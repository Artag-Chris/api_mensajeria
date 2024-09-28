//no implementado pero lo dejo por si crean usuarios 
//import { UuuiAdapter } from "../../config/uuid.adapter";
import axios, { AxiosError } from "axios"
import{ WssService } from "../../notifications/wss.service";
import {envs } from "../../config/envs";
import { headers, urlSendMessage, urlSendtemplate } from "../../config/url/whatsappPostUrl";
import { PhonesResponse } from "../../domain/interfaces/getPhonesResponse";
import { cleanPhoneNumber } from "../../domain/functions/formatedNumber";
import { FourVariable, FourVariableImage, NoVariableImage, OneVariable, ThreeVariableImage, ThreeVariables, TwoVariable, TwoVariableImage } from "../../domain/interfaces";
import { OneVariableImage } from "../../domain/interfaces/oneVariableImage";
import { createNumber } from "../../domain/functions/createNumber";
import { Verification } from "../../domain/interfaces/verificationTemplate";

export class WhatsaapService {
constructor(
  private readonly wssService = WssService.instance,
) {}

onRequestForPhones = async () => {
  try {
    const response = await axios.get(`https://graph.facebook.com/${envs.Version}/${envs.Phone_Number_ID}`, {
      headers: {
        Authorization: `Bearer ${envs.User_Access_Token}`,
      },
    });

    const phoneData:PhonesResponse = response.data;
    const { display_phone_number } = phoneData;

    const phoneToSend = new Array({
      "id": 1,
      "number": cleanPhoneNumber(display_phone_number)
    });

    return JSON.stringify(phoneToSend);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error response:', error.response);
    }
    throw new Error(`An error happened!\n${error}`);
  }
};

onRequesForTemplates = async (): Promise<any> => {
  try {
    const response = await axios.get(`https://graph.facebook.com/${envs.Version}/${envs.WABA_ID}/message_templates`, {
      headers: {
        Authorization: `Bearer ${envs.User_Access_Token}`,
      },
    });
    
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        console.error('Axios error response:', axiosError.response);
      } else {
        console.error('Axios error without response:', axiosError.message);
      }
    } else {
      console.error('Non-Axios error:', error);
    }
    throw new Error(`An error happened!\n${error}`);
  }
  
}
//envio de plantillas
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
onSendVerification = async (phone: any): Promise<any> => {
 
  const verificationNumber= createNumber();
  console.log( verificationNumber,phone );
  
  const template:any={
   "messaging_product": "whatsapp",
      "recipient_type": "individual",
      "to": `57${phone}`,
      "type": "template",
      "template": {
        "name": "verificacion",
        "language": {
          "code": "es_MX"
      },
      "components": [
        {
          "type": "body",
          "parameters": [
            {
              "type": "text",
              "text": "J$FpnYnP"
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
              "text": "J$FpnYnP"
            }
          ]
        }
      ]
    }
  }

  try {
    const response = await axios
      .post(urlSendMessage, template, { headers });
      console.log(`mensaje enviado a ${phone}`);
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
    
  return verificationNumber;
  
}

onRequesWithoutVariables= async (payload:any) => {
  console.log(payload)
}
onRequesFor1= async (payload:any) => {
  const {phone, texto}= payload
  
  try{
    const template:OneVariable={
      messaging_product: "whatsapp",
      to: phone,
      type: "template",
      template: {
        name: "unavariable",
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
      return response.data;
  }catch(error){
  console.log(error)
  }
  

}
onRequesFor2= async (payload:any) => {
  const {phone, texto, texto2}= payload
   
   try{
    const template:TwoVariable={
      messaging_product: "whatsapp",
      to: phone,
      type: "template",
      template: {
        name: "dosvariables",
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
      return response.data;
   }catch(error){
     console.log(error)
   }
  
}
onRequesFor3= async (payload:any) => {
  const {phone, texto, texto2, texto3}= payload
  try{
    const template:ThreeVariables={
      messaging_product: "whatsapp",
      to: phone,
      type: "template",
      template: {
        name: "tresvariables",
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
onRequesFor4= async (payload:any) => {
  const {phone, texto, texto2, texto3,texto4}= payload
  try{
    const template:FourVariable={
      messaging_product: "whatsapp",
      to: phone,
      type: "template",
      template: {
        name: "cuatrovariables",
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
      console.log("enviado a meta")
      return response.data;
   }catch(error){
     console.log(error)
   }
}
onRequesWithoutVariablesImage= async (payload:any) => {
  const {phone, mediaId}= payload
  
  try{
    const imageTemplate: NoVariableImage = {
      messaging_product: "whatsapp",
      to: phone,
      type: "template",
      template: {
        name: "sinvariableimagen",
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
  console.log("enviado a meta")
    return response.data;
  }catch(error){
    console.log(error)
  }
  
   
}
onRequesFor1Image= async (payload:any) => {
  const {phone, mediaId, texto}= payload
  
  
  try{
    const imageTemplate: OneVariableImage = {
      messaging_product: "whatsapp",
      to: phone,
      type: "template",
      template: {
        name: "unavariableimagen",
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
  console.log("enviado a meta")
    return response.data;
  }catch(error){
    console.log(error)
  }
  
}
onRequesFor2Image= async (payload:any) => {
  const {phone, mediaId, texto, texto2}= payload
 
  
  try{
    const imageTemplate: TwoVariableImage = {
      messaging_product: "whatsapp",
      to: phone,
      type: "template",
      template: {
        name: "dosvariablesimagen",
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
    console.log("enviado a meta")
    return response.data;
  }catch(error){
    console.log(error)
  }
    
}
onRequesFor3Image= async (payload:any) => {
  const {phone, mediaId, texto, texto2,texto3}= payload
  try{
    const imageTemplate: ThreeVariableImage = {
      messaging_product: "whatsapp",
      to: phone,
      type: "template",
      template: {
        name: "tresvariablesimagen",
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
  console.log("enviado a meta")
    return response.data;
  }catch(error){
    console.log(error)
  }
}
onRequesFor4Image= async (payload:any) => {
  const {phone, mediaId, texto, texto2,texto3,texto4}= payload
  try{
    const imageTemplate: FourVariableImage = {
      messaging_product: "whatsapp",
      to: phone,
      type: "template",
      template: {
        name: "cuatrovariablesimagen",
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
  console.log("enviado a meta")
    return response.data;
  }catch(error){
    console.log(error)
  }
   
}
onRequesWithoutVariablesDocument = async (payload:any) => {
  console.log(payload)
}
onSendText = async (id: any, message: string) => {
  const textTemplate: any = {
    messaging_product: "whatsapp",
    to: id,
    text: { body: `${message}` },
  };
  try {
    const response = await axios
      .post(urlSendMessage, textTemplate, { headers });

    return response.data;
  } catch (error:any) {
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
onSendAudio = async (payload:any) => {
  console.log(payload)
  //aun no se ha implementado
}
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
    console.log(response.data)
  return response.data;

  }catch(error:any){
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
onSendDoc = async (payload:any) => {
  const {to,mediaId}=payload
  const docTemplate: any = {
    "messaging_product": "whatsapp",
    "recipient_type": "individual",
    "to": to,
    "type": "document",
    "document": mediaId
  }
  try{
    const response = await axios
    .post(urlSendMessage, JSON.stringify(docTemplate), { headers });
    console.log(response.data)
  return response.data;
  }catch(error:any){
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

}

