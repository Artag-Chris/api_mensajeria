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
}



