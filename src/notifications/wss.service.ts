import { Server } from 'http';
import { WebSocket, WebSocketServer } from 'ws';
import  PrismaService  from '../prisma/prisma.service';

interface Options {
  server: Server;
  path?: string; // ws
}

export class WssService {
  private static _instance: WssService;
  private wss: WebSocketServer;

  private constructor(options: Options) {
    const { server, path = '/ws' } = options;

    this.wss = new WebSocketServer({ server, path });
    this.start();
  }

  static get instance(): WssService {
    if (!WssService._instance) {
      throw 'WssService is not initialized';
    }
    return WssService._instance;
  }

  static initWss(options: Options) {
    WssService._instance = new WssService(options);
  }

  public sendMessage(type: string, payload: Object) {
    //aqui se manda a todos los clientes incluso uno
    //se debera configurar para que solo mande a un cliente con identificador especifico
    this.wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ type, payload }));
      }
    });
  }


  public start() {
   
    this.wss.on('connection', (ws: WebSocket) => {
      const prismaService = new PrismaService();
      //aqui van las notificaciones de websocket
      //Aquí agregamos el manejador de eventos para el evento 'message'
      ws.on('message', (message: any) => {
       
        const messageString = message.toString('utf8');
        console.log('mensaje recibido:', messageString);
        try {
          const data = JSON.parse(message);
          // Aquí puedes manejar el objeto JSON recibido
          console.log(`mensaje recibido:${data}`, );
          this.sendMessage('broadcast', data);
          prismaService.onMessageReceived(data);

        } catch (error) {
          console.error('Invalid JSON received:', messageString);
        }
      });

      console.log('cliente conectado');
      ws.on('close', () => console.log('Client disconnected'));
    });
  }
}