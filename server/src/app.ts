
import express, { Express, Response, Request, NextFunction } from 'express';
import 'express-async-errors';
import 'reflect-metadata';
import http from 'http';
import cors from 'cors';

import { router } from './shared/routes';
import { SocketService } from './configs/socket';
import { Server } from 'socket.io';
import { AppError } from './shared/errors/app.error';

export class App {
  private server: http.Server;
  private port: number;
  private app: Express;

  constructor(port: number) {
    this.app = express()
    this.port = port;
    this.app.use(cors());

    
    this.configureApp();
    this.setupRoutes();

    this.server = http.createServer(this.app);
    this.startSocket();
  }

  start() {
    this.server.listen(this.port, () => {
      console.log(`Server is running on http://localhost:${this.port}`);
    });
  }

  private configureApp() {
    this.app.use(express.json());

    this.app.use(
      (err: Error, request: Request, response: Response, next: NextFunction) => {
        if (err instanceof AppError) {
          return response.status(err.statusCode).json({
            message: err.message,
          });
        }
    
        return response.status(500).json({
          status: "error",
          message: `Internal server error - ${err.message}`,
        });
      }
    );
  }

  private setupRoutes() {
    this.app.use(router);
  }

  private startSocket() {
    const io = new Server(this.server, {
      cors: {
        origin: '*'
      }
    });
    
    const socketService = SocketService.getInstance()
    socketService.initialize(io);
  }
}