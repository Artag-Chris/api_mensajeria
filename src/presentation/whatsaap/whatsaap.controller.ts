import { Request, Response } from "express";
import { WhatsaapService} from "../services/whatsaap.services";
import { EmptyBatchException } from "../../exceptions/index";

export class WhatsaapController {
  //aqui ira la inyeccion de dependencia con el wss
  constructor(
    private readonly  whatsaapService=new WhatsaapService(),
  ) {}

  public senBatch = async (req: Request, res: Response) => {
    const messages = req.body;

    if (messages.length === 0) {
        throw new EmptyBatchException();
      }
      let failed = 0;

  for (const message of messages) {
    if (message.template === '') {
      failed++;
      continue;
    }

    if (message.source === '' || message.source === 'null') {
      failed++;
      continue;
    }

    if (message.destination === '') {
      failed++;
      //usar ws en vez de socket io
      //await notify.missingDestination(message.sender);
      continue;
    }

    try {
    //funcion de whatsapp que sendTemplate con el mensaje
     // await whatsappService.sendTemplate(message);
    } catch (error) {
      failed++;
      throw new Error("error al enviar el mensaje");
      //console.log(error.message);
      continue;
    }

    await new Promise((f) => setTimeout(f, 100));
  }
  if (failed === 0) {
    //usar ws en vez de socket io
    // await notify.sendNotification(messages[0].sender, {
    //   title: 'Todos los mensajes Han sido enviados!',
    //   body: `se enviaron ${messages.length} mensajes`,
    //   status: 'success',
    // });
    res.status(200).json('Todos los mensajes Han sido enviados!');
  } else {
    //usar ws en vez de socket io
    // await notify.sendNotification(messages[0].sender, {
    //   title: 'No se pudieron enviar algunos mensajes',
    //   body: `No se pudieron enviar ${failed} de ${messages.length} mensajes`,
    //   status: 'warning',
    // });
    res.status(206).json(`Failed: ${failed}/${messages.length}`);
  }

  console.log(`Sent ${messages.length - failed}, Failed ${failed}/${messages.length}`);
};

  };

  

//   public getLastTicketNumber = async (req: Request, res: Response) => {
//     res.json(this.ticketService.lastTicketNumber);
//   };

//   public pendingTickets = async (req: Request, res: Response) => {
//     res.json(this.ticketService.pendingTickets);
//   };

//   public createTicket = async (req: Request, res: Response) => {
//     res.status(201).json( this.ticketService.createTicket());
//   };

//   public drawTicket = async (req: Request, res: Response) => {
//    const {desk}=req.params;
//     res.json(this.ticketService.drawTicket(desk));
//   };

//   public ticketFinished = async (req: Request, res: Response) => {
//     const { ticketId } = req.params;
//     res.json(this.ticketService.onFinishedTicket(ticketId));
//   };

//   public workingOn = async (req: Request, res: Response) => {
//     res.json(this.ticketService.lastWorkingOnTickets);
//   };

// Ruta para obtener teléfonos
// app.get('/whatsapp/getPhones', async (req, res) => {
//     const phones = await whatsappService.getPhones();
//     res.status(200).json(phones);
//   });
  
//   // Ruta para obtener plantillas
//   app.get('/whatsapp/getTemplates', async (req, res) => {
//     const templates = await whatsappService.getTemplates();
//     res.status(200).json(templates);
//   });
  
//   // Hook para recibir mensajes de WhatsApp
//   app.get('/whatsapp/hook', HookGuard, async (req, res) => {
//     const challenge = req.query['hub.challenge'];
//     const response = await whatsappService.hookLifeTest(challenge);
//     res.status(200).send(response);
//   });
  
//   app.post('/whatsapp/hook', HookGuard, async (req, res) => {
//     const message = req.body;
//     const response = await whatsappService.receive(message);
//     res.status(200).send(response);
//   });