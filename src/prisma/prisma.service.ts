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
    const response =payload;
    //estudiar un nested create para crear un usuario nuevo y un nuevo mensaje 
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
     //crear la funcion que guarde en prisma de forma nidada el mensaje

     console.log(body);

     await prismaService.customer.upsert({
       where: { phone: from }, // Campo único para buscar el registro
       update: {
         name: name,
         phone: from,
         identification: from,
         attending: 0,
         lastActive: new Date(),
         wppStatus: "initial",
         detail: "",
         WhatsappMessage: {
           create: {
             id: id,
             message: body,
             to: from,
             status: "unread",
             direction: "outgoing",
             type: "text",
             mediaId: "",
             attendant: 0,
           },
         },
       },
       create: {
         name: name,
         phone: from,
         email: wa_id,
         identification: from,
         attending: 0,
         lastActive: new Date(),
         wppStatus: "initial",
         detail: "",
         WhatsappMessage: {
           create: {
             id: id,
             message: body,
             to: from,
             status: "unread",
             direction: "outgoing",
             type: "text",
             mediaId: "",
             attendant: 0,
           },
         },
       },
     });
     
  }

  async onRequestUsers( payload:any) {
    try {
      const customers = await prismaService.customer.findMany({
        orderBy: {
          lastActive: 'desc',
        },
        where: {
          attending: 0,
        },
        include: {
          WhatsappMessage: {
            take: 1,
            orderBy: {
              timestamp: 'desc',
            },
          },
        },
      });
      return customers;
    } catch (error) {
      console.log(error);
    }
  }

  async onSearchForUser( payload:any) {
    console.log('traera el usuario buscado por la base de datos');
  }

  async onCreateUser( payload:any) {
    console.log('creara el usuario en la base de datos y respondera con un json');
  }
  async onUpdateUser( payload:any) {
   
    console.log('actualizara el usuario en la base de datos y respondera con un json');

  }

  async onResearchforSpecificMessages( payload:any) {
    //se deberia desfragmentar el id del payload
    const customerId = payload;

    if (!customerId) {
     // this.logger.error('numero invalido del cliente');
      throw new Error('numero invalido  del cliente');
    }

    try {
      // marca mensajes leidos y habre chat
      await prismaService.whatsappMessage.updateMany({
        data: { status: 'read' },
        where: {
          customerId: customerId,
          status: { not: 'read' },
        },
      });

      // Busca los mensajes
      const query = await prismaService.whatsappMessage.findMany({
        orderBy: { timestamp: 'asc' },
        where: { customerId: customerId },
        include: {
          customer: {
            select: { phone: true },
          },
        },
      });

      // Transforma el query en los mensajes
      const messages = query.map((message) => ({
        ...message,
        from: message.customer.phone,
      }));

     
      return messages;
    } catch (error) {
      throw new Error('no pudo regresar ningun mensaje');
    }
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