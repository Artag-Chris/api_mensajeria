import axios from "axios"
import { envs } from "../../config/envs";
import { headers, urlSendMessage, urlSendtemplate } from "../../config/url/whatsappPostUrl";
import { PhonesResponse } from "../../domain/interfaces/getPhonesResponse";
import { cleanPhoneNumber } from "../../domain/functions/formatedNumber";
import PrismaService from "../../prisma/prisma.service";
import { reemplazarValores } from "../../domain/functions/reemplazarValores";
import logger from "../../config/adapters/winstonAdapter";
import {
  FourVariable, FourVariableDocument,
  FourVariableImage, FourVariableVideo, NoVariableDocument,
  NoVariableImage, NoVariableVideo, OneVariable,
  OneVariableDocument, OneVariableVideo,
  ThreeVariableDocument, ThreeVariableImage,
  ThreeVariables, ThreeVariableVideo, TwoVariable,
  TwoVariableDocument, OneVariableImage,
  TwoVariableImage, TwoVariableVideo
} from "../../domain/interfaces";



export class WhatsaapService {
  /********************************************************************** 
   servicio de whatsapp relacionado con todo lo referente a mensajes de whatsapp
   algunos metodos usan la clase de prisma para guardar la informacion
   especifica de solo plantillas con el fin de que los agentes sepan 
   que plantillas les han enviado a los usuarios
  ***********************************************************************/
  constructor(
    private readonly prismaService = new PrismaService(),
  ) { }


  onRequestForPhones = async () => {
    try {
      const response = await axios.get(`https://graph.facebook.com/${envs.Version}/${envs.Phone_Number_ID}`, {
        headers: {
          Authorization: `Bearer ${envs.User_Access_Token}`,
        },
      });
      const phoneData: PhonesResponse = response.data;
      const { display_phone_number } = phoneData;
      const phoneToSend = new Array({
        "id": 1,
        "number": cleanPhoneNumber(display_phone_number)
      });
      return JSON.stringify(phoneToSend);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        logger.error('error en busqueda de telefonos', error.response);
      }
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
      if (axios.isAxiosError(error)) {
        logger.error('error en busqueda de plantillas', error.response);
      }
    }

  }
  //envio de plantillas

  onSendVerification = async (phone: any, codigo: number): Promise<any> => {

    const template: any = {
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
    try {
      const response = await axios
        .post(urlSendMessage, template, { headers });
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        logger.error('en envio de plantilla de verificacion', error.response);
      }
    }
    return "ok";
  }
  onSendTemplateVerification = async (phone: any, numero: any): Promise<any> => {
    const payload = {
      "destination": phone,
      "template": "codigo_de_recuperacion_de_contrasea",
      "params": [
        numero
      ],
      "source": "158743457332682",
      "sender": 0
    }
    return JSON.stringify(payload)
  }
  //plantillas de 0 variables de texto
  onRequesWithoutVariables = async (payload: any) => {
    //Todo: podriamos usar un dto
    const { phone, template, selectedTemplate } = payload
    const plantillabody = selectedTemplate.components[0].text
    const id = (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).toString();
    const Message: any = {
      id,
      message: plantillabody,
      to: `57${phone}`,
      status: "delivered",
      direction: "outgoing",
      type: "text",
      mediaId: "",
      attendant: 0,

    }
    const rawTemplate = {
      name: "Bot",
      phone: envs.BOT_NUMBER,
      attendding: 0,
      lastActive: new Date(),
      WhatsappMessage: [Message]
    }
    const plantilla = template
    try {
      const payload = {
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
      this.prismaService.onFrontMessageReceived(rawTemplate);
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        logger.error('en sinvariables plantilla', error.response);
      }
    }
  }
  //1 variable texto
  onRequesFor1 = async (payload: any) => {
    //Todo: podriamos usar un dto
    const { phone, texto, template, selectedTemplate } = payload
    const plantillabody = selectedTemplate.components[0].text
    const nuevoTexto = plantillabody.replace(/\{\{([^}]+)\}\}/g, () => {
      return texto;
    });
    const id = (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).toString();
    const Message: any = {
      id,
      message: nuevoTexto,
      to: `57${phone}`,
      status: "delivered",
      direction: "outgoing",
      type: "text",
      mediaId: "",
      attendant: 0,
    }
    const rawTemplate = {
      name: "Bot",
      phone: envs.BOT_NUMBER,
      attendding: 0,
      lastActive: new Date(),
      WhatsappMessage: [Message]
    }
    const plantilla = template
    try {
      const template: OneVariable = {
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
    } catch (error) {
      if (axios.isAxiosError(error)) {
        logger.error('error en una unavariable plantilla de texto', error.response);
      }
    }


  }
  //2 variables texto
  onRequesFor2 = async (payload: any) => {
    //Todo: podriamos usar un dto
    const { phone, texto, texto2, template, selectedTemplate } = payload
    const plantillabody = selectedTemplate.components[0].text;
    const id = (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).toString();
    const valores: { [key: string]: string } = {
      1: texto,
      2: texto2,
    };
    const nuevoTexto: string = reemplazarValores(plantillabody, valores);
    const plantilla = template
    const Message: any = {
      id,
      message: nuevoTexto,
      to: `57${phone}`,
      status: "delivered",
      direction: "outgoing",
      type: "text",
      mediaId: "",
      attendant: 0,
    }
    const rawTemplate = {
      name: "Bot",
      phone: envs.BOT_NUMBER,
      attendding: 0,
      lastActive: new Date(),
      WhatsappMessage: [Message]
    }
    try {
      const template: TwoVariable = {
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
    } catch (error) {
      if (axios.isAxiosError(error)) {
        logger.error('error en dos variables plantilla de texto', error.response);
      }
    }

  }
  //3 variables texto
  onRequesFor3 = async (payload: any) => {
    //Todo: podriamos usar un dto
    const { phone, texto, texto2, texto3, template, selectedTemplate } = payload
    const plantillabody = selectedTemplate.components[0].text;
    const id = (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).toString();
    const valores: { [key: string]: string } = {
      1: texto,
      2: texto2,
      3: texto3,
    };
    const nuevoTexto: string = reemplazarValores(plantillabody, valores);
    const Message: any = {
      id,
      message: nuevoTexto,
      to: `57${phone}`,
      status: "delivered",
      direction: "outgoing",
      type: "text",
      mediaId: "",
      attendant: 0,

    }
    const rawTemplate = {
      name: "Bot",
      phone: envs.BOT_NUMBER,
      attendding: 0,
      lastActive: new Date(),
      WhatsappMessage: [Message]
    }
    const plantilla = template
    try {
      const template: ThreeVariables = {
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
    } catch (error) {
      if (axios.isAxiosError(error)) {
        logger.error('error en tres variables plantilla de texto', error.response);
      }
    }
  }
  //4 variables texto
  onRequesFor4 = async (payload: any) => {
    const { phone, texto, texto2, texto3, texto4, template, selectedTemplate } = payload
    const plantillabody = selectedTemplate.components[0].text;
    const id = (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).toString();
    const valores: { [key: string]: string } = {
      1: texto,
      2: texto2,
      3: texto3,
      4: texto4,
    };
    const nuevoTexto: string = reemplazarValores(plantillabody, valores);
    const Message: any = {
      id,
      message: nuevoTexto,
      to: `57${phone}`,
      status: "delivered",
      direction: "outgoing",
      type: "text",
      mediaId: "",
      attendant: 0,

    }
    const rawTemplate = {
      name: "Bot",
      phone: envs.BOT_NUMBER,
      attendding: 0,
      lastActive: new Date(),
      WhatsappMessage: [Message]
    }
    const plantilla = template
    try {
      const template: FourVariable = {
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
    } catch (error) {
      if (axios.isAxiosError(error)) {
        logger.error('error en cuatro variables plantilla de texto', error.response);
      }
    }
  }
  //sin variables imagenes
  onRequesWithoutVariablesImage = async (payload: any) => {
    //Todo: podriamos usar un dto
    const { phone, mediaId, template, selectedTemplate } = payload
    const plantillabody = selectedTemplate.components[0].text
    const id = (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).toString();

    const Message: any = {
      id,
      message: plantillabody,
      to: `57${phone}`,
      status: "delivered",
      direction: "outgoing",
      type: "text",
      mediaId: "",
      attendant: 0,

    }
    const rawTemplate = {
      name: "Bot",
      phone: envs.BOT_NUMBER,
      attendding: 0,
      lastActive: new Date(),
      WhatsappMessage: [Message]
    }
    const plantilla = template

    try {
      const imageTemplate: NoVariableImage = {
        messaging_product: "whatsapp",
        to: phone,
        type: "template",
        template: {
          name: plantilla,
          language: {
            code: "es_MX",
          }, "components": [
            {
              type: "header",
              "parameters": [
                {
                  type: "image",
                  "image": {
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
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        logger.error('error en sin variables plantilla de imagen', error.response);
      }
    }
  }
  //1 variable imagen
  onRequesFor1Image = async (payload: any) => {
    //Todo: podriamos usar un dto
    const { phone, mediaId, texto, template, selectedTemplate } = payload
    const plantillabody = selectedTemplate.components[0].text;
    const id = (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).toString();
    const valores: { [key: string]: string } = {
      1: texto,
    };
    const nuevoTexto: string = reemplazarValores(plantillabody, valores);
    const Message: any = {
      id,
      message: nuevoTexto,
      to: `57${phone}`,
      status: "delivered",
      direction: "outgoing",
      type: "text",
      mediaId: "",
      attendant: 0,

    }
    const rawTemplate = {
      name: "Bot",
      phone: envs.BOT_NUMBER,
      attendding: 0,
      lastActive: new Date(),
      WhatsappMessage: [Message]
    }
    const plantilla = template

    try {
      const imageTemplate: OneVariableImage = {
        messaging_product: "whatsapp",
        to: phone,
        type: "template",
        template: {
          name: plantilla,
          language: {
            code: "es_MX",
          }, "components": [
            {
              type: "header",
              "parameters": [
                {
                  type: "image",
                  "image": {
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
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        logger.error('error en una variable plantilla de imagen', error.response);
      }
    }
  }
  //2 variables imagen
  onRequesFor2Image = async (payload: any) => {
    //Todo: podriamos usar un dto
    const { phone, mediaId, texto, texto2, template, selectedTemplate } = payload;
    const plantillabody = selectedTemplate.components[0].text;
    const id = (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).toString();
    const valores: { [key: string]: string } = {
      1: texto,
      2: texto2,
    };
    const nuevoTexto: string = reemplazarValores(plantillabody, valores);
    const Message: any = {
      id,
      message: nuevoTexto,
      to: `57${phone}`,
      status: "delivered",
      direction: "outgoing",
      type: "text",
      mediaId: "",
      attendant: 0,

    }
    const rawTemplate = {
      name: "Bot",
      phone: envs.BOT_NUMBER,
      attendding: 0,
      lastActive: new Date(),
      WhatsappMessage: [Message]
    }
    const plantilla = template

    try {
      const imageTemplate: TwoVariableImage = {
        messaging_product: "whatsapp",
        to: phone,
        type: "template",
        template: {
          name: plantilla,
          language: {
            code: "es_MX",
          }, "components": [
            {
              type: "header",
              "parameters": [
                {
                  type: "image",
                  "image": {
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
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        logger.error('error en dos variables plantilla de imagen', error.response);
      }
    }

  }
  //3 variables imagen
  onRequesFor3Image = async (payload: any) => {
    //Todo: podriamos usar un dto
    const { phone, mediaId, texto, texto2, texto3, template, selectedTemplate } = payload
    const plantillabody = selectedTemplate.components[0].text;
    const id = (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).toString();
    const valores: { [key: string]: string } = {
      1: texto,
      2: texto2,
      3: texto3,
    };
    const nuevoTexto: string = reemplazarValores(plantillabody, valores);
    const Message: any = {
      id,
      message: nuevoTexto,
      to: `57${phone}`,
      status: "delivered",
      direction: "outgoing",
      type: "text",
      mediaId: "",
      attendant: 0,

    }
    const rawTemplate = {
      name: "Bot",
      phone: envs.BOT_NUMBER,
      attendding: 0,
      lastActive: new Date(),
      WhatsappMessage: [Message]
    }
    const plantilla = template
    try {
      const imageTemplate: ThreeVariableImage = {
        messaging_product: "whatsapp",
        to: phone,
        type: "template",
        template: {
          name: plantilla,
          language: {
            code: "es_MX",
          }, "components": [
            {
              type: "header",
              "parameters": [
                {
                  type: "image",
                  "image": {
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
    } catch (error) {
      if (axios.isAxiosError(error)) {
        logger.error('error en tres variables plantilla de imagen', error.response);
      }
    }
  }
  //4 variables imagen
  onRequesFor4Image = async (payload: any) => {
    //Todo: podriamos usar un dto
    const { phone, mediaId, texto, texto2, texto3, texto4, template, selectedTemplate } = payload
    const plantillabody = selectedTemplate.components[0].text;
    const id = (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).toString();
    const valores: { [key: string]: string } = {
      1: texto,
      2: texto2,
      3: texto3,
      4: texto4
    };
    const nuevoTexto: string = reemplazarValores(plantillabody, valores);
    const Message: any = {
      id,
      message: nuevoTexto,
      to: `57${phone}`,
      status: "delivered",
      direction: "outgoing",
      type: "text",
      mediaId: "",
      attendant: 0,

    }
    const rawTemplate = {
      name: "Bot",
      phone: envs.BOT_NUMBER,
      attendding: 0,
      lastActive: new Date(),
      WhatsappMessage: [Message]
    }
    const plantilla = template
    try {
      const imageTemplate: FourVariableImage = {
        messaging_product: "whatsapp",
        to: phone,
        type: "template",
        template: {
          name: plantilla,
          language: {
            code: "es_MX",
          }, "components": [
            {
              type: "header",
              "parameters": [
                {
                  type: "image",
                  "image": {
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
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        logger.error('error en cuatro variables plantilla de imagen', error.response);
      }
    }

  }
  /*
  tendra pioridad las plantillas de documentos
  */

  //sin variables documento
  onRequesWithoutVariablesDocument = async (payload: any) => {
    //Todo: podriamos usar un dto
    const { phone, mediaId, template, selectedTemplate } = payload
    const plantillabody = selectedTemplate.components[0].text
    const id = (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).toString();

    const Message: any = {
      id,
      message: plantillabody,
      to: `57${phone}`,
      status: "delivered",
      direction: "outgoing",
      type: "text",
      mediaId: "",
      attendant: 0,

    }
    const rawTemplate = {
      name: "Bot",
      phone: envs.BOT_NUMBER,
      attendding: 0,
      lastActive: new Date(),
      WhatsappMessage: [Message]
    }
    const plantilla = template

    try {
      const documentTemplate: NoVariableDocument = {
        messaging_product: "whatsapp",
        to: phone,
        type: "template",
        template: {
          name: plantilla,
          language: {
            code: "es_MX",
          }, "components": [
            {
              type: "header",
              "parameters": [
                {
                  type: "document",
                  "document": {
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
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        logger.error('error en sin variables plantilla de documento', error.response);
      }
    }
  }
  //1 variable documento
  onRequesFor1Document = async (payload: any) => {
    //Todo: podriamos usar un dto 
    //Todo: no guarda los mensajes con documentos en header
    const { phone, mediaId, texto, template, selectedTemplate } = payload
    const plantillabody = selectedTemplate.components[0].text;
    const id = (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).toString();
    const valores: { [key: string]: string } = {
      1: texto,
    };
    // const nuevoTexto: string = reemplazarValores(plantillabody, valores);
    const Message: any = {
      id,
      //  message: nuevoTexto,
      message: plantillabody,
      to: `57${phone}`,
      status: "delivered",
      direction: "outgoing",
      type: "text",
      mediaId: "",
      attendant: 0,

    }
    const rawTemplate = {
      name: "Bot",
      phone: envs.BOT_NUMBER,
      attendding: 0,
      lastActive: new Date(),
      WhatsappMessage: [Message]
    }
    const plantilla = template

    try {
      const documentTemplate: OneVariableDocument = {
        messaging_product: "whatsapp",
        to: phone,
        type: "template",
        template: {
          name: plantilla,
          language: {
            code: "es_MX",
          }, "components": [
            {
              type: "header",
              "parameters": [
                {
                  type: "document",
                  "document": {
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
      this.prismaService.onFrontMessageReceived(rawTemplate);

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        logger.error('error en una variables plantilla de documento', error.response);
      }
    }
  }
  //2 variables documento
  onRequesFor2Document = async (payload: any) => {
    //Todo: podriamos usar un dto
    const { phone, mediaId, texto, texto2, template, selectedTemplate } = payload
    const plantillabody = selectedTemplate.components[0].text;
    const id = (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).toString();
    const valores: { [key: string]: string } = {
      1: texto,
      2: texto2,
    };
    const nuevoTexto: string = reemplazarValores(plantillabody, valores);
    const Message: any = {
      id,
      message: nuevoTexto,
      to: `57${phone}`,
      status: "delivered",
      direction: "outgoing",
      type: "text",
      mediaId: "",
      attendant: 0,

    }
    const rawTemplate = {
      name: "Bot",
      phone: envs.BOT_NUMBER,
      attendding: 0,
      lastActive: new Date(),
      WhatsappMessage: [Message]
    }
    const plantilla = template

    try {
      const documentTemplate: TwoVariableDocument = {
        messaging_product: "whatsapp",
        to: phone,
        type: "template",
        template: {
          name: plantilla,
          language: {
            code: "es_MX",
          }, "components": [
            {
              type: "header",
              "parameters": [
                {
                  type: "document",
                  "document": {
                    "link": mediaId
                    , "filename": "Documento.pdf"
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
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        logger.error('error en 2 variables plantilla de documento', error.response);
      }
    }
  }
  //3 variables documento
  onRequesFor3Document = async (payload: any) => {
    //Todo: podriamos usar un dto
    const { phone, mediaId, texto, texto2, texto3, template, selectedTemplate } = payload
    const plantillabody = selectedTemplate.components[0].text;
    const id = (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).toString();
    const valores: { [key: string]: string } = {
      1: texto,
      2: texto2,
      3: texto3,
    };
    const nuevoTexto: string = reemplazarValores(plantillabody, valores);
    const Message: any = {
      id,
      message: nuevoTexto,
      to: `57${phone}`,
      status: "delivered",
      direction: "outgoing",
      type: "text",
      mediaId: "",
      attendant: 0,

    }
    const rawTemplate = {
      name: "Bot",
      phone: envs.BOT_NUMBER,
      attendding: 0,
      lastActive: new Date(),
      WhatsappMessage: [Message]
    }
    const plantilla = template
    try {
      const documentTemplate: ThreeVariableDocument = {
        messaging_product: "whatsapp",
        to: phone,
        type: "template",
        template: {
          name: plantilla,
          language: {
            code: "es_MX",
          }, "components": [
            {
              type: "header",
              "parameters": [
                {
                  type: "document",
                  "document": {
                    "link": mediaId
                    , "filename": "Documento.pdf"
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
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        logger.error('error en 3 variables plantilla de documento', error.response);
      }
    }
  }
  //4 variables documento
  onRequesFor4Document = async (payload: any) => {
    //Todo: podriamos usar un dto
    const { phone, mediaId, texto, texto2, texto3, texto4, template, selectedTemplate } = payload
    const plantillabody = selectedTemplate.components[0].text;
    const id = (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).toString();
    const valores: { [key: string]: string } = {
      1: texto,
      2: texto2,
      3: texto3,
      4: texto4,
    };
    const nuevoTexto: string = reemplazarValores(plantillabody, valores);
    const Message: any = {
      id,
      message: nuevoTexto,
      to: `57${phone}`,
      status: "delivered",
      direction: "outgoing",
      type: "text",
      mediaId: "",
      attendant: 0,

    }
    const rawTemplate = {
      name: "Bot",
      phone: envs.BOT_NUMBER,
      attendding: 0,
      lastActive: new Date(),
      WhatsappMessage: [Message]
    }
    const plantilla = template
    try {
      const documentTemplate: FourVariableDocument = {
        messaging_product: "whatsapp",
        to: phone,
        type: "template",
        template: {
          name: plantilla,
          language: {
            code: "es_MX",
          }, "components": [
            {
              type: "header",
              "parameters": [
                {
                  type: "document",
                  "document": {
                    "link": mediaId
                    , "filename": "Documento.pdf"
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
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        logger.error('error en 4 variables documento', error.response);
      }
    }
  }
  //sin variables video
  onRequesWithoutVariablesVideo = async (payload: any) => {
    //Todo: podriamos usar un dto
    const { phone, mediaId, template, selectedTemplate } = payload
    const plantillabody = selectedTemplate.components[0].text
    const id = (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).toString();

    const Message: any = {
      id,
      message: plantillabody,
      to: `57${phone}`,
      status: "delivered",
      direction: "outgoing",
      type: "text",
      mediaId: "",
      attendant: 0,

    }
    const rawTemplate = {
      name: "Bot",
      phone: envs.BOT_NUMBER,
      attendding: 0,
      lastActive: new Date(),
      WhatsappMessage: [Message]
    }
    const plantilla = template
    try {
      const videoTemplate: NoVariableVideo = {
        messaging_product: "whatsapp",
        to: phone,
        type: "template",
        template: {
          name: plantilla,
          language: {
            code: "es_MX",
          }, "components": [
            {
              type: "header",
              "parameters": [
                {
                  type: "video",
                  "video": {
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
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        logger.error('error en sin variables video', error.response);
      }
    }

  }
  //1 variable video
  onRequesFor1Video = async (payload: any) => {
    //Todo: podriamos usar un dto
    //no se guardara los videos del header
    const { phone, mediaId, texto, template, selectedTemplate } = payload
    const plantillabody = selectedTemplate.components[0].text
    const nuevoTexto = plantillabody.replace(/\{\{([^}]+)\}\}/g, () => {
      return texto;
    });
    const id = (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).toString();
    const Message: any = {
      id,
      message: nuevoTexto,
      to: `57${phone}`,
      status: "delivered",
      direction: "outgoing",
      type: "text",
      mediaId: "",
      attendant: 0,
    }
    const rawTemplate = {
      name: "Bot",
      phone: envs.BOT_NUMBER,
      attendding: 0,
      lastActive: new Date(),
      WhatsappMessage: [Message]
    }
    const plantilla = template

    try {
      const videoTemplate: OneVariableVideo = {
        messaging_product: "whatsapp",
        to: phone,
        type: "template",
        template: {
          name: plantilla,
          language: {
            code: "es_MX",
          }, "components": [
            {
              type: "header",
              "parameters": [
                {
                  type: "video",
                  "video": {
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
    } catch (error) {
      if (axios.isAxiosError(error)) {
        logger.error('error en 1 variable video', error.response);
      }
    }
  }
  //2 variables video
  onRequesFor2Video = async (payload: any) => {
    //Todo: podriamos usar un dto
    const { phone, mediaId, texto, texto2, template, selectedTemplate } = payload
    const plantillabody = selectedTemplate.components[0].text;
    const id = (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).toString();
    const valores: { [key: string]: string } = {
      1: texto,
      2: texto2,
    };
    const nuevoTexto: string = reemplazarValores(plantillabody, valores);
    const Message: any = {
      id,
      message: nuevoTexto,
      to: `57${phone}`,
      status: "delivered",
      direction: "outgoing",
      type: "text",
      mediaId: "",
      attendant: 0,

    }
    const rawTemplate = {
      name: "Bot",
      phone: envs.BOT_NUMBER,
      attendding: 0,
      lastActive: new Date(),
      WhatsappMessage: [Message]
    }
    const plantilla = template
    try {
      const videoTemplate: TwoVariableVideo = {
        messaging_product: "whatsapp",
        to: phone,
        type: "template",
        template: {
          name: plantilla,
          language: {
            code: "es_MX",
          }, "components": [
            {
              type: "header",
              "parameters": [
                {
                  type: "video",
                  "video": {
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
    } catch (error) {
      if (axios.isAxiosError(error)) {
        logger.error('error en 2 variable video', error.response);
      }
    }
  }
  //3 variables video
  onRequesFor3Video = async (payload: any) => {
    const { phone, mediaId, texto, texto2, texto3, template, selectedTemplate } = payload
    const plantillabody = selectedTemplate.components[0].text;
    const id = (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).toString();
    const valores: { [key: string]: string } = {
      1: texto,
      2: texto2,
      3: texto3,
    };
    const nuevoTexto: string = reemplazarValores(plantillabody, valores);
    const Message: any = {
      id,
      message: nuevoTexto,
      to: `57${phone}`,
      status: "delivered",
      direction: "outgoing",
      type: "text",
      mediaId: "",
      attendant: 0,

    }
    const rawTemplate = {
      name: "Bot",
      phone: envs.BOT_NUMBER,
      attendding: 0,
      lastActive: new Date(),
      WhatsappMessage: [Message]
    }
    const plantilla = template
    try {
      const videoTemplate: ThreeVariableVideo = {
        messaging_product: "whatsapp",
        to: phone,
        type: "template",
        template: {
          name: plantilla,
          language: {
            code: "es_MX",
          }, "components": [
            {
              type: "header",
              "parameters": [
                {
                  type: "video",
                  "video": {
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
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        logger.error('error en 3 variables video', error.response);
      }
    }
  }
  //4 variables video
  onRequesFor4Video = async (payload: any) => {
    //Todo: podriamos usar un dto
    const { phone, mediaId, texto, texto2, texto3, texto4, template, selectedTemplate } = payload
    const plantillabody = selectedTemplate.components[0].text;
    const id = (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).toString();
    const valores: { [key: string]: string } = {
      1: texto,
      2: texto2,
      3: texto3,
      4: texto4
    };
    const nuevoTexto: string = reemplazarValores(plantillabody, valores);
    const Message: any = {
      id,
      message: nuevoTexto,
      to: `57${phone}`,
      status: "delivered",
      direction: "outgoing",
      type: "text",
      mediaId: "",
      attendant: 0,

    }
    const rawTemplate = {
      name: "Bot",
      phone: envs.BOT_NUMBER,
      attendding: 0,
      lastActive: new Date(),
      WhatsappMessage: [Message]
    }
    const plantilla = template

    try {
      const videoTemplate: FourVariableVideo = {
        messaging_product: "whatsapp",
        to: phone,
        type: "template",
        template: {
          name: plantilla,
          language: {
            code: "es_MX",
          }, "components": [
            {
              type: "header",
              "parameters": [
                {
                  type: "video",
                  "video": {
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
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        logger.error('error en 4 variables video', error.response);
      }
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
      const response = await axios
        .post(urlSendMessage, textTemplate, { headers });
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        logger.error('error en onSendText', error.response);
      }
    }
    return "ok";
  }
  //enviamos mensajes de imagenes
  onSendImage = async (payload: any) => {
    const { to, mediaId } = payload
    const imageTemplate: any = {
      "messaging_product": "whatsapp",
      "recipient_type": "individual",
      "to": to,
      "type": "image",
      "image": mediaId
    }
    try {
      const response = await axios
        .post(urlSendMessage, JSON.stringify(imageTemplate), { headers });
      return response.data;

    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        logger.error('error en onSendImage', error.response);
      }
    }

  }
  //no implementado
  onSendAudio = async (payload: any) => {
    console.log(payload)
    //aun no se ha implementado
  }
  //cuando mandamos un video por url
  onSendVideo = async (payload: any) => {
    const { to, mediaId } = payload
    const videoTemplate: any = {
      "messaging_product": "whatsapp",
      "recipient_type": "individual",
      "to": to,
      "type": "video",
      "video": mediaId
    }

    try {
      const response = await axios
        .post(urlSendMessage, JSON.stringify(videoTemplate), { headers });
      return response.data;

    } catch (error: any) {
      //logger
      if (axios.isAxiosError(error)) {
        logger.error('error en onSendVideo', error.response);
      }
    }
  }
  //aqui enviamos el documento al cliente
  onSendDoc = async (payload: any) => {
    const { to, mediaId } = payload;
    console.log(payload);
  
    if (!mediaId) {
      return { error: 'Media ID no proporcionado' };
    }
  
    const docTemplate: any = {
      "messaging_product": "whatsapp",
      "recipient_type": "individual",
      "to": to,
      "type": "document",
      "document": mediaId
    }
  
    try {
      const response = await axios
        .post(urlSendMessage, JSON.stringify(docTemplate), { headers });
      console.log(response.data)
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.log(error.response);
        logger.error('error en busqueda de documento subido', error.response);
      }
      return { error: 'Error al enviar el mensaje' };
    }
  }
}

