import { Request, Response } from 'express';
import PrismaService from './prisma.service';
import { IncomingWhatsappMessage } from '../domain/interfaces/whatsappMessage.interface';


export class PrismaController {
    constructor(
        private readonly prismaService = new PrismaService(),
    ) {}
    


    onReceivedMessage= async(req:Request, res:Response) =>{
        const payload= req.body;
        this.prismaService.OnmessageReceived(payload);
        res.status(200).send("respondera con un json que el mensaje ha sido creado");
    }

    onRequestUsers = async (req: Request, res: Response) => {
        const payload = req.body;
        
            const users = await this.prismaService.onRequestUsers(payload);
            res.status(200).send("respondera con los clientes con un json");
            console.log(users);
    
    };
    
     onSearchForUser = async (req: Request, res: Response) => {
          const payload = req.params;
        
          const user = await this.prismaService.onSearchForUser(payload);
          res.status(200).send("respondera con el usuario con un json");
        console.log(user);
        
     };


    onCreateUser = async (req: Request, res: Response) => {
         const payload = req.body;
         const newUser = await this.prismaService.onCreateUser(payload);
         res.status(200).send("respondera con un json que el usuario ha sido creado");
    }

    onUpdateUser = async (req: Request, res: Response) => {
        const payload = req.body;
        const updatedUser = await this.prismaService.onUpdateUser(payload);
        res.status(200).send("respondera con un json que el usuario ha sido actualizado");
    }



}

