import axios from 'axios';
import { Request, Response } from "express";
import { WhatsaapService} from "../services/whatsaap.services";
import { EmptyBatchException } from "../../exceptions/index";

export class WhatsaapController {
  constructor(
    private readonly  whatsaapService=new WhatsaapService(),
  ) {}

///de aqui se pueden traer las plantillas y despues se arreglan a las necesidades 
  public getTemplates = async (req: Request, res: Response) => {
    this.whatsaapService.onRequesForTemplates().then((data) => res.json(data));
  };

  public sendVerification = async (req: Request, res: Response) => {
    const phone = req.body.id;
    const {codigo}= req.body;
    const mensaje= this.whatsaapService.onSendVerification(phone,codigo);
    res.json(mensaje);
  }
  public sendtemplateverification = async (req: Request, res: Response) => {
    const phone = req.params.id;
    const numero = req.params.numero;
    const verification= await this.whatsaapService.onSendTemplateVerification(phone,numero);
    res.json(verification);
  }
  public getPhones = async (req: Request, res: Response) => {
   this.whatsaapService.onRequestForPhones().then((data) => res.json(data));
  };
  //rutas de plantillas de whatsapp
  public sinvariable = async (req: Request, res: Response) => {
    const payload = req.body;
    this.whatsaapService.onRequesWithoutVariables(payload).then((data) => res.json(data));
  }
  public unavariable = async (req: Request, res: Response) => {
   const payload = req.body;
    this.whatsaapService.onRequesFor1(payload).then((data) => res.json(data));
  }
  public dosvariables = async (req: Request, res: Response) => {
   const payload = req.body;
    this.whatsaapService.onRequesFor2(payload).then((data) => res.json(data));
  }
  public tresvariables = async (req: Request, res: Response) => {
   const payload = req.body;
    this.whatsaapService.onRequesFor3(payload).then((data) => res.json(data));
  }
  public cuatrovariables = async (req: Request, res: Response) => {
   const payload = req.body;
    this.whatsaapService.onRequesFor4(payload).then((data) => res.json(data));
  }
  public sinvariableimage = async (req: Request, res: Response) => {
    const payload = req.body;
    this.whatsaapService.onRequesWithoutVariablesImage(payload).then((data) => res.json(data));
  }
  public unavariableimage = async (req: Request, res: Response) => {
    const payload = req.body;
    this.whatsaapService.onRequesFor1Image(payload).then((data) => res.json(data));
  }
  public dosvariablesimage = async (req: Request, res: Response) => {
    const payload = req.body;
    this.whatsaapService.onRequesFor2Image(payload).then((data) => res.json(data));
  }
  public tresvariablesimage = async (req: Request, res: Response) => {
    const payload = req.body;
    this.whatsaapService.onRequesFor3Image(payload).then((data) => res.json(data));
  }
  public cuatrovariablesimage = async (req: Request, res: Response) => {
    const payload = req.body;
    this.whatsaapService.onRequesFor4Image(payload).then((data) => res.json(data));
  }
  public sinvariabledocument = async (req: Request, res: Response) => {
    const payload = req.body;
    this.whatsaapService.onRequesWithoutVariablesDocument(payload).then((data) => res.json(data));
  }
  public unavariabledocument = async (req: Request, res: Response) => {
    const payload = req.body;
    this.whatsaapService.onRequesFor1Document(payload).then((data) => res.json(data));
  }
  public dosvariablesdocument= async (req: Request, res: Response) => {
    const payload = req.body;
    this.whatsaapService.onRequesFor2Document(payload).then((data) => res.json(data));
  }
  public tresvariablesdocument = async (req: Request, res: Response) => {
    const payload = req.body;
    this.whatsaapService.onRequesFor3Document(payload).then((data) => res.json(data));
  }
  public cuatrovariablesdocument = async (req: Request, res: Response) => {
    const payload = req.body;
    this.whatsaapService.onRequesFor4Document(payload).then((data) => res.json(data));
  }
  public sinvariablevideo = async (req: Request, res: Response) => {
    const payload = req.body;
    this.whatsaapService.onRequesWithoutVariablesVideo(payload).then((data) => res.json(data));
  }
  public unavariablevideo = async (req: Request, res: Response) => {
    const payload = req.body;
    this.whatsaapService.onRequesFor1Video(payload).then((data) => res.json(data));
  }
  public dosvariablesvideo = async (req: Request, res: Response) => {
    const payload = req.body;
    this.whatsaapService.onRequesFor2Video(payload).then((data) => res.json(data));
  }
  public tresvariablesvideo = async (req: Request, res: Response) => {
    const payload = req.body;
    this.whatsaapService.onRequesFor3Video(payload).then((data) => res.json(data));
  }
  public cuatrovariablesvideo = async (req: Request, res: Response) => {
    const payload = req.body;
    this.whatsaapService.onRequesFor4Video(payload).then((data) => res.json(data));
  }


//no implementado
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

  };

  public sendText = async (req: Request, res: Response) => {
    const {message, id} = req.body; 
    const mensaje= this.whatsaapService.onSendText(id,message);
    res.json(mensaje);
  };

  public sendImage = async (req: Request, res: Response) => {
   const payload = req.body; 
   const mensaje= this.whatsaapService.onSendImage(payload);
   res.json(mensaje);
  };

  public sendAudio = async (req: Request, res: Response) => {
    const payload = req.body; 
    const mensaje= this.whatsaapService.onSendAudio(payload);
    res.json(mensaje);
  };
  public sendVideo = async (req: Request, res: Response) => {
    const payload = req.body;  
    const mensaje= this.whatsaapService.onSendVideo(payload);
    res.json(mensaje);
  };
  public sendDocument = async (req: Request, res: Response) => {
    const payload = req.body; 
    const mensaje= this.whatsaapService.onSendDoc(payload);
    res.json(mensaje);
  };
  public onReceivedFrontMessageVideo=async (req: Request, res: Response) => {
    const payload = req.body; 
    const mensaje= this.whatsaapService.onSendVideo(payload);
    res.json(mensaje);
  
};

}  