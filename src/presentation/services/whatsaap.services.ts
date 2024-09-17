import { UuuiAdapter } from "../../config/uuid.adapter";
import axios from "axios"
import{ WssService } from "../../notifications/wss.service";
import { PhoneNumbersDTO, WhatsappTemplateDto } from "../../domain/dto";
import {envs } from "../../config/envs";
import { bodyBienvenidoTemplate, headers, urlSendMessage } from "../../config/url/whatsappPostUrl";


//no olvidar que aqui tambien iran las notificaciones del websocket


export class WhatsaapService {
constructor(
  private readonly wssService = WssService.instance,
) {}

onRequestForPhones = async () => {
  try {
    const response = await axios.get<PhoneNumbersDTO>(
      `https://graph.facebook.com/${envs.Version}/${envs.Phone_Number_ID}/phone_numbers`,
      {
        headers: {
          Authorization: `Bearer ${envs.User_Access_Token}`,
        },
      }
    );

    const phoneData = response.data.data;
    console.log(phoneData);
    const formattedPhones = phoneData.map((phone) => ({
      name: phone.verified_name,
      number: phone.display_phone_number,
      id: phone.id,
    }));

    return JSON.stringify(formattedPhones);
  } catch (error) {
    if (error ) {
      throw `An error happened!\n${error}`;
    } else {
      throw 'An unexpected error occurred.';
    }
  }
};

onRequesForTemplates = async (): Promise<WhatsappTemplateDto[]> => {
  
  try {
    const response = await axios.get(
      `https://graph.facebook.com/${envs.Version}/${envs.WABA_ID}/message_templates?fields=name,components,status,category`,
      {
        headers: {
          Authorization: `Bearer ${envs.User_Access_Token}`,
        },
      },
    );

    return response.data.data as WhatsappTemplateDto[];
  } catch (error) {
    if (error ) {
      throw `An error happened!\n${error}`;
    } else {
      throw 'An unexpected error occurred.';
    }
  }
}

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

onSendImage = async (id: any, message: string) => {

  const imageTemplate: any = {
    "messaging_product": "whatsapp",
    "recipient_type": "individual",
    "to": "<WHATSAPP_USER_PHONE_NUMBER>",
    "type": "image",
    "image": {
      "id" : "<MEDIA_ID>", /* Only if using uploaded media */
      "link": "<MEDIA_URL>", /* Only if linking to your media */
      "caption": "<IMAGE_CAPTION_TEXT>"
    }
  }
  
console.log(id)


}

}