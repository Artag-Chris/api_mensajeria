import { UuuiAdapter } from "../../config/uuid.adapter";
import axios, { AxiosError } from "axios"
import{ WssService } from "../../notifications/wss.service";
import { PhoneNumbersDTO, WhatsappTemplateDto } from "../../domain/dto";
import {envs } from "../../config/envs";
import { bodyBienvenidoTemplate, headers, urlSendMessage } from "../../config/url/whatsappPostUrl";
import { PhonesResponse } from "../../domain/interfaces/getPhonesResponse";
import { cleanPhoneNumber } from "../../domain/functions/formatedNumber";


//no olvidar que aqui tambien iran las notificaciones del websocket


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

onRequesWithoutVariables= async (payload:any) => {
  console.log(payload)
}
onRequesFor1= async (payload:any) => {
  //se desfragmentara la informacion aqui se pedira el nombre de la plantilla
  //el numero a donde se enviara la plantilla
  //si tiene un nombre o un campo variable


console.log(payload)
}
onRequesFor2= async (payload:any) => {
  //se desfragmentara la informacion aqui se pedira el Nombre de la plantilla
  //el numero a donde se enviara la plantilla
  //si tiene un Nombre o un campo variable

console.log(payload)
}
onRequesFor3= async (payload:any) => {
  //se desfragmentara la informacion aqui se pedira el Nombre de la plantilla
  //el numero a donde se enviara la plantilla
  //si tiene un Nombre o un campo variable
console.log(payload)
}
onRequesFor4= async (payload:any) => {
  console.log(payload)
}
onRequesWithoutVariablesImage= async (payload:any) => {
  console.log(payload)
}
onRequesFor1Image= async (payload:any) => {
  console.log(payload)
}
onRequesFor2Image= async (payload:any) => {
  console.log(payload)
}
onRequesFor3Image= async (payload:any) => {
  console.log(payload)
}
onRequesFor4Image= async (payload:any) => {
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
     // console.log(message)
    return response.data;
  } catch (error:any) {
    if (error.response) {
      // The request was made and the server responded with a status code that falls out of the range of 2xx
      console.error(`Error al enviar el mensaje. Código de estado: ${error.response.status}`);
      console.error(`Respuesta de error: ${error.response.data}`);
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

onSendImage = async (payload:any) => {

  
  const {to,mediaId,phone,type}=payload

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
      // The request was made and the server responded with a status code that falls out of the range of 2xx
      console.error(`Error al enviar el mensaje. Código de estado: ${error.response.status}`);
      console.error(`Respuesta de error: ${error.response}`);
    } else if (error.request) {
      // The request was made but no response was received
      console.error(`Error al enviar el mensaje. No se recibió respuesta.`);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error(`Error al enviar el mensaje: ${error.message}`);
    }
}

 }
onSendAudio = async (payload:any) => {
  console.log(payload)
  //aun no se ha implementado
 }

 onSendVideo = async (payload:any) => {

  const {to,mediaId,phone,type}=payload

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
      // The request was made and the server responded with a status code that falls out of the range of 2xx
      console.error(`Error al enviar el mensaje. Código de estado: ${error.response.status}`);
      console.error(`Respuesta de error: ${error.response}`);
    } else if (error.request) {
      // The request was made but no response was received
      console.error(`Error al enviar el mensaje. No se recibió respuesta.`);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error(`Error al enviar el mensaje: ${error.message}`);
    }
  }
 }

 onSendDoc = async (payload:any) => {

  const {to,mediaId,phone,type}=payload

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
      // The request was made and the server responded with a status code that falls out of the range of 2xx
      console.error(`Error al enviar el mensaje. Código de estado: ${error.response.status}`);
      console.error(`Respuesta de error: ${error.response}`);
    } else if (error.request) {
      // The request was made but no response was received
      console.error(`Error al enviar el mensaje. No se recibió respuesta.`);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error(`Error al enviar el mensaje: ${error.message}`);
    }
  }
}



}