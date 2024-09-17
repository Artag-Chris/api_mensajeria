import { Request, Response } from 'express';
import PrismaService from './prisma.service';



export class PrismaController {
    constructor(
        private readonly prismaService = new PrismaService(),
    ) {}
    
    onReceivedMessage= async(req:Request, res:Response) =>{
        const payload= req.body;
        const mensaje =await this.prismaService.onMessageReceived(payload);   
        res.status(200).send(mensaje);
    }
    onReceivedImage= async (req: Request, res: Response) => {
        const payload = req.body;
        const imagen= await this.prismaService.onImageReceived(payload);
        res.status(200).send(imagen);
    }
    onReceivedAudio= async (req: Request, res: Response) => {
        const payload = req.body;
        const audio = await this.prismaService.onAudioReceived(payload);
        res.status(200).send(audio);
    }
    onReceivedVideo= async (req: Request, res: Response) =>{
        const payload = req.body;
        const video = await this.prismaService.onVideoReceived(payload);
        res.status(200).send(video);
    } 
    onReceivedDocument= async (req: Request, res: Response) => {
        const payload = req.body;
        const doc = await this.prismaService.onDocumentReceived(payload);
        res.status(200).send(doc);
    }
    //front messages
    onReceivedFrontMessage= async (req: Request, res: Response) => {
        const payload = req.body;
        const message = await this.prismaService.onFrontMessageReceived(payload);
        res.status(200).send(message);
    }
    onReceivedFrontMessageImage= async (req: Request, res: Response) => {
        const payload = req.body;
        const message = await this.prismaService.onFrontMessageImageReceived(payload);
        res.status(200).send(message);
    }
  
    //busqueda de mensajes
    onRequesForAlltypesOfMessages = async (req: Request, res: Response) => {
        const {id} = req.params;
            const messages = await this.prismaService.onResearchForALLTypesOfMessages(id);
            res.status(200).send(messages);
    
    };
    onRequesForTextMessages = async (req: Request, res: Response) => {
        const {id} = req.params;
            const messages = await this.prismaService.onResearchTextMessages(id);
            res.status(200).send(messages);
    }
    onRequesForImageMessages = async (req: Request, res: Response) => {
        const {id} = req.params;
        const messages = await this.prismaService.onResearchImageMessages(id);
        res.status(200).send(messages);
       
          
    }
    onRequesForAudioMessages = async (req: Request, res: Response) => {
        const {id} = req.params;
        console.log(id);
            const messages = await this.prismaService.onResearchAudioMessages(id);
            res.status(200).send(messages);
    }
    onRequesForVideoMessages = async (req: Request, res: Response) => {
        const {id} = req.params;
            const messages = await this.prismaService.onResearchVideoMessages(id);
            res.status(200).send(messages);
    }
    onRequesForDocumentMessages = async (req: Request, res: Response) => {
        const {id} = req.params;
            const messages = await this.prismaService.onResearchDocumentMessages(id);
            res.status(200).send(messages);
    }
    onConsultForBotMessages = async (req: Request, res: Response) => {
        const {id} = req.params;
            const messages = await this.prismaService.onResearchForBotMessages(id);
            res.status(200).send(messages);
    }
     
    // zona de usuarios
    onRequestUsers = async (req: Request, res: Response) => {
        const payload = req.body;
        //desfragmentar el id del payload
            const users = await this.prismaService.onRequestUsers(payload);
            res.status(200).send(users);   
    };
    onRequestForUser = async (req: Request, res: Response) => {
          const {id} = req.params;
        
          const user = await this.prismaService.onSearchForUser(id);
          res.status(200).send(user);
    };
    onCreateUser = async (req: Request, res: Response) => {
         const payload = req.body;
         const newUser = await this.prismaService.onCreateUser(payload);
         res.status(200).send("respondera con un json que el usuario ha sido creado");
    };

    onUpdateUser = async (req: Request, res: Response) => {
        const payload = req.body;
        const updatedUser = await this.prismaService.onUpdateUser(payload);
        res.status(200).send(updatedUser);
    };

}

