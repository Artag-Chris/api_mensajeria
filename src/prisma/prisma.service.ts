import { PrismaClient } from '@prisma/client';
import { envs } from '../config/envs';

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
  async onMessageReceived(payload: any) {

    const {name,phone,type,id,body,display_phone_number} =payload;
  
    //console.log(`onMessageReceived: ${name} ${phone} ${type} ${id} ${body} ${display_phone_number}`);
     await prismaService.customer.upsert({
       where: { phone}, // Campo único para buscar el registro
       update: {
         name,
         phone,
         attending: 0,
         lastActive: new Date(),
         wppStatus: "initial",
         detail: "",
         identification: phone,
         WhatsappMessage: {
           create: {
             id: id,
             message: body,
             to:display_phone_number,
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
         attending: 0,
         lastActive: new Date(),
         wppStatus: "initial",
         detail: "",
        identification: phone ,
         WhatsappMessage: {
           create: {
             id,
             message: body,
             to: display_phone_number,
             status: "unread",
             direction: "outgoing",
             type,
             mediaId: "",
             attendant: 0,
           },
         },
       },
     });
     
    return 'Texto recibido';
  }

  async onFrontMessageReceived(payload: any) {

    const {name,phone,identification,attending, lastActive,wppStatus,
      detail,WhatsappMessage} =payload;
      const {id,message,to,status,direction,type,mediaId,attendant}=WhatsappMessage[0];


    await prismaService.customer.upsert({
      where: { phone}, // Campo único para buscar el registro
      update: {
        name,
        phone,
        attending,
        lastActive,
        wppStatus:'attended',
        detail: "",
        identification,
        WhatsappMessage: {
          create: {
            id,
            message,
            to,
            status,
            direction,
            type,
            mediaId: "",
            attendant,
          },
        },
      },
      create: {
        name,
        phone,
        attending: 0,
        lastActive: new Date(),
        wppStatus: 'attended',
        detail: "",
       identification: phone ,
        WhatsappMessage: {
          create: {
            id,
            message,
            to,
            status,
            direction,
            type,
            mediaId: "",
            attendant,
          },
        },
      }, 
    });  
 return "recibido del front";
  }
  async onImageReceived(payload:any) {
    const {name, phone,to,message,type,id}= payload;

    await prismaService.customer.upsert({
      where: { phone }, // Campo único para buscar el registro
      update: {
        name,
        phone,
        identification: phone,
        attending: 0,
        lastActive: new Date(),
        wppStatus: "initial",
        detail: "",
        WhatsappImage: {
          create: {
            id,
            message,
            to,
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
        identification:phone,
        attending: 0,
        lastActive: new Date(),
        wppStatus: "initial",
        detail: "",
        WhatsappImage: {
          create: {
            id,
            message,
            to,
            status: "unread",
            direction: "outgoing",
            type,
            mediaId: "",
            attendant: 0,
          },
        },
      },
    });
    return 'Imagen recibida';
  }
  async onAudioReceived(payload:any) {
    const {name, phone,to,message,type,id}= payload;

    await prismaService.customer.upsert({
      where: { phone }, // Campo único para buscar el registro
      update: {
        name,
        phone,
        identification:phone,
        attending: 0,
        lastActive: new Date(),
        wppStatus: "initial",
        detail: "",
        WhatsappAudio: {
          create: {
            id,
            message,
            to,
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
        identification:phone,
        attending: 0,
        lastActive: new Date(),
        wppStatus: "initial",
        detail: "",
        WhatsappAudio: {
          create: {
            id,
            message,
            to,
            status: "unread",
            direction: "outgoing",
            type,
            mediaId: "",
            attendant: 0,
          },
        },
      },
    });
    return 'Audio recibido';
  }

  async onVideoReceived(payload:any) {
    const {name, phone,to,message,type,id}= payload;
    await prismaService.customer.upsert({
      where: { phone }, // Campo único para buscar el registro
      update: {
        name,
        phone,
        identification:phone,
        attending: 0,
        lastActive: new Date(),
        wppStatus: "initial",
        detail: "",
        WhatsappVideo: {
          create: {
            id,
            message,
            to,
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
        identification:phone,
        attending: 0,
        lastActive: new Date(),
        wppStatus: "initial",
        detail: "",
        WhatsappVideo: {
          create: {
            id,
            message,
            to,
            status: "unread",
            direction: "outgoing",
            type,
            mediaId: "",
            attendant: 0,
          },
        },
      },
    });
    return 'Video recibido';
  }
  async onDocumentReceived(payload:any) {
    const {name, phone,to,message,type,id}= payload;
    await prismaService.customer.upsert({
      where: { phone }, // Campo único para buscar el registro
      update: {
        name,
        phone,
        identification:phone,
        attending: 0,
        lastActive: new Date(),
        wppStatus: "initial",
        detail: "",
        WhatsappDoc: {
          create: {
            id,
            message,
            to,
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
        identification:phone,
        attending: 0,
        lastActive: new Date(),
        wppStatus: "initial",
        detail: "",
        WhatsappDoc: {
          create: {
            id,
            message,
            to,
            status: "unread",
            direction: "outgoing",
            type,
            mediaId: "",
            attendant: 0,
          },
        },
      },
    });
    return 'Documento recibido';
  }

  //zona usuario
  async onRequestUsers( payload:any) {
    //todos los usuarios
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
            // take: 1,
             orderBy: {
               timestamp: 'desc',
             },
           },
           WhatsappAudio: {
            // take: 1,
             orderBy: {
               timestamp: 'desc',
             }
           },
           WhatsappImage: {
            // take: 1,
             orderBy: {
               timestamp: 'desc',
             }
           },
           WhatsappVideo: {
            // take: 1,
             orderBy: {
               timestamp: 'desc',
             }
           },
           WhatsappDoc: {
            // take: 1,
             orderBy: {
               timestamp: 'desc',
             }
           },
         },
      });
      return customers;
    } catch (error) {
      console.log(error);
    }
  }
  async onSearchForUser( id:any) {
  //usuario especifico
    try {
      const user = await prismaService.customer.findUnique({
        where: {
          phone: id,
        },
        // include: {
        //   WhatsappMessage: {
        //     //take: 1,
        //     orderBy: {
        //       timestamp: 'desc',
        //     },
        //   },
        //   WhatsappAudio: {
        //     // take: 1,
        //      orderBy: {
        //        timestamp: 'desc',
        //      }
        //    },
        //    WhatsappImage: {
        //     // take: 1,
        //      orderBy: {
        //        timestamp: 'desc',
        //      }
        //    },
        //    WhatsappVideo: {
        //     // take: 1,
        //      orderBy: {
        //        timestamp: 'desc',
        //      }
        //    },
        //    WhatsappDoc: {
        //     // take: 1,
        //      orderBy: {
        //        timestamp: 'desc',
        //      }
        //    },
        // },
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

  // zona de mensajes 
  async onResearchForALLTypesOfMessages( id:any ) {
    if (!id) {
      throw new Error('El id es requerido');
  }
    
   try{
    const customerData = await this.customer.findUnique({
      where: { phone: id },
      include: {
        WhatsappMessage: true,
        WhatsappImage: true,
        WhatsappAudio: true,
        WhatsappVideo: true,
        WhatsappDoc: true,
      },
    });

    return customerData;
   }catch(error){
    console.error('Error al obtener los datos del cliente:', error);
    throw new Error('No se pudieron obtener los datos del cliente');
   }
  
  }
  async onResearchTextMessages(id:any) {
    
    if (!id) {
      throw new Error('El id es requerido');
  }
    return this.customer.findMany({
      where: { phone: id },
      include: {
        WhatsappMessage: {
         // take: 1, cuantos debe traer
          orderBy: {
            timestamp: 'desc',
          },
        },
      },
    });
  }
  async onResearchImageMessages(id:any) {
    
    if (!id) {
      throw new Error('El id es requerido');
  }
    return this.customer.findMany({
      where: { phone: id },
      include: {
        WhatsappImage: {
         // take: 1,
          orderBy: {
            timestamp: 'desc',
          },
        },
      },
    });
  }
  async onResearchAudioMessages(id:any) {

    if (!id) {
      throw new Error('El id es requerido');
  }
    return this.customer.findMany({
      where: { phone: id },
      include: {
        WhatsappAudio: {
         // take: 1,
          orderBy: {
            timestamp: 'desc',
          },
        },
      },
    });
  }
  async onResearchVideoMessages(id:any) {

    if (!id) {
      throw new Error('El id es requerido en el payload');
  }
    return this.customer.findMany({
      where: { phone: id },
      include: {
        WhatsappVideo: {
         // take: 1,
          orderBy: {
            timestamp: 'desc',
          },
        },
      },
    });
  }

  async onResearchDocumentMessages(id:any) {

    if (!id) {
      throw new Error('El id es requerido');
  }
    return this.customer.findMany({
      where: { phone: id },
      include: {
        WhatsappDoc: {
         // take: 1,
          orderBy: {
            timestamp: 'desc',
          },
        },
      },
    });
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