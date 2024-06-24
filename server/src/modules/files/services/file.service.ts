import { Request, Response } from 'express'

import { AppError } from '../../../shared/errors/app.error';
import { fileProviderInstance } from '../../providers';
import { SocketService } from '../../../configs/socket';

export class FileService {
  private socket: SocketService;

  constructor() {
    this.socket = SocketService.getInstance();
  }

  async process(req: Request) {
    if (!req.file) {
      throw new AppError('No file uploaded', 400);
    }

    for await (const line of fileProviderInstance.processFile(req.file.path)) {
      this.socket.emit('readingLine', { line });
    }
  }
}