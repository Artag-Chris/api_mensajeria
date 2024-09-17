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
    const {message} = req.body; 
    const id = req.body.id;
    //console.log(id)
    //const id = JSON.stringify(messages);
    console.log(message)
    const mensaje= this.whatsaapService.onSendWelcome(id);
    res.json(mensaje);
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

  public sendText = async (req: Request, res: Response) => {
    const {message, id} = req.body; 
   
    //console.log(id)
    //const id = JSON.stringify(messages);
    console.log(message)
    const mensaje= this.whatsaapService.onSendText(id,message);
    res.json(mensaje);
  };

  public sendImage = async (req: Request, res: Response) => {
    const {message, id} = req.body; 
   
   
    const mensaje= this.whatsaapService.onSendImage(id,message);
    res.json(mensaje);
  };
  
};

  

  

