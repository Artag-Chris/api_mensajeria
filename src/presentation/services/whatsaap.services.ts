import { UuuiAdapter } from "../../config/uuid.adapter";
//no olvidar que aqui tambien iran las notificaciones del websocket
import{ WssService } from "../../notifications/wss.service";
 



export class WhatsaapService {

constructor(
  private readonly wssService = WssService.instance,
) {}




}
