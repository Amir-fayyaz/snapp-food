import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class IndexGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly Logger: Logger;
  @WebSocketServer() server: Server;

  handleDisconnect(@ConnectedSocket() client: Socket) {
    const date = new Date();

    console.log(` message: Client with id ${client.id} disconnected,
 time: ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()},`);
  }

  handleConnection(client: any, ...args: any[]) {
    console.log('Hello from client 1');
  }
}
