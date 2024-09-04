import { Request, Response } from 'express';
import PrismaService from './prisma.service';
import { IncomingWhatsappMessage } from '../domain/interfaces/whatsappMessage.interface';


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
       // const image = await this.prismaService.onReceivedImage(payload);
        res.status(200).send("imagen recibida");
    }

    onReceivedAudio= async (req: Request, res: Response) => {
        const payload = req.body;
        const audio = await this.prismaService.onAudioReceived(payload);
        res.status(200).send("audio recibido");
    }
    onReceivedVideo= async (req: Request, res: Response) =>{
        const payload = req.body;
        const video = await this.prismaService.onVideoReceived(payload);
        res.status(200).send("Video recibido");
    } 
    onReceivedDocument= async (req: Request, res: Response) => {
        const payload = req.body;
        const doc = await this.prismaService.onDocumentReceived(payload);
        res.status(200).send("documento recibido");
    }

    onRequestUsers = async (req: Request, res: Response) => {
        const payload = req.body;
        //desfragmentar el id del payload
         console.log(payload)
            const users = await this.prismaService.onRequestUsers(payload);
            res.status(200).send(users);
            
    
    };

    onRequesFortSpecificMessages = async (req: Request, res: Response) => {
        const payload = req.body;
            const messages = await this.prismaService.onResearchforSpecificMessages(payload);
            res.status(200).send(messages);
    
    };


    
     onSearchForUser = async (req: Request, res: Response) => {
          const payload = req.body;
        
          const user = await this.prismaService.onSearchForUser(payload);
          res.status(200).send(user);
      
        
     };


    onCreateUser = async (req: Request, res: Response) => {
         const payload = req.body;
         const newUser = await this.prismaService.onCreateUser(payload);
         res.status(200).send("respondera con un json que el usuario ha sido creado");
    }

    onUpdateUser = async (req: Request, res: Response) => {
        const payload = req.body;
        const updatedUser = await this.prismaService.onUpdateUser(payload);
        res.status(200).send(updatedUser);
    }



}

