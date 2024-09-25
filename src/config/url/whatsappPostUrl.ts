
import { envs } from "../envs";

export const urlSendMessage =`https://graph.facebook.com/${envs.Version}/${envs.Phone_Number_ID}/messages`
export const urlSendtemplate =`https://graph.facebook.com/${envs.Version}/${envs.Phone_Number_ID}/messages`
export const headers={
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${envs.User_Access_Token}`
  }
