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
  async onMessageReceived(payload: IncomingWhatsappMessage) {

    //TODO cambiar guardado de mensajes con nueva implementacion
    //TODO crear un return para ver el guardado de exito
    //TODO crear bloques de try catch para el guardado
    //TODO crear interfaces para los mensajes recibidos
    const response =payload;
   
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
  async onImageReceived(payload:any) {
    const {name, phone,identification,message,type,id}= payload;

    await prismaService.customer.upsert({
      where: { phone }, // Campo único para buscar el registro
      update: {
        name,
        phone,
        identification,
        attending: 0,
        lastActive: new Date(),
        wppStatus: "initial",
        detail: "",
        WhatsappImage: {
          create: {
            id,
            message,
            to:phone,
            status: "unread",
            direction: "outgoing",
            type,
            mediaId: "",
            attendant: 0,

          },
        },        
      },
      create: {
        name,
        phone,
        identification,
        attending: 0,
        lastActive: new Date(),
        wppStatus: "initial",
        detail: "",
        WhatsappImage: {
          create: {
            id,
            message,
            to: phone,
            status: "unread",
            direction: "outgoing",
            type,
            mediaId: "",
            attendant: 0,
          },
        },
      },
    });
  }
  async onAudioReceived(payload:any) {
    const {name, phone,identification,message,type,id}= payload;

    await prismaService.customer.upsert({
      where: { phone }, // Campo único para buscar el registro
      update: {
        name,
        phone,
        identification,
        attending: 0,
        lastActive: new Date(),
        wppStatus: "initial",
        detail: "",
        WhatsappAudio: {
          create: {
            id,
            message,
            to:phone,
            status: "unread",
            direction: "outgoing",
            type,
            mediaId: "",
            attendant: 0,
          },
        },        
      },
      create: {
        name,
        phone,
        identification,
        attending: 0,
        lastActive: new Date(),
        wppStatus: "initial",
        detail: "",
        WhatsappAudio: {
          create: {
            id,
            message,
            to: phone,
            status: "unread",
            direction: "outgoing",
            type,
            mediaId: "",
            attendant: 0,
          },
        },
      },
    });
  }

  async onVideoReceived(payload:any) {
    const {name, phone,identification,message,type,id}= payload;
    await prismaService.customer.upsert({
      where: { phone }, // Campo único para buscar el registro
      update: {
        name,
        phone,
        identification,
        attending: 0,
        lastActive: new Date(),
        wppStatus: "initial",
        detail: "",
        WhatsappVideo: {
          create: {
            id,
            message,
            to:phone,
            status: "unread",
            direction: "outgoing",
            type,
            mediaId: "",
            attendant: 0,
          },
        },        
      },
      create: {
        name,
        phone,
        identification,
        attending: 0,
        lastActive: new Date(),
        wppStatus: "initial",
        detail: "",
        WhatsappVideo: {
          create: {
            id,
            message,
            to: phone,
            status: "unread",
            direction: "outgoing",
            type,
            mediaId: "",
            attendant: 0,
          },
        },
      },
    });
  }
  async onDocumentReceived(payload:any) {
    const {name, phone,identification,message,type,id}= payload;
    await prismaService.customer.upsert({
      where: { phone }, // Campo único para buscar el registro
      update: {
        name,
        phone,
        identification,
        attending: 0,
        lastActive: new Date(),
        wppStatus: "initial",
        detail: "",
        WhatsappDoc: {
          create: {
            id,
            message,
            to:phone,
            status: "unread",
            direction: "outgoing",
            type,
            mediaId: "",
            attendant: 0,
          },
        },        
      },
      create: {
        name,
        phone,
        identification,
        attending: 0,
        lastActive: new Date(),
        wppStatus: "initial",
        detail: "",
        WhatsappDoc: {
          create: {
            id,
            message,
            to: phone,
            status: "unread",
            direction: "outgoing",
            type,
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
    const { id } = payload;

    try {
      const user = await prismaService.customer.findUnique({
        where: {
          phone: id,
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
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async onCreateUser( payload:any) {/*  se creara mejor logica aqui
    const newUser= await prismaService.customer.create({data:payload});
    return newUser*/
  }
  async onUpdateUser( payload:any) {
    const { id } = payload;
   
    if(!id){
      throw new Error('no se recibio el id');
    };
    const data : {email?:string,detail?:string}={}
    if(payload.email){
      data.email = payload.email
    }
    if (payload.detail) {
      data.detail = payload.detail
    }

    try{
      const user = await prismaService.customer.update({
        where: { phone: id },
        data: data
      });
      return user;
    }catch(error){
      throw new Error(`no se pudo actualizar el usuario ${id}`);
      
    }
    
    
  
  }

  async onResearchforSpecificMessages( payload:any) {

    const { id } = payload;
   

    //se deberia desfragmentar el id del payload
    


     try {
      //escojer que hacer con los mensajes no leidos
      
       const query = await prismaService.whatsappMessage.findMany({
         orderBy: { timestamp: 'asc' },
         where: { to: id },
         include: {
           customer: {
             select: { phone: true },
           },
         },
       });

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