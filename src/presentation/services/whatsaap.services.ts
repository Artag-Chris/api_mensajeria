import { UuuiAdapter } from "../../config/uuid.adapter";
import axios from "axios"
import{ WssService } from "../../notifications/wss.service";
import { PhoneNumbersDTO, WhatsappTemplateDto } from "../../domain/dto";
import {envs } from "../../config/envs";
import { bodyBienvenidoTemplate, headers, urlSendMessage } from "../../config/url/whatsappPostUrl";
import { textTemplate } from "../../domain/interfaces";

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
  const WelcomeTemplate: textTemplate = {
    messaging_product: "whatsapp",
    to: id,
    type: 'template',
    template: template,
  };

  try {
    const response = await axios
      .post(urlSendMessage, WelcomeTemplate, { headers });
      console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(`error al enviar el mensaje ${error}`);
  }
}

}
