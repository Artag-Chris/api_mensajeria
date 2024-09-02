import axios from 'axios';
import { Request, Response } from "express";
import { WhatsaapService} from "../services/whatsaap.services";
import { EmptyBatchException } from "../../exceptions/index";

export class WhatsaapController {
  //aqui ira la inyeccion de dependencia con el wss
  constructor(
    private readonly  whatsaapService=new WhatsaapService(),
  ) {}
///esta sera la funcion para enviar los mensajes
  public senBatch = async (req: Request, res: Response) => {
    const messages = req.body;
     res.json("funciona");
  };
  
///de aqui se pueden traer las plantillas y despues se arreglan a las necesidades 
  public getTemplates = async (req: Request, res: Response) => {
    this.whatsaapService.onRequesForTemplates().then((data) => res.json(data));
  };


  public sendWelcome = async (req: Request, res: Response) => {
    //const messages = req.body; 
    const id = req.body.id;

    //const id = JSON.stringify(messages);
    this.whatsaapService.onSendWelcome(id).then((data) => res.json(data));

  };
   //funcion para obtener los numeros de whatsapp desde donde se enviara los mensajes
  public getPhones = async (req: Request, res: Response) => {
   this.whatsaapService.onRequestForPhones().then((data) => res.json(data));
  
   
  };

// ira a la base de datos me traera los ultimos clientes que esten esperando mensaje por el userId
  public getCustomers = async (req: Request, res: Response) => {
    const userId = req.params.userId;
    //cambiar axios por prisma
    const customers = await axios.get("de la base de datos los clientes barridos que esten esperando");
    res.json(customers);
  };
 
   public getMessages = async (req: Request, res: Response) => {
    const userId = req.params.userId;
  if(!userId){
    throw new EmptyBatchException();
   }
  try{
    const customers = await axios.get("de la base de datos los clientes barridos que esten esperando");
    res.json(customers);
    //despues se usaran query para barrer la base de datos  donde el estatus es not: read
  }catch(error){
    console.log(error);
  }



  }
  // async getCustomers(userId: number): Promise<Customer[]> {
  //   try {
  //     const customers = await this.prisma.customer.findMany({
  //       orderBy: {
  //         lastActive: 'desc',
  //       },
  //       where: {
  //         attending: userId,
  //       },
  //       include: {
  //         WhatsappMessage: {
  //           take: 1,
  //           orderBy: {
  //             timestamp: 'desc',
  //           },
  //         },
  //       },
  //     });
  //     this.logger.log(
  //       `Retrieved ${customers.length} customers for user ${userId}`,
  //     );
  //     return customers;
  //   } catch (error) {
  //     this.logger.error(`no se encontro el usuario ${userId}`, error.stack);
  //     throw new Error('no se encontraron usuarios ');
  //   }
  // }


  //   if (messages.length === 0) {
  //       throw new EmptyBatchException();
  //     }
  //     let failed = 0;

  // for (const message of messages) {
  //   if (message.template === '') {
  //     failed++;
  //     continue;
  //   }

  //   if (message.source === '' || message.source === 'null') {
  //     failed++;
  //     continue;
  //   }

  //   if (message.destination === '') {
  //     failed++;
  //     //usar ws en vez de socket io
  //     //await notify.missingDestination(message.sender);
  //     continue;
  //   }

  //   try {
  //   //funcion de whatsapp que sendTemplate con el mensaje
  //    // await whatsappService.sendTemplate(message);
  //   } catch (error) {
  //     failed++;
  //     throw new Error("error al enviar el mensaje");
  //     //console.log(error.message);
  //     continue;
  //   }

  //   await new Promise((f) => setTimeout(f, 100));
  // }
  // if (failed === 0) {
  //   //usar ws en vez de socket io
  //   // await notify.sendNotification(messages[0].sender, {
  //   //   title: 'Todos los mensajes Han sido enviados!',
  //   //   body: `se enviaron ${messages.length} mensajes`,
  //   //   status: 'success',
  //   // });
  //   res.status(200).json('Todos los mensajes Han sido enviados!');
  // } else {
  //   //usar ws en vez de socket io
  //   // await notify.sendNotification(messages[0].sender, {
  //   //   title: 'No se pudieron enviar algunos mensajes',
  //   //   body: `No se pudieron enviar ${failed} de ${messages.length} mensajes`,
  //   //   status: 'warning',
  //   // });
  //   res.status(206).json(`Failed: ${failed}/${messages.length}`);
  // }

  // console.log(`Sent ${messages.length - failed}, Failed ${failed}/${messages.length}`);
};

  

  

