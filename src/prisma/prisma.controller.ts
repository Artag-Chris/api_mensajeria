import { Request, Response } from 'express';
import prismaService from './prisma.service';


export class PrismaController {

    public getUsers = async (req: Request, res: Response) => {
        try {
            const users = await prismaService.customer.findMany();
            res.json(users);
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            res.status(500).json({ error: 'Error al obtener usuarios' });
        }
    }

    public createUser = async (req: Request, res: Response) => {
        const { name, email } = req.body;
        try {
            const newUser = await prismaService.user.create({
                data: {
                    name,
                    email,
                },
            });
            res.status(201).json(newUser);
        } catch (error) {
            console.error('Error al crear usuario:', error);
            res.status(500).json({ error: 'Error al crear usuario' });
        }
    }

    public updateUser = async (req: Request, res: Response) => {
        const { id, name, email } = req.body;
        try {
            const updatedUser = await prismaService.user.update({
                where: {
                    id,
                },
                data: {
                    name,
                    email,
                },
            });
            res.json(updatedUser);
        } catch (error) {
            console.error('Error al actualizar usuario:', error);
            res.status(500).json({ error: 'Error al actualizar usuario' });
        }
    }

    public deleteUser = async (req: Request, res: Response) => {
        const { id } = req.body;
        try {
            const deletedUser = await prismaService.user.delete({
                where: {
                    id,
                },
            });
            res.json(deletedUser);
        } catch (error) {
            console.error('Error al eliminar usuario:', error);
            res.status(500).json({ error: 'Error al eliminar usuario' });
        }
    }


}

