import {
  SubscribeMessage,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Server } from 'ws';

@WebSocketGateway({namespace: '/map'})
export class MapGateway {
  @WebSocketServer()
  server;


  @SubscribeMessage('positionToServer')
	public handleMessage(client: Socket, payload: any): Promise<WsResponse<any>> {
    return this.server.emit('positionToClient', payload);
  }

  @SubscribeMessage('joinRoom')
  public joinRoom(client: Socket, room: string): void {
    client.join(room);
    client.emit('joinedRoom', room);
  }

  @SubscribeMessage('leaveRoom')
  public leaveRoom(client: Socket, room: string): void {
    client.leave(room);
    client.emit('leftRoom', room);
  }

  public afterInit(server: Server): void {
    return 
  }

  public handleDisconnect(client: Socket): void {
    return 
  }

  public handleConnection(client: Socket): void {
    return 
  }
}
