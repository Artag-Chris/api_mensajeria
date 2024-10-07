import { PrismaClient } from '@prisma/client';
import { envs } from '../config/envs';
import { createNumber } from '../domain/functions/createNumber';

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
    try {
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
    } catch (error) {
      console.error(error);
      return 'Error al procesar el mensaje';
    }
  }
  //front-end messages
  async onFrontMessageReceived(payload: any) {
    try {
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
              status:'unread',
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
              status:'unread',
              direction,
              type,
              mediaId: "",
              attendant,
            },
          },
        }, 
      });  
      
      return "recibido del front";
    } catch (error) {
      console.error(error);
      return 'Error al procesar el mensaje del front';
    }
  }
  async onFrontMessageImageReceived(payload: any) {
    try {
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
                status: "unread",
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
                status: "unread",
                direction: "outgoing",
                type: "image",
                mediaId: "",
                attendant: 0,
              },
            },
          }, 
        });  
     return "recibido del front";
    } catch (error) {
      console.error(error);
      return 'Error al procesar el mensaje del front';
    }
  }
  async onFrontMessageDocReceived(payload: any) {
    try {
      const { name, phone, to, message, id } = payload;
  
      await prismaService.customer.upsert({
        where: { phone }, // Campo único para buscar el registro
        update: {
          name,
          phone,
          attending: 0,
          lastActive: new Date(),
          wppStatus: 'attended',
          detail: "",
          identification: phone,
          WhatsappDoc: {
            create: {
              id,
              message,
              to,
              status: "unread",
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
          identification: phone,
          WhatsappDoc: {
            create: {
              id,
              message,
              to,
              status: "unread",
              direction: "outgoing",
              type: "document",
              mediaId: "",
              attendant: 0,
            },
          },
        },
      });
  
      return "recibido del front";
    } catch (error) {
      console.error(error);
      return 'Error al procesar el mensaje del front';
    }
  }
  async onFrontMessageVideoReceived(payload: any) {
    try {
      const { name, phone, to, message, id } = payload;
  
      await prismaService.customer.upsert({
        where: { phone }, // Campo único para buscar el registro
        update: {
          name,
          phone,
          attending: 0,
          lastActive: new Date(),
          wppStatus: 'attended',
          detail: "",
          identification: phone,
          WhatsappVideo: {
            create: {
              id,
              message,
              to,
              status: "unread",
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
          identification: phone,
          WhatsappVideo: {
            create: {
              id,
              message,
              to,
              status: "unread",
              direction: "outgoing",
              type: "video",
              mediaId: "",
              attendant: 0,
            },
          },
        },
      });
  
      return "recibido del front";
    } catch (error) {
      console.error(error);
      return 'Error al procesar el mensaje del front';
    }
  }
  //users messages
  async onImageReceived(payload: any) {
    try {
      const { name, phone, to, message, type, id } = payload;
  
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
      });
  
      return 'Imagen recibida';
    } catch (error) {
      console.error(error);
      return 'Error al procesar la imagen';
    }
  }
  async onAudioReceived(payload: any) {
    try {
      const { name, phone, to, message, type, id } = payload;
  
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
          identification: phone,
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
    } catch (error) {
      console.error(error);
      return 'Error al procesar el audio';
    }
  }
  async onVideoReceived(payload: any) {
    try {
      const { name, phone, to, message, type, id } = payload;
  
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
          identification: phone,
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
    } catch (error) {
      console.error(error);
      return 'Error al procesar el video';
    }
  }
  async onDocumentReceived(payload: any) {
    try {
      const { name, phone, to, message, type, id } = payload;
  
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
          identification: phone,
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
    } catch (error) {
      console.error(error);
      return 'Error al procesar el documento';
    }
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
             take: 1,
             orderBy: {
               timestamp: 'desc',
             },
        /*   },
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
               */
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
  async onDispatchUser(phone: string, botNumber: string) {
    //console.log(phone, botNumber);
    const user = await this.customer.findUnique({
      where: {
        phone: phone,
      },
      include: {
        WhatsappMessage: true,
        WhatsappImage: true,
        WhatsappAudio: true,
        WhatsappVideo: true,
        WhatsappDoc: true,
      },
    });
  
    if (user) {
      await this.whatsappMessage.updateMany({
        where: {
          customerId: user.id,
          to: botNumber,
        },
        data: {
          status: 'read',
        },
      });
  
      await this.whatsappImage.updateMany({
        where: {
          customerId: user.id,
          to: botNumber,
        },
        data: {
          status: 'read',
        },
      });
  
      await this.whatsappAudio.updateMany({
        where: {
          customerId: user.id,
          to: botNumber,
        },
        data: {
          status: 'read',
        },
      });
  
      await this.whatsappVideo.updateMany({
        where: {
          customerId: user.id,
          to: botNumber,
        },
        data: {
          status: 'read',
        },
      });
  
      await this.whatsappDoc.updateMany({
        where: {
          customerId: user.id,
          to: botNumber,
        },
        data: {
          status: 'read',
        },
      });
  
      // Marcar mensajes del bot a read
      await this.whatsappMessage.updateMany({
        where: {
          attendant:0,
          to: phone,
        },
        data: {
          status: 'read',
        },
      });
  
      await this.whatsappImage.updateMany({
        where: {
          attendant:0,
          to: phone,
        },
        data: {
          status: 'read',
        },
      });
  
      await this.whatsappAudio.updateMany({
        where: {
          attendant:0,
          to: phone,
        },
        data: {
          status: 'read',
        },
      });
  
      await this.whatsappVideo.updateMany({
        where: {
          attendant:0,
          to: phone,
        },
        data: {
          status: 'read',
        },
      });
  
      await this.whatsappDoc.updateMany({
        where: {
          attendant:0,
          to: phone,
        },
        data: {
          status: 'read',
        },
      });
    }
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
            status:"unread" 
            //direction: "incoming",
          }
        },
        WhatsappImage: {
          where:{
            status:"unread" 
           // direction: "incoming",
          }
        },
        WhatsappAudio: {
          where:{
           status:"unread" 
            
          }
        },
        WhatsappVideo: {
          where:{
           status:"unread" 
           
          }
        },
        WhatsappDoc: {
          where:{
           status:"unread"
            
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
    
    const phone=envs.BOT_NUMBER;
    const messagesRelated = await prismaService.customer.findUnique({
      where: {
        phone: phone,
      },
      include: {
        WhatsappMessage: {
          where: {
            to: id,
            status: 'unread',
          },
        },
        WhatsappImage: {
          where: {
            to: id,
            status: 'unread',
          },
        },
        WhatsappAudio: {
          where: {
            to: id,
            status: 'unread',
          },
        },
        WhatsappVideo: {
          where: {
            to: id,
            status: 'unread',
          },
        },
        WhatsappDoc: {
          where: {
            to: id,
            status: 'unread',
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
        //crear um nuevo usuario con el numero de telefono
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

onRequestAuth = async (phone: any) => {
  try {
    let customer = await this.customer.findUnique({
      where: {
        phone: `57${phone}`,
      },
      include: {
        verificationCode: true,
      },
    });
    if (!customer) {
      // Crear un nuevo cliente si no existe
      const veriCode = createNumber().toString(); // generar un código de verificación aleatorio
      customer = await this.customer.create({
        data: {
          phone: `57${phone}`,
          name: '',
          identification: `57${phone}`,
          attending: 0,
          wppStatus: 'initial',
          lastActive: new Date(),
          verificationCode: {
            create: {
              code: veriCode,
            },
          },
        },
        include: {
          verificationCode: true,
        },
      });
    }
    if (!customer.verificationCode) {
      throw new Error(`No se encontró un código de verificación para el cliente con el número de teléfono ${phone}`);
    }
    return customer.verificationCode.code;
  } catch (error: any) {
    console.error(`Error al recuperar el código de verificación: ${error.message}`);
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