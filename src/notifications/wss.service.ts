import { Server } from 'http';
import { WebSocket, WebSocketServer } from 'ws';

interface Options {
  server: Server;
  path?: string; // ws
}

export class WssService {
  private static _instance: WssService;
  private wss: WebSocketServer;

  private constructor(options: Options) {
    const { server, path = '/ws' } = options;
    /// ws://localhost:4000/ws
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

  //TODO crear funcion para reconocer cuando llegan los mensajes
  // y enviar notificaciones para usuarios activos y especificos
  // entender el protocolo de notificaciones para mandar notificaciones
  // estudiar si es buena idea conectarse por websocket a la base de datos

  public start() {
    this.wss.on('connection', (ws: WebSocket) => {
      //aqui van las notificaciones de websocket
      // Aquí agregamos el manejador de eventos para el evento 'message'
      ws.on('message', (message: any) => {
        const messageString = message.toString('utf8');
        try {
          const data = JSON.parse(messageString);
          //console.log('Received JSON message:', JSON.stringify(data, null, 2));

          // Aquí puedes manejar el objeto JSON recibido
          console.log("data wss", );
        } catch (error) {
          console.error('Invalid JSON received:', messageString);
        }
      });

      console.log('Client connected');
      ws.on('close', () => console.log('Client disconnected'));
    });
  }
}