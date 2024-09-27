import 'dotenv/config';
import { get } from 'env-var';
 

export const envs = {  

  PORT: get('PORT').required().asPortNumber(),
  DB_HOST: get('DB_HOST').asString(),
  //DB_PORT: get('DB_PORT').required().asPortNumber(),
  DB_USER: get('DB_USER').required().asString(),
  DB_PASSWORD: get('DB_PASSWORD').required().asString(),
  DATABASE: get('DATABASE').required().asString(),
  DATABASE_URL: get('DATABASE_URL').required().asString(),
  SHADOW_DATABASE_URL: get('SHADOW_DATABASE_URL').required().asString(),

  //relacionado a whatsapp
  Phone_Number_ID: get('Phone_Number_ID').required().asString(),
  Business_ID: get('Business_ID').required().asString(),
  //TODO este numero se debera cambiar de lugar en un futuro para que sea dinamico
  Recipient_Phone_Number: get('Recipient_Phone_Number').required().asString(),
  User_Access_Token: get('User_Access_Token').required().asString(),
  WABA_ID: get('WABA_ID').required().asString(),
  Version: get('Version').required().asString(),
  BOT_NUMBER: get('BOT_NUMBER').required().asString(),
}



