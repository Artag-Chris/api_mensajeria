import { UuuiAdapter } from "../../config/uuid.adapter";
//no olvidar que aqui tambien iran las notificaciones del websocket
import{ WssService } from "../../notifications/wss.service";
 



export class WhatsaapService {

constructor(
  private readonly wssService = WssService.instance,
) {}

//   public tickets: Ticket[] = [
//     { id: UuuiAdapter.v4(), number: 1, createdAt: new Date(), done: false },
//     { id: UuuiAdapter.v4(), number: 2, createdAt: new Date(), done: false },
//     { id: UuuiAdapter.v4(), number: 3, createdAt: new Date(), done: false },
//     { id: UuuiAdapter.v4(), number: 4, createdAt: new Date(), done: false },
//     { id: UuuiAdapter.v4(), number: 5, createdAt: new Date(), done: false },
//     { id: UuuiAdapter.v4(), number: 6, createdAt: new Date(), done: false },
//   ];

// private readonly workingOnTicket: Ticket[] = [];

// public get lastWorkingOnTickets(): Ticket[] {
// return this,this.workingOnTicket.slice(0,4);
// }

//   public get pendingTickets(): Ticket[] {
//     return this.tickets.filter((ticket) => !ticket.handleAtDesk);
//   }

//   public get lastTicketNumber() {
//     return this.tickets.length > 0 ? this.tickets.at(-1)!.number : 0;
//   }

//   public createTicket() {
//     const ticket: Ticket = {
//       id: UuuiAdapter.v4(),
//       number: this.lastTicketNumber + 1,
//       createdAt: new Date(),
//       done: false,
//       handleAtDesk: undefined,
//       handleAt: undefined,
//     };
   
//     //TODO: ponerlo con el WS


//     this.tickets.push(ticket);
//      this.onTicketNumberChanged();

//     return ticket;
//   }

//   public drawTicket(desk: string) {
//     const ticket = this.tickets.find((ticket) => !ticket.handleAtDesk);
//     if (!ticket) return { error: "No hay tickets pendientes" };

//     ticket.handleAtDesk = desk;
//     ticket.handleAt = new Date();

//     this.workingOnTicket.unshift({...ticket});
//     //aqui estan las notificaciones del ws
//     this.onTicketNumberChanged();
//     this.onWorkingOnChanged();


//     return { status: `ok`, ticket };
//   }

//   public onFinishedTicket(id: string) {
//     const ticket = this.tickets.find((t) => t.id === id);
//     if (!ticket) return { error: "Ticket no encontrado" };

//    this.tickets =this.tickets.map((ticket) => {
//       if (ticket.id === id) {
//         ticket.done = true;
//       }
//       return ticket;
//     });
//     return { status: `ok` };
//   }

// private onTicketNumberChanged(){
//   this.wssService.sendMessage('on-ticket-count-changed', this.pendingTickets.length);
// }

// private onWorkingOnChanged(){
//   this.wssService.sendMessage('on-working-changed', this.lastWorkingOnTickets);
// }


}
