import { PrismaClient } from '@prisma/client';
import { envs } from '../config/envs';
import { createNumber } from '../domain/functions/createNumber';

class PrismaService extends PrismaClient {
  /**********************************************************************
    clase de Prisma que se encargara de la comunicacion con la base de datos
    de whatsapp. ya no se guardara tableta de verificacion en la base de datos
  ***********************************************************************/
  constructor() {
    //TODO: se colocara un logger para registro de errores
    //TODO: se quuitaran los console.log 
    //TODO: se quitaran las lineas de codigo comentadas
  
    super( );

    this.init(); 
  }
  
 
  //mensaje recibido del bot de whatsapp
   async onMessageReceived(payload:any) {
    const { name, phone, type, id, body, display_phone_number } = payload;
//TODO: deberemos cambiar este metodo 
//1 deberamos buscar en la base de datos si el usuario existe y si no
//crearemos el usuario 
//2 si existe simplemente agregaremos el mensaje a la base de datos
//para evitar el error de id que se esta generando
    try {
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
//TODO: deberemos crear un logger con este error
      console.error(error);
      return 'Error al procesar el mensaje';
    }
  }
  //mensajes que enviamos desde el front texto
  async onFrontMessageReceived(payload: any) {
   //TODO: deberemos cambiar este metodo como el pasado de arriba
   //deberemos crear un dto de la informacion del mensaje para mas control

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
      console.log('guardado');
      return "recibido del front";
    } catch (error) {
      //TODO: deberemos crear un logger con este error
      console.error(error);
      return 'Error al procesar el mensaje del front';
    }
  }
  //imagen que enviamos desde el front
  async onFrontMessageImageReceived(payload: any) {
    //TODO: deberemos cambiar este metodo como el pasado de arriba
    //deberemos crear un dto de la informacion del mensaje para mas control
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
      //TODO: deberemos crear un logger con este error
      console.error(error);
      return 'Error al procesar el mensaje del front';
    }
  }
  async onFrontMessageDocReceived(payload: any) {
    //TODO: deberemos cambiar este metodo como el pasado de arriba
    //deberemos crear un dto de la informacion del mensaje para mas control
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
      //TODO: deberemos crear un logger con este error
      console.error(error);
      return 'Error al procesar el mensaje del front';
    }
  }
  //video que enviamos desde el front
  async onFrontMessageVideoReceived(payload: any) {
    //TODO: deberemos cambiar este metodo como el pasado de arriba
    //deberemos crear un dto de la informacion del mensaje para mas control
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
      //TODO: deberemos crear un logger con este error
      console.error(error);
      return 'Error al procesar el mensaje del front';
    }
  }
  //imagenes recividas desde el bot
  async onImageReceived(payload: any) {
    //TODO: deberemos cambiar este metodo como el pasado de arriba
    //deberemos crear un dto de la informacion del mensaje para mas control
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
      //TODO: deberemos crear un logger con este error
      console.error(error);
      return 'Error al procesar la imagen';
    }
  }
  //audios recividos desde el bot
  async onAudioReceived(payload: any) {
    //TODO: deberemos cambiar este metodo como el pasado de arriba
    //deberemos crear un dto de la informacion del mensaje para mas control
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
      //TODO: deberemos crear un logger con este error
      console.error(error);
      return 'Error al procesar el audio';
    }
  }
  //videos recividos desde el bot
  async onVideoReceived(payload: any) {
    //TODO: deberemos cambiar este metodo como el pasado de arriba
    //deberemos crear un dto de la informacion del mensaje para mas control
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
      //TODO: deberemos crear un logger con este error
      console.error(error);
      return 'Error al procesar el video';
    }
  }
  //documentos recividos desde el bot
  async onDocumentReceived(payload: any) {
    //TODO: deberemos cambiar este metodo como el pasado de arriba
    //deberemos crear un dto de la informacion del mensaje para mas control
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
      //TODO: deberemos crear un logger con este error
      console.error(error);
      return 'Error al procesar el documento';
    }
  }

  //zona usuario
  //obtenemos los mensajes de texto de solo los usuarios
  async onRequestUsers( payload:any) {
    //obtenemos los usuarios menos el bot
    //si tenemos varios bots deberemos filtrarlos de otra manera

    try {
      const customers = await prismaService.customer.findMany({
        orderBy: {
          lastActive: 'desc',
        },
        where: {
          attending: 0,
          NOT: {
            phone: envs.BOT_NUMBER, // Excluye el teléfono del bot
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
      //TODO: deberemos crear un logger con este error
      console.log(error);
    }
  }
  //aqui busca un usuario especifico 
  //se usa para despues pedir todos sus mensajes especificos 
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
  //metodo no usado 
  async onCreateUser( payload:any) {/*  se creara mejor logica aqui
    const newUser= await prismaService.customer.create({data:payload});
    return newUser*/
  }
  async onDispatchUser(phone: string, botNumber: string) {
    //metodo para colocar los mensajes del usuario en leido 
    //osea que ya no los pediremos de la base de datos
   
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
      //para que no 
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

  //metodo no impplementado
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
  //obtenemos todos los mensajes de un solo usuario todos los tipos
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
    //Todo: manejar el error con el logger
    console.error('Error al obtener los datos del cliente:', error);
    throw new Error('No se pudieron obtener los datos del cliente');
   }
  
  }
  //no implementado pero buscaria todos los mensajes de un solo usuario
  //sin importar si fueron read o no
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
  //no implementado
  //busca imagenes
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
  //no implementado
  //busca audios
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
  //no implementado
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
  //no implementado
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
  //este busca todos los mensajes del bot 
  //sin importar si fueron read o no
  async onResearchForBotMessages(id:any) {
    //TODO: no tiene try catch
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
  
//Deberemos borrar este metodo ya que no guardemos el codigo de verificacion
  async saveVerificationCode(phone: string, veriCode: string) {
    console.log("enviado mensaje de verificacion");
    /*
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
    }*/
  }
//Metodo que borraremos
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