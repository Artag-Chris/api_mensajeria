
import { envs } from "../envs";

//export const urlSendMessage =`https://graph.facebook.com/${envs.Version}/${envs.Phone_Number_ID}/messages`
export const urlSendMessage =`https://graph.facebook.com/${envs.Version}/${envs.WABA_ID}/messages`
export const urlSendtemplate =`https://graph.facebook.com/${envs.Version}/${envs.Phone_Number_ID}/messages`
export const headers={
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${envs.User_Access_Token}`
  }

export const bodyBienvenidoTemplate={
    messaging_product: 'whatsapp',
    to: envs.Recipient_Phone_Number,
    type: 'template',
    template: {
      name: 'bienvenido',
      language: {
        code: 'es_MX',
      },
    },
  }