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
             direction: "incoming",
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
             direction: "incoming",
             type,
             mediaId: "",
             attendant: 0, 
           },
         },
       },
     });
     
    return 'Texto recibido';
  }
  //front-end messages
  async onFrontMessageReceived(payload: any) {

    const {name,phone,identification,attending, lastActive,
      detail,WhatsappMessage} =payload;
      const {id,message,to,status,direction,type,attendant}=WhatsappMessage[0];



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
  async onFrontMessageImageReceived(payload: any) {
    const {name,phone,to,message,id } =payload;
      await prismaService.customer.upsert({
        where: { phone}, // Campo único para buscar el registro
        update: {
          name,
          phone,
          attending: 0,
          lastActive: new Date(),
          wppStatus:'attended',
          detail: "",
          identification: phone,
          WhatsappImage: {
            create: {
              id,
              message,
              to,
              status: "delivered",
              direction: "outgoing",
              type: "image",
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
          wppStatus: 'attended',
          detail: "",
         identification: phone ,
          WhatsappImage: {
            create: {
              id,
              message,
              to,
              status: "delivered",
              direction: "outgoing",
              type: "image",
              mediaId: "",
              attendant: 0,
            },
          },
        }, 
      });  
   return "recibido del front";


  }
  async onFrontMessageDocReceived(payload:any){
    const {name,phone,to,message,id } =payload;

    await prismaService.customer.upsert({
      where: { phone}, // Campo único para buscar el registro
      update: {
        name,
        phone,
        attending: 0,
        lastActive: new Date(),
        wppStatus:'attended',
        detail: "",
        identification: phone,
        WhatsappDoc: {
          create: {
            id,
            message,
            to,
            status: "delivered",
            direction: "outgoing",
            type: "document",
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
        wppStatus: 'attended',
        detail: "",
       identification: phone ,
        WhatsappDoc: {
          create: {
            id,
            message,
            to,
            status: "delivered",
            direction: "outgoing",
            type: "document",
            mediaId: "",
            attendant: 0,
          },
        },
      }, 
    }); 
  }
  async onFrontMessageVideoReceived(payload:any){
    const {name,phone,to,message,id } =payload;
      await prismaService.customer.upsert({
        where: { phone}, // Campo único para buscar el registro
        update: {
          name,
          phone,
          attending: 0,
          lastActive: new Date(),
          wppStatus:'attended',
          detail: "",
          identification: phone,
          WhatsappVideo: {
            create: {
              id,
              message,
              to,
              status: "delivered",
              direction: "outgoing",
              type: "video",
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
          wppStatus: 'attended',
          detail: "",
         identification: phone ,
          WhatsappVideo: {
            create: {
              id,
              message,
              to,
              status: "delivered",
              direction: "outgoing",
              type: "video",
              mediaId: "",
              attendant: 0,
            },
          },
        }, 
      });  
   return "recibido del front";
  }
  //users messages
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
            direction: "incoming",
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
            direction: "incoming",
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
            direction: "incoming",
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
            direction: "incoming",
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
            direction: "incoming",
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
            direction: "incoming",
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
            direction: "incoming",
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
            direction: "incoming",
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
    //todos los usuarios menos el bot
    const bot= envs.BOT_NUMBER;

    try {
      const customers = await prismaService.customer.findMany({
        orderBy: {
          lastActive: 'desc',
        },
        where: {
          attending: 0,
          NOT: {
            phone: bot, // Excluye el teléfono del bot
          },
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
        //se excluye todos los mensajes del usuario se podrian habilitar
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
        WhatsappMessage: {
          where:{
           // status:"unread" para futura refenencia
            direction: "incoming",
          }
        },
        WhatsappImage: {
          where:{
           // status:"unread" para futura refenencia
            direction: "incoming",
          }
        },
        WhatsappAudio: {
          where:{
           // status:"unread" para futura refenencia
            direction: "incoming",
          }
        },
        WhatsappVideo: {
          where:{
           // status:"unread" para futura refenencia
            direction: "incoming",
          }
        },
        WhatsappDoc: {
          where:{
           // status:"unread" para futura refenencia
            direction: "incoming",
          }
        },
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
         // se deberian traer los mensajes solo unread
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
  async onResearchForBotMessages(id:any) {
    
    const phone="573025970185"
    const messagesRelated = await prismaService.customer.findUnique({
      where: {
        phone: phone,
      },
      include: {
        WhatsappMessage: {
          where: {
            to: id,
          },
        },
        WhatsappImage: {
          where: {
            to: id,
          },
        },
        WhatsappAudio: {
          where: {
            to: id,
          },
        },
        WhatsappVideo: {
          where: {
            to: id,
          },
        },
        WhatsappDoc: {
          where: {
            to: id,
          },
        },
      },
    });

    return messagesRelated;
  }
  

  async saveVerificationCode(phone: string, veriCode: string) {
    try {
      const customer = await this.customer.findUnique({
        where: {
          phone: `57${phone}`, 
        },
      });
  
      if (!customer) {
        throw new Error(`No se encontró un cliente con el número de teléfono ${phone}`);
      }
  
      await this.verificationCode.upsert({
        where: {
          customerId: customer.id,
        },
        create: {
          code: veriCode,
          customer: {
            connect: {
              id: customer.id,
            },
          },
        },
        update: {
          code: veriCode,
        },
      });
  
      console.log(`Código de verificación guardado correctamente`);
    } catch (error:any) {
      console.error(`Error al guardar el código de verificación: ${error.message}`);
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