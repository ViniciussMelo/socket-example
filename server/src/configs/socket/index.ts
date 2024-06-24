import { Server, Socket } from 'socket.io';
import http from 'http';

export class SocketService {
  private static instance: SocketService;
  private io: Server | undefined;

  initialize(io: Server): void {
    this.io = io;
    
    this.io.on('connection', (socket: Socket) => {
      console.log('A user connected!');

      socket.on('disconnect', () => {
        console.log('User disconnected')
      })
    })
  }

  static getInstance(): SocketService {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService();
    }

    return SocketService.instance;
}

  emit(event: string, data: any) {
    if (!this.io) {
      throw new Error('Socket.IO server not initialized. Call initialize(io) first.');
    }
    
    this.io.emit(event, data);
  };
}

