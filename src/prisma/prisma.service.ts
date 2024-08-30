import { PrismaClient } from '@prisma/client';
import { envs } from '../config/envs';
import { IncomingWhatsappMessage } from '../domain/interfaces';

class PrismaService extends PrismaClient {
  constructor() {
    const dbHost = envs.DB_HOST;
    //const dbPort = envs.DB_PORT;
    const dbUser = envs.DB_USER;
    const dbPassword = envs.DB_PASSWORD;
    const database = envs.DATABASE;

    super( );

    this.init(); 
  }
  
   ///se cambiara los metodos 
  async OnmessageReceived(payload: IncomingWhatsappMessage) {
     const { object, entry } = payload;
     const { changes } = entry[0];
     const { value } = changes[0];
     const { messaging_product, metadata, contacts, messages } = value;
     const { profile } = contacts[0];
     const { text } = messages[0];
     const { body } = text;
     const { name } = profile;
     const { from } = messages[0];
     const { id } = messages[0];
     const { timestamp } = messages[0];
     const { wa_id } = contacts[0];
     
     
  }

  async OnmessageSent( ) {
    console.log('OnmessageSent');
  }

  async init() {
    try {
      await this.$connect();
      console.log(`Conexión a la base de datos establecida correctamente.`);
    } catch (error) {
      console.error('Error al conectar con la base de datos:', error);
    }
  }

  async destroy() {
    await this.$disconnect();
  }
}

const prismaService = new PrismaService();

process.on('SIGINT', async () => {
  await prismaService.destroy();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await prismaService.destroy();
  process.exit(0);
});

export default PrismaService;