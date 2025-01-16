import { Server } from 'https';
import { WebSocket, WebSocketServer } from 'ws';
import PrismaService from '../prisma/prisma.service';
import logger from '../config/adapters/winstonAdapter';

interface Options {
  server: Server;
  path?: string; // wss
}

export class WssService {
  private static _instance: WssService;
  private wss: WebSocketServer;

  private constructor(options: Options) {
    // Cambiamos a wss para servidor HTTPS
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
    // Aquí se envía el mensaje a todos los clientes conectados
    this.wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ type, payload }));
      }
    });
  }

  public start() {
    this.wss.on('connection', (ws: WebSocket) => {
      const prismaService = new PrismaService();
      // Aquí van las notificaciones de websocket
      ws.on('message', (message: any) => {
        const messageString = message.toString('utf8');
        try {
          const data = JSON.parse(messageString);
          console.log(`mensaje recibido: numero ${data.phone} ${data.name}: ${data.message}`);
          // Aquí puedes manejar el objeto JSON recibido
          this.sendMessage('broadcast', data);
          prismaService.onMessageReceived(data);
        } catch (error:any) {
          logger.error('Error en mensaje enviado al websocket de la api', error?.message);
        }
      });

      //console.log('cliente conectado');
      ws.on('close', () => console.log('Client disconnected'));
    });
  }
}
